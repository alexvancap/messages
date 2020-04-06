module.exports = (app, auth, handleToken) => {
    app.post('/login', handleToken.authenticate, auth.login)
    app.post('/register', handleToken.generate, auth.register)
}
