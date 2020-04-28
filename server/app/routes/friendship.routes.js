module.exports = (app, friends, checkToken) => {
    //finds users based on search and returns all the users
    app.get('/search', checkToken, friends.searchByUsername)
    app.get('/get-friends', checkToken, friends.getFriends)
    app.get('/remove-friend/:friendId', checkToken, friends.removeFriend)
    app.get('/change-friend-status/:status/:user2ID', checkToken, friends.changeStatus)
    app.get('/add-friend/:friendID', checkToken, friends.addFriend)
}