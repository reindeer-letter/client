import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ["'Nanum Pen Script'", "cursive"],
      },
      fontSize: {
        Head: [
          "24px",
          {
            fontWeight: "600",
            lineHeight: "160%",
          },
        ],
        "Title01-B": [
          "20px",
          {
            fontWeight: "700",
            lineHeight: "160%",
          },
        ],
        "Title01-M": [
          "20px",
          {
            fontWeight: "500",
            lineHeight: "160%",
          },
        ],
        "Title01-SB": [
          "20px",
          {
            fontWeight: "600",
            lineHeight: "160%",
          },
        ],
        "Title02-B": [
          "18px",
          {
            fontWeight: "700",
            lineHeight: "160%",
          },
        ],
        "Title01-R": [
          "20px",
          {
            fontWeight: "400",
            lineHeight: "160%",
          },
        ],
        "Title02-M": [
          "18px",
          {
            fontWeight: "500",
            lineHeight: "160%",
          },
        ],
        "Title02-SB": [
          "18px",
          {
            fontWeight: "600",
            lineHeight: "160%",
          },
        ],

        "Body01-B": [
          "16px",
          {
            fontWeight: "700",
            lineHeight: "150%",
          },
        ],
        "Body01-SB": [
          "16px",
          {
            fontWeight: "600",
            lineHeight: "150%",
          },
        ],
        "Body01-M": [
          "16px",
          {
            fontWeight: "500",
            lineHeight: "150%",
          },
        ],
        "Body01-R": [
          "16px",
          {
            fontWeight: "400",
            lineHeight: "150%",
          },
        ],
        "Body02-SB": [
          "14px",
          {
            fontWeight: "600",
            lineHeight: "150%",
          },
        ],
        "Body02-M": [
          "14px",
          {
            fontWeight: "500",
            lineHeight: "150%",
          },
        ],
        "Body02-R": [
          "16px",
          {
            fontWeight: "400",
            lineHeight: "150%",
          },
        ],
        Caption: [
          "12px",
          {
            fontWeight: "500",
            lineHeight: "140%",
          },
        ],
        Button: [
          "16px",
          {
            fontWeight: "600",
            lineHeight: "150%",
          },
        ],
      },
      backgroundImage: () => ({
        "--background": `linear-gradient(180deg, #000000 0%, #434343 100%)`,
      }),
      colors: {
        grey: {
          50: "var(--grey-50)",
          100: "var(--grey-100)",
          200: "var(--grey-200)",
          300: "var(--grey-300)",
          400: "var(--grey-400)",
          500: "var(--grey-500)",
          600: "var(--grey-600)",
          700: "var(--grey-700)",
          800: "var(--grey-800)",
          900: "var(--grey-900)",
        },
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
