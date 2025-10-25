import { readdir, readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const modulesDir = path.join(
  path.dirname(fileURLToPath(new URL(import.meta.url))),
  "./src/modules"
);

const files = await readdir(modulesDir, { withFileTypes: true, recursive: true });
for (const file of files.filter(file => file.isFile() && /^\.ts$/i.test(path.extname(file.name)))) {
  const filePath = path.join(file.parentPath, file.name);
  const currentContent = await readFile(filePath, { encoding: "utf8" });
  const nextContent = currentContent.replace(/\bprotected\b/gm, "public");
  if (currentContent === nextContent) {
    continue;
  }
  await writeFile(filePath, nextContent, { encoding: "utf8" });
  console.log(filePath);
}


