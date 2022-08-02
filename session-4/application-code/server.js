const Express = require("express");
var cors = require('cors');
const fs = require('fs');

const app = Express();
app.use(cors());
const port = 3001;

let rawdata = fs.readFileSync('config/config.json');
let student = JSON.parse(rawdata);

app.get('/', async function(req, res){
    res.json(student);
});

app.listen(port, async () => {
    console.log('Running on '+port+' port');
});