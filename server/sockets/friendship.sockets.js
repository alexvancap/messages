module.exports = (socket) => {
    const friendship = require('./../controllers/friendships.controller')
    socket
        .on('get-friends', () => {
            console.log('whoop')
        }
        )
        .on('search', (query) => 
            friendship.findFriends(socket, query)
        )
        .on('add-friend', (friend) => 
            friendship.addFriend(socket, friend)
        )
        .on('change-friend-status', (body) => {
            friendship.changeStatus(socket, body.actionMode, body.friendId)
        });
}