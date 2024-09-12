const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const GameManager=require('./GameManager')

const app = express();
const port = 1234; 

const server = http.createServer(app);

//initializing websocket function
const initializeSocket=()=>{

  const io = socketIo(server, {
    cors: {
      origin: '*', 
    methods: ['GET', 'POST'] 
  }
});
const gameManager=new GameManager();

io.on('connection', (socket) => {
  socket.emit('xyz','Hello there')
  gameManager.addUser(socket);
  socket.on('disconnect',()=>gameManager.removeUser(socket));
});

server.listen(port, () => {
  console.log(`WebSocket server is running on http://localhost:${port}`);
});
}
module.exports=initializeSocket;
