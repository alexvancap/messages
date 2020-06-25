const sql = require('./../db')

exports.create = (userId, interests, result) => {
  interests.forEach(interest => {
    sql.query(
      'INSERT INTO interests \
      VALUES user_id = ?, interest = ?', 
      [userId, interest], (err, res) => result(err, res))
  });
}