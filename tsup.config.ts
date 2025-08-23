import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  globalName: "GitHubRepoJs",
  clean: true,
  dts: false,
  splitting: false,
  minify: true,
  format: ["esm", "iife"],
  outDir: "dist",
});
