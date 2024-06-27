import React, { useState } from "react";

function Alert({ message, success }: { message: string; success: boolean }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  const closeAlert: React.MouseEventHandler<HTMLSpanElement> = () => {
    setIsOpen(false);
  };

  return (
    <div
      style={{
        marginTop: "1rem",
        backgroundColor: success ? "#94DBA0" : "#ECBCC8",
        color: success ? "green" : "red",
        padding: "0.5rem 0.7rem",
        borderRadius: "4px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <p>{message}</p>
      <span
        onClick={closeAlert}
        style={{
          cursor: "pointer",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          style={{ width: "1.2rem", height: "1.2rem" }}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </span>
    </div>
  );
}

export default Alert;
