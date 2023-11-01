const PG = require("pg");

require('dotenv').config();
const client = new PG.Client({
    host: process.env.host,
    user: process.env.user,
    port: process.env.port,
    password: process.env.password,
    database:process.env.database,
});

client.connect();

const activeUsers = new Map();
const uniqueUsers = new Set();
const JWT = require('jsonwebtoken');



async function SocketEstablisher(SERVER){

    const SOCKETIO = require("socket.io");
    const io = SOCKETIO(SERVER, {
        cors: {
            origin: "https://localhost",
            methods: ["GET", "POST"]
        }
    });
    
    // const { sendToRMQueue } = require('./services/sendToRMQueue');
    let connectedUsers = 0;
    let disconnectedUsers = 0;
    io.on("connection", (socket) => {
           let userName;
        let senderEmail;
    
        socket.on('setUsername', (data) => {
            try {
                userName = data.userName;
                const decodedToken = JWT.verify(data.authorization, 'your_secret_key');
                senderEmail = decodedToken.email;

                // Check if the user is already in uniqueUsers Set
                if (!uniqueUsers.has(senderEmail)) {
                    uniqueUsers.add(senderEmail);

                    activeUsers.set(senderEmail, {
                        socketId: socket.id,
                        name: data.userName,
                    });

                    io.emit("activeUsersList", Array.from(activeUsers));
                    connectedUsers++;
                    io.emit("userCount", connectedUsers);
                }else{
                    io.emit("activeUsersList", Array.from(activeUsers));
                    io.emit("userCount", connectedUsers);
                }
            } catch (e) {
                io.emit("session-expired", null);
            }
        });
        socket.on("disconnect", () => {
            const USER = Array.from(activeUsers).find(([_, userData]) => userData.socketId === socket.id);

            if (USER) {
                const email = USER[0];
                activeUsers.delete(email);
                uniqueUsers.delete(email);
                disconnectedUsers++;
                connectedUsers--;
                io.emit("userCount", connectedUsers);
                io.emit("activeUsersList", Array.from(activeUsers.values()).map(user => user.name));
            }

        });
        socket.on("message", (message) => {
            if (message.trim() !== "") {
                const user = Array.from(activeUsers).find(([_, userData]) => userData.socketId === socket.id);
                if (user) {
                    const messageWithUsername = `${userName}: ${message}`;
                    io.emit("message", messageWithUsername);
                }
            }
        })
    
        socket.on("privateMessage", async function (info) {
            var receiverEmail = info.receiverEmail
            var message = info.message
            const user = activeUsers.get(receiverEmail)
            if (message.trim() !== "") {
                if (user) {
                    const messageWithUsername = `${message}`;
                    const currentTime = new Date().toISOString();
                    const query = {
                        text: "INSERT INTO chats (sender, receiver, message, time) VALUES ($1, $2, $3, $4)",
                        values: [senderEmail, receiverEmail, messageWithUsername, currentTime],
                    };
                    try {
                        const result = await client.query(query);
                      } catch (error) {
                        console.error("Error inserting data:", error);
                      }
                    io.to(user.socketId).emit("privateMessage", { messageWithUsername, receiverEmail });
                }
            }
        });
    
        
        socket.on("loadChats", (receiverEmail) => {
            const query = {
                text: `
                    SELECT *
                    FROM chats
                    WHERE (sender = $1 AND receiver = $2)
                    OR (sender = $2 AND receiver = $1)
                    ORDER BY time ASC
                `,
                values: [senderEmail, receiverEmail],
            };
    
            client.query(query)
                .then(result => {
                    const chats = result.rows;
                    socket.emit("chatsLoaded", chats);
                })
                .catch(error => {
                    // console.error("Error fetching chat records:", error);
                });
        });
    
        socket.on("updateNotification", (data) => {
    
            const currentTime = new Date().toISOString();
            const decodedToken = JWT.verify(data.authToken, 'your_secret_key');
            senderEmail = decodedToken.email;
            if(data.event == "like"){
                const query = {
                    text: "INSERT INTO notifications (sender, receiver, event, time, status,postid) VALUES ($1, $2, $3, $4,$5,$6) RETURNING *",
                    values: [senderEmail, data.likedPostEmail, "like", currentTime, "unread", data.postId],
                };
        
                client.query(query)
                    .then(async function (result) {
                        const user = await activeUsers.get(result.rows[0].receiver)
                        const sender = result.rows[0].sender;
                        const emailParts = sender.split('@');
                        const username = emailParts[0];
                        // sendToRMQueue(result.rows);
                        io.to(user.socketId).emit("notification-received", { username });       
                    })
                    .catch(error => {
                        // console.error("Error inserting notification:", error);
                    })
            }else{
                const deleteQuery = {
                    text: "DELETE FROM notifications WHERE sender = $1 AND receiver = $2 AND postid = $3",
                    values: [senderEmail, data.likedPostEmail, data.postId],
                };
                client.query(deleteQuery);
            }

        })
        
        socket.on("addComment", (data)=>{
            const currentTime = new Date().toISOString();
            const decodedToken = JWT.verify(data.authToken, 'your_secret_key');
            senderEmail = decodedToken.email;
            const query = {
                text: "INSERT INTO commentTable (sender, receiver,time,postid,value) VALUES ($1, $2, $3, $4,$5) RETURNING *",
                values: [senderEmail, data.likedPostEmail, currentTime,  data.postId,data.inputValue],
            };
    
            client.query(query)
                .then(async function (result) {
                    socket.emit("displayComment",result.rows[0]);
                })
                .catch(error => {
                   socket.emit("displayComment","Error adding comment");
                })

        })
   
    });
    
}

module.exports = {
    SocketEstablisher
}