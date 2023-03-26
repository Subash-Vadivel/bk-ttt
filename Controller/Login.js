const db = require('../db');
const Random=require('../Assets/Random');
const User=require("../Models/User");
exports.newUser=async(req,res)=>{
    try
    {
        var ch=99;
        while(true && ch>0)
    {
     const u=Random.generateRandomNumber();
     const uid="#player:"+u;
     const q=await User.find({username:uid});
     if(q.length===0)
     {
        const newUser=new User({
            username:uid,
            password:"password"
        })
        const result=await newUser.save();

        res.json(
            {
                status:"success",
                uid:uid
            }
         )
         return;
     }
     else
     {
        ch--;
     }
    }
    res.json(
        {
            status:"something Went wrong"
        }
     )
     return;
    }
    catch(err)
    {
        res.json({
            status: "error",
            data: {
                message: "Server Error",
                err: err.message
            }
        });
    }
}