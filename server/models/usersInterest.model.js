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

exports.getByUserId = (userId, result) => {
  sql.query(
    'SELECT ui.timestamp as createdAt, i.name as name, i.id as id FROM users_interests as ui\
    LEFT JOIN interests as i \
    ON i.id = ui.interest_id \
    WHERE ui.user_id = ?', [userId], 
    (err, res) => result(err, res)
  );
};