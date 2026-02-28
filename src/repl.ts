import { GitHubFacade } from "@/index";
import { start } from "repl";
import { readFile } from "fs/promises";
import * as path from "path";
import assert from "assert";

async function executeScriptFile(scriptFilePath: string, github: GitHubFacade) {
  await (new Function(
    "{github}",
    `return new Promise(async (resolve) => {
      ${await readFile(scriptFilePath, { encoding: "utf8" })}
      resolve();
    });`
  ))({
    github,
  });
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  assert(token != null && token !== "", "GITHUB_TOKEN environment variable is not set");
  const github = new GitHubFacade(token);

  const [_nodeCommand, _scriptFilePath, scriptFilePath] = process.argv;
  const scriptPath = path.resolve(process.cwd(), `/scripts/${scriptFilePath}`);
  if (scriptFilePath != null) {
    await executeScriptFile(scriptPath, github);
    return;
  }

  const replServer = start({
    prompt: "github> ",
  });
  replServer.context.github = github;
}

main().catch(console.error);
