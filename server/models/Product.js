const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    image: { type: String }, // optional: store image URL
    category: { type: String, required: true }, // e.g. "Electronics", "Books"
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Product", productSchema);
