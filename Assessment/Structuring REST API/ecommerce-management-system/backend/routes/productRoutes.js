const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const {
  verifyToken,
  isAdmin
} = require("../middleware/authMiddleware");


// PUBLIC
router.get("/", getProducts);
router.get("/:id", getSingleProduct);


// ADMIN ONLY
router.post(
  "/",
  verifyToken,
  isAdmin,
  upload.single("image"),
  createProduct
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  upload.single("image"),
  updateProduct
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteProduct
);

module.exports = router;