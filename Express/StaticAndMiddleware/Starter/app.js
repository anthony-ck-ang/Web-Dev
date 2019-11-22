var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

//middleware to deliver static files
//node -> see http req '/assets' -> go '/public' to look for it -> stream res back
app.use('/assets', express.static(__dirname +'/public'));

//custom middleware
//All req: logging | uploads | downloads |
app.use((req, res, next) =>{
	console.log('Request url:' + req.url);
	next(); //call next middleware
});

//add link tag
//browser will dl this html -> see the link tag -> auto http req for style.css
app.get('/', function(req, res) {
	res.send('<html><head><link href=assets/style.css type=text/css rel=stylesheet /></head><body><h1>Hello world!</h1></body></html>');
});

app.get('/person/:id', function(req, res) {
	res.send('<html><head></head><body><h1>Person: ' + req.params.id + '</h1></body></html>');
});

app.get('/api', function(req, res) {
	res.json({ firstname: 'John', lastname: 'Doe' });
});

//Handle 404 response
app.use((req, res, next) => {
	res.status(404).send("Sorry can't find that!")
  })

app.listen(port);