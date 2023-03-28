const express=require('express');
const app=express();
const cors = require('cors');
const bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(
    cors(
        {
            origin:"*",
        }
    )
  );
const Auth=require('./Routes/Auth')
const Game=require("./Routes/Game");
require('./db');
app.use('/auth',Auth);
app.use('/game',Game);
app.get('/', async(req, res) => {
    console.log("called")
    res.json({res:'Hello World!'})
  })
  
app.listen(9000,()=>{
    console.log("Listening...");
})