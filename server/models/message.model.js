const sql = require("./../db");

exports.get = (msgID, res) => {
    sql.query(
        'SELECT * FROM messages\
        WHERE id = ?',
        [msgID], (err, message) => {
            if (err) res(err)
            else res(null, message)
        }
    )
}

exports.create = (conversationID, actionUserId, content, res) => {
    sql.query('INSERT INTO messages (conversation_id, action_user_id, content)\
    VALUES(?,?, ?)', [conversationID, actionUserId, content],
    (err, messageData) => {
        if(err) res(err)
        else res(null, messageData)
    })
}

exports.getByConvID = (conversationID, res) => {
    sql.query(
        'SELECT * FROM messages \
        WHERE conversation_id = ?', [conversationID], 
        (err, messages) => {
            if(err) res(err)
            else res(null, messages)
        })
}