module.exports = (socket) => {
    require('./friendship.sockets')(socket)
    // require('./user.sockets')(socket)
    require('./alert.sockets')(socket)
}