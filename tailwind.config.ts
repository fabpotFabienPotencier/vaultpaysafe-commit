import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "inverse-surface": "#313030",
        "surface-container-lowest": "#ffffff",
        "surface-dim": "#ddd9d8",
        "secondary-fixed": "#dbe1ff",
        "surface-variant": "#e5e2e1",
        "on-secondary-fixed": "#00174c",
        "secondary-fixed-dim": "#b4c5ff",
        "on-secondary-container": "#fefcff",
        "tertiary-fixed-dim": "#cdc5c4",
        "on-background": "#1c1b1b",
        "on-error-container": "#93000a",
        "error": "#ba1a1a",
        "on-tertiary-fixed": "#1e1b1b",
        "primary-container": "#1b1c1c",
        "on-primary": "#ffffff",
        "secondary-container": "#2569fe",
        "surface-container": "#f1edec",
        "surface": "#fcf8f8",
        "on-secondary-fixed-variant": "#003da9",
        "on-tertiary-fixed-variant": "#4b4645",
        "tertiary-container": "#1e1b1b",
        "on-primary-fixed": "#1b1c1c",
        "on-tertiary-container": "#898282",
        "on-tertiary": "#ffffff",
        "primary-fixed": "#e4e2e1",
        "tertiary": "#000000",
        "outline": "#747878",
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#444747",
        "on-primary-container": "#848483",
        "inverse-on-surface": "#f4f0ef",
        "surface-container-low": "#f7f3f2",
        "primary-fixed-dim": "#c7c6c6",
        "tertiary-fixed": "#e9e0e0",
        "primary": "#000000",
        "surface-container-high": "#ebe7e7",
        "surface-bright": "#fcf8f8",
        "secondary": "#0050d7",
        "background": "#fcf8f8",
        "outline-variant": "#c4c7c7",
        "error-container": "#ffdad6",
        "surface-tint": "#5e5e5e",
        "inverse-primary": "#c7c6c6",
        "on-primary-fixed-variant": "#464747",
        "surface-container-highest": "#e5e2e1",
        "on-secondary": "#ffffff",
        "on-error": "#ffffff",
        // Additional brand accents for VaultPaySafe specifics
        "accent-green": "#0A8953",
        "accent-red": "#ba1a1a",
      },
      borderRadius: {
        "DEFAULT": "1rem",
        "lg": "2rem",
        "xl": "3rem",
        "full": "9999px"
      },
      spacing: {
        "element-gap": "16px",
        "base": "4px",
        "container-padding": "24px",
        "section-margin": "40px",
        "gutter": "12px"
      },
      fontFamily: {
        "display-balance": ["Inter", "sans-serif"],
        "body-main": ["Inter", "sans-serif"],
        "display-input": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "screen-title": ["Inter", "sans-serif"],
        "section-header": ["Inter", "sans-serif"]
      },
      fontSize: {
        "display-balance": ["64px", {"lineHeight": "1.1", "letterSpacing": "-0.02em", "fontWeight": "600"}],
        "body-main": ["16px", {"lineHeight": "1.5", "fontWeight": "400"}],
        "display-input": ["80px", {"lineHeight": "1.0", "letterSpacing": "-0.04em", "fontWeight": "500"}],
        "label-caps": ["12px", {"lineHeight": "1.0", "letterSpacing": "0.05em", "fontWeight": "600"}],
        "screen-title": ["20px", {"lineHeight": "1.2", "fontWeight": "600"}],
        "section-header": ["24px", {"lineHeight": "1.3", "letterSpacing": "-0.01em", "fontWeight": "600"}]
      }
    },
  },
  plugins: [],
};
export default config;
