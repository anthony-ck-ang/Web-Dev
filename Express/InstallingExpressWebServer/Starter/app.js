let express = require('express'); //returns a createApplication()
let app = express(); //invoke func

//env var or port 3000
let port = process.env.port || 3000;

//res with html
app.get('/', (req, res) =>{
    res.send('<html><head></head><body><h1>Hello from server res!</h1></body></html>');
});

//res with json obj
app.get('/api', (req, res) =>{
    res.json({ firstname: 'ant', lastname: 'ang'});
});

app.listen(port);