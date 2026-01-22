import React, { useState } from "react";
import InputField from "../components/InputField";
import Message from "../components/Message";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({});
    const [success, setSuccess] = useState("");

    const validate = () => {
        let err = {};

        if (!form.email.includes("@")) err.email = "Enter a valid email";

        if (!form.password.trim()) err.password = "Password is required";

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

        setSuccess("Login Successful!");
        console.log("Login Data:", form);
    };

    return (
        <div className="container">
            <h2>Login</h2>

            {success && <Message type="success" text={success} />}

            <form onSubmit={handleSubmit}>
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

                <button className="btn-submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
