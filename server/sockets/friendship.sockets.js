
const friendship = require('./../controllers/friendships.controller')
module.exports = (sockets, io) => {
    sockets
        .on('get-friends', (socket) => {
            console.log(socket)
            // friendship.getFriends(socket, io)
        });
}