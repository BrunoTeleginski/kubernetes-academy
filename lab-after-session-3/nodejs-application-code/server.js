const fs = require('fs');
const Express = require("express");
var cors = require('cors');
require('dotenv').config()
var _ = require('lodash');
const {MongoClient} = require('mongodb');
const { json } = require('express');
const { exit } = require('process');

const app = Express();
app.use(cors());
const port = 3001;


app.get('/', async function(req, res){

    //access logs
    var access = fs.createWriteStream('logs/application.log', { flags: 'a' })
    access.write("["+(new Date())+"] ACCESS the root" + '\n');

    res.send('<html><body><h1>Application is running!</p></h1></body></html>');
})

app.get('/mongodbtest', async function(req, res){
    
    const host = process.env.MONGODB_HOST
    const port = process.env.MONGODB_PORT
    const mongouser = process.env.MONGODB_USER
    const mongopassword = process.env.MONGODB_PASS

    const uri = "mongodb://"+mongouser+":"+mongopassword+"@"+host+":"+port;
    const client = new MongoClient(uri);
 
    try {
        await client.connect();
        
        //access logs
        var access = fs.createWriteStream('logs/application.log', { flags: 'a' })
        access.write("["+(new Date())+"] Success on MONGO DB" + '\n');

        res.send('<html><body><h1 style="color:green">MongoDB is working!</p></h1></body></html>');
 
    } catch (e) {

        //error logs
        var access = fs.createWriteStream('logs/application.log', { flags: 'a' })
        access.write("["+(new Date())+"] ERROR on MONGO DB" + '\n');

        res.send('<html><body><h1 style="color:red">MongoDB is not working!</p></h1><p>'+e+'</p></body></html>');
    } finally {
        await client.close();
    }

})

app.listen(port, async () => {
    console.log('Running on '+port+' port');
});
