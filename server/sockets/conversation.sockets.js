module.exports = (socket, io) => {
    const conversations = require('./../controllers/conversations.controller')
    socket
        .on('start-conversation', (query) => {
            conversations.newConversation(socket, query.target_user_id, io)
        })
        .on('get-conversations', () => {
            conversations.findByUserID(socket)
        })
}