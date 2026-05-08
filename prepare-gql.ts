import { config } from "dotenv";
import { generate } from "@genql/cli";
import { fileURLToPath } from "url";

async function main() {
  config();
  await generate({
    endpoint: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
    output: fileURLToPath(new URL("src/generated/github", import.meta.url)),
  });
}

main().catch(console.error);
