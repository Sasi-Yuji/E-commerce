const express = require("express");
const router = express.Router();
const {
  createDonation,
  getDonations,
  getMyDonations,
  updateDonationStatus,
} = require("../controllers/donationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Create new donation
router.post("/", protect, createDonation);

// Get logged-in user's donations
router.get("/my", protect, getMyDonations);

// Get all donations (Admin only)
router.get("/", protect, adminOnly, getDonations);

// Update donation status (Admin only)
router.put("/:id/status", protect, adminOnly, updateDonationStatus);

module.exports = router;
