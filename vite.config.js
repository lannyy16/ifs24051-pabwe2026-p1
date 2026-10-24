
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.js",

    include: [
      "src/**/*.{test,spec}.{js,jsx,ts,tsx}",
    ],

    coverage: {
      provider: "v8",

      include: [
        "src/**/*.{js,jsx}",
      ],

      exclude: [
        "src/**/*.test.{js,jsx}",
        "src/tests/**",
        "src/main.jsx",
      ],

      reporter: [
        "text",
        "html",
      ],
    },
  },
});
