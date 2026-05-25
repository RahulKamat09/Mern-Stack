import { FaUserPlus } from "react-icons/fa";

function Navbar({ openAddModal }) {
  return (
    <nav className="navbar">
      <h2>StudentMS</h2>

      <button onClick={openAddModal} className="add-btn">
        <FaUserPlus /> Add Student
      </button>
    </nav>
  );
}

export default Navbar;