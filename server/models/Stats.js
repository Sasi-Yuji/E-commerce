const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema(
  {
    totalOrders: { type: Number, default: 0 },
    totalRevenue: { type: Number, default: 0 },
    totalUsers: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    totalDonations: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stats", statsSchema);
