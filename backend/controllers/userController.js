const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a User controller
const registerUser = asyncHandler(async (req, res) => {
  const { username, name, email, password } = req.body;

  if (!username || !name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //   Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //   Has password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //   Create User
  const user = await User.create({
    username,
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(200).json({ message: "Register User" });
});

// Login a User controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      name: user.name,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// Get all users controller
const getUserInfo = asyncHandler(async (req, res) => {
   const {_id, username, name, email } = await User.findById(req.user.id)

   res.status(200).json({
    id: _id,
    username,
    name,
    email
   })
});

// Update a User controller
const updateUser = async (req, res) => {
  res.status(200).json({ message: `${req.params.id}` });
};

// Delete a User controller
const deleteUser = async (req, res) => {
  res.status(200).json({ message: `${req.params.id}` });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { getUserInfo, loginUser, registerUser, updateUser, deleteUser };
