const express=require('express');
const bodyparser = require('body-parser');

const app = express();

const port = 3000

app.use(bodyParser.json()); //allow JSON (Javascript Object notation) requests

app.listen(port,()=>{
    console.log("listening on port: "+port);
});

app.get('/', (reg, res) =>{
    // res.redirect(301,'https://google.com');
    res.send("welcome to your node server");
})

app.post('/login',(req,res)=>{
    const loginBody = req.body;
    const userName = loginBody.userName;
    res.send("Welcome "+userName);
});