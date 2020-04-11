module.exports = (app, friends, checkToken) => {
    //finds users based on search and returns all the users
    app.get('/search', checkToken, friends.searchByUsername)
    app.get('/get-friends', checkToken, friends.getFriends)
    app.get('/remove-friend/:friendId', checkToken, friends.removeFriend)
}