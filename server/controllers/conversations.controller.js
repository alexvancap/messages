const Conversation = require('./../models/conversation.model')
exports.newConversation = (socket, user_two_id) => {
    Conversation.create(socket.decoded_token.id, user_two_id, (err, res) => {
        if(err) console.log(err)
        else Conversation.get(socket.decoded_token.id, user_two_id, (err, data) => {
            if(err) console.log(err)
            else socket.emit('start-conversation', data)
        }) 
    })
}

exports.findByUserID = (socket) => {
    Conversation.get(socket.decoded_token.id, (err, res) => {
        if(err) console.log(err)
        else socket.emit('get-conversations', res)
    })
}