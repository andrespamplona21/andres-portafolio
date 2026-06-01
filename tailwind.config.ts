import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        bg: "oklch(var(--bg) / <alpha-value>)",
        surface: "oklch(var(--surface) / <alpha-value>)",
        fg: "oklch(var(--fg) / <alpha-value>)",
        muted: "oklch(var(--muted) / <alpha-value>)",
        subtle: "oklch(var(--subtle) / <alpha-value>)",
        border: "oklch(var(--border) / <alpha-value>)",
        accent: "oklch(var(--accent) / <alpha-value>)",
        "accent-strong": "oklch(var(--accent-strong) / <alpha-value>)",
        "accent-fg": "oklch(var(--accent-fg) / <alpha-value>)",
        warning: "oklch(var(--warning) / <alpha-value>)",
        success: "oklch(var(--success) / <alpha-value>)",
        danger: "oklch(var(--danger) / <alpha-value>)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
