const mongoose = require('mongoose');

const moveSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true
    }
});

const gameSchema = new mongoose.Schema({
    userA: {
        type: mongoose.Schema.Types.ObjectId, // Corrected here
        ref: 'User'
    },
    userB: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    moves: [moveSchema], 
    startTime: {
        type: Date,
        default: Date.now 
    }
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
