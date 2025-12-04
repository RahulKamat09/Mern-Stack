import React, { useState } from 'react'

const Object = () => {
    const [user, setUser] = useState({
        name: "John",
        age: 20,
    });

    const updateAge = () => {
        setUser(prev => ({
            ...prev,
            age: prev.age + 1
        }));
    };

    return (
        <div className='number'>
            <div className='card'>
                <h2 style={{ marginBottom: "20px" }}>
                    {user.name}
                </h2>

                <p style={{ fontSize: "20px", marginBottom: "20px" }}>
                    <b>Age:</b> {user.age}
                </p>

                <button onClick={updateAge} className='btn btn-green'>
                    Increase Age
                </button>
            </div>
        </div>
    );
};

export default Object;
