import React from "react";

export default function Input({ name, placeholder , handleInput }) {





    return (

        <div>
            <input name={name} className="input-message" onChange={handleInput} placeholder={placeholder} />
        </div>
    )
}


