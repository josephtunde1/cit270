const express=require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');

import { createhash } from node:crypto ;

const app = express();
const port = 3000
const redisClient = Redis.createclient({url:"redis://127.0.0.1:6379"});

app.use(bodyParser.json()); //allow JSON (Javascript Object notation) requests

app.listen(port, ()=>{
    redisClient.connect(); //the API server is trying to connect with Redis
    console.log("listening on port: "+port);
});

app.get('/', (reg, res) =>{
    // res.redirect(301,'https://google.com');
    res.send("welcome to your node server");
})

app.post('/login',async (req,res)=>{
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password; //we need to hash the password the user gave us

    const redisPassword = await redisClient.hGet("hashedpasswords", userName);
    console.log("password for "+userName + redisPassword);

    if (redisPassword!=null && password===redisPassword) {
    //this happens if the password is correct
    res.send('Welcome, $(userName)!');
    } else {
    //this happens if the password is not correct
    res.status(401);//unauthorized
    res.send("Incorrect password");
}

});