const Alert = require('./../models/alert.model')

exports.getAlerts = (socket, connectedUsers, io) => {
    Alert.getAlerts(socket.decoded_token.id, (err, data) => {
        if (err) socket.emit('error', { message: 'error while trying to get your alerts' })
        else socket.emit('get-alerts', data)
    })
}

exports.removeAlert = (socket, alertId) => {
    Alert.removeAlert(alertId, (err) => {
        if (err) socket.emit('error', { message: 'error while trying to remvove the previous alert, so here is a new one...'})
        else socket.emit('remove-alert', alertId)
    })
}

exports.addAlert = (socket, connectedUsers, alert , io) => {
    Alert.create(alert, (err) => {
        if (err) return socket.emit('error', { message: 'error while trying to create an alert, so here is another one'})
        Alert.getAlerts(socket.decoded_token.id, (err, res) => {
            const user = connectedUser.get(alert.userId)
            if(connectedUser[0] === undefined) return ;
            return io.to(connectedUser[0].id).emit('get-alerts', res)
        })
    })
}