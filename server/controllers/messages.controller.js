const Message = require('./../models/message.model')
const alerts = require('./alerts.controller')

exports.getByConvID = (query, socket) => {
    Message.getByConvID(
        query.conversationID, 
        (err, res) => {
            if (err) console.log(err)
            else socket.emit('get-messages', res)
        }
    )
}

exports.sendMessage = (query, socket, connectedUsers, io) => {
    console.log(connectedUsers)
    const targetUser = connectedUsers.filter(user => user.userId === query.targetUserId)[0]
    Message.create(query.conversationID, query.content,
        (err, res) => {
            if(err) return console.log(err)
            else {
                Message.get(
                    res.insertId, (err, res) => {
                        if(err) return console.log(err)
                        else {
                            io.to('conv ' + query.conversationID).emit('send-message', res, query.conversationID)
                            // socket.emit('send-message', res, query.conversationID)
                            // // if(!targetUser) return alerts.addAlert(socket, connectedUsers, {user_id: socket.decoded_token.id, header: 'New message', content: 'check your inbox'}, io)
                            // io.to(targetUser.id).emit('send-message', res, conversationID = query.conversationID)
                        }
                })
            }
        })
}