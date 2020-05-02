module.exports = (socket, io) => {
    const users = require('./user.sockets')
    require('./friendship.sockets')(socket, io)
    
}