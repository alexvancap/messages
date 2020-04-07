const jwt = require('jsonwebtoken')
module.exports = function generateToken(data){
    let token = jwt.sign({username: data.username, id: data.id},
        process.env.JWT_SECRET,
        { expiresIn: '24h' } // expires in 24 hours
        );
        // return the JWT token for the future API calls
        return token
}