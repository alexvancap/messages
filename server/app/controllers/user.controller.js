const User = require('./../models/user.model.js')
const hashPassword = require('./../services/hashPassword')

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

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
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        else res.send(data);
    });
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
    User.findAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data)
    })
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }
  
    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
            res.status(404).send({
                message: `No user found with id ${req.params.id}.`
            });
            } else {
            res.status(500).send({
                message: "Error with updating the user with id " + req.params.id
            });
            }
        } else res.send(data);
        }
    );
  };

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.delete(req.params.id, (err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving customers."
            });
        else res.send({message: 'the user has been removed'})
    })
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
    User.deleteAll((err, data) => {
        if(err)
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving customers."
        });
        else res.send({message: 'All users have been removed'})
    })
};