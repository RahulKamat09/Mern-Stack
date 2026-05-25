import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        navigate("/");
      }
    });
  };

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        E-Commerce Admin
      </div>

      <div className="sidebar-menu">
        <Link to="/dashboard" className="sidebar-link">
          Dashboard
        </Link>

        <Link to="/products" className="sidebar-link">
          Products
        </Link>

        <Link to="/categories" className="sidebar-link">
          Categories
        </Link>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;