const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const Product = require("../models/Product");

// User makes an order
const userAddOrder = asyncHandler(async (req, res) => {
  try {
    const order = new Order({ ...req.body, user: req.user });
    await order.save();
    const products = req.body.orderItems;
    for (let i = 0; i < products.length; i++) {
      let product = await Product.findById(products[i].product);
      product.amountInStock -= Number(products[i].qty);
      await product.save();
    }
    res.status(200).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// User Get Single Order
const userGetSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user");
  res.status(200).send(order);
});

// User Get All His Orders
const userGetAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({ user: req.user._id });
  res.status(200).send(allOrders);
});

// Admin Get All Orders
const adminGetAllOrders = asyncHandler(async (req, res) => {
  const allOrders = await Order.find({});
  res.status(200).send(allOrders);
});

// admin Edit on Order
const adminEditOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const allowedUpdates = ["isDelivered"];
  const updates = Object.keys(req.body);
  const isAllowedUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isAllowedUpdate) return res.status(400).send("Not Allowed Update");
  allowedUpdates.forEach((update) => (order[update] = req.body[update]));
  await order.save();
  res.status(200).send(order);
});

module.exports = {
  userAddOrder,
  userGetAllOrders,
  adminEditOrder,
  adminGetAllOrders,
  userGetSingleOrder,
};
