import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("package.json", "utf8"));

const REQUIRED = {
  next: "15.5.7"
};

for (const [dep, version] of Object.entries(REQUIRED)) {
  if (pkg.dependencies?.[dep] !== version) {
    console.error(
      `❌ Preflight failed: ${dep} must be pinned to ${version}`
    );
    process.exit(1);
  }
}

console.log("✅ Preflight passed: dependency versions are safe");