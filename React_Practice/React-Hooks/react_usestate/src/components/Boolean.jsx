import { useState } from "react";

const Boolean = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="number">
      <div className="card">
        <h2>Toggle Visibility</h2>

        <button onClick={() => setIsVisible(!isVisible)} className="btn btn-green">
          {isVisible ? "Hide" : "Show"}
        </button>

        {/* Visible Text Box */}
        <div className="list-item">
          {isVisible && (
            <p style={{ margin: 0, fontSize: "16px", color: "#333" }}>
              This is now Visible
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Boolean;
