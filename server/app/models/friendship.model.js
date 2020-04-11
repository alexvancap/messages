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

    sql.query('Select username, email, first_name, last_name, avatar from users \
        where id in \
        (select user_one_id from friendships where user_two_id = ? \
        UNION \
        select user_two_id from friendships where user_one_id = ?)', 
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

// sql querry to get all the friends by a user id
// SELECT username, email, first_name, last_name FROM users INNER JOIN friendships ON ( ? = friendships.user_one_id) OR ( ? = friendships.user_two_id)

module.exports = Friendship