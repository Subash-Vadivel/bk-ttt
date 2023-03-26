const express=require('express');
const app=express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(
    cors(
        {
            origin:"*",
        }
    )
  );
  app.use(cookieParser());
const Auth=require('./Routes/Auth')
require('./db');
app.use('/auth',Auth)
app.get('/', async(req, res) => {
    console.log("called")
    res.json({res:'Hello World!'})
  })
  
app.listen(9000,()=>{
    console.log("Listening...");
})