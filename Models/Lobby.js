const mongoose=require('mongoose');
const LobbyList=new mongoose.create(
    {
        playerId:{
            type:String,
            require:true,
            unique:true
        }
    }
)
module.exports = mongoose.model("Lobby", LobbyList);