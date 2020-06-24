const users = require('./../controllers/users.controller') // users controller

module.exports = (socket) => {
    socket
        .on('get-user-data', () => users.findById(socket))
        .on('update-bio', (newBio) => users.updateBio(socket, newBio))
        .on('get-bio', () => users.getBio(socket))
}