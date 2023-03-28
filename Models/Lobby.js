const mongoose=require('mongoose');
const LobbyList=new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            unique:true
        }
    }
)
module.exports = mongoose.model("Lobby", LobbyList);