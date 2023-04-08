const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    player1Id:{
        type:String,
            require:true,
    },
    player2Id:{
        type:String,
            require:true,
    },
    result:{
        type:String,
        require:true,
        default:"onLive"
    },
     losser:{
        type:String,
    },
    winner:{
        type:String
    }

    
})


module.exports = mongoose.model("Board", boardSchema);