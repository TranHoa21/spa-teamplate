/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#F5F5DC',
                secondary: '#FFF1E6',
                accent: '#FF6B6B',
                textMain: '#333333',
                textMuted: '#7D7D7D',
            },
            fontFamily: {
                heading: ['"Playfair Display"', 'serif'],
                body: ['Inter', 'sans-serif'],
                handwriting: ['"Dancing Script"', 'cursive'],
            },
            screens: {
                'xs': '320px',
                'xm': '375px',
            },
        },
    },
    plugins: [],
};
