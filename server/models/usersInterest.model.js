const sql = require('./../db');

exports.create = (userId, interestId, result) => {
  sql.query(
    'INSERT INTO users_interests (user_id, interest_id)\
    VALUES (?, ?)', [userId, interestId],
    (err, res) => result(err, res)
  );
};

exports.get = (userId, interestId, result) => {
  sql.query(
    'SELECT * FROM users_interests \
    WHERE user_id = ? AND interest_id = ?', [userId, interestId], 
    (err, res) => result(err, res)
  );
}