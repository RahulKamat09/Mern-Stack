import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "./components/Navbar";
import StudentModal from "./components/StudentModal";
import StudentCard from "./components/StudentCard";
import "./index.css";

function App() {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  const API = "http://localhost:5000/api/students";

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Student?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (result.isConfirmed) {
      await axios.delete(`${API}/${id}`);

      Swal.fire("Deleted!", "Student removed successfully.", "success");

      fetchStudents();
    }
  };

  const openAddModal = () => {
    setEditingStudent(null);
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setShowModal(true);
  };

  return (
    <>
      <Navbar openAddModal={openAddModal} />

      <div className="container">
        <h1 className="title">Student Management Dashboard</h1>

        <div className="student-grid">
          {students.length > 0 ? (
            students.map((student) => (
              <StudentCard
                key={student._id}
                student={student}
                onDelete={handleDelete}
                onEdit={openEditModal}
              />
            ))
          ) : (
            <p className="empty">No students found.</p>
          )}
        </div>
      </div>

      {showModal && (
        <StudentModal
          fetchStudents={fetchStudents}
          closeModal={() => setShowModal(false)}
          editingStudent={editingStudent}
        />
      )}
    </>
  );
}

export default App;