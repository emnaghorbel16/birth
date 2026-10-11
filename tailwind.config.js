/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: '#FDE4E8',
        rose: '#F9B8C6',
        hotpink: '#EC5A86',
        raspberry: '#A3123F',
        cream: '#FFF6EC',
        babyblue: '#A8D4F0',
        gold: '#F5C26B',
        kraft: '#EFD9A8',
      },
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
        caveat: ['Caveat', 'cursive'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'flicker': 'flicker 1.5s ease-in-out infinite',
        'drift-up': 'driftUp 8s linear infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'sway': 'sway 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'butterfly': 'butterfly 12s ease-in-out infinite',
        'typewriter-cursor': 'typewriterCursor 0.75s step-end infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(3deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scaleY(1)' },
          '50%': { opacity: '0.7', transform: 'scaleY(0.85)' },
        },
        driftUp: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(-20vh) rotate(360deg)', opacity: '0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        butterfly: {
          '0%': { transform: 'translateX(-10vw) translateY(50vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '50%': { transform: 'translateX(50vw) translateY(20vh) rotate(15deg)' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateX(110vw) translateY(40vh) rotate(-10deg)', opacity: '0' },
        },
        typewriterCursor: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#A3123F' },
        },
      },
    },
  },
  plugins: [],
}
