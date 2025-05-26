// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// // Register user
// const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     return res.status(400).json({ error: "User already exists" });
//   }

//   const user = new User({
//     name,
//     email,
//     password,
//   });

//   await user.save();

//   res.status(201).json({
//     message: "User registered successfully",
//   });
// };

// // Login user and return JWT token
// const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(401).json({ error: "Invalid email or password" });
//   }

//   const isMatch = await user.matchPassword(password);

//   if (!isMatch) {
//     return res.status(401).json({ error: "Invalid email or password" });
//   }

//   const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });

//   res.json({
//     message: "Login successful",
//     token,
//     user: {
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//     },
//   });
// };

// module.exports = { registerUser, loginUser };
