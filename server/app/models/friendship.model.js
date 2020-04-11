const sql = require("../../db.js");

const Friendship = function(friend) {
    this.user1ID = friend.user1ID;
    this.user2ID = friend.user2ID;
};

Friendship.create = (users, result) => {
    sql.query('INSERT INTO friends user1ID = ?, user2ID = ?', 
        [users.user1ID, users.user2ID], (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }
    
            result(null, res);
        })
}


Friendship.searchByID = (userID, result) => {

    sql.query('Select DISTINCT u.id, u.username, u.email, u.first_name, u.last_name, \
    u.avatar, f.status, f.action_user_id, f.created_at AS friends_since\
    FROM users AS u \
    INNER JOIN friendships AS f \
    ON (u.id = f.user_one_id AND f.user_two_id = ?) \
    OR (u.id = f.user_two_id AND f.user_one_id = ?)',

    [userID, userID], (err, res) =>{
        if(err){
                console.log("error: ", err);
                result(null, err);
                return;
            }
    
            result(null, {res});
        }
    )
}


Friendship.searchByUsername = (query, result) => {
    const searchValue = query.value
    console.log(query)
    if (query.filter === 'none')
        queryString = `SELECT users.username, users.email, users.first_name, users.last_name, users.avatar FROM users WHERE (users.username LIKE '%${searchValue}%' OR concat(first_name, ' ', last_name) LIKE '%${searchValue}%')`
    else if(query.filter === 'fullName') 
        queryString = `SELECT * FROM users WHERE concat(first_name, ' ', last_name) LIKE '%${searchValue}%';`
    else if(query.filter === 'username')
    queryString = `SELECT id, username, email, first_name, last_name FROM users WHERE username LIKE '%${searchValue}%'`
    sql.query(queryString,
        (err, res) => {
            if(err){
                console.log("error: ", err);
                result(null, err);
                return;
           }

            result(null, {res});
        }
    )
}

Friendship.removeFriendByID = (userID, friendID, result) => {
    sql.query(`DELETE FROM friendships \
    WHERE \
    ((user_one_id = ? AND user_two_id = ?) OR (user_one_id = ? AND user_two_id = ?))`, 
    [userID, friendID, friendID, userID], (err, res) => {
        if(err){
            console.log("error: ", err);
            result(null, err);
            return;
       }
        result(null, res);
    })
}

// sql querry to get all the friends by a user id
// SELECT username, email, first_name, last_name FROM users INNER JOIN friendships ON ( ? = friendships.user_one_id) OR ( ? = friendships.user_two_id)

module.exports = Friendship