const url=require('url')
const http=require('http')
const querystring=require('querystring')
const fs=require('fs')

const server=http.createServer(function(request,response){
    let urlObj=url.parse(request.url,true,false);
    if(request.method=='POST'){
        if(urlObj.pathname=='/dodajOsobu'){
            var body=''
            request.on('data',function(data){
                body+=data;
            })
            request.on('end',function(){
                let osobe=JSON.parse(fs.readFileSync("osobe.json",function(err,data){
                    if(err){
                        response.writeHead(404)
                        response.end(JSON.stringify(err));
                        return;
                    }
                }))
                let osoba={
                    "id":parseInt(querystring.parse(body).id),
                    "ime":querystring.parse(body).ime,
                    "prezime":querystring.parse(body).prezime,
                    "adresa":querystring.parse(body).adresa
                };
                osobe.push(osoba)
                fs.writeFileSync("osobe.json",JSON.stringify(osobe));
            })
        }
    }
})

server.listen(6000,'localhost')
console.log("Server radi na adresi: localhost, port: 6000")