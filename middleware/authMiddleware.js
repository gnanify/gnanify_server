const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log("Incoming token:", token);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded user:", decoded);

      req.user = await User.findById(decoded.userId).select("-password");
      if (!req.user) {
        return res.status(401).json({ error: "User not found" });
      }

      return next();
    } catch (err) {
      console.error("JWT verification error:", err.message);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  }

  res.status(401).json({ error: "Not authorized, no token" });
};
