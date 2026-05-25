import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../services/api";
import "../styles/modal.css";

const CategoryModal = ({
  isOpen,
  onClose,
  fetchCategories,
  editCategory
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  });

  useEffect(() => {
    if (editCategory) {
      setFormData({
        name: editCategory.name,
        description: editCategory.description
      });
    } else {
      setFormData({
        name: "",
        description: ""
      });
    }
  }, [editCategory]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editCategory) {
        await api.put(
          `/categories/${editCategory._id}`,
          formData
        );

        Swal.fire("Updated!", "Category updated.", "success");

      } else {
        await api.post("/categories", formData);

        Swal.fire("Added!", "Category created.", "success");
      }

      fetchCategories();
      onClose();

    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2 className="modal-title">
          {editCategory ? "Edit Category" : "Add Category"}
        </h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Category Name"
            className="modal-input"
            value={formData.name}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            className="modal-input"
            value={formData.description}
            onChange={handleChange}
          />

          <div className="modal-actions">
            <button className="modal-btn save-btn" type="submit">
              Save
            </button>

            <button
              className="modal-btn cancel-btn"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;