const { MongoClient } = require("mongodb");

let db = null;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DATABASE_NAME = "student_management";

const connectDB = async () => {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DATABASE_NAME);
    console.log(`Connected to MongoDB database: ${DATABASE_NAME}`);
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not connected. Call connectDB first.");
  }
  return db;
};

module.exports = { connectDB, getDB };