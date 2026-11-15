/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        vert: {
          principal: "#00a86b",
          profond: "#007048",
          brume: "#e6f7f0"
        },
        creme: {
          fond: "#faf8f3",
          card: "#ffffff"
        },
        terracotta: "#c25b3a",
        ocre: "#d4a574",
        encre: "#1a2e28"
      },
      fontFamily: {
        fraunces: ["Fraunces", "serif"],
        atkinson: ["Atkinson Hyperlegible", "sans-serif"],
        sora: ["Sora", "sans-serif"]
      },
      fontSize: {
        base: ["20px", "1.6"],
        lg: ["22px", "1.5"],
        xl: ["26px", "1.4"],
        "2xl": ["32px", "1.3"],
        "3xl": ["40px", "1.2"],
        "4xl": ["52px", "1.1"],
        hero: ["72px", "1.05"]
      },
      borderRadius: {
        asym: "32px 32px 8px 32px",
        btn: "20px 20px 6px 20px",
        bubbleUser: "28px 28px 4px 28px",
        bubbleBot: "28px 28px 28px 4px"
      },
      boxShadow: {
        btn3d: "0 6px 0 #007048, 0 10px 20px rgba(0, 112, 72, 0.25)",
        btn3dActive: "0 2px 0 #007048, 0 4px 10px rgba(0, 112, 72, 0.2)",
        terra3d: "0 6px 0 #943d22, 0 10px 20px rgba(194, 91, 58, 0.25)",
        card: "0 12px 32px -4px rgba(26, 46, 40, 0.08)"
      }
    }
  },
  plugins: []
};
