// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// // Protect route middleware
// const protect = async (req, res, next) => {
//   let token;

//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//     try {
//       // Extract the token from the header
//       token = req.headers.authorization.split(" ")[1];

//       // Verify the token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach the user to the request object
//       req.user = await User.findById(decoded.userId).select("-password");

//       next();
//     } catch (err) {
//       console.error(err);
//       res.status(401).json({ error: "Not authorized, token failed" });
//     }
//   }

//   if (!token) {
//     res.status(401).json({ error: "Not authorized, no token" });
//   }
// };

// module.exports = { protect };
