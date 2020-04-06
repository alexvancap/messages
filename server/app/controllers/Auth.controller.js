const User = require('./../models/user.model.js')
const handleDBError = require('./../services/handleDBError')
const generateToken = require('./../services/generateToken')
const validatePassword = require('./../services/validatePassword.js')
const bcrypt = require('bcrypt')

exports.login = (req, res) => {
    User.findByUsername(req.body.username, async (err, data) => {
        if(!err){
            if(bcrypt.compareSync(req.body.password, data[0].password))
                res.send(data)
            else
                res.status(400).send({message: 'please enter a valid password'})
        }else
            handleDBError(res, 400, `No user found with username ${req.body.username}`)
    })
}

exports.register = (req, res) => {
    
}