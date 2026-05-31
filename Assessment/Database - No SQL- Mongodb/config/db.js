import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/product-inventory-api');
    console.log(`\x1b[32m[Database] Connected successfully to MongoDB: ${conn.connection.host}/${conn.connection.name}\x1b[0m`);
    
    // Automatically Seed database if it is empty to ensure a beautiful out-of-the-box demo
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('\x1b[33m[Database] Collection is empty. Auto-seeding 5 premium products...\x1b[0m');
      const seedProducts = [
        {
          name: 'Quantum Pro Mechanical Keyboard',
          price: 129.99,
          description: 'Premium 87-key hot-swappable mechanical keyboard featuring silent brown switches, full RGB backlighting, and a robust aluminum body layout.',
          category: 'Peripherals',
          stock: 45
        },
        {
          name: 'Apex 34" Curved UltraWide Monitor',
          price: 449.99,
          description: 'High-performance QHD display with a 144Hz refresh rate, AMD FreeSync Premium, 1ms response speed, and vivid IPS panel color metrics.',
          category: 'Displays',
          stock: 12
        },
        {
          name: 'Helios Ergonomic Office Chair',
          price: 279.50,
          description: 'Premium ergonomic desk chair with 3D adjustable armrests, adaptive lumbar supports, breathable mesh structure, and smooth-glide wheels.',
          category: 'Furniture',
          stock: 8
        },
        {
          name: 'Nexus USB-C Multiport Hub',
          price: 59.99,
          description: 'Aluminium 8-in-1 dongle providing 4K HDMI, Gigabit Ethernet, SD card slot, 3x USB 3.0 ports, and 100W Power Delivery pass-through connectivity.',
          category: 'Peripherals',
          stock: 90
        },
        {
          name: 'Aero Wireless Active Headphones',
          price: 189.99,
          description: 'Superior over-ear headphones with advanced hybrid Active Noise Cancellation, high-fidelity sound, and an ultra-long 40-hour battery life.',
          category: 'Audio',
          stock: 3
        }
      ];
      
      await Product.insertMany(seedProducts);
      console.log('\x1b[32m[Database] Auto-seeding completed! 5 products inserted successfully.\x1b[0m');
    }
  } catch (error) {
    console.error(`\x1b[31m[Database Connection Error]: ${error.message}\x1b[0m`);
    console.error('\x1b[33mPlease verify that your MongoDB service is running locally or check the MONGODB_URI in your .env file.\x1b[0m');
    process.exit(1);
  }
};

export default connectDB;
