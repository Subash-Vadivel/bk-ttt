const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
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
        type:Boolean,
        require:true,
        default:true
    },
    player2status:{
        type:Boolean,
        require:true,
        deafult:false
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