const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    player1Id:{
        type:String,
            require:true,
            unique:true
    },
    player2Id:{
        type:String,
            require:true,
            unique:true
    },
    player1symbol:{
        type:String,
        require:true
    },
    player2symbol:{
        type:String,
        require:true
    },
    board: {
        type: [String],
        required: true,
        default: Array(9).fill(null)
      },
      player1status:{
        type:String,
        require:true
    },
    player2status:{
        type:String,
        require:true
    },
    result:{
        type:String,
        require:true,
        default:"onLive"
    }

    
})


module.exports = mongoose.model("Game", gameSchema);