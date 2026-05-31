import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the log file is placed in the root directory
const logFilePath = path.join(__dirname, '..', 'access.log');

const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  // Wait for the request to finish processing before writing to the log
  res.on('finish', async () => {
    const duration = Date.now() - startTime;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    
    // Format: [2026-05-31 12:15:30] GET /api/products 200 - 45ms
    const logMessage = `[${timestamp}] ${req.method} ${req.originalUrl || req.url} ${res.statusCode} - ${duration}ms\n`;

    try {
      // Use non-blocking async appendFile to protect server throughput
      await fs.promises.appendFile(logFilePath, logMessage, 'utf8');
    } catch (err) {
      console.error('\x1b[31m[Logger Error] Failed to write to access.log:\x1b[0m', err.message);
    }
  });

  next();
};

export default requestLogger;
