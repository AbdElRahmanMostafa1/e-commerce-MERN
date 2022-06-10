const router = require("express").Router();
const { auth, admin, seller } = require("../middleware/auth");
const {
  userAddOrder,
  userGetAllOrders,
  adminGetAllOrders,
  adminEditOrder,
  userGetSingleOrder
} = require("../controllers/orderController");

router.route("/order").post(auth, userAddOrder).get(userGetAllOrders);
router.route(`/order/:id`).get(userGetSingleOrder)

router.route("/admin/order").get(adminGetAllOrders);
router.route("/admin/order/:id").patch(auth, admin, adminEditOrder);

module.exports = router;
