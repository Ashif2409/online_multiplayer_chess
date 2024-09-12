const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    rating:{
        type: Number,
        default:1200
    }
})

const User=new mongoose.model('User',userSchema);
module.exports=User