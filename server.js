require('dotenv').config();
const express = require('express');
const { Server } = require('socket.io');
const http = require('http');//why http?
const mongoose = require('mongoose');
const userRoutes=require("./src/routes/userRoutes")

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json())
app.use("/",userRoutes)


// Database Connection
const dbURI = process.env.URL;
mongoose.connect(dbURI)
    .then(() => console.log('✅ Database is plugged in and ready!'))
    .catch((err) => console.log('❌ Database connection failed:', err));


app.use(express.static('public'));

const registerChatHandlers = require('./src/sockets/chat');
registerChatHandlers(io);


const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Pro Server running on http://localhost:${PORT}`);
});

