const express = require("express");
const multer = require("multer");

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

/**
 * Cloudinary storage configuration
 * Uploaded images go to: cloudinary / shopsphere/products
 * req.file.path → permanent Cloudinary HTTPS URL
 */
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "shopsphere/products",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});

const upload = multer({ storage });

// Get all products
router.get("/", getProducts);

router.get("/:id", getProductById);

// Add a new product with image upload (Admin only)
router.post("/", protect, adminOnly, upload.single("image"), addProduct);

// Update a product with optional new image (Admin only)
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);

// Delete a product (Admin only)
router.delete("/:id", protect, adminOnly, deleteProduct);

module.exports = router;
