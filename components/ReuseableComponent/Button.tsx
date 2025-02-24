import React from 'react'

interface ButtonProps {
    text: string;
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
}

const Button:React.FC<ButtonProps> = ({text, type, onClick}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className="w-full bg-[#073743] text-white py-2 px-4 rounded-md hover:bg-[#08644A] transition duration-200"
        >
            {text}
        </button>
    )
}

export default Button