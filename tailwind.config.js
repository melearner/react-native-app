/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // 🎨 COLORS (from your @theme)
      colors: {
        background: "#fff9e3",
        foreground: "#081126",
        card: "#fff8e7",
        muted: "#f6eecf",
        "muted-foreground": "rgba(0,0,0,0.6)",
        primary: "#081126",
        accent: "#ea7a53",
        border: "rgba(0,0,0,0.1)",
        success: "#16a34a",
        destructive: "#dc2626",
        subscription: "#8fd1bd",
      },

      // 📏 SPACING (only custom ones needed)
      spacing: {
        18: "72px",
        30: "120px",
      },

      // 🔤 FONTS
      fontFamily: {
        "sans-regular": ["sans-regular"],
        "sans-light": ["sans-light"],
        "sans-medium": ["sans-medium"],
        "sans-semibold": ["sans-semibold"],
        "sans-bold": ["sans-bold"],
        "sans-extrabold": ["sans-extrabold"],
      },

      // 🔲 BORDER RADIUS
      borderRadius: {
        "4xl": "32px",
      },

      // 📐 MIN HEIGHT (used in your classes)
      minHeight: {
        50: "200px", // adjust if needed
      },
    },
  },
  plugins: [],
};