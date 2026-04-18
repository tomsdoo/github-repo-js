import { defineConfig } from "tsdown";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    globalName: "GitHubRepoJs",
    clean: true,
    dts: false,
    minify: true,
    format: ["esm", "iife"],
    outDir: "dist",
    outputOptions: {
      keepNames: true,
    },
  },
  {
    entry: ["src/repl.ts"],
    clean: true,
    dts: false,
    minify: true,
    format: ["esm"],
    outDir: "dist",
    outputOptions: {
      keepNames: true,
    },
  }
]);
