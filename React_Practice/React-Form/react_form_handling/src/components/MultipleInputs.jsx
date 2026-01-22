import React, { useState } from 'react'

const MultipleInputs = () => {
    const [form, setForm] = useState({
        name:"",
        email:"",
        password:""
    })
    const handleInput = (e) =>{
        setForm({...form,[e.target.name]:e.target.value})
    }
    return (
        <div className='container mt-4 p-4 border rounded shadow'>
            <h3>Multiple Inputs (Single State Object)</h3>
            <input
                type="text"
                name='name'
                className='form-control mt-2'
                placeholder='Enter The Name Here'
                value={form.name}
                onChange={handleInput}
            />
            <input
                type="email"
                name='email'
                className='form-control mt-2'
                placeholder='Enter The Email Here'
                value={form.email}
                onChange={handleInput}
            />
            <input
                type="password"
                name='password'
                className='form-control mt-2'
                placeholder='Enter The Password Here'
                value={form.password}
                onChange={handleInput}
            />
            <pre className="mt-3">{JSON.stringify(form, null, 2)}</pre>
        </div>
    )
}

export default MultipleInputs