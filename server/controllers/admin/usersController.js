const asyncHandler = require("express-async-handler");
const User = require("../../models/User");

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({ isAdmin: false, isSeller: false });
  res.status(200).send(allUsers);
});

const getAllSellers = asyncHandler(async (req, res) => {
  const allSellers = await User.find({ isSeller: true });
  res.status(200).send(allSellers);
});

const getSingleUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  res.status(200).send(user);
});

const editSingleUser = asyncHandler(async (req, res) => {
  const allowedUpdates = ["name", "email", "password", "isSeller"];
  const updates = Object.keys(req.body);
  const isAllowedUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isAllowedUpdate) return res.status(400).send("Not Allowed Update");

  const user = await User.findById(req.params.id);

  updates.forEach((update) => (user[update] = req.body[update]));
  await user.save();

  res.status(200).send(user);
});

const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send();
});

module.exports = {
  getAllUsers,
  getAllSellers,
  getSingleUser,
  editSingleUser,
  deleteUser,
};
