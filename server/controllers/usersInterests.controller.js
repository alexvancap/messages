const UserInterest = require('./../models/usersInterest.model');

// exports.create = (socket, interests, (err, res) => {
//   if (err) socket.emit('error', {message: 'problem while trying to save your interests'})
//   else socket.emit('create-users-interests', res)
// });

exports.delete = (socket, userId) => {
  console.log('deleting')
  UserInterest.delete(socket.decoded_token.id, userId, (err, res) => {
    console.log(err)
    if (err) socket.emit('error', { message: 'A problem occured while trying to delete your interest' })
    else socket.emit('delete-users-interests', res)
  })
}