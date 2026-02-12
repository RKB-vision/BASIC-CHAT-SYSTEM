const express = require('express');
const { Server } = require('socket.io');
const http = require('http');//why http?

const app = express();
const server=http.createServer(app)
const io = new Server(server)

app.use(express.static('public'));

const registerChatHandlers = require('./src/sockets/chat');
registerChatHandlers(io);


const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Pro Server running on http://localhost:${PORT}`);
});

