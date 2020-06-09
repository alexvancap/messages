const messages = require('./../controllers/messages.controller')

module.exports = (socket, connectedUsers, io) => {
    socket
        .on('send-message', query => messages.sendMessage(query, socket, connectedUsers, io))
        .on('get-messages', query => messages.getByConvID(query, socket))
}