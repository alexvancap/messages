const sql = require('./../db')
exports.create = (user_id, user_two_id) => {
    sql.query('INSERT INTO conversations (user_id, user_two_id)\
        values(?, ?)', [user_id, user_two_id], (err, res) => {
            console.log(err)
            console.log(res)
        })
}