const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const signUp = asyncHandler(async (req, res) => {
  const user = new User(req.body);
  const token = await user.generateAuthToken();
  res.status(201).send({ user, token });
});

const login = asyncHandler(async (req, res) => {
  const user = await User.findByEmailAndPassword(
    req.body.email,
    req.body.password
  );
  const token = await user.generateAuthToken();
  res.status(200).send({ user, token });
});

module.exports = { signUp, login };
