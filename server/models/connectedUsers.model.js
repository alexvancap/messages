const sql = require('./../db')

exports.create = (socket, res) => {
  sql.query(
    'INSERT INTO connected_users (user_id, socket_id)\
    VALUES(?, ?)', [socket.decoded_token.id, socket.id], (err, returnValue) => 
    res(err, returnValue)
  )
}

exports.get = (userId, res) => {
  sql.query(
    'SELECT * FROM connected_users \
    WHERE user_id = ?', 
    [userId], (err, users) => res(err, users))
}

exports.delete = (userId, res) => {
  sql.query(
    'DELETE FROM connected_users \
    WHERE user_id = ?', 
    [userId], (err, queryRes) => res(err, queryRes))
}

exports.update = (userId, socketId, res) => {
  console.log(typeof(socketId))
  sql.query(
    'UPDATE connected_users \
    SET user_id = ?, socket_id = ? \
    WHERE user_id = ?', 
    [userId, socketId, userId], (err, dbRes) => res(err, dbRes)
  )
}