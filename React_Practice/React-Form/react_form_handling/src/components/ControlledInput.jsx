import React, { useState } from 'react'

const ControlledInput = () => {
    const [name, setName] = useState('')
    return (
        <div className='container mt-4 p-4 border rounded shadow'>
            <h3>Controlled Input</h3>
            <input
                type="text"
                className='form-control mt-2'
                placeholder='Enter Name Here'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p className="mt-3">Typed Value: <strong>{name}</strong></p>
        </div>
    )
}

export default ControlledInput