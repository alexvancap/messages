const User = require('./../models/user.model.js')
const handleDBError = require('./../services/handleDBError')

// Create and Save a new user
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
    User.create(user, (err, data) => {

				if (err) handleDBError(res, 500, "error while trying to save your information.")
	      else res.send(data);
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.findAll((err, data) => {

				if (err) handleDBError(res, 500, "error while fetching all users.")
	      else res.send(data);
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {

				if (err) handleDBError(res, 500, "Some error occurred while retrieving the user.")
        else res.send(data)
    })
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) handleDBError(res, 400, "Please enter a userId!")

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
		        if (err && err.kind === "not_found")
								handleDBError(res, 404, `No user found with id ${req.params.id}`)
						else if (err)
								handleDBError(res, 500, `error with updating the user with id ${req.params.id}`)
		    		else res.send(data);
        }
    );
  };

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.deleteById(req.params.id, (err, data) => {

    		if (err) handleDBError(res, 500, "Some error occurred while deleting your account")
				else res.send({message: 'your account has been succesfully removed'})
    })
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    User.deleteAll((err, data) => {

				if (err) handleDBError(res, 500, "All the users have been removed")
				else res.send({message: 'All users have been removed'})
		})
};
