const express = require('express')
const heroesRouter = require('./routes/heroes.routes')
const loginisationRouter = require('./routes/loginisation.routes')
const socketRouter = require('./socket/socket')
const fileUpload =require('express-fileupload')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
require('dotenv').config();
const bodyParser = require('body-parser');
const forumRouter = require("./routes/forum.routes");
const artifactsRouter = require("./routes/artifacts.routes");

app.use(fileUpload({}))
app.use(bodyParser.json());
app.use(cors())
app.use('/champions', heroesRouter)
app.use('/artifacts', artifactsRouter)
app.use('/loginisation', loginisationRouter)
app.use('/forum', forumRouter)
app.use(express.json())

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
})

// const onConnection = (socket) => {
//     console.log('User connected')
//     const {roomId} = socket.handshake.query
//
//     socket.roomId = roomId
//     socket.join(roomId)
//     socket.on('disconnect', () => {
//         console.log('User disconnected')
//         socket.leave(roomId)
//     })
// }

// io.on('connection', onConnection)
io.of('/forum').on('connection', socketRouter)

http.listen(PORT, () => {
    console.log(`Server is starting on port ${PORT}`)
});
// const http = require("http").createServer(app);
// const io = require('socket')(http, {
//     cors: {
//         origin: "*"
//     }
// })
// io.of('/forum').on('connection', forumRouter)
// io.on('connection', forumRouter)
//
// http.listen(PORT, () => console.log(`Server starting on port ${PORT}`))


// const server = app.listen(PORT, () => {
//     console.log(`Server starting on port ${PORT}`)
// })
// const io = require('socket')(server)
//
// app.set('socket', io)


// io.of('/forum',).on('connection', socket => {
//     console.log('User is added')
//     socket.on('disconnect', () => {
//         console.log('User is logged out')
//     })
// })

// io.on('connect', (socket) => {
//     console.log('User was added')
//     socket.on('disconnect', () => {
//         console.log('User was disconnected')
//     })
// })

// io.on('connection',forumRouter)
// io.on('connection', socket => {
//     console.log('User is added')
//     socket.on('disconnect', () => {
//         console.log('User is logged out')
//     })
// })
// app.use((req, res, next) => {
//     req.io = io
//     return next()
// })
// app.use('/forum', forumRouter)


// app.io = require('socket')(http)
// const routes = require('./routes/forum.routes')(app.io)

// io.of('/forum').on('connection', forumRouter)
// io.on('connection', forumRouter)
// app.use('/forum', forumRouter)


// server.on('error', onError);
// server.on('listening', onListening);

// app.listen(PORT, () => {
//     console.log(`Server starting on port ${PORT}`)
// })

// const {Server} = require('socket')
// // import { Server } from "socket";
//
// const io = new Server(server);
//
// io.on("connection", (socket) => {
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

// const server = http.createServer(app);
// const io = require('socket');
// const socketServer = io(server, {
//     cors: {
//         origin: "*",
//     }
// });
// server.listen(PORT, () => {
//     console.log(`Streaming service is running on http://localhost:${PORT}`);
// });

// module.exports = socketServer
