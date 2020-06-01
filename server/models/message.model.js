const sql = require("./../db");

exports.getByConversationID = (conversationID, res) => {
    sql.query(
        'SELECT * FROM messages \
        WHERE conversation_id = ?', [conversationID], 
        (err, messages) => {
            if(err) res(err)
            else res(null, messages)
        })
}