const Conversation = require('./../models/conversation.model')
exports.newConversation = (socket, user_two_id) => {
    Conversation.create(socket.decoded_token.id, user_two_id, (err, res) => {
        if(err) console.log(err)
        else socket.emit('start-conversation', {test: 'cool'})

    })
}