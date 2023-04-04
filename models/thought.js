const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model.
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (timestamp) {
        return timestamp.toLocaleString(); // format the timestamp using the toLocaleString method.
        // returns a string representation of a date and time that is formatted according to the locale settings of the user's computer.
      }
    },
    username: {
      type: String,
      required: true,
    },
    // Array of nested documents created with the `reactionSchema`.
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Creates a virtual property `reactionCount` that retrieves the length of the thought's `reactions` array field on query.
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model.
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
