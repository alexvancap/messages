const User = require('./../models/user.model'); // imports the user Model
const bcrypt = require('bcrypt'); // helps with the ecnrypting of the password
const generateToken = require('./../services/generateToken'); // generates a JWT token
var jwt = require('jsonwebtoken');
const { secret } = require('./../config');
const { validateRegisterInput } = require('./../services/validateRegisterInput');

//runs when the user presses the submit button on the registration form
exports.register = (req, res) => {
    User.findByUsername(req.body.username, (err, data) => {
        let errors = validateRegisterInput(req)
        if(err) return console.log(err)
        if(data.length > 0){
            if(data[0].id) {
                errors = {...errors, username: {content: 'this username already exists'}}
                hasErrors = true
            }
        }
        if (errors !== false) return res.json({hasError: true, errors: errors})
        User.create(req.body, (err, data) => {
            if(err) return console.log(err)
            else res.json(req.body)
        })
    })
};

//handles a login request
exports.login = (req, res) => {
    User.findByUsername(req.body.username, async (err, data) => {

        if (req.body.username.length == 0 ) return res.json({error: {type: 'username', message: 'Please enter a username'}})
        if (data.length == 0 ) return res.json({error: {type: 'username', message: 'No user was found with that username'}})
        if(!err){
            if(bcrypt.compareSync(req.body.password, data[0].password)){
                const token = generateToken(data[0])
                res.json({token: token, data: data[0]})
            }else
                res.json({error: {type: 'password', message: 'please enter a valid password'}})
        }
    })
};

exports.findById = (socket) => {
    User.findById(socket.decoded_token.id, (err, data) => {
        if (err) socket.emit('error', {message: 'A problem occured while trying to get your data'})
        else socket.emit('get-user-data', data)
    })
};

exports.updateBio = (socket, newBio) => {
    User.updateBio(socket.decoded_token.id, newBio, (err) => {
        if (err) socket.emit('error', {message: 'A problem occured while trying to update your bio'})
        else User.getBio(socket.decoded_token.id, (err, newBio) => {
            if (err) socket.emit('error', {message: 'A problem occured while trying to get your newly created bio'})
            else socket.emit('update-bio', ...newBio)
        })
    })
};

exports.getBio = (socket) => {
    User.getBio(socket.decoded_token.id, (err, bio) => {
        if(err) socket.emit('error', {message: 'A problem occured while fetching your bio'})
        else socket.emit('get-bio', ...bio)
    })
};

exports.authenticateJWT = (req, res) => {
    jwt.verify(req.headers.authorization, secret, (err, decoded) => {
        if (err) return console.log(err)
        User.findById(decoded.id, (err, data) => {
            if (err) return console.log(err)
            if(decoded.username == data[0].username)
                res.json(data[0])
        })
    })
};