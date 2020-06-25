const messages = require('./../controllers/messages.controller');

module.exports = (socket, io) => {
    socket
        .on('send-message', query => messages.sendMessage(query, io))
        .on('get-messages', query => messages.getByConvID(query, socket));
};