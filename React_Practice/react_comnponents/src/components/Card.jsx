import React from 'react'

function Card({ user, age, img }) {
    return (
        <>
            <div classname="card">
                <img src="https://images.unsplash.com/photo-1762710940358-e3351cc9ff34?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                <h2>Rahul Kamat</h2>
                <p>20 years old</p>
                <button>Click me</button>
            </div>

        </>
    )
}

export default Card