module.exports = (socket, io) => {
    const config = require('./../config')
    const users = require('./../controllers/users.controller')

    socket.on('login', (socket) => {
        users.login(socket, io)
    });
}