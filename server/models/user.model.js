
const sql = require("./../db");
const { hashPassword } = require('./../services/hashPassword')

exports.create = (newUser, result) => {
    const password = hashPassword(newUser.password)
    sql.query("INSERT INTO users \
        (username, password, email, first_name, last_name) \
        VALUES (?, ?, ?, ?, ?)", 
    [newUser.username, password, newUser.email, newUser.firstName, newUser.lastName], 
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            return result(err, null);
        }
        result(null, { id: res.insertId, ...newUser });
    });
};

exports.findAll = (result) => {
    sql.query("SELECT * FROM users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
      });
}

exports.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE ID=${id}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

exports.findByUsername = (username, result) => {
    sql.query(`SELECT * FROM users WHERE username='${username}'`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("user: ", res);
        result(null, res);
    })
}

exports.updateById = (id, user, result) => {
    sql.query(
        "UPDATE users SET email = ?, username = ?, first_name = ?, last_name = ?, password = ? WHERE id = ?",
        [user.email, user.username, user.first_name, user.last_name, user.password ,id],
        (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("updated user: ", { id: id, ...user });
        result(null, { id: id, ...user });
        }
    );
};

exports.deleteById = (id, result) => {
    sql.query(`DELETE FROM users WHERE ID=${id}`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    })
}

exports.deleteAll = (result) => {
    sql.query(`DELETE FROM users`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    })
}

exports.searchByUsername = (searchValue, result) => {
    sql.query('SELECT * FROM users WHERE username LIKE ?', 
    `%${searchValue}%`, (err, res) =>{
        if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }
    
            result(null, {res});
        }
    )
}
