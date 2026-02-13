import { sendChatService } from "../services/chat.service.js";

export const registerSocketHandlers=(io)=>{
    const onlineUsers=new Map();

    io.on("connection",(socket)=>{
        console.log("user connected",socket.id);
        
        socket.on("user-online",(userId)=>{
            onlineUsers.set(userId,socket.id);
            console.log("user online",onlineUsers);
        });

        socket.on("send-message", async (data) => {
            try {
                const { senderId, receiverId, message } = data;
                if (!senderId || !receiverId || !message) {
                    return;
                }
                const chat = await sendChatService({
                    senderId,
                    receiverId,
                    message
                });

                const receiverSocketId = onlineUsers.get(receiverId);
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receive-message", {
                        senderId,
                        receiverId,
                        message
                    });
                }

                socket.emit("message-sent", {
                    senderId,
                    receiverId,
                    message
                });
            } catch (error) {
                console.log(error);
            }
        });

        socket.on("disconnect",()=>{
            for(let [userId,socketId] of onlineUsers.entries()){
                if(socketId===socket.id){
                    onlineUsers.delete(userId);
                    break;
                }
            }
            console.log("user disconnected",socket.id);
        })

        
    })
}