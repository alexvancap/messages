const alerts = require('./../controllers/alerts.controller');

module.exports = (socket, io) => {
    socket
        .on('get-alerts', () => {
            alerts.getAlerts(socket)
        })
        .on('add-alert', (req) => {
            alerts.addAlert(socket, req, io)
        })
        .on('remove-alert', (req) => {
            alerts.removeAlert(socket, req.id)
        });
};