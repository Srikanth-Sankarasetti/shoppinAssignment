const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const catchAsyncError = require("../utils/catchAsyncerror");

//signup function to create user
exports.signup = catchAsyncError(async (req, res, next) => {
  const { email } = req.body;
  const userDetails = await User.findOne({ email });
  if (userDetails) {
    const err = new Error("user already exits");
    return next(err);
  }
  const userCreate = await User.create(req.body);

  const token = jwt.sign({ id: userCreate._id }, "srikanth");

  res.status(200).send({
    status: "successfull",
    userCreate,
    token,
  });
});

//login authentication
exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const userDetails = await User.findOne({ email });
  if (!userDetails) {
    res
      .status(401)
      .send({ status: "Fail", message: "user not available in database" });
  } else {
    const isMatch = await userDetails.comparePassword(
      password,
      userDetails.password
    );
    if (isMatch) {
      const token = jwt.sign({ id: userDetails._id }, "srikanth");
      res.status(200).send({ token });
    } else {
      res.status(401).send({ status: "Fail", message: "invalid password" });
    }
  }
});
