import React from "react";

const Button = ({ label, className, onClick, text, ...props }) => {
    return (
        <button
            aria-label={label}
            className={className}
            onClick={onClick}
            style={{
                ...props,
                appearance: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--primary-color)",
                fontWeight: "600",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
            }}
        >
            {text}
        </button>
    );
};

export default Button;
