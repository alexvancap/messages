const users = require('./../controllers/users.controller') // users controller

module.exports = (socket) => {
    socket
        .on('get-alerts', (socket, alert) => {
            users.getAlerts(socket, alert)
        })
}