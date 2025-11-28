import React from "react";

function Events() {
    // CLICK EVENT
    const handleClick = () => {
        alert("Button Clicked!");
    };

    // DOUBLE CLICK
    const handleDoubleClick = () => {
        alert("You Double Clicked!");
    };

    // MOUSE ENTER
    const handleMouseEnter = () => {
        console.log("Mouse Entered the Box!");
    };

    // MOUSE LEAVE
    const handleMouseLeave = () => {
        console.log("Mouse Left the Box!");
    };

    // KEY DOWN
    const handleKeyDown = (e) => {
        console.log("Key Pressed:", e.key);
    };

    // INPUT CHANGE
    const handleChange = (e) => {
        console.log("Input Value:", e.target.value);
    };

    // FORM SUBMIT
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Form Submitted!");
    };

    return (
        <div
            style={{
                maxWidth: "650px",
                margin: "30px auto",
                padding: "25px",
                border: "2px solid #e0e0e0",
                borderRadius: "15px",
                background: "#fafafa",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
        >
            <h2 style={{ marginBottom: "20px" }}>All Event Handlers</h2>

            {/* CLICK BUTTON */}
            <button
                onClick={handleClick}
                style={{
                    padding: "12px 20px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#007bff",
                    color: "#fff",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                Click Me
            </button>

            <br />

            {/* DOUBLE CLICK BUTTON */}
            <button
                onDoubleClick={handleDoubleClick}
                style={{
                    padding: "12px 20px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#28a745",
                    color: "#fff",
                    cursor: "pointer",
                    marginBottom: "20px",
                }}
            >
                Double Click Me
            </button>

            {/* MOUSE EVENTS BOX */}
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    width: "100%",
                    height: "90px",
                    borderRadius: "10px",
                    border: "2px dashed #444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    background: "#fff",
                }}
            >
                Hover Over This Box
            </div>

            {/* INPUT HANDLERS */}
            <input
                type="text"
                placeholder="Type something..."
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    marginBottom: "20px",
                    outline: "none",
                }}
            />

            {/* FORM SUBMIT */}
            <form onSubmit={handleSubmit}>
                <button
                    type="submit"
                    style={{
                        padding: "12px 20px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#ff5722",
                        color: "#fff",
                        cursor: "pointer",
                    }}
                >
                    Submit Form
                </button>
            </form>
        </div>
    );
}

export default Events;
