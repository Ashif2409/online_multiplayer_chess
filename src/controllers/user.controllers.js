const {User} = require("../db/index");
const initializeSocket=require('../socket');

const registerUser=async(req,res)=>{
    const {email,name}=req.body;
    try {
        const existingUser=await User.findOne({email});
        if(!existingUser){
            const user= await User.create({
                email,
                name
            })
            const token=user.generateToken();
            return res.status(201).send(user);
        }else{
            existingUser.generateToken();
            existingUser.save();
            return res.status(200).send(existingUser);
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({ error: 'Something went wrong' });
    }
}

const playGame= async(req,res)=>{
    const user=req.user;
    try {
        initializeSocket()
        return res.status(200).json({message:"Web socket initialize"});
    } catch (error) {
        return res.status(500).json({message:"Error initializing web socket"});
    }
}
module.exports={
    registerUser,
    playGame
}