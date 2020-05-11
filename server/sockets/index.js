module.exports = (socket, connectedUsers) => {
    require('./friendship.sockets')(socket)
    require('./user.sockets')(socket)
    require('./alert.sockets')(socket, connectedUsers)
}