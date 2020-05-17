const User = require('./../models/user.model')
exports.validateRegisterInput = (req) => {
    let errors = []
    for (let [key, value] of Object.entries(req.body)) {
        if(key){
            if(value.length === 0)
                errors = [...errors, {type: key, message: `the ${key} field can't be empty`}]
        }
            
    }
    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.email)))
        errors = [...errors, {type: 'email', message: 'invalid email adress!'}]
    User.findByUsername(req.username, (err, data) => {
        if(data)
        if(data.length !== 0)
            errors = [...errors, {type: 'username', message: 'this username already exists'}]
    })
    if(req.password !== req.repeatedPassword)
        errors = [...errors, {type: 'repeatedPassword', message: 'the password did not match the repeated password'}]
    
    
    return errors.length > 0 ? errors : false
}