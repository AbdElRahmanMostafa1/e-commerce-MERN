const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const getUser = asyncHandler(async (req, res) => {
  res.status(200).send(req.user);
});

const editUser = asyncHandler(async (req, res) => {
  const allowedUpdates = ["name", "email", "password"];
  const updates = Object.keys(req.body);
  const isAllowedUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (isAllowedUpdate) {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } else {
    throw new Error("Not Allowed Update");
  }
});

const deleteAccount = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);
  res.status(200).send();
});

// Logout
const logout = asyncHandler(async (req, res) => {
  req.user.tokens = req.user.tokens.filter((token) => token !== req.token);
  await req.user.save();
  res.status(200).send();
  console.log("LOGOUT");
});

module.exports = { getUser, editUser, deleteAccount, logout };
