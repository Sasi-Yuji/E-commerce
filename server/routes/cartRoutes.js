const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Cart = require("../models/Cart");

const router = express.Router();

/**
 * @desc   Get logged-in user's cart
 * @route  GET /api/cart
 * @access Private
 */
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.json({ items: [] });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error fetching cart" });
  }
});

/**
 * @desc   Add item to cart
 * @route  POST /api/cart
 * @access Private
 */
router.post("/", protect, async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error adding to cart" });
  }
});

/**
 * @desc   Remove item from cart
 * @route  DELETE /api/cart/:productId
 * @access Private
 */
router.delete("/:productId", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error removing from cart" });
  }
});

/**
 * @desc   Clear entire cart
 * @route  DELETE /api/cart
 * @access Private
 */
router.delete("/", protect, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Server error clearing cart" });
  }
});

module.exports = router;
