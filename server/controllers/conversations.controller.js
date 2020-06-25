const Conversation = require('./../models/conversation.model');
const Connecteduser = require('./../models/connectedUser.model');


exports.newConversation = (socket, target_user_id, io) => {
    Conversation.create(socket.decoded_token.id, target_user_id, (err, createRes) => {
        if(err) return console.log(err);
        else {
            Conversation.getById(createRes.insertId, (err, conv) => {
                if(err) return console.log(err);
                else {
                    Connecteduser.get(target_user_id, (err, user) => {
                        if (err) console.log(err);
                        else {
                            console.log(user[0].socket_id);
                            socket.emit('start-conversation', ...conv);
                            io.to(user[0].socket_id).emit('start-conversation', ...conv);
                        };
                    });
                };
            });
        };
    });
};

exports.findByUserID = (socket) => {
    Conversation.get(socket.decoded_token.id, (err, res) => {
        if(err) console.log(err);
        else socket.emit('get-conversations', res);
    });
};