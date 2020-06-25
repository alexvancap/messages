const sql = require('./../db'); // imports the database connection

exports.create = (alert, result) => {
    if (alert.userId)
        sql.query(
            'INSERT INTO alerts (user_id, header, content) \
            VALUES (?, ?, ?)', [alert.userId, alert.header, alert.body], 
            (err, res) => result(err, res)
        
        );
};

exports.getAlerts = (userId, result) => {
    sql.query(
        'SELECT * FROM alerts WHERE user_id = ?', [userId], 
        (err, res) => result(err, res)
    );
};

exports.removeAlert = (alertId, result) => {
    sql.query(
        'DELETE FROM alerts WHERE id = ?', 
        [alertId], (err, res) => result(err, res))
};