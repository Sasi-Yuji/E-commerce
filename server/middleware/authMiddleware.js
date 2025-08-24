// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware: Protect routes (only logged-in users can access)
const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";

    if (!header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    // Special hardcoded admin case
    if (decoded.id === "special-admin-id") {
      req.user = {
        _id: "special-admin-id",
        name: "Super Admin",
        email: "admin6337@gmail.com",
        role: "admin",
      };
      return next();
    }

    // Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error("Auth Error:", err); // logs full error now
    return res
      .status(500) // changed from 401 to 500 if it's a server-side error
      .json({ message: "Server error in authentication", error: err.message });
  }
};

// Middleware: Admin only (role === "admin")
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access required" });
};

module.exports = { protect, adminOnly };
