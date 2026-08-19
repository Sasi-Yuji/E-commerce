const Order = require("../models/Order");
const Stats = require("../models/Stats");
const User = require("../models/User");
const Donation = require("../models/Donation"); 

const createOrder = async (req, res) => {
  try {
    const { products, totalAmount, donation } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      products,
      totalAmount,
      status: "Confirmed",
    });

    const createdOrder = await order.save();

    if (donation && (donation.itemType || donation.amount)) {
      await Donation.create({
        user: req.user._id,
        order: createdOrder._id, 
        itemType: donation.itemType || null,
        description: donation.description || "",
        quantity: donation.quantity || 1,
        condition: donation.condition || "New",
        donationType: donation.donationType || "item", 
        amount: donation.amount || 0, 
      });
    }

    await Stats.findOneAndUpdate(
      {},
      {
        $inc: { totalOrders: 1, totalRevenue: totalAmount },
        $setOnInsert: { totalUsers: await User.countDocuments() },
      },
      { upsert: true, new: true }
    );

    res.status(201).json(createdOrder);
  } catch (err) {
    console.error(" Create Order Error:", err);
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(" Get My Orders Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product", "name price image")
      .populate("user", "name email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      order.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.json(order);
  } catch (err) {
    console.error(" Get Order By ID Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(" Get All Orders Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    console.error(" Update Order Status Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
