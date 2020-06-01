module.exports = (socket, connectedUsers, io) => {
    require('./friendship.sockets')(socket)
    require('./user.sockets')(socket)
    require('./alert.sockets')(socket, connectedUsers, io)
    require('./conversation.sockets')(socket)
    require('./message.sockets')(socket)
}