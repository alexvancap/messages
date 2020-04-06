const bcrypt = require('bcrypt')

<<<<<<< HEAD
exports.validatePassword = (password) => {
    bcrypt.compare(password, hash).then(function(result) {
        return result
    })
}
=======
    exports.validatePassword = (password) => {
        bcrypt.compare(password, hash).then(function(result) {
        return result
    })
}
>>>>>>> 8e840c271baf85a27af212b96953d0d8ebb94348
