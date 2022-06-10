const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace(`Bearer `, "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id);
    req.user = user;
    req.token = token;

    if (!token || !user) {
      throw new Error();
    }

    next();
  } catch (error) {
    res.status(401).send("Please Auth");
  }
};

const admin = (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      return next();
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(401).send("Please Auth as an Admin");
  }
};

const seller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send("Please Auth as a seller");
  }
};

module.exports = { auth, admin, seller };
