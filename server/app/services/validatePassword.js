const bcrypt = require('bcrypt')

module.exports = async function validatePassword(password, hash){
    return await bcrypt.compare(password, hash)
}
