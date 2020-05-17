const User = require('./../models/user.model') // imports the user Model
const bcrypt = require('bcrypt') // helps with the ecnrypting of the password
const generateToken = require('./../services/generateToken') // generates a JWT token
var jwt = require('jsonwebtoken');
const {secret} = require('./../config')

//runs when the user presses the submit button on the registration form
exports.register = (req, res) => {
    User.create(req.body, (err, data) => {
        if(err) return console.log(err)
        else res.json(req.body)
    })
}

//handles a login request
exports.login = (req, res) => {
    User.findByUsername(req.body.username, async (err, data) => {

        if (data.length == 0 ) return res.json({error: {type: 'username', message: 'There was no user found with that username'}})
        if(!err){
            if(bcrypt.compareSync(req.body.password, data[0].password)){
                const token = generateToken(data[0])
                res.json({token: token, data: data[0]})
            }else
                res.json({error: {type: 'password', message: 'please enter a valid password'}})
        }
    })
}

exports.findById = (socket) => {
    User.findById(socket.decoded_token.id, (err, data) => {
        if (err) socket.emit('error', {message: 'error while trying to get your data'})
        else socket.emit('get-user-data', data)
    })
}

exports.authenticateJWT = (req, res) => {
    jwt.verify(req.headers.authorization, secret, (err, decoded) => {
        if (err) return console.log(err)
        User.findById(decoded.id, (err, data) => {
            if (err) return console.log(err)
            if(decoded.username == data[0].username)
                res.json(data[0])
        })
    })
}