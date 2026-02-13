module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log("New User joined just now")
        // LISTEN: When this specific user sends a 'message'
        socket.on("username",(data)=>{
            socket.user=data
        })
        socket.on('chat-message', (data) => {
            console.log('New message received:', data);
            data_to_send={
                user:socket.user,
                msg:data,
                id:socket.id
            }
            
            //optimize user so that null  doesnot come.


            // BROADCAST: Send this message to EVERYONE connected
            // 'io.emit' talks to every single person in the chat room
            io.emit('message-to-all',data_to_send);
        });

    });
};