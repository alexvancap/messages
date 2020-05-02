const Friendship = require('./../models/friendship.model')
const bcrypt = require('bcrypt')
const generateToken = require('./../services/generateToken')

exports.getFriends = (socket, io) => {
    Friendship.searchByID(socket, async (err, data ) => {
        if (err) io.emit('error', {message: 'couldn\'t fetch your friends :('})
        else io.emit('get-friends', {friends: data})
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