import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: "clamp(1.9rem, 0.5692rem + 4.238vw, 13.75rem)",
        h2: "clamp(1.5rem, 1.0982rem + 1.7143vw, 2.8125rem)",
        h3: "clamp(1.2rem, 1.1837rem + 0.8163vw, 2rem)",
        h4: "clamp(1.2rem, 1.1837rem + 0.8163vw, 1.6rem)",
        h5: "clamp(1rem, 0.9235rem + 0.3265vw, 1.25rem)",
        h6: "clamp(1rem, 0.9617rem + 0.1633vw, 1.125rem)",
        body: "clamp(1rem, 0.8852rem + 0.4898vw, 1.375rem)",
        link: "clamp(0.875rem, 0.7985rem + 0.3265vw, 1.125rem)",
        mini: "clamp(0.875rem, 0.8367rem + 0.1633vw, 1rem)",
        "h2-display": "clamp(1.875rem, 1.301rem + 2.449vw, 3.95rem)",
        "12px": "0.75rem",
        "14px": "0.875rem",
        "15px": "0.9375rem",
        "16px": "1rem",
        "17px": "1.0625rem",
        "18px": "1.125rem",
        "19px": "1.1875rem",
        "20px": "1.25rem",
        "21px": "1.3125rem",
        "24px": "1.5rem",
        "42px": "2.652rem",
        "64px": "4rem",
      },

      colors: {
        primary: "#f59e0b",
        background: "#0a0a0a",
        secondary: {
          red: "#FF0029",
          pink: "#FF2DA9",
          yellow: "#FFB946",
          green: "#A0D964",
          purple: "#B973FF",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
