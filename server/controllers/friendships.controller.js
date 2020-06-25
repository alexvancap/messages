const Friendship = require('./../models/friendship.model'); //Friendship model

//gets all your friends by the logged in user id
exports.getFriends = (socket) => {
    //to check: add async

    //sends userId to the model
    Friendship.searchByID(socket.decoded_token.id, (err, data ) => {
        //handles error or sends data back to the client
        if (err) socket.emit('error', { message: 'couldn\'t fetch your friends :(' });
        else socket.emit('get-friends', data);
    });
};

//handles search function on the friends page
exports.findFriends = (socket, query) => {
    //sends the query to the model
    Friendship.searchByUsername(query, (err, res) => {
        //handles error or sends data back to the client
        if (err) socket.emit('error', { message: 'A problem occured while trying to find the users' });
        else socket.emit('search', res);
    });
};

exports.addFriend = (socket, friend) => {
    const userId = socket.decoded_token.id;
    const friendId = friend.friendId;
    Friendship.create(userId, friendId, friend, (err, res) => {
        console.log(res)
        //handles error or sends data back to the client
        if (err) socket.emit('error', { message: 'A problem occured while trying to find the users' });
        else socket.emit('add-friend', res);
    });
};

//handles user reporting and blocking
exports.changeStatus = (socket, actionMode, friendId) => {
    //sends the friendId, the action type and the friendId to the model
    Friendship.changeStatus(socket.decoded_token.id, actionMode, friendId, (err) => {
        //handles error or sends data back to the client
        if (err) socket.emit('error', { message: 'A problem occured while trying the change the friend status' });
        else socket.emit('change-friend-status', { success: true, friendId: friendId, status: actionMode });
    });
};