const express = require('express');
const app = express();
const http = require('http');
const port = process.env.PORT || 5000;
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
});




server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});