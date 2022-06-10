const router = require("express").Router();

const { signUp, login } = require("../controllers/authController");

router.route("/register").post(signUp);
router.route("/login").post(login);

module.exports = router;
