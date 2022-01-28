import React from "react";

const Notification = ({ message, type }) => {
  if (type === "error") {
    return (
      <div className="error-message">
        <p>{message}</p>
      </div>
    );
  } else if (type === "success") {
    return (
      <div className="success-message">
        <p>{message}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default Notification;
