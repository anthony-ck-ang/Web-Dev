var express = require('express');
//https://www.npmjs.com/package/body-parser
let bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 3000;

// 1. parse application/x-www-form-urlencoded
let urlencodedParser = bodyParser.urlencoded({ extended: false });
// 2 .parse application/json
let jsonParser = bodyParser.json();

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', function (req, res, next) {
	console.log('Request Url:' + req.url);
	next();
});

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/person/:id', function(req, res) {
	//any name/value be parsed and attached to query obj (exist in req obj)
	res.render('person', { ID: req.params.id, QSTR: req.query.qstr });
});

// 1. urlencodedParser parse the body of /person post req only
//make sure the http req is formatted properly
app.post('/person', urlencodedParser ,function(req, res) {
	res.send('Thank you!');
	console.log(req.body.firstname); //output to cmdl, the parsed data from the form
	console.log(req.body.lastname);
});

// 2.
app.post('/personjson', jsonParser ,function(req, res) {
	res.send('Thank you for the JSON data!');
	console.log(req.body.firstname);
	console.log(req.body.lastname);
});

app.get('/api', function(req, res) {
	res.json({ firstname: 'John', lastname: 'Doe' });
});

app.use((req, res, next) => {
	res.status(404).send("Sorry can't find that!")
  })

app.listen(port);