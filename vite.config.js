import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        recipe_page: resolve(__dirname, "src/recipes_page/index.html"),
        recipe_listing: resolve(__dirname, "src/recipes_listing/index.html"),
      },
    },
  },
});
