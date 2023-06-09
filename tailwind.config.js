export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    extend: {
      backgroundImage: {
        gradientBg: "url('/src/assets/bg.png')",
        sunnyBg: "url('/src/assets/sunny.jpg')",
        windyBg: "url('/src/assets/windy.jpg')",
        cloudyBg: "url('/src/assets/cloudy.jpg')",
        snowyBg: "url('/src/assets/snowy.jpg')",
        thunderBg: "url('/src/assets/thunderstorm.jpg')",
        rainyBg: "url('/src/assets/rainy.jpg')",

      },
      keyframes: {
        shake: {
          '0%': {
            transform: 'translate(3px, 0)',
          },
          '50%': {
            transform: 'translate(-3px, 0)',
          },
          '100%': {
            transform: 'translate(0, 0)',
          },
        },
      },
      animation: {
        shake: 'shake 150ms 2 linear',
      },
    },
  },
  plugins: [],
};
