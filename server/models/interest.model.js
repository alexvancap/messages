const sql = require('./../db')

exports.create = (name, result) => {
  sql.query(
    'INSERT INTO interests (name)\
    VALUES  (?)', 
    [name], (err, res) => result(err, res))
}

exports.getByName = (interestName, result) => {
  sql.query(
    'SELECT id FROM interests WHERE name = ?', [interestName], 
    (err, res) => result(err, res)
  )
}