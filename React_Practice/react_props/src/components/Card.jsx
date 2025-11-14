import React from 'react'

function Card(props) {
    return (
        <>
            <div className="card">
                <img src={props.img} />
                <h2>{props.user}</h2>
                <p>{props.age} years old</p>
                <button>Click me</button>
            </div>
        </>
    )
}

export default Card