const express = require("express");
const router = express.Router();
const {
  createDonation,
  getDonations,
  getMyDonations,
  updateDonationStatus,
} = require("../controllers/donationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, createDonation);

router.get("/my", protect, getMyDonations);

router.get("/", protect, adminOnly, getDonations);

router.put("/:id/status", protect, adminOnly, updateDonationStatus);

module.exports = router;
