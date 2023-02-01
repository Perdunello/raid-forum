const sockets = []

module.exports = (socket) => {
    const registerMessageHandlers = require('../socket/handlers/messageHandlers')

    console.log(`User ${socket.id} connected`)
    sockets.push(socket)

    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`)
    })

    registerMessageHandlers(socket, sockets)
}
