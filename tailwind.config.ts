import type { Config } from "tailwindcss";

export default {
  content: [
  "./apps/**/*.{js,ts,jsx,tsx}",
  "./packages/ui/**/*.{js,ts,jsx,tsx}"
],
  theme: {
    extend: {
      colors: {
        mauve: "var(--mauve)",
        indigo: "var(--indigo)",
        gold: "var(--gold)",
        silver: "var(--silver)",
        vellum: "var(--vellum)",
        ink: "var(--ink)"
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;