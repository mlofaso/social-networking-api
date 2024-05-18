const router = require("express").Router();
const {
  createUser,
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/user");

router.route("/").post(createUser).get(getAllUsers);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
