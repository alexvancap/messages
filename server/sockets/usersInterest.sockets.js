module.exports = (socket) => {
  socket.on('create-users-interests', (interests) => usersInterests.create(interests));
};