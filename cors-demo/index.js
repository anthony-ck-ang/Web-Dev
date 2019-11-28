/*
    https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
    https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
*/

const app = require('express')();

//Middleware to enable CORS for all resources on server
app.use(function (req, res, next) {

    console.log('Request Url:' + req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    
    });

//     /*
//     Submit a simple fetch request from (Diff site/domain/origin)
//     - In the console: fetch("http://localhost:8888/").then(a => a.text()).then(console.log);

//     Exception:
//     Access to fetch at 'http://localhost:8888/' from origin 'https://www.google.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. 
//     If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

//     */
// app.get("/", (req, res) =>{
//     // set specific to a particular path
//     res.setHeader("Access-Control-Allow-Origin", "*"); 
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
//     res.send("Successful");
// });


//     /*
//     Submit a pre-flight fetch request from (Diff site/domain/origin)
//     (simulate a POST request from client to tell the server what type of data is actually sent.)
//     - fetch("http://localhost:8888/", { headers: {"Content-Type": "application/json" } }).then(a => a.text()).then(console.log);

//     Exception:
//     Access to fetch at 'http://localhost:8888/' from origin 'chrome-search://local-ntp' has been blocked by CORS policy: 
//     Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. 
//     If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

//     Browser will prevent reading of the response and send a Request (Method: OPTIONS) to check which methods are allowed on (server Allow: GET,HEAD)
//     */
// app.options("/", (req, res) =>{
//     res.setHeader("Access-Control-Allow-Origin", "*"); 
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.sendStatus(204);
//     res.finished() 
// });


//fetch("http://localhost:8888/grocery", { headers: {"Content-Type": "application/json" } }).then(a => a.text()).then(console.log);
app.get('/grocery', (req, res) =>{
    let data = {
      "Grocery": ["Chicken","Beef", "Eggs"]
    };
    res.json(data);
  });

  app.get("/", (req, res) =>{
    // set specific to a particular path
    // res.setHeader("Access-Control-Allow-Origin", "*"); 
    // res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.send("Successful");
});


app.listen(8888, () => console.log("listening on port 8888"));
//app.listen(process.env.PORT);