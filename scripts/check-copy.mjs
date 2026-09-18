import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const roots = ["app", "lib"];
const extensions = new Set([".ts", ".tsx", ".js", ".jsx", ".css"]);
const forbidden = [
  { token: "\u2014", label: "em dash" },
  { token: "\u2192", label: "arrow symbol" },
];
const discouraged = ["seamless", "cutting-edge", "world-class"];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path)));
    } else if (extensions.has(extname(entry.name))) {
      files.push(path);
    }
  }

  return files;
}

let hasErrors = false;

for (const root of roots) {
  const files = await collectFiles(root);

  for (const file of files) {
    const content = await readFile(file, "utf8");
    const lines = content.split("\n");

    lines.forEach((line, index) => {
      for (const rule of forbidden) {
        if (line.includes(rule.token)) {
          hasErrors = true;
          console.error(
            `ERROR ${file}:${index + 1} contains forbidden ${rule.label}.`,
          );
        }
      }

      for (const phrase of discouraged) {
        if (line.toLowerCase().includes(phrase)) {
          console.warn(
            `WARN  ${file}:${index + 1} contains discouraged phrase "${phrase}".`,
          );
        }
      }
    });
  }
}

if (hasErrors) {
  process.exit(1);
}

console.log("Copy check passed.");
