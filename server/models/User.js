const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressAsyncHandler = require("express-async-handler");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(`Please Provide a valid email address`);
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      type: String,
      required: true,
    },
  ],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});

userSchema.statics.findByEmailAndPassword = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Email is Wrong");
  }

  const isPassMatch = await bcrypt.compare(password, user.password);
  if (!isPassMatch) throw new Error("Pass is Wrong");

  return user;
};

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET);
  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
