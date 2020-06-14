const Conversation = require('./../models/conversation.model')
const Message = require('./../models/message.model')

exports.newConversation = (socket, user_two_id) => {
    Conversation.create(socket.decoded_token.id, user_two_id, (err, res) => {
        if(err) return console.log(err)
        else {
            Conversation.getById(res.insertId, (err, conv) => {
                if(err) return console.log(err)
                else socket.emit('start-conversation', ...conv)
            })
        }
    })
}

exports.findByUserID = (socket) => {
    Conversation.get(socket.decoded_token.id, (err, res) => {
        if(err) console.log(err)
        else socket.emit('get-conversations', res)
    })
}