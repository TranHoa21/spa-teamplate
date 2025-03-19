import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ className = '', ...props }) => {
    return (
        <label className={`block text-sm font-medium text-[#333333] mb-1 ${className}`} {...props}>
            {props.children}
        </label>
    );
};
