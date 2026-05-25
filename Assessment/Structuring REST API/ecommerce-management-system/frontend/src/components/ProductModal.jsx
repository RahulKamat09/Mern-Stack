import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../services/api";
import "../styles/modal.css";

const ProductModal = ({
  isOpen,
  onClose,
  fetchProducts,
  editProduct
}) => {
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null
  });

  const [preview, setPreview] = useState("");

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

    if (editProduct) {
      setFormData({
        name: editProduct.name,
        description: editProduct.description,
        price: editProduct.price,
        stock: editProduct.stock,
        category: editProduct.category?._id || "",
        image: null
      });

      setPreview(
        editProduct.image
          ? `http://localhost:5000${editProduct.image}`
          : ""
      );

    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        image: null
      });

      setPreview("");
    }
  }, [editProduct]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];

      setFormData({
        ...formData,
        image: file
      });

      if (file) {
        setPreview(URL.createObjectURL(file));
      }

      return;
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();

    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("price", formData.price);
    productData.append("stock", formData.stock);
    productData.append("category", formData.category);

    if (formData.image) {
      productData.append("image", formData.image);
    }

    try {
      if (editProduct) {
        await api.put(
          `/products/${editProduct._id}`,
          productData
        );

        Swal.fire("Updated!", "Product updated.", "success");

      } else {
        await api.post("/products", productData);

        Swal.fire("Added!", "Product created.", "success");
      }

      fetchProducts();
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
          {editProduct ? "Edit Product" : "Add Product"}
        </h2>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
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

          <input
            type="number"
            name="price"
            placeholder="Price"
            className="modal-input"
            value={formData.price}
            onChange={handleChange}
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="modal-input"
            value={formData.stock}
            onChange={handleChange}
          />

          <select
            name="category"
            className="modal-input"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="preview-image"
            />
          )}

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

export default ProductModal;