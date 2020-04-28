const http=require('http')
const url=require('url')
const fs=require('fs')
const queryString=require('querystring')

const server=http.createServer(function(request,response){
    let urlObj=url.parse(request.url,true,false)
    if(request.method=='POST'){
        if(urlObj.pathname=='/dodajOsobu'){
            var body='';
            request.on('data',function(data){
                body+=data;
            });
            request.on('end',function(){
                let osobe=JSON.parse(fs.readFileSync("osobe.json",function(err,data){
                    if (err){
                        response.writeHead(404);
                        response.end(JSON.stringify(err));
                        return;
                    }
                }))
                let osoba = {
                    "id": parseInt(queryString.parse(body).id),
                    "ime": queryString.parse(body).ime,
                    "prezime": queryString.parse(body).prezime,
                    "adresa": queryString.parse(body).adresa
                };
                osobe.push(osoba)
                fs.writeFileSync("osobe.json",JSON.stringify(osobe));   
            })
            response.writeHead(200);
            response.end('Osoba je uspesno upisana u fajl');
        }
        else if(urlObj.pathname=='/obrisiOsobu'){
            var body='';
            request.on('data',function(data){
                body+=data;
            })
            request.on('end',function(){
                let osobe=JSON.parse(fs.readFile('osobe.json',function(err,data){
                    if(err){
                        response.writeHead(400);
                        response.end(JSON.stringify(err))
                        return;
                    }
                }))
                let osobaId=parseInt(queryString.parse(body).id)
                noviNizOsoba=[]
                for(let o of osobe){
                    if(o.id!=osobaId){
                        noviNizOsoba.push(o)
                    }
                }
                fs.writeFile('osobe.json',JSON.stringify(noviNizOsoba))
                response.writeHead(200)
                response.end("Uspesno ste izbrisali osobu.")
            })
        }
    }
    else if(request.method=='GET'){
        if(urlObj.pathname=='/'){
            fs.readFile('./klijent.html','utf-8',(err,data)=>{
                if(err){
                    response.end("Greska prilikom prikaza stranice.")
                }
                else{
                    response.end(data)
                }
            })
        }
        else if(urlObj.pathname=='/sveOsobe'){
            fs.readFile('osobe.json',function(err,data){
                if(err){
                    response.writeHead(404);
                        response.end(JSON.stringify(err));
                        return;
                }
                response.writeHead(200);
                response.end(data);
            })
        }
    }
    
});

const port=2000;
const host='127.0.0.1';;
server.listen(port,host)
console.log(`Server radi na adresi: ${host}: ${port}`);