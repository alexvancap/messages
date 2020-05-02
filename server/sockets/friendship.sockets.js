module.exports = (sockets, io) => {
    const friendship = require('./../controllers/friendships.controller')
    sockets
        .on('get-friends', (socket) => {
            friendship.getFriends(sockets, io)
        });
}