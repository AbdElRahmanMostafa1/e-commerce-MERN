const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
  },
  amountInStock: {
    type: Number,
    required: true,
    trim: true,
    min: 1,
  },
  image: {
    type: String,
    default:
      "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png",
  },
  owner: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
