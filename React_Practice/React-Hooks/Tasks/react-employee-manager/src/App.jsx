import React, { useState } from "react";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import SearchBar from "./components/SearchBar";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [search, setSearch] = useState("");

  const handleSave = (employee) => {
    if (editEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editEmployee.id ? employee : emp
        )
      );
      setEditEmployee(null);
    } else {
      setEmployees([...employees, employee]);
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.id.toString().includes(search)
  );

  return (
    <div className="container mt-4 mb-5">

      <h1 className="page-title">Employee Manager Admin Panel</h1>

      <div className="row">

        <div className="col-md-4">
          <EmployeeForm onSave={handleSave} editEmployee={editEmployee} />
        </div>

        <div className="col-md-8">
          <SearchBar search={search} setSearch={setSearch} />
          <EmployeeList
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>

      </div>
    </div>
  );
}
