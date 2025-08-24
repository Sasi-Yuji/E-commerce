const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Create new order (also handles donation creation inside controller)
router.post("/", protect, createOrder);

// Get logged-in user's orders
router.get("/my", protect, getMyOrders);
router.get("/myorders", protect, getMyOrders);

// Get all orders (Admin only)
router.get("/", protect, adminOnly, getAllOrders);

// Get order by ID
router.get("/:id", protect, getOrderById);

// Update order status (Admin only)
router.put("/:id/status", protect, adminOnly, updateOrderStatus);

module.exports = router;
