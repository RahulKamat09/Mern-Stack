import React, { useState } from 'react'

const Object = () => {
    const [user, setUser] = useState({
        name: "John",
        age: 20,
    });

    const updateAge = () => {
        setUser({
            ...user, // keep old values
            age: user.age + 1,
        });
    };

    return (
        <div className='number'>
            <h2>{user.name} - {user.age}</h2>
            <button onClick={updateAge}>Increase Age</button>
        </div>
    );
}

export default Object