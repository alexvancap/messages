const ConnectedUser = require('../models/connectedUser.model');

exports.connect = (socket) => {
  ConnectedUser.get(socket.decoded_token.id, (err, res) => {
    if (err) return socket.emit('error', { message: 'An error occured while trying to get the connected users' });
    else if (res[0] === undefined) {
      ConnectedUser.create(socket, (err) => {
        if (err) return socket.emit('error', { message: 'An error occured while trying to create a connection' });
        else socket.emit('connection', { status: 'connected' });
      });
    } else {
      ConnectedUser.update(socket.decoded_token.id, socket.id, (err) => {
        if (err) return socket.emit('error', { message: 'An error occured while trying to update your connection' });
        else socket.emit('connection', { status: 'connection updated' });
      });
    };
  });
};

exports.disconnect = (socket) => {
  ConnectedUser.delete(socket.decoded_token.id, (err) => {
    if (err) return socket.emit('error', { message: 'An error occured while trying to delete your connection' });
    else socket.emit('connection', {status: 'disconnected' });
  });
};