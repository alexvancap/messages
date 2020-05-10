const alerts = require('./../controllers/alerts.controller')

module.exports = (socket) => {
    socket
        .on('get-alerts', () => {
            alerts.getAlerts(socket)
        })
}