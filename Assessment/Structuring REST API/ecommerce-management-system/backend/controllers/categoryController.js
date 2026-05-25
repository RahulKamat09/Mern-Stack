const Category = require("../models/Category");


// CREATE CATEGORY
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists"
      });
    }

    const category = await Category.create({
      name,
      description
    });

    res.status(201).json({
      message: "Category created successfully",
      category
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// GET ALL CATEGORIES
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json({
      total: categories.length,
      categories
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// GET SINGLE CATEGORY
const getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.status(200).json(category);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// UPDATE CATEGORY
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description
      },
      {
        new: true
      }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.status(200).json({
      message: "Category updated successfully",
      updatedCategory
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// DELETE CATEGORY
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);

    if (!deletedCategory) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    res.status(200).json({
      message: "Category deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createCategory,
  getCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory
};