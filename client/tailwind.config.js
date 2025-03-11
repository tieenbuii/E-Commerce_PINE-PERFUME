/** @type {import('tailwindcss').Config} */

export default 
{
  theme: {
    fontFamily: {
      main: ['Poppins', 'sans-serif']
    },
    extend: {
      width: {
        main: '1220px'
      },
      backgroundColor: {
        main: '#ee3131'
      },
      colors: {
        main: '#ee3131'
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(40px)',
            transform: 'translateX(40px)'
          },
          '100%': {
            '-webkit-transform': 'translateY(0px)',
            transform: 'translateX(0px)'
          }
        }
      },
      animation: {
        'slide-top': 'slide-top 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both' 
      }
    }
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ]
}