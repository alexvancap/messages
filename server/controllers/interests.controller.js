const Interest = require('./../models/interest.model')
const UsersInterest = require('./../models/usersInterest.model')

exports.create = (socket, interests) => {
  const userId = socket.decoded_token.id
  interests.forEach(interest => {
    Interest.getByName(interest, (err, res) => {
      if(err) return socket.emit('error', {message: `A problem occured while trying to get the interest: ${interest.name}`})
      if(res[0] === undefined) {
        Interest.create(interest, (err, res) =>{
          if(err) return socket.emit('error', {message: `A problem occured while trying to create the interest: ${interest}`})
          UsersInterest.create(userId, res.insertId, (err, res) => {
            if(err) return socket.emit('error', {message: `A problem occures while trying to create: ${interest.name}`})
            else console.log('success')
          })
        })
      }
      else UsersInterest.create(userId, res[0].id, (err, res) => {
        if (err) socket.emit('error', {message: `A problem occured while trying to create the interest1: ${interest}`})
        else socket.emit('create-interests', {succes: true})
      })
    })
  });
}