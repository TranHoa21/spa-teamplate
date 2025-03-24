'use client';

import * as React from 'react';

export const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = '', ...props }, ref) => {
    return (
        <textarea
            ref={ref}
            className={`w-full rounded-md border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] focus:border-transparent ${className}`}
            {...props}
        />
    );
});

Textarea.displayName = 'Textarea';
