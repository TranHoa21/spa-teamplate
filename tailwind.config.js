// tailwind.config.js
module.exports = {
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
                'xs': '320px', // Breakpoint mới cho màn hình nhỏ
                'xm': '375px', // Breakpoint mới cho iPhone X, SE
            },
        },
    },
}
