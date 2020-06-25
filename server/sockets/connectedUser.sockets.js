module.exports = (socket) => {
  const connectedUser = require('./../controllers/connectedUser.controller');

  socket
    .on('disconnect', () => connectedUser.disconnect(socket));
};