const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getUsers,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

// Get all users (admin only)
router.get("/", protect, adminOnly, getUsers);

// Get logged-in user's profile
router.get("/profile", protect, getUserProfile);

// Update logged-in user's profile
router.put("/profile", protect, updateUserProfile);



module.exports = router;
