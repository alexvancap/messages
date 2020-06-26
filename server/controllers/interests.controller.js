const Interest = require('./../models/interest.model');
const UsersInterest = require('./../models/usersInterest.model');

exports.create = (socket, interests) => {
  const userId = socket.decoded_token.id;
  interests.forEach(interest => {
    Interest.getByName(interest, (err, getByNameRes) => {
      if(err) return socket.emit('error', { message: `A problem occured while trying to get the interest: ${interest.name}` });
      if(getByNameRes[0] === undefined) {
        Interest.create(interest, (err, ICreateRes) =>{
          if(err) return socket.emit('error', { message: `A problem occured while trying to create the interest: ${interest}` });
          UsersInterest.create(userId, ICreateRes.insertId, (err, uIcreateRes) => {
            if(err) return socket.emit('error', { message: `A problem occures while trying to create: ${interest.name}` });
            else UsersInterest.get(uIcreateRes.insertId, (err, res) => {
              if (err) return socket.emit('error', { message: 'A problem occures while trying to get your newly created interest'});
              else socket.emit('created-interest', ...res)
            })
          })
        })
      }else{
        UsersInterest.create(userId, getByNameRes[0].id, (err, res) => {
          if (err) socket.emit('error', { message: `A problem occured while trying to create the interest: ${interest}` });
          else UsersInterest.get(res.insertId, (err, getMSGRes) => {
            if (err) return socket.emit('error', { message: 'A problem occures while trying to get your newly created interest'});
            else socket.emit('created-interest', ...getMSGRes);
          })
        });
      }
    });
  });
};

exports.getAll = (socket) => {
  Interest.getAll((err, res) => {
    if (err) socket.emit('error', console.log(err));
    else socket.emit('get-all-interests', res);
  });
};