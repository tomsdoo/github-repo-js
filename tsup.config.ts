import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    globalName: "GitHubRepoJs",
    clean: true,
    dts: true,
    splitting: false,
    minify: true,
    keepNames: true,
    format: ["esm", "iife"],
    outDir: "dist",
  },
  {
    entry: ["src/repl.ts"],
    clean: true,
    dts: false,
    splitting: false,
    minify: true,
    keepNames: true,
    format: ["esm"],
    outDir: "dist",
  }
]);
