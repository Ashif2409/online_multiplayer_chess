const mongoose=require('mongoose');

const moveSchema=new mongoose.Schema({
    from:{
        type:String,
        required: true,
    },
    to:{
        type:String,
        required: true
    }
})

const gameSchema=new mongoose.Schema({
    userA:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    userB:{
        type: mongoose.SchemaType.ObjectId,
        ref:'User'
    },
    moves:{
        type:[moveSchema]
    },
    startTime:{
        type: Date,
        default: Date.now()
    }
});

const Game=mongoose.model('Game',gameSchema);
module.exports=Game