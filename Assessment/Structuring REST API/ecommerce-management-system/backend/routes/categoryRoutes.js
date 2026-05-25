const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");

const {
  verifyToken,
  isAdmin
} = require("../middleware/authMiddleware");


// PUBLIC
router.get("/", getCategories);
router.get("/:id", getSingleCategory);


// ADMIN ONLY
router.post(
  "/",
  verifyToken,
  isAdmin,
  createCategory
);

router.put(
  "/:id",
  verifyToken,
  isAdmin,
  updateCategory
);

router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  deleteCategory
);

module.exports = router;