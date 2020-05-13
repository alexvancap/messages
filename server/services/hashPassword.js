const bcrypt = require('bcrypt')
const config = require('./../config')

exports.hashPassword = (password) => {
    return bcrypt.hashSync(password, 12);
}
