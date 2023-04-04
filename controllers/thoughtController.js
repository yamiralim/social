const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts.
    getThoughts(req, res) {
        Thought.find() // Search for all thoughts.
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought by its `_id`.
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId }) // Search for a thought with the _id property matching the value of req.params.thoughtId.
            .select('-__v') // The .select('-__v') method is used to exclude the __v field from the thought object that will be returned. The __v field is a version key automatically added to MongoDB documents by Mongoose.
            .populate('reactions') // Populates the reactions field of the thought object with the corresponding reactions documents from the database.
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Create a new thought.
    createThought(req, res) {
        Thought.create(req.body)
            .then((newThought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: newThought._id } }, // Pushes the created thought's `_id` to the associated user's.
                    { new: true }
                );
            })
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'Thought created, but found no user with that ID',
                    })
                    : res.json('Created the Thought 🎉')
            )
            .catch((err) => res.status(500).json(err));
    },
    // Update a thought by its `_id`.
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId }, // Finds the thought to be updated.
            { $set: req.body }, // Updates their new value using the request's body.
            { runValidators: true, new: true } // To validate the updated fields against the Thought schema's validation rules, and returns the updated thought object instead of the original one.
        )
            .then((updatedThought) =>
                !updatedThought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(updatedThought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    // Delete a thought and removes the thought from the corresponding user's thoughts array.
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId }) // Finds the thought to be deleted.
            .then((deletedThought) =>
                !deletedThought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    // Find the user who owns the thought and remove the thought from their thoughts array using $pull operator.
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true } // Ensures that the updated user object is returned.
                    )
            )
            .then((user) =>
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Thought created but no user with this id!' })
                    : res.json({ message: 'Thought successfully deleted!' })
            ).catch((err) => res.status(500).json(err));
    },
    // Add a new reaction to a thought's reaction list.
    addThoughtReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } }, // The $addToSet operator is used to ensure that the new reaction is only added to the array if they do not already exist in the array.
            { runValidators: true, new: true }
        )
            .then((newReactionThought) =>
                !newReactionThought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(newReactionThought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove a reaction from a thought's reaction list.
    removeThoughtReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } }, // the $pull operator to remove the reaction object from the reactions array where the reactionId matches the specified reactionId in the request parameters.
            { runValidators: true, new: true }
        )
            .then((removedReactionThought) =>
                !removedReactionThought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json({ message: 'Reaction deleted!' })
            )
            .catch((err) => res.status(500).json(err));
    },
};