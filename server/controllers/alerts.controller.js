const Alert = require('./../models/alert.model')

exports.getAlerts = (socket) => {
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

exports.addAlert = (socket, connectedUsers, alert ) => {
    Alert.create(alert, (err, res) => {
        if (err) return socket.emit('error', { message: 'error while trying to create an alert, so here is another one'})
        const connectedUser = connectedUsers.filter(user => user.userId !== socket.decoded_token.id)
        console.log(connectedUser)
        if (connectedUser !== [])
            return socket.emit('add-alert', res)
    })
}