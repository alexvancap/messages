const Message = require('./../models/message.model');

exports.getByConvID = (query, socket) => {
    Message.getByConvID(
        query.conversationID, 
        (err, res) => {
            if (err) console.log(err);
            else socket.emit('get-messages', res);
        }
    );
};

exports.sendMessage = (query, io) => {
    Message.create(query.conversationID, query.actionUserId, query.content,
        (err, res) => {
            if(err) return console.log(err)
            Message.get(
                res.insertId, (err, res) => {
                    if(err) return console.log(err);
                    io.to('conv ' + query.conversationID).emit('send-message', res, query.conversationID, query.action_user_id);
            });
        }
    );
};