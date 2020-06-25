const Alert = require('./../models/alert.model');
const ConnectedUser = require('../models/connectedUser.model');

exports.getAlerts = (socket) => {
    Alert.getAlerts(socket.decoded_token.id, (err, data) => {
        if (err) socket.emit('error', { message: 'error while trying to get your alerts' });
        else socket.emit('get-alerts', data);
    });
};

exports.removeAlert = (socket, alertId) => {
    Alert.removeAlert(alertId, (err) => {
        if (err) socket.emit('error', { message: 'error while trying to remvove the previous alert, so here is a new one...' });
        else socket.emit('remove-alert', alertId);
    });
};

exports.addAlert = (socket, alert , io) => {
    Alert.create(alert, (err) => {
        if (err) return socket.emit('error', { message: 'error while trying to create an alert, so here is another one' });
        Alert.getAlerts(socket.decoded_token.id, (err, res) => {
            const user = ConnectedUser.get(alert.userId);
            if(user[0] === undefined) return;
            return io.to(user[0].id).emit('get-alerts', res);
        });
    });
};