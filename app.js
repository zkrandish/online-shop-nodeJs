const http = require('http');
const fs= require('fs');

// function rqListener(req, res){
// }

const server= http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;
    if(url ==='/'){
        res.write('<html>');
        res.write('<head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>');
        res.write('</html>');
       return res.end();
    }
    if(url ==='/message'&& method === 'POST'){
        fs.writeFileSync('message.txt','Dummy');
        res.statusCode=302;
        res.setHeader('Location','/');
         return res.end();


    }
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>my first page</title></head>');
    res.write('<body><h1>my first page</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);