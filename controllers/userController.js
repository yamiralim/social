const { User, Thought } = require('../models');

module.exports = {
    // Get all users.
    getUsers(req, res) {
        User.find() // Search for all users.
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single user by its `_id`.
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId }) // Search for a user with the _id property matching the value of req.params.userId.
            .select('-__v') // The .select('-__v') method is used to exclude the __v field from the user object that will be returned. The __v field is a version key automatically added to MongoDB documents by Mongoose.
            .populate('friends') // Populates the friends field of the user object with the corresponding friends documents from the database.
            .populate('thoughts') // Populates the thoughts field of the user object with the corresponding thoughts documents from the database.
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a new user.
    createUser(req, res) {
        User.create(req.body)
            .then((newUser) => res.json(newUser))
            .catch((err) => res.status(500).json(err));
    },
    // Update a user by its `_id`.
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, // Finds the user to be updated.
            { $set: req.body }, // Updates their new value using the request's body.
            { runValidators: true, new: true } // To validate the updated fields against the User schema's validation rules, and returns the updated user object instead of the original one.
        )
            .then((updatedUser) =>
                !updatedUser
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(updatedUser)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Delete a user and his/her associated thoughts.
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId }) // Finds the user to be deleted.
            .then((deletedUser) =>
                !deletedUser
                    ? res.status(404).json({ message: 'No user with that ID' })
                    : Thought.deleteMany({ _id: { $in: deletedUser.thoughts } }) // Calls the "deleteMany" method of the "Thought" model to delete all the thoughts associated with the user. 
            )
            .then(() => res.json({ message: 'User and associated thoughts were deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    // Add a new friend to a user's friend list.
    addUserFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId } }, // The $addToSet operator is used to ensure that the new friend is only added to the array if they do not already exist in the array.
            { runValidators: true, new: true }
        )
            .then((newUserFriend) =>
                !newUserFriend
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json(newUserFriend)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove a friend from a user's friend list.
    removeUserFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } }, // the $pull operator to remove the friend object from the friends array where the friendId matches the specified friendId in the request parameters.
            { runValidators: true, new: true }
        )
            .then((removedUserFriend) =>
                !removedUserFriend
                    ? res.status(404).json({ message: 'No user with this id!' })
                    : res.json({ message: 'Friend deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
};