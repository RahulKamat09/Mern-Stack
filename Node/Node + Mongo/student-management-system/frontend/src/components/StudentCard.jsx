import { FaEdit, FaTrash } from "react-icons/fa";

function StudentCard({ student, onDelete, onEdit }) {
  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p>Email: {student.email}</p>
      <p>Phone: {student.phone}</p>
      <p>Course: {student.course}</p>
      <p>Age: {student.age}</p>
      <p>City: {student.city}</p>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => onEdit(student)}>
          <FaEdit />
        </button>

        <button className="delete-btn" onClick={() => onDelete(student._id)}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default StudentCard;