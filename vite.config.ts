
import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

const viteConfig = defineViteConfig({
  plugins: [react()],
});

const vitestConfig = defineVitestConfig({
  test: {
    globals: true, // Permite usar describe, it, expect sin importarlos
    environment: "jsdom", // Usa jsdom para emular el entorno del navegador
    setupFiles: "./src/setupTests.ts", // Archivo de configuración de pruebas
    include: ["src/**/*.{test,spec}.ts", "src/**/*.{test,spec}.tsx"], // Incluir archivos de prueba
  },
});

export default mergeConfig(viteConfig, vitestConfig);
