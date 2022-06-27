const mongoose = require("../db/mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A product must have a title"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "A product must have a price"],
    },
    img: {
      type: String,
      default: "default.png",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
