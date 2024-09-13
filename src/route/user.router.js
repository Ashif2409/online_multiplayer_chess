const express=require('express');
const router = express.Router();
const {decodeToken} = require('../middleware/auth.middleware');
const {registerUser,
    playGame
}=require('../controllers/user.controllers')

router.post('/',registerUser);
router.post('/play-game',decodeToken,playGame);


module.exports=router