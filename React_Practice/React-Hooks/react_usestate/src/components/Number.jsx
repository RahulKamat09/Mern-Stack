import React, { useState } from 'react'

function Number() {
    const [Age, setAge] = useState(20)
    return (
        <div className='number'>
            <h2>Age: {Age}</h2>
            <div className="btns">
                <button onClick={() => setAge(Age + 1)}>Increase +1</button>
                <button onClick={() => setAge(Age - 1)}>Decrease -1</button>
            </div>
        </div>
    )
}

export default Number