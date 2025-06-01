const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
const { Server } = require('socket.io');
const Actions = require('./src/Actions');
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
    next();
});

//user-socket mapping
const userSocketMap = new Map();
function getAllConnectedClients(roomId) {
    // console.log(13,Array.from(io.sockets.adapter.rooms.get(roomId) || [])); -- returns a;; roomId
    // console.log(14,userSocketMap);
    //Map
    return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketId) => {
        return {
            socketId,
            userName: userSocketMap.get(socketId) || 'Anonymous',
        };
    });
}

io.on('connection', (socket) => {
    socket.on(Actions.JOIN, ({ roomId, userName }) => {
        userSocketMap.set(socket.id, userName);
        socket.join(roomId);
        //all clients in the room
        const clients = getAllConnectedClients(roomId);
        // console.log({ clients });
        //notify all clients in the room
        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(Actions.JOINED, {
                clients,
                userName,
                socketId: socket.id,
            });
        });
    });

    socket.on(Actions.CODE_CHANGE, ({ code, roomId }) => {
        // console.log('Server Code change received:', code);
        socket.in(roomId).emit(Actions.CODE_CHANGE, {code});
    });

    socket.on(Actions.CODE_SYNC, ({ socketId, code }) => {
        // console.log('Syncing code to:', socketId);
        io.to(socketId).emit(Actions.CODE_CHANGE, { code });
    });


    socket.on('disconnecting', () => {
        // console.log('User is disconnecting:', socket.id);
        const rooms = Array.from(socket.rooms);
        rooms.forEach((roomId) => {
            socket.in(roomId).emit(Actions.DISCONNECTED, {
                socketId: socket.id,
                userName: userSocketMap.get(socket.id),
            });
        });
        userSocketMap.delete(socket.id);
        socket.leave();
    });

});


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});