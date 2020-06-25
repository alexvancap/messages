const sql = require('../db');

exports.create = (socket, result) => {
  sql.query(
    'INSERT INTO connected_users (user_id, socket_id)\
    VALUES(?, ?)', [socket.decoded_token.id, socket.id], (err, res) => 
    result(err, res)
  );
};

exports.get = (userId, result) => {
  sql.query(
    'SELECT * FROM connected_users WHERE user_id = ?', 
    [userId], (err, res) => result(err, res)
  );
};

exports.delete = (userId, result) => {
  sql.query(
    'DELETE FROM connected_users WHERE user_id = ?', 
    [userId], (err, res) => result(err, res)
  );
};

exports.update = (userId, socketId, result) => {
  console.log(typeof(socketId))
  sql.query(
    'UPDATE connected_users SET user_id = ?, socket_id = ? \
    WHERE user_id = ?', [userId, socketId, userId], 
    (err, res) => result(err, res)
  );
};