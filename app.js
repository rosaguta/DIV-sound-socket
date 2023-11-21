const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors:{
      origin: "*"
        }
    });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on("joinroom", (room) => {
        socket.join(room)
    })
    // io.socketsJoin("y    eet");
    // Send JavaScript code to the client

    // socket.emit('executeCode', jsCode);
    socket.on("wiebel", (url) => {
        const jscode = `var audio = new Audio('`+url+`'); audio.play(); var audio = null;`;
        socket.to('yeet').emit('executeCode', jscode)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
