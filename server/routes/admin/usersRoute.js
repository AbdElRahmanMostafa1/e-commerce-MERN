const router = require("express").Router();
const {
  getAllUsers,
  getSingleUser,
  editSingleUser,
  getAllSellers,
  deleteUser,
} = require("../../controllers/admin/usersController");

// Users Route
router.route("/users").get(getAllUsers);
// Single Users
router
  .route("/users/:id")
  .get(getSingleUser)
  .patch(editSingleUser)
  .delete(deleteUser);

// Get All Sellers Route
router.route("/sellers").get(getAllSellers);

module.exports = router;
