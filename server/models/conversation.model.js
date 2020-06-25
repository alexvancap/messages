const sql = require('./../db');

exports.create = (user_id, user_two_id, result) => {
    sql.query(
        'INSERT INTO conversations (user_id, user_two_id) values(?, ?);', 
        [user_id, user_two_id], (err, res) => result(err, res)
    );
};

exports.get = (user_id, result) => {
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
        [user_id, user_id, user_id, user_id],
        (err, res) => result(err, res)
    );
}

exports.getById = (id, result) => {
    sql.query(
        'SELECT DISTINCT c.id, c.user_id, c.user_two_id, c.created_at, \
            u.username, u.first_name, u.last_name \
        FROM conversations as c \
        LEFT JOIN users as u\
        ON \
            (u.id = c.user_id OR u.id = c.user_two_id) \
        WHERE \
            c.id = ?', [id], (err, res) => result(err, res)
    );
};