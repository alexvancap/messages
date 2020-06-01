const sql = require("./../db");

exports.create = (conversationID, content, res) => {
    sql.query('INSERT INTO messages (conversation_id, content)\
    VALUES(?, ?)', [conversationID, content],
    (err, messageData) => {
        if(err) console.log(err)
        else res(null, messageData)
    })
}

exports.getByConversationID = (conversationID, res) => {
    sql.query(
        'SELECT * FROM messages \
        WHERE conversation_id = ?', [conversationID], 
        (err, messages) => {
            if(err) res(err)
            else res(null, messages)
        })
}