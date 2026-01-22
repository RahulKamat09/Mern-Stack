import React from "react";

const InputField = ({ label, type, name, value, onChange, error }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                className={`form-control ${error ? "error-border" : ""}`}
                value={value}
                onChange={onChange}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    );
};

export default InputField;
