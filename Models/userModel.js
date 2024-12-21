const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must have a user name"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "user must have email"],
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please provide a valid email address",
    ],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "user must have password"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  userPassword,
  orginalPassword
) {
  return await bcrypt.compare(userPassword, orginalPassword);
};

const User = mongoose.model("USER", userSchema);
module.exports = User;
