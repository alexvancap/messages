const sql = require('./../db'); // imports the database connection

//creates a friendship
exports.create = (userID, friendID, friend, result) => {
    //sends the query to the database
    sql.query(
        'INSERT INTO friendships \
        SET user_one_id = ?, user_two_id= ?, status = ?, action_user_id = ?', 
        [userID, friendID, 0, userID], (err) => {
            //gets the timestamp of the moment
            const currentDate = new Date(Date.now())
            //sends a new friendship object back to the friendship controller
            result(err, {userId: userID, friendId: friendID, username: friend.title, fullName: friend.fullName, status: 0, actionUserId: userID, friends_since: currentDate});
        });
};

//find a user by it's i'd
exports.searchByID = (userID, result) => {
    //sends a query request to the database
    sql.query(
        'Select DISTINCT u.id AS userID, u.username, u.email, u.first_name, u.last_name, \
        u.avatar, f.id AS friendID, f.status, f.action_user_id, f.created_at AS friends_since\
        FROM users AS u \
        INNER JOIN friendships AS f \
        ON (u.id = f.user_one_id AND f.user_two_id = ? \
        OR u.id = f.user_two_id AND f.user_one_id = ?)',

    [userID, userID], (err, res) => result(err, res)
    );
};

// find all friends based on a part of a username or name as input
exports.searchByUsername = (input, result) => {
    const searchValue = input.value;
    let whereClaus = `username LIKE \'%${searchValue}%\'`;

    if (input.filter === 'fullName')
        whereClaus = `concat(first_name, ' ', last_name) LIKE \'%${searchValue}%\'`;

    //the default query string friends by a username
    let queryString = `SELECT u.id, username, email, first_name, last_name, status as friendship_status \
        FROM users AS u \
        LEFT JOIN friendships \
        ON (u.id = user_one_id OR u.id = user_two_id) \
        WHERE ${whereClaus}`;

    //updates the query string when the fullname filter is specified

    //sends the query to the database
    sql.query(queryString, (err, res) => result(err, res));
};

//deletes a friendship
exports.removeFriendByID = (userID, friendID, result) => {
    //sends delete request to tbe database
    sql.query(
        `DELETE FROM friendships \
        WHERE \
        (user_one_id = ? AND user_two_id = ? OR user_one_id = ? AND user_two_id = ?)`, 
        [userID, friendID, friendID, userID], 
        (err, res) => result(err, res)
    );
};


//runs when a request is confirmed, or if a user gets blocked or reported.
exports.changeStatus = (userID, actionMode, friendId, result) => {
    let query = `UPDATE friendships \
    SET status = ${actionMode}, action_user_id = ${userID} \
    WHERE (user_one_id = ${userID} AND user_two_id = ${friendId} \
    OR user_two_id = ${userID} AND user_one_id = ${friendId})`;

    if (actionMode === -1)
        query = `DELETE FROM friendships \
        WHERE (user_one_id = ${userID} AND user_two_id = ${friendId} \
        OR user_two_id = ${userID} AND user_one_id = ${friendId})`;

    sql.query(query, (err) => result(err));
};
