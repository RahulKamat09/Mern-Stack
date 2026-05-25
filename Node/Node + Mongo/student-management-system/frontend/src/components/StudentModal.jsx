import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function StudentModal({ closeModal, fetchStudents, editingStudent }) {
  const API = "http://localhost:5000/api/students";

  const [formData, setFormData] = useState({
    name: editingStudent?.name || "",
    email: editingStudent?.email || "",
    phone: editingStudent?.phone || "",
    course: editingStudent?.course || "",
    age: editingStudent?.age || "",
    city: editingStudent?.city || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingStudent) {
        await axios.put(`${API}/${editingStudent._id}`, formData);

        Swal.fire("Updated!", "Student updated successfully.", "success");
      } else {
        await axios.post(API, formData);

        Swal.fire("Added!", "Student added successfully.", "success");
      }

      fetchStudents();
      closeModal();
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editingStudent ? "Update Student" : "Add Student"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">
            <button type="submit">
              {editingStudent ? "Update" : "Add"}
            </button>

            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentModal;