import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CategoryModal from "../components/CategoryModal";
import api from "../services/api";
import "../styles/dashboard.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Category?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/categories/${id}`);

          Swal.fire(
            "Deleted!",
            "Category removed successfully",
            "success"
          );

          fetchCategories();

        } catch (error) {
          Swal.fire(
            "Error",
            error.response?.data?.message || "Delete failed",
            "error"
          );
        }
      }
    });
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="dashboard-content">
          <div className="page-header">
            <h1>Category Management</h1>

            <button
              className="add-btn"
              onClick={() => {
                setEditCategory(null);
                setModalOpen(true);
              }}
            >
              Add Category
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditCategory(category);
                        setModalOpen(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(category._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <CategoryModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            fetchCategories={fetchCategories}
            editCategory={editCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Categories;