const db = require('../db');
const Lobby=require("../Models/Lobby");
const Game=require('../Models/Game');
exports.lobby=async(req,res)=>{
    try
    {
       const {username}=req.body;
       console.log(username);
       const resumeGame=await Game.find({
        "$or": [{
            "player1Id":username
        }, {
            "player2Id":username
        }]
    });
    if(resumeGame.length!=0)
    {
        res.json({
            status:"success",
            details:resumeGame
           })
       return;
    }
    else
    {
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
        const del=await Lobby.deleteOne({username:matched.username});
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
exports.cancel=async(req,res)=>{
    try
    {
        const {username}=req.body;
        const del=await Lobby.deleteOne({username});
        res.json({
            status:"success",
           })
           return;

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

exports.update=async(req,res)=>{
    try
    {
        const {tid,board,username}=req.body;
        const u=await Game.updateOne({_id:tid},{$set:{board}});
        if(u.player1Id===username)
        {
            const u1=await Game.updateOne({_id:tid},{$set:{board,player1status:false,player2status:true}});
           
        }
        else
        {
            const u2=await Game.updateOne({_id:tid},{$set:{board,player1status:true,player2status:false}});
         
        }
        const result=await Game.find({_id:tid});
        res.json({
            status:"success",
            details:result
           })
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
exports.updateperiod=async(req,res)=>{
    try
    {
        const {table}=req.body;
       
        const result=await Game.find({_id:table});
        res.json({
            status:"success",
            details:result
           })
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

exports.quit=async(req,res)=>{
    try{

const {table,username}=req.body;
       
        const result=await Game.updateOne({_id:table},{$set:{result:"forbiden",losser:username}});
        res.json({
            status:"success",
            details:result
           })
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