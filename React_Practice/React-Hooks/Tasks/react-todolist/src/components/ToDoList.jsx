import React, { useState } from "react";

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    const addTask = () => {
        if (input.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: input,
        };

        setTasks([...tasks, newTask]);
        setInput(""); // Clear input box
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
            <h2 className="text-center mb-3 fw-bold">📝 To-Do List App</h2>

            {/* Add Task Input */}
            <div className="input-group mb-3 shadow">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter a task..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addTask}>
                    Add Task
                </button>
            </div>

            {/* Total Count */}
            <p className="fw-semibold">
                Total Tasks: <span className="text-primary">{tasks.length}</span>
            </p>

            {/* Tasks List */}
            <ul className="list-group">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="list-group-item d-flex justify-content-between align-items-center shadow-sm mb-2"
                    >
                        {task.text}

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoList;
