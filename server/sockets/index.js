module.exports = (socket, io) => {
    require('./friendship.sockets')(socket)
    require('./user.sockets')(socket)
    require('./alert.sockets')(socket, io)
    require('./conversation.sockets')(socket, io)
    require('./message.sockets')(socket, io)
    require('./interest.sockets')(socket)

    socket
        .on('join-room', (convId) => socket.join(`conv ${convId}`))
        .on('leave-room', (convId) => socket.leave(`conv ${convId}`))
}