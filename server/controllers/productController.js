const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const addProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    ...req.body,
    owner: req.user._id,
  });
  await product.save();
  res.status(201).send(product);
});

const getAllProducts = asyncHandler(async (req, res) => {
  const queryParams = req.query.product
    ? {
        name: {
          $regex: req.query.product,
          $options: "i",
        },
      }
    : {};

  const allProducts = await Product.find(queryParams);
  res.status(200).send(allProducts);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).send(product);
});

// Seller Edit
const sellerEditProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (product.owner.toString() === req.user._id.toString()) {
    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true, returnDocument: true }
    );
    res.status(200).send(product);
  } else {
    res.status(400).send("Not the product owner");
  }
});

// Admin Edit
const adminEditProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true, returnDocument: true }
  );

  res.status(200).send(product);
});

// Seller Delete
const sellerDeleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product.owner.toString() === req.user._id.toString()) {
    await Product.deleteOne({ _id: product._id });
    console.log(product.owner, req.user._id);
    return res.status(200).send();
  } else {
    console.log(product.owner, req.user._id);
    return res.status(400).send("Not the owner");
  }
});

// Admin Delete
const adminDeleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  await Product.deleteOne({ _id: product._id });
  res.status(200).send();
});

module.exports = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  adminEditProduct,
  sellerEditProduct,
  sellerEditProduct,
  sellerDeleteProduct,
  adminDeleteProduct,
};
