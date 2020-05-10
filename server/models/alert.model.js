const sql = require('./../db'); // imports the database connection

exports.getAlerts = (userId, res) => {
    sql.query('SELECT * FROM alerts WHERE user_id = ?',[userId], (err, data) => {
        console.log(data)
        if (err) res(err)
        else res(null, data)
    })
}