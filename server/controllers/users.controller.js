const User = require('./../models/user.model') // imports the user Model
const bcrypt = require('bcrypt') // helps with the ecnrypting of the password
const generateToken = require('./../services/generateToken') // generates a JWT token

// exports.login = (socket, io) => {
//     User.findByUsername(socket.username, async (err, data) => {
//         if (data.user === [] ) return io.emit({success: false, message: 'Invalid username'})
//         if(!err){
//             if(bcrypt.compareSync(socket.password, data[0].password)){
//                 const token = generateToken(data[0])
//                 io.emit('login', {success: true, data: data[0], token: token})
//             }else
//                 io.emit({success: false, message: 'Wrong password!'})
//         }
//     })
// }

//handles a login request
exports.login = (req, res) => {
    User.findByUsername(req.body.username, async (err, data) => {
        if (data.length == 0 ) return res.status(400).json({message: 'There was no user found with that username'})
        if(!err){
            if(bcrypt.compareSync(req.body.password, data[0].password)){
                if(req.body.rememberUser){
                    const token = generateToken(data[0])
                    res.json({token: token, data: data[0]})
                }else
                    res.json({data: data[0]})
            }else
                res.status(400).json({message: 'please enter a valid password'})
        }
    })
}

exports.findById = (socket, user) => {
    User.findById(user.id, (err, data) => {
        if (err) socket.emit('error', {message: 'error whule trying to get your data'})
        else socket.emit('get-user-data', data)
    })
}