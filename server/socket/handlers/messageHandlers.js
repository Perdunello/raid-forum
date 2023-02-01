const forumController = require('../../controller/forum.controller')

module.exports = (socket, sockets) => {
    const getMessages = () => {
        forumController.getMessages(sockets);
    }

    const addMessage = (messageData) => {
        forumController.addMessage(messageData)
        getMessages()
    }

    socket.on('get-messages', getMessages)
    socket.on('add-message', addMessage)
}