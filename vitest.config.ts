import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          include: ["**/*.test.{ts,js}"],
          name: "node",
          environment: "node",
        },
        resolve: {
          alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
            "@@": fileURLToPath(new URL("./", import.meta.url)),
          },
        },
      },
    ],
  },
});
