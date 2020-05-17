const User = require('./../models/user.model')
exports.validateRegisterInput = (req) => {
    let hasErrors = false
    let errors = []
    for (let [key, value] of Object.entries(req.body)) {
        if(key){
            if(value.length === 0){
                errors = {...errors, [key]: {content: `the ${key} field can't be empty`}}
                hasErrors = true
            }
        }
            
    }
    
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(String(req.body.email).toLowerCase())){
        errors = {...errors, email: {content: 'invalid email adress!'}}
        hasErrors = true
    }
    if(req.body.password !== req.body.repeatedPassword){
        errors = {...errors, repeatedPassword: {content: 'the password did not match the repeated password'}}
        hasErrors = true
    }

    
    return hasErrors ? errors : false
}