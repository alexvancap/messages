const alerts = require('./../controllers/alerts.controller')

module.exports = (socket, connectedUsers) => {
    socket
        .on('get-alerts', () => {
            alerts.getAlerts(socket)
        })
        .on('add-alert', (req) => {
            alerts.addAlert(socket, connectedUsers, req)
        })
        .on('remove-alert', (req) => {
            alerts.removeAlert(socket, req.id)
        })
}