const Donation = require("../models/Donation");
const Stats = require("../models/Stats");

// Create Donation
const createDonation = async (req, res) => {
  try {
    const { itemType, description, quantity, condition, donationType, amount } = req.body;

    if (!itemType && !amount) {
      return res.status(400).json({ message: "Donation must have itemType or amount" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    const donation = await Donation.create({
      user: req.user._id,
      itemType,
      description,
      quantity: quantity || 1,
      condition: condition || "New",
      donationType: donationType || (amount ? "money" : "item"),
      amount: amount || 0,
    });

    // Update global stats
    await Stats.findOneAndUpdate({}, { $inc: { totalDonations: 1 } }, { upsert: true });

    res.status(201).json({ message: "Donation created successfully", donation });
  } catch (err) {
    console.error("❌ Create Donation Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all donations (Admin)
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("user", "name email")
      .populate({
        path: "order",
        select: "totalAmount status createdAt products",
        populate: { path: "products.product", select: "name price" },
      })
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch donations", error: err.message });
  }
};

// Get logged-in user's donations
const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({ user: req.user._id })
      .populate("order", "totalAmount status createdAt")
      .sort({ createdAt: -1 });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch my donations", error: err.message });
  }
};

// Update donation status (Admin)
const updateDonationStatus = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) return res.status(404).json({ message: "Donation not found" });

    donation.status = req.body.status || donation.status;
    await donation.save();

    res.json({ message: "Donation status updated", donation });
  } catch (err) {
    res.status(500).json({ message: "Failed to update donation status", error: err.message });
  }
};

module.exports = {
  createDonation,
  getDonations,
  getMyDonations,
  updateDonationStatus,
};
