const { User, Thought } = require('../models');

const putUserThoughts = async () => {
    try {
        // Query the User collection to collect every username.
        const users = await User.find({}, { username: 1 });
        for (const user of users) {
            // Query the Thought collection to collect thoughtId from each username.
            const thoughts = await Thought.find({ username: user.username }, { _id: 1 });
            for (const thought of thoughts) {
                // Updates the User collection with its associated thoughtsIds.
                await User.updateOne({ username: user.username }, { $push: { thoughts: thought._id } });
                console.log(`Updated ${user.username} with thought ${thought._id}`);
            }
        }
    } catch (error) {
        console.error('Error updating user thoughts:', error);
    }
};


module.exports = putUserThoughts;