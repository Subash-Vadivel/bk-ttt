const db = require('../db');
const Lobby=require("../Models/Lobby");
const Game=require('../Models/Game');
exports.lobby=async(req,res)=>{
    try
    {
       const {username}=req.body;
       console.log(username);
       const already=await Lobby.find({username});
       if(already.length===0)
       {
       
       const q=await Lobby.find();

       if(q.length===0)
       {
           const newLobbyEntry=new Lobby({
            username
           });
           const resu=await newLobbyEntry.save();
           res.json({
            status:"waiting for opponent"
           })
           return;
       }
       else
       {
        const matched=await Lobby.findOne();
        const GameSession=new Game({
            player1Id:username,
            player2Id:matched.username,
            player1symbol:"X",
            player2symbol:"O"
        });
        const successmatch=await GameSession.save();
        const del=await Lobby.deleteOne({username});
        res.json({
            status:"success",
            details:successmatch
           })
           return;
       }
    }else
    {
        
        console.log(already);
        res.json({
            status:"waiting for opponent"
           })
           return;
          
    }
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
exports.matched=async(req,res)=>{
    try
    {
        const {username}=req.body;
        const matched=await Game.find({
            "$or": [{
                "player1Id":username
            }, {
                "player2Id":username
            }]
        });
        if(matched.length===0)
        {
            res.json({
                status:"waiting for opponent"
               })
               return;

        }
        else
        {
            res.json({
                status:"success",
                details:matched
               })

        }

    }
    catch(err)
    {
        res.json({
            status:"error",
            data:{
                message:"Server Error",
                err:err.message
            }
        })
    }
}

