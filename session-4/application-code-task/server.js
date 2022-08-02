const Express = require("express");
var cors = require('cors');
const fs = require('fs');
const { exit } = require('process');

const app = Express();
app.use(cors());
const port = 3001;

let rawdata = fs.readFileSync('configuration/configuration.json');
let student = JSON.parse(rawdata);

app.get('/test', async function(req, res){

    const username = process.env.APP_USERNAME
    const password = process.env.APP_PASSWORD

    res.json({
        configmap: student,
        envs:{
            username: username,
            password: password
        }
    });
});

app.listen(port, async () => {
    console.log('Running on '+port+' port');
});