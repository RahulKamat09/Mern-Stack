import React, { useRef } from "react";

const UncontrolledInput = () => {
  const inputRef = useRef();

  const showValue = () => {
    alert("Input Value: " + inputRef.current.value); // DOM controls value
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow">
      <h3>Uncontrolled Component (useRef)</h3>

      <input type="text" ref={inputRef} className="form-control mt-2" />
      <button className="btn btn-primary mt-3" onClick={showValue}>
        Show Value
      </button>
    </div>
  );
};

export default UncontrolledInput;
