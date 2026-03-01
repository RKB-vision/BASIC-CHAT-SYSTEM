const message=require("../models/message")
const onlineUsers= new Map()


module.exports = (io) => {
    io.on('connection', async (socket) => {

        // LISTEN: When this specific user sends a 'message'
        socket.on("username",(data)=>{
            socket.user=data
            onlineUsers.set(data,socket.id)
            io.emit("online-users",Array.from(onlineUsers.keys()))
        })

        console.log("New User joined just now")
        history=await message.find().sort({timestamp:-1}).limit(20)
        if(history){
            socket.emit("history",history.reverse())
        }


        socket.on('chat-message', async (data) => {
            console.log(`New message received from ${socket.user}:`, data);
            data_to_send={
                user:socket.user,
                msg:data,
                id:socket.id
            }

            msg_to_save=new message({user: socket.user,
                msg:data
            })
            await msg_to_save.save()
         
            //optimize user so that null  doesnot come.

            // BROADCAST: Send this message to EVERYONE connected
            // 'io.emit' talks to every single person in the chat room
            io.emit('message-to-all',data_to_send);
        });
        socket.on("typing",()=>{
            socket.broadcast.emit("typing",socket.user)
        })
        socket.on("stop-typing",()=>{
            socket.broadcast.emit("hide-typing");
        })

        socket.on("disconnect", () => {
        onlineUsers.delete(socket.user);
        io.emit("online-users", Array.from(onlineUsers.keys()));
});
    });
};