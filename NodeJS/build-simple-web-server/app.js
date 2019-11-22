var http = require('http');
var fs = require('fs');

//Create server, request and response object
http.createServer((req, res) => {

//Routing
  if (req.url === '/'){
	//Streams
    fs.createReadStream(__dirname + '/index.htm').pipe(res);
  }
  else if (req.url === '/api'){
	  //Output JSON
      res.writeHead(200, {'Content-Type': 'application/json'});
      var obj = {
        firstname: 'John',
        lastname: 'Doe'
      };
      res.end(JSON.stringify(obj));
  }
  else {
    res.writeHead(404);
    res.end();
  }

}).listen(8080, '127.0.0.1');
