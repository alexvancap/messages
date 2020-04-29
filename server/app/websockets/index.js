module.exports = io => {
    // require('./user.sockets')(io)
    require('./friendship.sockets')(io)
}