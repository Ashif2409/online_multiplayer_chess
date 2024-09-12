const Chess = require('chess.js').Chess;

class Game{
    player1;
    player2;
    boards;
    startTime;
    moveCnt=0;
    constructor(p1,p2){
        this.player1=p1;
        this.player2=p2;
        this.boards=new Chess();
        this.startTime=new Date();
        this.player1.emit('gamestarted',JSON.stringify({
            type:'init',
            payload:{
                color:'white'
            }
        }));
        this.player2.emit('gamestarted',JSON.stringify({
            type:'init',
            payload:{
                color:'black'
            }
        }));
    }
    makeMove(socket, move) {
        // Check whose turn it is
        if ((this.moveCnt % 2 === 0 && socket !== this.player1) || 
            (this.moveCnt % 2 === 1 && socket !== this.player2)) {
            socket.emit('notYourTurn', JSON.stringify({
                type: 'notYourTurn',
                payload: {
                    message: 'Not your turn'
                }
            }));
            return;
        }
    
        try {
            this.boards.move(move);
        } catch (e) {
            socket.emit('wrongMove', JSON.stringify({
                type: 'wrongMove',
                payload: {
                    message: 'Move is not allowed'
                }
            }));
            return;
        }
    
        if (this.boards.isGameOver()) {
            const winner = this.boards.turn() === 'w' ? 'black' : 'white';
            this.player1.emit('gameOver', JSON.stringify({
                type: 'gameOver',
                payload: {
                    winner: winner
                }
            }));
            this.player2.emit('gameOver', JSON.stringify({
                type: 'gameOver',
                payload: {
                    winner: winner
                }
            }));
            return;
        }
    
        if (this.moveCnt % 2 === 0) {
            this.player1.emit('move', JSON.stringify({
                type: 'move',
                move: move
            }));
        } else {
            this.player2.emit('move', JSON.stringify({
                type: 'move',
                move: move
            }));
        }
    
        this.moveCnt++;
    }    

}
module.exports = Game