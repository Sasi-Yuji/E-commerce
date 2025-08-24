const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: false, // link donation to order if it came during checkout
    },
    itemType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    condition: {
      type: String,
      default: "New",
    },
    donationType: {
      type: String,
      enum: ["money", "item"],
      default: "item",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in-transit", "received", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
