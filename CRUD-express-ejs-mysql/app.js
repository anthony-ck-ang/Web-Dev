//https://www.npmjs.com/package/mysql#install

const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');

let app = express();
let apiController = require('./Controllers/apiController');

app.use('/assets', express.static(__dirname + '/public'));
app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine

app.use(bodyparser.json());

let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'EmployeeDB',
    multipleStatements: true //for multiple SET statements
});

mysqlConnection.connect((err) => {
    if (err) console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
    else console.log('DB connection succeeded.');
});


app.listen(8080, () => console.log('Listening on port 8080'));


apiController(app, mysqlConnection);

