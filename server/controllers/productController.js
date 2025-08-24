const Product = require("../models/Product");
const Stats = require("../models/Stats");

// @desc Get all products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get single product
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Add product
// @route POST /api/products
// @access Admin
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });

    const createdProduct = await product.save();

    // ✅ Increment totalProducts in Stats
    await Stats.findOneAndUpdate(
      {},
      { $inc: { totalProducts: 1 } },
      { upsert: true, new: true }
    );

    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: "Error adding product" });
  }
};

// @desc Update product
// @route PUT /api/products/:id
// @access Admin
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.category = category || product.category;

      if (req.file) {
        product.image = `/uploads/${req.file.filename}`;
      }

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

// @desc Delete product
// @route DELETE /api/products/:id
// @access Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.remove();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
