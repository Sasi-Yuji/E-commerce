// controllers/authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Stats = require("../models/Stats");

const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ================= REGISTER =================
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const finalName = name || username;
    if (!finalName || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name (or username), email, and password required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const role = email === "admin6337@gmail.com" ? "admin" : "user";

    const user = await User.create({
      name: finalName,
      email,
      password: hashed,
      role,
    });

    // Increment totalUsers in Stats (safely)
    await Stats.findOneAndUpdate(
      {},
      { $inc: { totalUsers: 1 } },
      { upsert: true, new: true }
    );

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: signToken(user._id, user.role),
      redirect: user.role === "admin" ? "/admin/dashboard" : "/",
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// ================= LOGIN =================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hardcoded admin login option
    if (email === "admin6337@gmail.com" && password === "admin6337") {
      return res.json({
        _id: "special-admin-id",
        name: "Super Admin",
        email,
        role: "admin",
        token: signToken("special-admin-id", "admin"),
        redirect: "/admin/dashboard",
      });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: signToken(user._id, user.role),
      redirect: user.role === "admin" ? "/admin/dashboard" : "/",
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// ================= GET CURRENT USER =================
const getMe = async (req, res) => {
  return res.json(req.user);
};

module.exports = { registerUser, loginUser, getMe };
