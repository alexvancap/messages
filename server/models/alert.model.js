const sql = require('./../db'); // imports the database connection

exports.create = (alert, res) => {
    if(alert.userId)
        sql.query('INSERT INTO alerts \
        (user_id, header, content) \
        VALUES (?, ?, ?)', 
        [alert.userId, alert.header, alert.body], (err, data) => {
            if (err) res(err)
            else res(null, data)
        })
}

exports.getAlerts = (userId, res) => {
    sql.query('SELECT * FROM alerts WHERE user_id = ?',[userId], (err, data) => {
        if (err) res(err)
        else res(null, data)
    })
}

exports.removeAlert = (alertId, res) => {
    sql.query('DELETE FROM alerts WHERE id = ?', [alertId], (err, data) => {
        if (err) res(err)
        else res(null, alertId)
    })
}