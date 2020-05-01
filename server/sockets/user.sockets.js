module.exports = (client, io, users) => {
    client.on('login', (data) => {
        console.log('data')
        users.login(data, (err, res) => {
            if (err) return io.emit({err: 'can\'t login'})
            io.emit('login', res)
        })
    })
}