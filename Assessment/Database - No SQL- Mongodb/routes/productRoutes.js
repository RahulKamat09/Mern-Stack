import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Product from '../models/Product.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, '../access.log');

// Helper to wrap route handlers in try-catch to pass to next()
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ==========================================
// 1. READ ALL PRODUCTS
// ==========================================
router.get('/', asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  let query = {};

  // Category Filtering
  if (category) {
    query.category = category;
  }

  // Text / Keyword Search
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const products = await Product.find(query).sort({ createdAt: -1 });
  
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
}));

// ==========================================
// 2. CATEGORY AGGREGATION REPORT
// ==========================================
// Note: This route must go BEFORE /:id to prevent being treated as an ID parameter
router.get('/reports/categories', asyncHandler(async (req, res) => {
  const report = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        totalStock: { $sum: '$stock' },
        totalValue: { $sum: { $multiply: ['$price', '$stock'] } },
        averagePrice: { $avg: '$price' },
        productCount: { $sum: 1 }
      }
    },
    {
      $sort: { totalValue: -1 } // Sort by highest stock value
    }
  ]);

  res.status(200).json({
    success: true,
    data: report
  });
}));

// ==========================================
// 3. READ SINGLE PRODUCT
// ==========================================
router.get('/:id', asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error(`Product not found with id of ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    data: product
  });
}));

// ==========================================
// 4. CREATE PRODUCT
// ==========================================
router.post('/', asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: product
  });
}));

// ==========================================
// 5. UPDATE PRODUCT (uses $set internally and explicitly)
// ==========================================
router.put('/:id', asyncHandler(async (req, res) => {
  // Using explicit $set operator as requested in Section B Task 4
  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { 
      new: true, // Returns the updated document instead of the old one
      runValidators: true // Enforces Mongoose schema validation rules on update
    }
  );

  if (!updatedProduct) {
    res.status(404);
    throw new Error(`Product not found with id of ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    message: 'Product attributes updated successfully',
    data: updatedProduct
  });
}));

// ==========================================
// 6. ATOMIC STOCK ADJUSTMENT ($inc)
// ==========================================
router.patch('/:id/stock', asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (amount === undefined || typeof amount !== 'number') {
    res.status(400);
    throw new Error('Please provide an amount (integer number) to adjust stock levels');
  }

  // To prevent stock levels from dipping below zero in concurrent environments,
  // we add a query filter: "stock + amount >= 0" which is "stock >= -amount" for decrements.
  let query = { _id: req.params.id };
  if (amount < 0) {
    query.stock = { $gte: Math.abs(amount) };
  }

  const updatedProduct = await Product.findOneAndUpdate(
    query,
    { $inc: { stock: amount } },
    { 
      new: true,
      runValidators: true
    }
  );

  if (!updatedProduct) {
    // Check if product exists but lacks sufficient stock
    const exists = await Product.findById(req.params.id);
    if (!exists) {
      res.status(404);
      throw new Error(`Product not found with id of ${req.params.id}`);
    } else {
      res.status(400);
      throw new Error(`Insufficient stock level. Cannot decrement stock by ${Math.abs(amount)} from current level of ${exists.stock}`);
    }
  }

  res.status(200).json({
    success: true,
    message: `Stock levels successfully ${amount > 0 ? 'incremented' : 'decremented'} by ${Math.abs(amount)}`,
    data: updatedProduct
  });
}));

// ==========================================
// 7. DELETE PRODUCT
// ==========================================
router.delete('/:id', asyncHandler(async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    res.status(404);
    throw new Error(`Product not found with id of ${req.params.id}`);
  }

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
    data: deletedProduct
  });
}));

// ==========================================
// 8. AUDIT LOG RETRIEVAL (Helper for Dashboard)
// ==========================================
router.get('/logs/view', asyncHandler(async (req, res) => {
  try {
    if (!fs.existsSync(logFilePath)) {
      return res.status(200).json({ success: true, logs: 'No audit logs found yet. Interaction creates logs!' });
    }
    
    // Read the log file asynchronously
    const data = await fs.promises.readFile(logFilePath, 'utf8');
    // Send the last 100 lines for high efficiency
    const lines = data.trim().split('\n').slice(-100).reverse().join('\n');
    
    res.status(200).json({
      success: true,
      logs: lines
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to read audit log' });
  }
}));

export default router;
