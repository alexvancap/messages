const ConnectedUsers = require('../models/connectedUsers.model')

exports.connect = (socket) => {
  ConnectedUsers.get(socket.decoded_token.id, (err, res) => {
    if (err) console.log(err)
    else if (res[0] === undefined) {
      ConnectedUsers.create(socket, (err, createRes) => {
        if (err) console.log(err)
        else socket.emit('connection', {status: 'connected'})
      })
    } else {
      ConnectedUsers.update(socket.decoded_token.id, socket.id, (err) => {
        if (err) console.log(err)
        else socket.emit('connection', {status: 'connection updated'})
      })
    }
  })
}

exports.disconnect = (socket) => {
  ConnectedUsers.delete(socket.decoded_token.id, (err, res) => {
    if (err) console.log(err)
    else socket.emit('connection', {status: 'disconnected'})
  })
}