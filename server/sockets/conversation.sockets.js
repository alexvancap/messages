module.exports = (socket) => {
    const conversations = require('./../controllers/conversations.controller')
    socket
        .on('start-conversation', (query) => {
            conversations.newConversation(socket, query.target_user_id)
        })
        .on('get-conversations', () => {
            conversations.findByUserID(socket)
        })
}