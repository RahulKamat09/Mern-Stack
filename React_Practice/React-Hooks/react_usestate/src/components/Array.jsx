import { useState } from 'react';

const Array = () => {
    const [items, setItems] = useState([]);

    const addItem = () => {
        setItems(prev => [...prev, `Item ${prev.length + 1}`]);
    };

    return (
        <div className='number'>
            <div className='card'>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Add Items
                </h2>

                <button onClick={addItem} className='btn btn-blue'>
                    Add Item
                </button>

                <div className='list-container'>
                    {items.length === 0 ? (
                        <p style={{ color: "#666", textAlign: "center" }}>No Items Yet</p>
                    ) : (
                        items.map((item, index) => (
                            <p key={index} className='list-item'>
                                {item}
                            </p>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Array;
