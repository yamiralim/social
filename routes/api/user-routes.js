const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addUserFriend,
  removeUserFriend
} = require('../../controllers/userController');

// GET all users.
router.route('/').get(getUsers).post(createUser); // POST a new user.

// GET a single user by its `_id` and populated thought and friend data.
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser); // PUT to update a user by its `_id` / DELETE to remove user by its `_id` and his/her associates thoughts.

// POST to add a new friend to a user's friend list.
router.route('/:userId/friends').post(addUserFriend);

 // DELETE to pull and remove a friend from a user's friend list.
router.route('/:userId/friends/:friendId').delete(removeUserFriend);

module.exports = router;