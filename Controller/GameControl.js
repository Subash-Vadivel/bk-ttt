const db = require('../db');
const Lobby=require("../Models/Lobby");
const Game=require('../Models/Game');
const Evaluate=require("../Assets/Evaluate");
const Board=require("../Models/Board");
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
        const p=await Game.findOne({_id:tid});
        if(p.player1Id===username)
        {
            const boo=await Evaluate.winner(board);
            
            const isBoardFilled = await Evaluate.check(board);

           
            if(boo)
            {
                const u1=await Game.updateOne({_id:tid},{$set:{board,player1status:false,player2status:true,winner:username,losser:p.player2Id,result:"completed"}});
                const result=await Game.find({_id:tid});
                
            res.json({
                status:"winner",
                details:result
               })

            }
            else if(isBoardFilled)
            {
                const u1=await Game.updateOne({_id:tid},{$set:{board,player1status:false,player2status:true,result:"completed",draw:true}});
                const result=await Game.find({_id:tid});     
            res.json({
                status:"Draw",
                details:result
               })
            }
            else
            {
            const u1=await Game.updateOne({_id:tid},{$set:{board,player1status:false,player2status:true}});
            const result=await Game.find({_id:tid});
            
        res.json({
            status:"success",
            details:result
           })
        }
        }
        else
        {
            const boo=await Evaluate.winner(board);
            const isBoardFilled = await Evaluate.check(board);
           
           
            if(boo)
            {
                
            const u2=await Game.updateOne({_id:tid},{$set:{board,player1status:true,player2status:false,winner:username,losser:p.player1Id,result:"completed"}});
            const result=await Game.find({_id:tid});
        
               res.json({
            status:"winner",
            details:result
           })

            }
            else if(isBoardFilled)
            {
                const u2=await Game.updateOne({_id:tid},{$set:{board,player1status:true,player2status:false,result:"completed",draw:true}});
                const result=await Game.find({_id:tid});
            
                   res.json({
                status:"draw",
                details:result
               })
            }
            else
            {
            const u2=await Game.updateOne({_id:tid},{$set:{board,player1status:true,player2status:false}});
            const result=await Game.find({_id:tid});
        
        res.json({
            status:"success",
            details:result
           })
        }
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
exports.updateperiod=async(req,res)=>{
    try
    {
        const {username}=req.body;


        const resumeGame=await Game.find({
            "$or": [{
                "player1Id":username
            }, {
                "player2Id":username
            }]
        });
        res.json({
            status:"success",
            details:resumeGame
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
const resumeGame=await Game.findOne({
    "$or": [{
        "player1Id":username
    }, {
        "player2Id":username
    }]
});
var a="";
if(resumeGame.player1Id===username)
{
    a=resumeGame.player2Id;
}
else
{
    a=resumeGame.player1Id;
}
        const result=await Game.updateOne({_id:table},{$set:{result:"completed",losser:username,winner:a}});
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
exports.remove = async (req, res) => {
    try {
      const { username } = req.body;
  
      const resumeGame = await Game.findOne({
        $or: [
          { player1Id: username },
          { player2Id: username }
        ]
      });
  
      const gameDeletionResult = await Game.deleteOne({
        $or: [
          { player1Id: username },
          { player2Id: username }
        ]
      });
      if (!resumeGame) {
        // User not found in any game
        return res.json({
          status: "error",
          data: {
            message: "User not found in any game"
          }
        });
      }
  
      const newStat = await new Board({
        player1Id: resumeGame.player1Id,
        player2Id: resumeGame.player2Id,
        result: resumeGame.result,
        winner: resumeGame.winner,
        losser: resumeGame.losser
      }).save();
  
    
  
      res.json({
        status: "success",
        data: {
          message: "User removed from game"
        }
      });
    } catch (err) {
      console.error(err);
      res.json({
        status: "error",
        data: {
          message: "Failed to remove user from game",
          error: err.message
        }
      });
    }
  };
  