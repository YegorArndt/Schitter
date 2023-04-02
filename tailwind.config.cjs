// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");

/**
 * @typedef {Object} TailwindPluginModification
 * @property {string} [key] - An object with string keys and string values
 */

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "up-lg": { min: "942px" },
      "down-lg": { max: "940px" },
      "up-md": { min: "913px" },
      "down-md": { max: "539px" },
      "up-sm": { min: "551px" },
      "down-sm": { max: "324px" },
      "up-desktop": { min: "1281px" },
      "down-desktop": { max: "1279px" },
      "up-tablet": { min: "821px" },
      "down-tablet": { max: "767px" },
      "up-phone": { min: "421px" },
      "down-phone": { max: "299px" },
      phone: { min: "300px", max: "420px" },
      tablet: { min: "768px", max: "820px" },
      sm: { min: "325px", max: "550px" },
      md: { min: "540px", max: "912px" },
    },
    extend: {
      colors: {
        red: "#F44A4A",
        "dark-red": "#330e20",
        white: "#FFFFFF",
        gray: "#939393",
        black: "#000000",
      },
      zIndex: {
        layout: "100",
        dropdown: "200",
        tooltip: "300",
        overlay: "400",
        fixed: "500",
        modal: "600",
        0: "0",
        1: "1",
        50: "50",
        150: "150",
        250: "250",
        350: "350",
        450: "450",
        550: "550",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      // Rewrite "text-" color class prefix to "clr-":
      const colors = theme("colors");
      /** @type {Record<string, { color: string }>} */
      const textColorClasses = {};

      for (const [name, color = ""] of Object.entries(colors || {})) {
        textColorClasses[`.clr-${name}`] = {
          color,
        };
      }

      // Override tw's default background color classes:
      /** @type {Record<string, { backgroundColor: string }>} */
      const backgroundColorClasses = {};
      for (const [name, color] of Object.entries(colors || {})) {
        backgroundColorClasses[`.bg-${name}`] = {
          backgroundColor: color,
        };
      }

      // Add all the new classes to tw
      addUtilities({
        ...textColorClasses,
        ...backgroundColorClasses,
      });
    }),
  ],
};

module.exports = config;
