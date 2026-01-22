import React from "react";

const Message = ({ type, text }) => {
    return (
        <div className={`msg ${type}`}>
            <p>{text}</p>
        </div>
    );
};

export default Message;
