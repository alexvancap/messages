const usersInterests = require('./../controllers/usersInterests.controller')

module.exports = (socket) => {
  socket
    .on('delete-users-interest', (interestId) => usersInterests.delete(socket, interestId))
    .on('get-interests', () => usersInterests.getByUserId(socket));
};