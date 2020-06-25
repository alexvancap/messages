const sql = require("./../db");

exports.get = (msgID, result) => {
    sql.query(
        'SELECT * FROM messages WHERE id = ?',
        [msgID], (err, res) => result(err, res)
    );
};

exports.create = (conversationID, actionUserId, content, result) => {
    sql.query(
        'INSERT INTO messages (conversation_id, action_user_id, content)\
        VALUES(?,?, ?)', [conversationID, actionUserId, content],
        (err, res) => result(err, res)
    );
};

exports.getByConvID = (conversationID, result) => {
    sql.query(
        'SELECT * FROM messages \
        WHERE conversation_id = ?', [conversationID], 
        (err, messages) => result(err, messages)
    );
};