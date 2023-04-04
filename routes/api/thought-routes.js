const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addThoughtReaction,
    removeThoughtReaction
} = require('../../controllers/thoughtController');

// GET all thoughts / POST a new thought
router.route('/').get(getThoughts).post(createThought);

// GET to a single thought by its `_id` / PUT to update a thought by its `_id`
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought); // DELTE to remove a thought by its `_id`.

// POST to add a new reaction to a single thought.
router.route('/:thoughtId/reactions').post(addThoughtReaction);

// DELETE to pull and remove a reaction from a thought's reaction list by the reaction's `reactionId` value.
router.route('/:thoughtId/reactions/:reactionId').delete(removeThoughtReaction);

module.exports = router;