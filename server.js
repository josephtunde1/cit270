const express=require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const app = express();
const port = 3000
const redisClient = Redis.createclient();

app.use(bodyParser.json()); //allow JSON (Javascript Object notation) requests

app.listen(port, ()=>{
    redisClient.connect();
    
    console.log("listening on port: "+port);
});

app.get('/', (reg, res) =>{
    // res.redirect(301,'https://google.com');
    res.send("welcome to your node server");
})

app.post('/login',(req,res)=>{
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;
    if (password==="Perola95!"){
    //this happens if the password is correct
    res.send("Welcome "+userName);
    } else {
    //this happens if the password is not correct
    res.status(401);//unauthorized
    res.send("Incorrect password");
}

});