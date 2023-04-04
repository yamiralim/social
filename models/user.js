// Models are defined through the Schema interface.
const { Schema, model } = require('mongoose');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;

// Schema to create User model.
const userSchema = new Schema(
    {
        // Add individual properties and their types.
        username: {
            type: String,
            unique: true, // Unique index.
            trim: true, // This will remove whitespace from the beginning and end of the string.
            validate: {
                validator: function (v) {
                    return usernameRegex.test(v);
                },
                message: 'Username must only contain letters, numbers, and underscores.'
            },
            required: [true, 'Username is required!'] // If true need to add a required validator for this property.
        },
        email: {
            type: String,
            unique: true, // Unique index.
            validate: {
                validator: function (value) {
                    return emailRegex.test(value);
                },
                message: props => `${props.value} is not a valid email!`
            },
            required: [true, 'Email is required!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
                required: true
            }
        ]
    },
    {
        // Schema option to transform Objects after querying MongoDb.
        toJSON: {
            virtuals: true, // Includes virtuals in the response, overriding the default behavior.
        },
        id: false,
    }
);

// Create a virtual property `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

// Initializes the User model.
const User = model('user', userSchema);

module.exports = User;