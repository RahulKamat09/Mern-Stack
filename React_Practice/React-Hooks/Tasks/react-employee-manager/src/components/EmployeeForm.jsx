import React, { useState, useEffect } from "react";

export default function EmployeeForm({ onSave, editEmployee }) {
    const [employee, setEmployee] = useState({
        id: "",
        name: "",
        role: "",
        salary: "",
        gender: "",
        image: "",
        status: "Active",
    });

    useEffect(() => {
        if (editEmployee) {
            setEmployee(editEmployee);
        }
    }, [editEmployee]);

    const handleChange = (e) => {
        setEmployee({ ...employee, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSave(employee);

        setEmployee({
            id: "",
            name: "",
            role: "",
            salary: "",
            gender: "",
            image: "",
            status: "Active"
        });
    };

    return (
        <div className="card p-3 shadow-sm form-box">
            <h4 className="mb-3">
                {editEmployee ? "Update Employee" : "Add New Employee"}
            </h4>

            <form onSubmit={handleSubmit}>

                <input
                    type="number"
                    name="id"
                    placeholder="Employee ID"
                    className="form-control mb-2"
                    value={employee.id}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="form-control mb-2"
                    value={employee.name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="role"
                    placeholder="Employee Role"
                    className="form-control mb-2"
                    value={employee.role}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="salary"
                    placeholder="Salary"
                    className="form-control mb-2"
                    value={employee.salary}
                    onChange={handleChange}
                />

                <select
                    name="gender"
                    className="form-control mb-2"
                    value={employee.gender}
                    onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>

                <select
                    name="status"
                    className="form-control mb-2"
                    value={employee.status}
                    onChange={handleChange}
                >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    className="form-control mb-3"
                    value={employee.image}
                    onChange={handleChange}
                />

                <button className="btn btn-primary w-100 btn-custom">
                    {editEmployee ? "Update Employee" : "Add Employee"}
                </button>
            </form>
        </div>
    );
}
