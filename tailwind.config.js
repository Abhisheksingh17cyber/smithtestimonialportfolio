/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0a0f',
          darker: '#050508',
          navy: '#0d1b2a',
          blue: '#1b263b',
          accent: '#00d4ff',
          cyan: '#00fff7',
          purple: '#7b2cbf',
          gold: '#ffd700',
          orange: '#ff6b35',
          steel: '#415a77',
          light: '#e0e1dd'
        }
      },
      fontFamily: {
        'space': ['Orbitron', 'sans-serif'],
        'tech': ['Rajdhani', 'sans-serif'],
        'body': ['Inter', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'rocket-fly': 'rocket-fly 3s ease-in-out infinite',
        'star-twinkle': 'star-twinkle 2s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'slide-up': 'slide-up 0.8s ease-out',
        'fade-in': 'fade-in 1s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' }
        },
        'rocket-fly': {
          '0%, 100%': { transform: 'translateY(0) rotate(-45deg)' },
          '50%': { transform: 'translateY(-30px) rotate(-45deg)' }
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(150px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(150px) rotate(-360deg)' }
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        glow: {
          '0%': { textShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff' },
          '100%': { textShadow: '0 0 20px #00fff7, 0 0 40px #00fff7, 0 0 60px #00fff7' }
        }
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #0d1b2a 50%, #1b263b 100%)',
        'nebula': 'radial-gradient(ellipse at center, #1b263b 0%, #0a0a0f 70%)',
        'aurora': 'linear-gradient(180deg, transparent 0%, rgba(0, 212, 255, 0.1) 50%, transparent 100%)'
      }
    },
  },
  plugins: [],
}
