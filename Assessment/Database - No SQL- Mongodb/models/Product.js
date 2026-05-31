import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      unique: true,
      trim: true,
      minlength: [2, 'Product name must be at least 2 characters long'],
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price must be a non-negative number']
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
      trim: true,
      index: true // Indexing category for efficient searches & aggregations
    },
    stock: {
      type: Number,
      required: [true, 'Please provide the stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: 'Stock must be an integer value'
      }
    }
  },
  {
    timestamps: true // Automatically generates createdAt and updatedAt timestamps
  }
);

// Add index on name for searching
ProductSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', ProductSchema);

export default Product;
