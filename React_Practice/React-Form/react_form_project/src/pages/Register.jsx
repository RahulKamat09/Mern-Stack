import React, { useState } from "react";
import InputField from "../components/InputField";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState({});
    const [success, setSuccess] = useState("");

    const validate = () => {
        let err = {};

        if (!form.name.trim()) err.name = "Name is required";

        if (!form.email.includes("@")) err.email = "Enter a valid email";

        if (form.password.length < 6)
            err.password = "Password must be at least 6 characters";

        setError(err);
        return Object.keys(err).length === 0;
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        setSuccess("");
        setError({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validate()) return;

        setSuccess("Registration Successful!");
        console.log("Registered Data:", form);
    };

    return (
        <div className="container">
            <h2>Register</h2>

            {success && <Message type="success" text={success} />}

            <form onSubmit={handleSubmit}>
                <InputField
                    label="Full Name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    error={error.name}
                />

                <InputField
                    label="Email Address"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    error={error.email}
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    error={error.password}
                />

                <button className="btn-submit">Register</button>
                <button className="btn-login">
                    <Link to="/login"className="btn-login">Login</Link>
                </button>
            </form>
        </div>
    );
};

export default Register;
