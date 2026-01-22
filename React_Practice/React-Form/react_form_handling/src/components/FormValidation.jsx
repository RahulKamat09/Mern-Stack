import React, { useState } from 'react'

const FormValidation = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const validate = (e) => {
        setEmail(e.target.value);

        if (!e.target.value.includes("@")) {
            setError("Invalid Email");
        }
        else {
            setError("");
            setSuccess("Valid Email !!!");
        }
    }
    return (
        <div className='container mt-4 p-4 border rounded shadow'>
            <h3>Validation Using State</h3>

            <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter Email"
                value={email}
                onChange={validate}
            />
            {error && <p className='text-danger mt-2'>{error}</p>}
            {success && <p className='text-success mt-2'>{success}</p>}
        </div>
    )
}

export default FormValidation