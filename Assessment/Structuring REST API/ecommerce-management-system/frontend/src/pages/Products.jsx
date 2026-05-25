import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ProductModal from "../components/ProductModal";
import api from "../services/api";
import "../styles/dashboard.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/products/${id}`);

          Swal.fire(
            "Deleted!",
            "Product removed successfully",
            "success"
          );

          fetchProducts();

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
            <h1>Product Management</h1>

            <button
              className="add-btn"
              onClick={() => {
                setEditProduct(null);
                setModalOpen(true);
              }}
            >
              Add Product
            </button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.image && (
                      <img
                        src={`http://localhost:5000${product.image}`}
                        alt={product.name}
                        width="60"
                        height="60"
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px"
                        }}
                      />
                    )}
                  </td>

                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.category?.name}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditProduct(product);
                        setModalOpen(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(product._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ProductModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            fetchProducts={fetchProducts}
            editProduct={editProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;