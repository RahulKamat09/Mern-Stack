const Product = require("../models/Product");
const Category = require("../models/Category");


// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category
    } = req.body;

    if (!name || !description || !price || !stock || !category) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : "";

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      image: imagePath
    });

    res.status(201).json({
      message: "Product created successfully",
      product
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");

    res.status(200).json({
      total: products.length,
      products
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category");

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category
    } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(404).json({
          message: "Category not found"
        });
      }
    }

    const imagePath = req.file
      ? `/uploads/${req.file.filename}`
      : undefined;

    const updateData = {
      name,
      description,
      price,
      stock,
      category
    };

    if (imagePath) {
      updateData.image = imagePath;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate("category");

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
  createProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};