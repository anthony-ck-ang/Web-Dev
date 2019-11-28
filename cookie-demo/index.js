const app = require('express')();
const cp = require('cookie-parser');
app.use(cp());

app.get("/", (req, res) => {
    //session cookie
    //set cookies on the web server
    //an [] of cookies
    res.setHeader("set-cookie", ["setfromserver1=12345", "setfromserver2browsercantsee=67890; httponly"]);
    //send the html back as a response to be downloaded, and "instruct" the client's browser to create the cookie
    res.sendFile(`${__dirname}/index.html`);
    });

app.get("/path1", (req, res) => {
    //server send back res with the cookies received from the client's req 
    res.send(`P1: I have been sent these cookies: ${req.headers.cookie}`);
    });

app.get("/path2", (req, res) => {
        res.send(`P2: I have been sent these cookies: ${req.headers.cookie}`);
    });

    //tracking cookie
app.get("/img", (req, res) => {
        res.setHeader("set-cookie", ["iamtrackingyou=true"]);
        res.sendFile(`${__dirname}/trackyou.jpg`);
    });

    //"Mock Hackers steal api/ url"
app.get("/steal", (req, res) => {
        //in the req obj
        res.send(`Stole your cookies and store them to the DB. Here they are... ${req.query.v}`);
    });

    //Trying cookie-parser; https://www.npmjs.com/package/cookie-parser
app.get('/set', (req, res) => {
        res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
        res.cookie("name", "value", {
            sameSite: true
          });
          res.send(`Here they are... ${req.cookies['rememberme']} ${req.cookies['name']}`);
          res.end();
      });


app.listen(8080, () => console.log("listening on port 8080"));
