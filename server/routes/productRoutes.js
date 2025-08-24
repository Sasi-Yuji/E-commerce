const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Multer storage configuration
 */
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // folder where images will be stored
  },
  filename(req, file, cb) {
    cb(
      null,
      `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`
    );
  },
});

/**
 * File filter - allow only images
 */
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|gif/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

/**
 * Routes
 */

// Get all products
router.get("/", getProducts);

// Get single product by ID
router.get("/:id", getProductById);

// Add a new product with image upload
router.post("/", protect, adminOnly, upload.single("image"), addProduct);

// Update a product with optional new image
router.put("/:id", protect, adminOnly, upload.single("image"), updateProduct);

// Delete a product
router.delete("/:id", protect, adminOnly, deleteProduct);



module.exports = router;
