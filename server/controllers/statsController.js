const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Donation = require("../models/Donation");

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, revenue: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = totalRevenueAgg.length > 0 ? totalRevenueAgg[0].revenue : 0;

    const totalDonations = await Donation.countDocuments();

    res.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue,
      totalDonations,
    });
  } catch (err) {
    console.error("❌ Get Stats Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getStats };
