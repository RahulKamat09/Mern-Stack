import { useState } from 'react';

const Array = () => {
    const [items, setItems] = useState([]);

    const addItem = () => {
        setItems([...items, `Item ${items.length + 1}`]);
    };

    return (
        <div className='number'>
            <button onClick={addItem}>Add Item</button>
            <p>{items.join(", ")}</p>
        </div>
    );
}

export default Array