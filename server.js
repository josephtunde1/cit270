const express= require('express');
const bodyParser = require('body-parser')
const Redis = require ('redis');
const app=express();
const { createHash } =  require('node:crypto')
const fs = require('fs')
const https = require('https')

// const app = express();
// const port = 3000;
//const redisClient = Redis.createClient({url:'redis://default:redis-stedi-tunde:6379'});
//app.use(bodyParser.json()); //allow JSON (Javascript Object notation) requests

const port = 3000;
const redisClient = Redis.createClient({
    socket: {
        host: 'redis-stedi-tunde',
        port: '6379' 
        }
    });


app.listen(port, ()=>{
  redisClient.connect();
  console.log("Listening on port..: " + port);
});

// https.createServer({
//     //key: fs.readFileSync('server.key'),
//     //cert: fs.readFileSync('server.cert'),
//     key: fs.readFileSync('/etc/letsencrypt/archive/josephtunde.cit270.com/privkey1.pem'), //This is a private key
//     cert: fs.readFileSync('/etc/letsencrypt/archive/josephtunde.cit270.com/cert1.pem'), //This is a signed certificate
//     ca: fs.readFileSync('/etc/letsencrypt/archive/josephtunde.cit270.com/chain1.pem') //This is the certificate chain
//   }, app).listen(443, () => {
//     redisClient.connect(); 
//     console.log('Listening...')
//   });
  
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
    console.log("Hashed Password: "+hashedPassword);
    const redisPassword = password==null ? null : await redisClient.hGet('hashedpasswords',userName);
    console.log("Passord for " + userName + " " + redisPassword);
    
    
    //console.log("password for "+userName + redisPassword);

    if (password!=null && hashedPassword===redisPassword) {
    //this happens if the password is correct
    res.send("Welcome," +userName);
    } else {
    //this happens if the password is not correct
    res.status(401);//unauthorized
    res.send("Incorrect password");
}

});