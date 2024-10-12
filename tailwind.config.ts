import {ConfigTheme, nextui } from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const Theme : ConfigTheme = {
  colors: {
    background: {
      DEFAULT: "#191B20"
    },
    foreground: {
      DEFAULT: "#F5F5F5",
      foreground: "#CED7EF"
    },
    content1: {
      DEFAULT: "#16171C"
    },
    content2: {
      DEFAULT: "#15161A"
    },
    default: {
      DEFAULT: "#212329",
      100: "#212329",
      foreground: "#F5F5F5"
    },
    primary: {
      DEFAULT: "#5D45FD",
      foreground: "#F5F5F5"
    },
    secondary: {
      DEFAULT: "#7B50D6",
      foreground: "#F5F5F5"
    },
    warning: {
      DEFAULT: "#EFB33F",
      foreground: "#F5F5F5"
    },
    danger: {
      DEFAULT: "#E83E48",
      foreground: "#F5F5F5"
    },
    success: {
      DEFAULT: "#3EE86D",
      foreground: "#F5F5F5"
    },
    divider: {
      DEFAULT: "rgba(255,255,255,.15)",
    },
  },
}

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/icons/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/mdx-components.tsx",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(accordion|avatar|badge|breadcrumbs|button|checkbox|chip|code|divider|dropdown|image|input|kbd|link|modal|pagination|popover|progress|scroll-shadow|select|skeleton|slider|spinner|tabs|user|ripple|menu|listbox).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' },
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' },
        },
      },
      animation: {
        'gradient': 'gradient 10s ease infinite',
        marquee: 'marquee var(--duration) linear infinite',
          'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
      },
    }
  },
  plugins: [
    require("tailwind-highlightjs"),
    nextui({
      defaultTheme: "dark",
      themes: {
        dark: Theme,
        light: Theme
      }
    }),
  ],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
};
export default config;
