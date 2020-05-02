const Friendship = require('./../models/friendship.model')
const bcrypt = require('bcrypt')
const generateToken = require('./../services/generateToken')

exports.getFriends = (socket, io) => {
    Friendship.searchByID(socket.decoded_token.id, async (err, data ) => {
        if (err) socket.emit('error', {message: 'couldn\'t fetch your friends :('})
        else socket.emit('get-friends', data)
    });
    // User.findByUsername(socket.username, async (err, data) => {
    //     if (data.length == 0 ) return socket.emit({success: false, message: 'Invalid username'})
    //     if(!err){
    //         if(bcrypt.compareSync(socket.password, data[0].password)){
    //             const token = generateToken(data[0])
    //             io.emit('login', {success: true, data: data[0], token: token})
    //         }else
    //             io.emit({success: false, message: 'Wrong password!'})
    //     }
    // })
}

exports.findFriends = (socket, query) => {
    Friendship.searchByUsername(query, (err, res) => {
        if (err) socket.emit('error', {message: 'A problem occured while trying to find the users'})
        else socket.emit('search', res)
    })
}

exports.addFriend = (socket, friendId) => {
    const userId = socket.decoded_token.id
    Friendship.create(userId, friendId, (err, res) => {
        if (err) socket.emit('error', {message: 'A problem occured while trying to find the users'})
        else socket.emit('add-friend', res)
    })
}