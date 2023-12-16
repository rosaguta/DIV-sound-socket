const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*"
    }
});
connectedUsers = []

io.on('connection', (socket) => {
    // console.log('A user connected');
    socket.on("joinroom", (room, user) => {
        console.log(user + " connected to " + room)
        connectedUsers[room] = connectedUsers[room] || [];
        connectedUsers[room].push(user);
        console.log("Room: "+room+ "\n" +"Userlist:" +connectedUsers[room])
        io.to(room).emit("userjoined", connectedUsers[room] + "\n");

        socket.join(room);
    })
    // Send JavaScript code to the client

    // socket.emit('executeCode', jsCode);
    socket.on("wiebel", (url, room) => {
        // const jscode = `new Audio('`+url+`').play();`;

        console.log("a button was pressed")
        console.log("url:", url)
        console.log("room:", room)
        // console.log("code:", jscode)
        io.to(room).emit('executeCode', url)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
