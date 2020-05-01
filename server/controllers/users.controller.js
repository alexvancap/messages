const User = require('./../models/user.model')
const bcrypt = require('bcrypt')
const generateToken = require('./../services/generateToken')

exports.login = (socket, io) => {

    console.log(User)
    User.findByUsername(socket.username, async (err, data) => {
        if (data.length == 0 ) return socket.emit({success: false, message: 'Invalid username'})
        if(!err){
            if(bcrypt.compareSync(socket.password, data[0].password)){
                const token = generateToken(data[0])
                io.emit('login', {success: true, data: data, token: token})
            }else
                io.emit({success: false, message: 'Wrong password!'})
        }
    })
}