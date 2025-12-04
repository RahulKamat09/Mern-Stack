import React, { useState } from 'react';

const ChangingArrayObject = () => {

    const [users, setUsers] = useState([
        { id: 1, name: "Rahul", age: 21 },
        { id: 2, name: "Prashant", age: 21 },
        { id: 3, name: "Jay", age: 21 }
    ]);

    // Increase age of a specific user
    const IncreasingAge = (id) => {
        setUsers(prev =>
            prev.map(user =>
                user.id === id
                    ? { ...user, age: user.age + 1 }
                    : user
            )
        );
    };

    // Decrease age of a specific user
    const DecreasingAge = (id) => {
        setUsers(prev =>
            prev.map(user =>
                user.id === id
                    ? { ...user, age: user.age - 1 }
                    : user
            )
        );
    };

    // Add new user
    const addUser = () => {
        setUsers(prev => [
            ...prev,
            {
                id: prev.length + 1,   // auto increment ID
                name: `NewUser ${prev.length + 1}`,
                age: 18
            }
        ]);
    };

    // Remove a specific user
    const removeUser = (id) => {
        setUsers(prev => prev.filter(user => user.id !== id));
    };

    // Increase age of ALL users
    const increaseAll = () => {
        setUsers(prev =>
            prev.map(user => ({ ...user, age: user.age + 1 }))
        );
    };

    // Decrease age of ALL users
    const decreaseAll = () => {
        setUsers(prev =>
            prev.map(user => ({ ...user, age: user.age - 1 }))
        );
    };

    return (
        <div className='number'>
            <div className='card'>
                <h2 style={{ marginBottom: "20px" }}>User Age Controller</h2>

                {/* Global Actions */}
                <div style={{ marginBottom: "20px" }}>
                    <button onClick={addUser} className='btn btn-blue'>Add User</button>
                    <button onClick={increaseAll} className='btn btn-green'>Increase All</button>
                    <button onClick={decreaseAll} className='btn btn-red'>Decrease All</button>
                </div>

                {users.map(item => (
                    <div key={item.id} className='list-container'>
                        <h3>{item.name}</h3>

                        <p style={{ fontSize: "18px", marginBottom: "15px" }}>
                            Age: <b>{item.age}</b>
                        </p>

                        {/* Increase / Decrease Age of specific user */}
                        <button
                            onClick={() => IncreasingAge(item.id)}
                            className='btn btn-green'>
                            +
                        </button>

                        <button
                            onClick={() => DecreasingAge(item.id)}
                            className='btn btn-red'>
                            -
                        </button>

                        {/* Delete specific user */}
                        <button
                            onClick={() => removeUser(item.id)}
                            className='btn btn-dark'>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChangingArrayObject;
