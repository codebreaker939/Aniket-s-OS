import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
    "./src/data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-0": "rgb(var(--surface-0) / <alpha-value>)",
        "surface-1": "rgb(var(--surface-1) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        "surface-3": "rgb(var(--surface-3) / <alpha-value>)",
        "surface-4": "rgb(var(--surface-4) / <alpha-value>)",
        elevated: "rgb(var(--elevated) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "border-soft": "rgb(var(--border-soft) / <alpha-value>)",
        "border-strong": "rgb(var(--border-strong) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-mint": "rgb(var(--accent-mint) / <alpha-value>)",
        "accent-teal": "rgb(var(--accent-teal) / <alpha-value>)",
        "accent-lavender": "rgb(var(--accent-lavender) / <alpha-value>)",
        "accent-copper": "rgb(var(--accent-copper) / <alpha-value>)",
        "semantic-info": "rgb(var(--semantic-info) / <alpha-value>)",
        "semantic-attention": "rgb(var(--semantic-attention) / <alpha-value>)",
        "semantic-error": "rgb(var(--semantic-error) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)"
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"]
      },
      borderRadius: {
        sm: "calc(var(--radius) - 2px)",
        md: "var(--radius)",
        lg: "calc(var(--radius) + 2px)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)"
      },
      boxShadow: {
        shell: "0 24px 80px rgb(0 0 0 / 0.42)",
        "thin-inset": "inset 0 1px 0 rgb(255 255 255 / 0.04)",
        "os-widget": "var(--shadow-widget)",
        "os-window": "var(--shadow-window)",
        "os-window-focus": "var(--shadow-window-focus)",
        "os-modal": "var(--shadow-modal)"
      }
    }
  },
  plugins: []
};

export default config;
