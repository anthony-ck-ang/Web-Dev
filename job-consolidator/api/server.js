const express = require('express')
const app = express()
const cors = require('cors');
const port = 3001

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use(express.json());
app.use(cors());

const redis = require("redis"),
    client = redis.createClient(6379, 'localhost');

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);


app.get('/api/jobs', async (req, res) => {
    
    let gitjobs = JSON.parse(await getAsync('github'));
    let stackOverFlowjobs = JSON.parse(await getAsync('StackOverFlow'));

    const totaljobs = [...gitjobs, ...stackOverFlowjobs];

    console.log(`gitjobs length ${gitjobs.length}`);
    console.log(`stackOverFlowjobs length ${stackOverFlowjobs.length}`);
    console.log(`totaljobs length ${totaljobs.length}`);

    res.header("Access-Control-Allow-Origin");
    return res.send(totaljobs);
});


app.get('/api/jobs/github', async (req, res) => {
    
    let gitjobs = await getAsync('github');

    res.header("Access-Control-Allow-Origin");
    return res.send(gitjobs);
});


app.get('/api/jobs/StackOverFlow', async (req, res) => {
    
    let stackOverFlowjobs = await getAsync('StackOverFlow');

    res.header("Access-Control-Allow-Origin");
    return res.send(stackOverFlowjobs);
});


