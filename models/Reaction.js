const { Schema, Types } = require('mongoose');

// Reaction Schema.
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
                return timestamp.toLocaleString(); // format the timestamp using the toLocaleString method.
                // returns a string representation of a date and time that is formatted according to the locale settings of the user's computer.
            }
        }
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;