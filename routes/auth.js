const express = require("express");
const router = express.Router();
const authController = require("../controllers/authentication/authController"); // ✅ make sure spelling matches
const {protect}=require("../middleware/authMiddleware")
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/send-otp", authController.sendOtp);
router.post("/reset-password", authController.resetPasswordWithOtp);
router.get("/:username", protect,authController.getUserByUsername);
router.put("/users/:id", authController.updateUser);
module.exports = router;
