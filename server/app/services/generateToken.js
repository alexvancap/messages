const jwt = require('jsonwebtoken')
module.exports = function generateToken(data){
    jwt.sign({ _id: data.id, username: data.username}, process.env.JWT_SECRET, { expiresIn: '1 week' })
}