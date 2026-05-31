import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import requestLogger from './middleware/logger.js';
import errorHandler from './middleware/error.js';
import productRoutes from './routes/productRoutes.js';

// Load environment configuration
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json()); // Parses incoming application/json requests

// Apply custom request logger middleware (Section B Task 2)
app.use(requestLogger);

// Serve Static Frontend Assets (Serving our Gorgeous Admin Dashboard UI)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes (Section B & C Requirements)
app.use('/api/products', productRoutes);

// Root route redirects/serves the public index.html automatically via express.static,
// but let's add an explicit root listener in case index.html is requested explicitly.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Apply Global Error Handling Middleware (Section C Task 4)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\x1b[36m[Server] Running in development mode on port ${PORT}\x1b[0m`);
  console.log(`\x1b[36m[Server] Interactive Admin Dashboard is accessible at http://localhost:${PORT}\x1b[0m`);
});
