const sql = require('./../db')
exports.create = (user_id, user_two_id, res) => {
    sql.query(
        'INSERT INTO conversations (user_id, user_two_id)\
        values(?, ?);', 
        [user_id, user_two_id], (err, data) => {
            if(err) res(err, null)
            else res(null, data)
        })
}

exports.get = (user_id, res) => {
    sql.query(
        'SELECT c.user_id, c.user_two_id, c.id, u.username, u.first_name, u.last_name \
        FROM conversations as c \
        LEFT JOIN users as u\
        ON \
            (u.id = c.user_id AND c.user_id != ?) \
            OR \
            (u.id = c.user_two_id AND c.user_two_id != ?) \
        WHERE \
        c.user_id = ? OR c.user_two_id = ?',
    [user_id, user_id, user_id, user_id], (err, data) => {
        if(err) res(err)
        else res(null, data)
    })
}

exports.getById = (id, res) => {
    sql.query(
        'SELECT DISTINCT c.id, c.user_id, c.user_two_id, c.created_at, \
            u.username, u.first_name, u.last_name \
        FROM conversations as c \
        LEFT JOIN users as u\
        ON \
            (u.id = c.user_id OR u.id = c.user_two_id) \
        WHERE \
            c.id = ?', (id), (err, conv) =>{
            return res(err, conv)
        }
    )
}