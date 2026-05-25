import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="dashboard-content">
          <div className="stats-grid">

            <div className="stat-card">
              <div className="stat-title">Total Products</div>
              <div className="stat-number">0</div>
            </div>

            <div className="stat-card">
              <div className="stat-title">Total Categories</div>
              <div className="stat-number">0</div>
            </div>

            <div className="stat-card">
              <div className="stat-title">Active Admin</div>
              <div className="stat-number">1</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;