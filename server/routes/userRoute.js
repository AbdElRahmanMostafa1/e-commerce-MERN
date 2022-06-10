const router = require("express").Router();
const {
  getUser,
  editUser,
  deleteAccount,
  logout,
} = require("../controllers/userController");

router.route("/").get(getUser).patch(editUser).delete(deleteAccount);

router.route("/logout").delete(logout);

module.exports = router;
