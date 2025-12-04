import React, { useState } from "react";

export default function EmployeeList({ employees, onEdit, onDelete }) {
    const [deleteId, setDeleteId] = useState(null);

    const openDeleteModal = (id) => {
        setDeleteId(id);
        const modal = new window.bootstrap.Modal(
            document.getElementById("confirmDeleteModal")
        );
        modal.show();
    };

    const confirmDelete = () => {
        onDelete(deleteId);
        setDeleteId(null);

        const modalElement = document.getElementById("confirmDeleteModal");
        const modal = window.bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    };

    return (
        <>
            <div className="row mt-3">
                {employees.map((emp) => (
                    <div className="col-md-6 col-lg-6 mb-4" key={emp.id}>
                        <div className="card employee-card shadow">
                            <img
                                src={emp.image || "https://via.placeholder.com/300"}
                                className="card-img-top"
                                alt="employee"
                            />

                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <h4>{emp.name}</h4>
                                    <span
                                        className={`status-badge ${emp.status === "Active"
                                                ? "bg-success"
                                                : "bg-secondary"
                                            } text-white`}
                                    >
                                        {emp.status}
                                    </span>
                                </div>

                                <p><strong>Role:</strong> {emp.role}</p>
                                <p><strong>Salary:</strong> ₹{emp.salary}</p>
                                <p><strong>Gender:</strong> {emp.gender}</p>

                                <div className="d-flex justify-content-between mt-3">
                                    <button
                                        className="btn btn-warning btn-sm btn-custom"
                                        onClick={() => onEdit(emp)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm btn-custom"
                                        onClick={() => openDeleteModal(emp.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* DELETE CONFIRMATION MODAL */}
            <div
                className="modal fade"
                id="confirmDeleteModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            Are you sure you want to delete this employee?
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={confirmDelete}
                            >
                                Yes, Delete
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
