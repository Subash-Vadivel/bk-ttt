const db = require('../db');
const Random=require('../Assets/Random');
exports.newUser=async(req,res)=>{
    try
    {
     const u=Random.generateRandomNumber;
     console.log(u);
     res.json(
        {
            status:"success"
        }
     )
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