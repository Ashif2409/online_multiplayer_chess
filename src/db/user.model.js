const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    rating:{
        type: Number,
        default:1200
    },
    token:{
        type: String,
    }
});
userSchema.methods.generateToken=function(){
    token= jwt.sign({id:this._id,name:this.name,email:this.email},'xyz',{expiresIn:'1d'});
    this.token= token;
    return this.token;
}

const User=new mongoose.model('User',userSchema);
module.exports=User