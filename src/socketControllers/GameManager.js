const Game=require('./Game')
class GameManager {
    game;
    pendingUser;
    user;
    constructor() {
        this.game=[];
        this.pendingUser=null;
        this.user=null;
    }

    addUser(socket) {
        if (this.pendingUser) {
            this.user = socket;
            this.handler(socket);
            this.handler(this.pendingUser);
        } else {
            this.pendingUser = socket; 
        }
    }

    removeUser(socket) {
        if (this.user === socket) {
            this.user = null; 
        } else if (this.pendingUser === socket) {
            this.pendingUser = null; 
        }
    }

    handler(socket) {
        socket.on('message', (data) => {
            try {
                const msgData = JSON.parse(data.toString());
                if (msgData.type === 'init') {
                    const newGame = new Game(this.pendingUser, this.user);
                    this.game.push(newGame)
                    this.pendingUser = null;
                } else if (msgData.type === 'move') {
                    const game = this.game.find(p => p.player1 === socket || p.player2 === socket);
                    if (game) {
                        game.makeMove(socket, msgData.move);
                    }
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });        
    }
}

module.exports = GameManager