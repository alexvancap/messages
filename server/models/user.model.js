
const sql = require("./../db");
const { hashPassword } = require('./../services/hashPassword')


const User = function(user) {
    this.email = user.email;
    this.username = user.username;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.password = hashPassword(user.password);
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findAll = (result) => {
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

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE ID=${id}`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

User.findByUsername = (username, result) => {
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

User.updateById = (id, user, result) => {
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

User.deleteById = (id, result) => {
    sql.query(`DELETE FROM users WHERE ID=${id}`, (err, res) =>{
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    })
}

User.deleteAll = (result) => {
    sql.query(`DELETE FROM users`, (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    })
}

User.searchByUsername = (searchValue, result) => {
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

module.exports = User