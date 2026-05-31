# E-Commerce Product Backend & Inventory Engine

A high-performance, feature-rich **REST API** and **Interactive Admin Dashboard** built for managing an E-Commerce product catalog and inventory system. This project fulfills all conceptual, practical, and mini-project requirements for the Node.js & MongoDB Assessment.

---

## 🌟 Key Features

* **High-Fidelity REST API**: Complete CRUD routes powered by **Express.js** and **Mongoose** models.
* **Automatic Data Seeding**: Populates 5 premium products upon first boot if the database is empty, offering a gorgeous instant visualization.
* **Non-Blocking Audit Logger**: Custom server middleware using Node's asynchronous `fs` promise operations to append requests securely to a local `access.log` file.
* **Atomic Inventory Controls**: Utilizes MongoDB's `$inc` operator at the database layer to ensure race-condition-free increments and decrements, preventing negative inventory.
* **Real-time MongoDB Aggregation**: Multi-stage pipeline employing `$group`, `$sum`, and `$avg` to calculate total category stock volume, total inventory value, average prices, and model counts in real-time.
* **Global Error Middleware**: Centralized error interceptor managing ObjectID conversions (`CastError`), validations (`ValidationError`), and key collisions (`DuplicateKeyError` 11000) with clean JSON payloads.
* **Interactive Admin Dashboard (SPA)**: A premium glassmorphism Single Page Application serving:
  * **Inventory Board**: A visually stunning dashboard to edit, search, filter, delete, and atomically adjust stock levels.
  * **Aggregation Hub**: Charts and share statistics derived live from the MongoDB aggregation engine.
  * **Audit Terminal**: Color-coded live log stream feeding requests straight from `access.log`.
  * **Conceptual Sandbox**: Interactive simulator visualizing blocking vs non-blocking I/O concepts.

---

## 📂 Project Architecture

```
d:\Mern-Stack\Assessment\Database - No SQL- Mongodb
├── package.json         # Backend manifest and dependencies
├── server.js            # Main Express loader and server startup
├── .env                 # Environment configurations (Port, URI)
├── config/
│   └── db.js            # Mongoose connection & auto-seeding logic
├── models/
│   └── Product.js       # Product schema, validators & indices
├── middleware/
│   ├── logger.js        # Custom non-blocking request logger (fs)
│   └── error.js         # Centralized error handler & status codes
├── routes/
│   └── productRoutes.js # REST API controllers and logs reader
├── public/              # Visual Dashboard files (SPA)
│   ├── index.html       # HTML layout & Interactive Sandbox UI
│   ├── styles.css       # Custom Glassmorphism styles
│   └── app.js           # Client controller & state manager
├── access.log           # Generated activity logs (created automatically)
├── ANSWERS.md           # Theoretical conceptual answers (Section A)
└── README.md            # System handbook (this file)
```

---

## 🚀 Setup & Execution Guide

### Prerequisites
* **Node.js** (v16.0.0 or higher recommended)
* **MongoDB** (Ensure standard local MongoDB service is running, or get an Atlas Connection string)

### 1. Configure the Database Connection
Environment variables are defined in the [.env](file:///d:/Mern-Stack/Assessment/Database%20-%20No%20SQL-%20Mongodb/.env) file:
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/product-inventory-api
```
*(Using `127.0.0.1` instead of `localhost` avoids potential IPv6 DNS latency delays in modern Node versions).*

### 2. Start the Server
Run the following commands in your terminal:

```powershell
# 1. Install dependencies
cmd /c npm install

# 2. Run in Production mode
npm start

# OR Run in Hot-Reload Development mode
npm run dev
```

### 3. Open the Dashboard
Once started, navigate to:
👉 **[http://localhost:5000](http://localhost:5000)**

---

## ⚡ REST API Endpoint Reference

| Method | Endpoint | Description | Payload Body (JSON) |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/api/products` | Read all items (supports `?search=...` and `?category=...` filters) | *None* |
| **`GET`** | `/api/products/:id` | Read single product by MongoDB ID | *None* |
| **`POST`**| `/api/products` | Create a new product (handles Mongoose validation checks) | `{"name", "price", "stock", "category", "description"}` |
| **`PUT`** | `/api/products/:id` | Update specific product attributes (Uses `$set` internally) | `{"description", "price", ...}` |
| **`PATCH`**| `/api/products/:id/stock` | Atomic stock adjustment (Uses `$inc` to avoid race conditions) | `{"amount": 5}` *(Restock)* or `{"amount": -2}` *(Deduct)* |
| **`DELETE`**| `/api/products/:id` | Remove product from catalog | *None* |
| **`GET`** | `/api/products/reports/categories` | Real-time aggregate reports ($group, $sum, $avg) | *None* |
| **`GET`** | `/api/products/logs/view` | Read last 100 entries of `access.log` for dashboard | *None* |

---

## 📝 Conceptual Answers
Explanations for **Section A** conceptual understanding are located in **[ANSWERS.md](file:///d:/Mern-Stack/Assessment/Database%20-%20No%20SQL-%20Mongodb/ANSWERS.md)** and are also viewable dynamically inside the **Conceptual Sandbox** tab on the running dashboard.
