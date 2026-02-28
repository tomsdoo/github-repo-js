import { GitHubFacade } from "@/index";
import { start } from "repl";
import assert from "assert";

async function main() {
  const token = process.env.GITHUB_TOKEN;
  assert(token != null && token !== "", "GITHUB_TOKEN environment variable is not set");
  const github = new GitHubFacade(token);
  const replServer = start({
    prompt: "github> ",
  });
  replServer.context.github = github;
}

main().catch(console.error);
