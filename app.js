const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const authRouter = require('./routes/authRoutes');
const chatRouter = require('./routes/chatRoutes');
const friendRouter = require('./routes/friendRoutes');
const profileRouter = require('./routes/profileRoutes');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    ws.on('message', message => {
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
