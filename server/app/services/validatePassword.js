const bcrypt = require('bcrypt')

    exports.validatePassword = (password) => {
        bcrypt.compare(password, hash).then(function(result) {
        return result
    })
}