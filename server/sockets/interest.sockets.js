const interests = require('./../controllers/interests.controller');

module.exports = (socket) => {
  socket
    .on('create-interests', (newInterests) => interests.create(socket, newInterests))
    .on('get-all-interests', () => interests.getAll(socket));
};