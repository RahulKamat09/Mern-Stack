import React, { useState } from 'react'

function Number() {
    const [Age, setAge] = useState(20);

    return (
        <div className='number'>
            <div className='card'>
                <h2>Age Counter</h2>
                <p >
                    <b>Age:</b> {Age}
                </p>

                <div className='btn-row'>
                    <button onClick={() => setAge(Age + 1)} className="btn btn-green">
                        +1
                    </button>

                    <button onClick={() => setAge(Age - 1)} className="btn btn-red">
                        -1
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Number;
