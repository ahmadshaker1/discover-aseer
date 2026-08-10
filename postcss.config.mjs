const config = {
  plugins: {
    "@tailwindcss/postcss": {},

    "postcss-pxtorem": {
      rootValue: 16,
      propList: ["font", "font-size", "line-height", "letter-spacing"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
};

export default config;
