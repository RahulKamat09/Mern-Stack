import React, { useState } from 'react'

const Form = () => {
    const [form, setForm] = useState({
        firstName: "Jay",
        lastName: "Khatik",
        email: "jaykhatik123@gmail.com"
    })
    return (
        <div className='form'>
            <div className="card">
                <div className="list-container">
                    <label>
                        FirstName:
                        <input value={form.firstName}
                            className='field'
                            onChange={e => {
                                setForm({
                                    ...form,
                                    firstName: e.target.value
                                })
                            }} />
                    </label>
                </div>
                <br />
                <div className="list-container">
                    <label>
                        LastName:
                        <input value={form.lastName}
                            className='field'
                            onChange={e => {
                                setForm({
                                    ...form,
                                    lastName: e.target.value
                                })
                            }} />
                    </label>
                </div>
                <br />
                <div className="list-container">
                    <label>
                        Email:
                        <input value={form.email}
                            className='field'
                            onChange={e => {
                                setForm({
                                    ...form,
                                    email: e.target.value
                                })
                            }} />
                    </label>
                </div>
                <br />
                <div className="list-container">
                    <p>
                        FirstName: {form.firstName} <br />
                        LastName: {form.lastName} <br />
                        Email: {form.email}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Form     