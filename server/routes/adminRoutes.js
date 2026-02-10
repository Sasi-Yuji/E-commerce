const express = require("express");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const User = require("../models/User");
const Order = require("../models/Order");
const Donation = require("../models/Donation");
const Product = require("../models/Product");

const router = express.Router();

router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalDonations = await Donation.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$total" } } }
    ]);

    const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].total : 0;

    res.json({
      totalUsers,
      totalOrders,
      totalDonations,
      totalProducts,
      totalRevenue
    });
  } catch (err) {
    console.error("Error fetching stats:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
