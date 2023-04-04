const router = require('express').Router();
// Imports sets of routes:
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Uses the router to define the routes.
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;