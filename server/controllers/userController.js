// controllers/userController.js
const User = require("../models/User");

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/users
 * @access  Private/Admin
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ users }); // 👈 wrap in object so frontend ManageUsers.jsx works
  } catch (err) {
    res.status(500).json({ message: "Server error fetching users" });
  }
};

/**
 * @desc    Get logged-in user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching profile" });
  }
};

/**
 * @desc    Update logged-in user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password; // password hash in model pre-save hook
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error updating profile" });
  }
};

module.exports = {
  getUsers,
  getUserProfile,
  updateUserProfile,
};
