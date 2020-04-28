const http=require('http')
const url=require('url')
const fs=require('fs')
const querystring=require('querystring')

const server=http.createServer(function(request,response){
    let urlObj=url.parse(request.url,true,false)
    if(request.method=='POST'){
        if(urlObj.pathname=='/dodajOsobu'){
            response.end("Primljeno")
        }
    }
    
});

const port=2000;
const host='127.0.0.1';;
server.listen(port,host)
console.log(`Server radi na adresi: ${host}: ${port}`);