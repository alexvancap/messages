const Conversation = require('./../models/conversation.model')
const Connected_users = require('./../models/connectedUsers.model')


exports.newConversation = (socket, target_user_id, io) => {
    Conversation.create(socket.decoded_token.id, target_user_id, (err, res) => {
        if(err) return console.log(err)
        else {
            Conversation.getById(res.insertId, (err, conv) => {
                if(err) return console.log(err)
                else {
                    Connected_users.get(target_user_id, (err, res) => {
                        if (err) console.log(err)
                        else {
                            console.log(res[0].socket_id)
                            socket.emit('start-conversation', ...conv)
                            io.to(res[0].socket_id).emit('start-conversation', ...conv)
                        }
                    })
                }
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