// const express = require('express')
// const app = express()
// const server = require('http').createServer(app)
// const io = require('socket')
//
// // const {Server} = require('socket')
// //
// // const io = new Server(server);
//
//
// const server = http.createServer(app);
// const io = require('socket');
// const socketServer = io(server, {
//     cors: {
//         origin: "*",
//     }
// });
//
// socketServer.on("connection", (socket) => {
//     console.log('User successfully added')
//     // send a message to the client
//     // socket.send('Hello world');
//     socket.on('disconnect', (data) => {
//         console.log('User closed connection...')
//     })
//     // // receive a message from the client
//     // socket.on("hello from client", (...args) => {
//     //     // ...
//     // });
// });
// server.listen(3002, () => {
//     console.log(`Streaming service is running on http://localhost:${PORT}`);
// });
