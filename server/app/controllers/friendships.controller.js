const Friendship = require('./../models/friendship.model.js')

exports.create = (req, res) => {
    // Validate request
    if (!req.body) handleDBError(res, 400, "Content Can not be empty!")

    // Create a user
    const user = new User({
        email: req.body.email,
        username: req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    });

    // Save user in the database
    Friendship.create(user, (err, data) => {

		if (err) handleDBError(res, 500, "error while trying to save your information.")
	    else res.send(data);
    });
};


exports.searchById = (req, res) => {
    Friendship.searchByID(req.query.value, (err, data) => {
        if (err) handleDBError(res, 500, `Error while trying to find: ${req.query.value}`)
	    else res.send(data);
    })
}

exports.searchByUsername = (req, res) => {
    Friendship.searchByUsername(req.query, (err, data) => {
        if (err) handleDBError(res, 500, "error while trying to save your information.")
	    else res.json(data);
    })
}

exports.getFriends = (req, res) => {
    Friendship.searchByID(req.decoded.id, (err, data) => {
        if (err) handleDBError(res, 500, "error while trying to save your information.")
        else if (data.res.length == 0) res.json({message: 'no friends'})
	    else res.json(data.res);
    })
}

exports.removeFriend = (req, res) => {
    Friendship.removeFriendByID(req.decoded.id, req.params.friendId, (err, data) => {
        if (err) handleDBError(res, 500, "error while trying to save your information.")
	    else res.json({success: true, message: 'friend has been sucessfuly removed'});
    })
}

exports.changeStatus = (req, res) => {
    Friendship.changeStatus(req.decoded.id, req.params, (err, data) => {
        if (err) handleDBError(res, 500, "error while trying to block the user")
        else res.json({success: true});
    })
}
