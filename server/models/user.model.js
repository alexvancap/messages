
const sql = require("./../db");
const { hashPassword } = require('./../services/hashPassword')

exports.create = (newUser, result) => {
    const password = hashPassword(newUser.password)
    sql.query(
        "INSERT INTO users \
        (username, password, email, first_name, last_name) \
        VALUES (?, ?, ?, ?, ?)", 
        [newUser.username, password, newUser.email, newUser.firstName, newUser.lastName], 
        (err, res) => result(err, { id: res.insertId, ...newUser })
    );
};

exports.findAll = (result) => {
    sql.query(
        "SELECT * FROM users", 
        (err, res) => esult(err, res)
    );
}

exports.findById = (id, result) => {
    sql.query(
        `SELECT id, username, email, avatar, bio, first_name, last_name FROM users WHERE ID=${id}`, 
        (err, res) => result(err, res)
    );
};

exports.findByUsername = (username, result) => {
    sql.query(
        `SELECT * FROM users WHERE username='${username}'`, 
        (err, res) => result(err, res)
    )
}

exports.updateById = (id, user, result) => {
    sql.query(
        "UPDATE users SET email = ?, username = ?, first_name = ?, last_name = ?, password = ? WHERE id = ?",
        [user.email, user.username, user.first_name, user.last_name, user.password ,id],
        (err, res) => result(err, { id: id, ...user })
    );
};

exports.deleteById = (id, result) => {
    sql.query(
        `DELETE FROM users WHERE ID=${id}`, (err, res) =>result(err, err)
    )
}

exports.deleteAll = (result) => {
    sql.query(
        `DELETE FROM users`, (err, res) => result(err, res)
    )
}

exports.searchByUsername = (searchValue, result) => {
    sql.query(
        'SELECT * FROM users WHERE username LIKE ?', 
        `%${searchValue}%`, (err, res) => result(err, {res})
    )
}

exports.updateBio = (userId, newBio, result) => {
    sql.query(
        'UPDATE users SET bio = ? WHERE id = ?', 
        [newBio, userId], (err, res) => result(err, res)
    )
}

exports.getBio = (userId, result) => {
    sql.query(
        'SELECT bio FROM users WHERE id = ?', 
        (userId), (err, res) => result(err, res)
    )
}
