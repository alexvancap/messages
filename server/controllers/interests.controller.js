const Interest = require('./../models/interest.model')

exports.create = (socket, interests) => {
  const userId = socket.decoded_token.id
  Interest.create(userId, interests, (err, res) => {
    if (err) return socket.emit('error', {message: 'An error occured while trying to get your interests'})
    else socket.emit('create-interests', res)
  })
}