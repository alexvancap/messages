const sql = require('./../db')

exports.create = (userId, interestId, result) => {
  console.log('id', userId)
  console.log('interestId', interestId)
  sql.query(
    'INSERT INTO users_interests (user_id, interest_id)\
    VALUES (?, ?)', 
    [userId, interestId],
    (err, res) => result(err, res)
  )
}