const express=require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');

const { createHash } = require('node:crypto');
const fs = require('fs');
const https = require('https')

const app = express();

const port = 3000

const redisClient = Redis.createClient({url:'redis://127.0.0.1:6379'});

app.use(bodyParser.json()); //allow JSON (Javascript Object notation) requests

https.createServer({
    key: fs.readFileSync('privkey1.pem'), //This is a private key
    cert: fs.readFileSync('cert1.pem'),
    chain: fs.readFileSync('fullchain1.pem') //This is a self-signed certification
  }, app).listen(3000, () => {
    console.log('Listening...')
  });
  
//app.listen(port, ()=>{
    //redisClient.connect(); //the API server is trying to connect with Redis
    //console.log("listening on port: "+port); });

app.get('/', (reg, res)=>{
    // res.redirect(301,'https://google.com');
    res.send("welcome to your node server");
});

app.post('/login',async (req,res)=>{
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password; //we need to hash the password the user gave us
    const hashedPassword = password==null ? null : createHash('sha3-256').update(password).digest('hex');

    const redisPassword = password==null ? null : await redisClient.hGet('hashedpasswords',userName);
    
    console.log("Hashed Password: "+hashedPassword);
    
    //console.log("password for "+userName + redisPassword);

    if (password!=null && hashedPassword===redisPassword) {
    //this happens if the password is correct
    res.send("Welcome, "+userName);
    } else {
    //this happens if the password is not correct
    res.status(401);//unauthorized
    res.send("Incorrect password");
}

});