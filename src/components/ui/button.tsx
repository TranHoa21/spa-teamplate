import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary';
};

export const Button: React.FC<ButtonProps> = ({ className = '', variant = 'primary', ...props }) => {
    const base =
        'px-4 py-2 rounded-full font-medium transition focus:outline-none';
    const variants = {
        primary: 'bg-[#FF6B6B] text-white hover:bg-[#e95b5b]',
        secondary: 'bg-[#FFF1E6] text-[#333333] hover:bg-[#ffe7d2] border border-[#F49E9E]',
    };

    return (
        <button className={`${base} ${variants[variant]} ${className}`} {...props}>
            {props.children}
        </button>
    );
};
