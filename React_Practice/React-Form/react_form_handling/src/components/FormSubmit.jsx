import React, { useState } from 'react'

const FormSubmit = () => {
    const [name, setName] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        alert("Form Submitted " + name);
        setName("")
    }
    return (
        <div className='container mt-2 p-4 border rounded shadow'>
            <h3>Form Submit Example</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className='form-control mt-2'
                    placeholder='Enter The Name Here'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
                <button className='btn btn-success mt-3' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default FormSubmit