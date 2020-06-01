const Message = require('./../models/message.model')

// exports.getByConversationID = (conversationID) => {
//     Message.getByConversationID(conversationID, (err, res) => {
//         if(err,)
//     })
// }

exports.sendMessage = (query, socket) => {
    Message.create(query.conversationID, query.content,
        (err, res) => {
            if(err) return console.log(err)
            else return socket.emit('send-message', res)
        })
}