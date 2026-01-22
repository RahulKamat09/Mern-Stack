import React, { useState } from "react";

const DynamicInputs = () => {
    const [hobbies, setHobbies] = useState([{ value: "" }]);

    const handleChange = (i, e) => {
        const newHobbies = [...hobbies];
        newHobbies[i].value = e.target.value;
        setHobbies(newHobbies);
    };

    const addField = () => {
        setHobbies([...hobbies, { value: "" }]);
    };

    const removeField = (i) => {
        const newHobbies = hobbies.filter((_, index) => index !== i);
        setHobbies(newHobbies);
    };

    return (
        <div className="container mt-4 p-4 border rounded shadow">
            <h3>Dynamic Inputs (Array State)</h3>

            {hobbies.map((item, i) => (
                <div className="input-group mt-2" key={i}>
                    <input
                        className="form-control"
                        value={item.value}
                        onChange={(e) => handleChange(i, e)}
                    />
                    <button
                        className="btn btn-danger"
                        onClick={() => removeField(i)}
                    >
                        X
                    </button>
                </div>
            ))}

            <button className="btn btn-primary mt-3" onClick={addField}>
                Add Field +
            </button>
        </div>
    );
};

export default DynamicInputs;
