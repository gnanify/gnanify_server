const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateUser,
  getUserProfile,
  getAllUsers,
  deleteUser,
  logoutUser,
} = require("../controllers/authController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/logout", logoutUser);

router.get("/profile", protect, getUserProfile);
router.put("/users/:id", protect, updateUser);

router.get("/users", protect, admin, getAllUsers);
router.delete("/users/:id", protect, admin, deleteUser);

module.exports = router;
