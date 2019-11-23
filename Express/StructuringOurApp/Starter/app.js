let express = require('express');
let app = express();

//import controllers
let apiController = require('./controllers/apiController');
let htmlController = require('./Controllers/htmlController');

let port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

app.use('/', (req, res, next) =>{
	console.log('Request Url:' + req.url);
	next();
});

//Controller module vs express routes

//html controller
htmlController(app);

//api controller
//app obj pass by ref to the function to do the respective HTTP operations eg. get, post delete
apiController(app);


app.listen(port);