const messages = require('./../controllers/messages.controller')

module.exports = (socket) => {
    socket.on('send-message', (query) => messages.sendMessage(query))
}