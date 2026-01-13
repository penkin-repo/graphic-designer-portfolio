/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                cream: '#FDFBF7',
                brown: '#4A3B32',
                terracotta: '#D97757',
                terracottaHover: '#C05F40',
                sand: '#E6DCCF',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],

            },
        },
    },
    plugins: [],
}
