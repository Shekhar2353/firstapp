const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const registerUser = asyncHandler(async (req, res) => {
  const { name, mobile, password } = req.body;
  if (!name || !mobile || !password) {
    res.status(400).json("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ mobile });

  if (userExists) {
    res.status(400).json("User already exists");
  } else {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      mobile,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        // _id: user.id,
        name: user.name,
        mobile: user.mobile,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json("Invalid user data");
      throw new Error("Invalid user data");
    }
  }
});

// const loginFarmar = asyncHandler(async (req, res) => {
//   const { mobile, password } = req.body;

//   // Check for user email
//   const user = await Farmar.findOne({ mobile });

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       // _id: user._id,
//       name: user.name,
//       token: generateToken(user._id)
//     });
//   } else {
//     res.status(400).json("Invalid credentials");
//     // throw new Error('Invalid credentials')
//   }
// });

// const getMe = asyncHandler(async (req, res) => {
//   const { _id, name } = await Farmar.findById(req.user.id);

//   res.status(200).json({
//     id: _id,
//     name,
//     email,
//   });
// });

const generateToken = (id) => {
  return jwt.sign(
    { id },
    "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1NzM1OTUxOCwiaWF0IjoxNjU3MzU5NTE4fQ.6bbKViK2sxXDJ_31ryuD2oNuKJZLREu7GdbkTBJJGiU",
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  registerUser
  // registerFarmar,
  // loginFarmar,
  //   getMe,
};
