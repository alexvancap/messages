const User = require('./../models/user.model') // imports the user Model
const bcrypt = require('bcrypt') // helps with the ecnrypting of the password
const generateToken = require('./../services/generateToken') // generates a JWT token
var jwt = require('jsonwebtoken');
const {secret} = require('./../config')

//handles a login request
exports.login = (req, res) => {
    User.findByUsername(req.body.username, async (err, data) => {
        if (data.length == 0 ) return res.status(400).json({message: 'There was no user found with that username'})
        if(!err){
            if(bcrypt.compareSync(req.body.password, data[0].password)){
                const token = generateToken(data[0])
                res.json({token: token, data: data[0]})
            }else
                res.status(400).json({message: 'please enter a valid password'})
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
    console.log('req', req)
    console.log('req', req)
    console.log('req', req)
    console.log('req', req)
    jwt.verify(req.headers.authorization, secret, (err, decoded) => {
        if (err) return console.log(err)
        User.findById(decoded.id, (err, data) => {
            console.log(decoded)
            console.log(data)
            if (err) return console.log(err)
            if(decoded.username == data[0].username)
                res.json(data[0])
        })
    })
}