import React from 'react'

const Button = ({ className,onClick,text, ...props }) => {
    console.log(props)
    return (
        <button className={className} onClick={onClick} style={{ ...props, appearance: "none", border: "none", cursor: "pointer",color:"var(--primary-color)",fontWeight:"600"}}>
            {text}
        </button>
    )
}

export default Button
