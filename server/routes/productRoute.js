const router = require("express").Router();
const { auth, seller, admin } = require("../middleware/auth");

const {
  addProduct,
  getAllProducts,
  getSingleProduct,
  sellerEditProduct,
  sellerDeleteProduct,
  adminEditProduct,
  adminDeleteProduct,
} = require("../controllers/productController");

router.route("/product").get(getAllProducts);
router.route("/product/:id").get(getSingleProduct);

router.route(`/admin/product`).post(auth, admin, addProduct);
router.route("/seller/product").post(auth, seller, addProduct);

router
  .route(`/admin/product/:id`)
  .patch(auth, admin, adminEditProduct)
  .delete(auth, admin, adminDeleteProduct);

router
  .route("/seller/product/:id")
  .patch(auth, seller, sellerEditProduct)
  .delete(auth, seller, sellerDeleteProduct);

module.exports = router;
