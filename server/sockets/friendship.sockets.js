module.exports = (socket) => {
    const friendship = require('./../controllers/friendships.controller')
    socket
        .on('get-friends', () => 
            friendship.getFriends(socket)
        )
        .on('search', (query) => 
            friendship.findFriends(socket, query)
        )
        .on('add-friend', (friendId) => 
            friendship.addFriend(socket, friendId)
        );
}