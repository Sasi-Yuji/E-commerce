const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  getUsers,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", protect, adminOnly, getUsers);

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);



module.exports = router;
