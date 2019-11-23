let bodyParser = require('body-parser');
let jsonParser = bodyParser.json();

//pass the app obj in
module.exports = (app) =>{

    app.get('/api/person/:id', function(req, res) {
        // get that data from database
        res.json({ firstname: 'John', lastname: 'Doe' });
    });
    
    app.post('/api/person', jsonParser, function(req, res) {
        // save to the database
    });
    
    app.delete('/api/person/:id', function(req, res) {
        // delete from the database
    });

}