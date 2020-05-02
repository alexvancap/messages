const sql = require('./../db');

const Friendship = function(friend) {
    this.user1ID = friend.user1ID;
    this.user2ID = friend.user2ID;
};

Friendship.create = (userID, friendID, result) => {
    sql.query('INSERT INTO friendships SET user_one_id = ?, user_two_id= ?, status = ?, action_user_id = ?', 
        [userID, friendID, 0, userID], (err, res) => {
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
        u.avatar, f.id AS friendID, f.status, f.action_user_id, f.created_at AS friends_since\
        FROM users AS u \
        INNER JOIN friendships AS f \
        ON (u.id = f.user_one_id AND f.user_two_id = ? \
        OR u.id = f.user_two_id AND f.user_one_id = ?)',

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
        queryString = `SELECT id username, email, first_name, last_name, avatar FROM users WHERE (username LIKE '%${searchValue}%' OR concat(first_name, ' ', last_name) LIKE '%${searchValue}%')`
    else if(query.filter === 'fullName') 
        queryString = `SELECT id username, email, first_name, last_name, avatar FROM users WHERE concat(first_name, ' ', last_name) LIKE '%${searchValue}%';`
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


Friendship.changeStatus = (userID, params, result) => {
    sql.query(`UPDATE friendships \
    SET status = ${params.status}
    WHERE (user_one_id = ${userID} AND user_two_id = ${params.user2ID}) \
    OR (user_two_id = ${userID} AND user_one_id = ${params.user2ID})`, 
    (err, res )=> {
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