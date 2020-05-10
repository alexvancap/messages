const Alert = require('./../models/alert.model')

exports.getAlerts = (socket) => {
    Alert.getAlerts(socket.decoded_token.id, (err, data) => {
        if (err) socket.emit('error', { message: 'error while trying to get your alerts' })
        else socket.emit('get-alerts', data)
    })
}