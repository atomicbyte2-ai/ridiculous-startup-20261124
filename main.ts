import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "We rent out retired sniffer dogs as Airbnb security greeters that sniff guests' luggage for bedbugs, and hosts pay per stay to protect their 5-star rating.";

if (LINE.length === 0 || LINE !== LINE.trim()) {
  throw new Error("entry must be non-empty with no leading/trailing whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.length > 200) {
  throw new Error(`entry is ${LINE.length} characters, over the 200 limit`);
}
if (!/pay/.test(LINE)) {
  throw new Error("entry must name who pays");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE);
console.log(`Wrote entry.txt (${LINE.length} chars)`);
