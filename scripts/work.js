/// <reference types="./types.d.ts" />

const fs = await import("fs/promises");
const path = await import("path");

async function listScripts() {
  const files = await fs.readdir("/scripts/routines");
  const scriptFiles = files.filter((file) => file.endsWith(".js"));
  console.log("Available scripts:");
  scriptFiles.forEach((file) => {
    console.log(`- ${file.replace(/\.js$/, "")}`);
  });
}

const args = process.argv.slice(3);

if (args.length === 0) {
  await listScripts();
  return;
}

const [command, ...scriptArgs] = args;

try {
  const scriptPath = path.join("/scripts", "routines", `${command}.js`);
  const { default: work } = await import(scriptPath);
  await work({ github }, ...scriptArgs);
} catch (error) {
  console.error(`Error executing script "${command}":`, error);
  process.exit(1);
}
