module.exports = (socket, connectedUsers, io) => {
    socket.on('join-room', (conversationId) => socket.join('conv ' + conversationId))
    require('./friendship.sockets')(socket)
    require('./user.sockets')(socket)
    require('./alert.sockets')(socket, connectedUsers, io)
    require('./conversation.sockets')(socket)
    require('./message.sockets')(socket, connectedUsers, io)
}