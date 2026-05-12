const config = {
  plugins: {
    // إعدادات Tailwind الحديثة
    "@tailwindcss/postcss": {},

    // أداتنا السحرية لتحويل البكسل إلى Rem
    "postcss-pxtorem": {
      rootValue: 16, // حجم الخط الأساسي
      propList: ["font", "font-size", "line-height", "letter-spacing"],
      replace: true,
      mediaQuery: false,
      minPixelValue: 0,
    },
  },
};

export default config;
