import { existsSync, readFileSync, statSync } from "node:fs";
import { gzipSync } from "node:zlib";

const workerPath = ".open-next/worker.js";

if (!existsSync(workerPath)) {
  console.error(`Missing ${workerPath}. Run \"npm run build:cf\" first.`);
  process.exit(1);
}

const bytes = statSync(workerPath).size;
const gzipBytes = gzipSync(readFileSync(workerPath)).length;
const mib = bytes / (1024 * 1024);
const gzipMib = gzipBytes / (1024 * 1024);

console.log(`worker.js: ${bytes.toLocaleString()} bytes (${mib.toFixed(2)} MiB)`);
console.log(`worker.js (gzip): ${gzipBytes.toLocaleString()} bytes (${gzipMib.toFixed(2)} MiB)`);

const freeLimit = 3 * 1024 * 1024;
if (bytes > freeLimit) {
  console.error("Status: OVER 3 MiB free-plan worker limit (raw size)");
  process.exit(2);
}

console.log("Status: within 3 MiB free-plan worker limit (raw size)");
