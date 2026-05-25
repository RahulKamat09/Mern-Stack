import React from "react";

const Navbar = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div className="navbar">
      <h2 className="navbar-title">Dashboard</h2>

      <div className="navbar-user">
        Welcome, {admin?.name || "Admin"}
      </div>
    </div>
  );
};

export default Navbar;