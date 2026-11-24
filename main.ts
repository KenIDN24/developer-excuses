import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Developer Excuses — one funny single-line excuse a developer gives
// when code breaks in production (gate: 1-200 chars, single line).
const LINE =
  "The outage traces to a variable I named 'temp' in 2019. It's load-bearing now. We've all agreed to stop pointing at it.";

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip check: what we wrote must be exactly the line, one line, in gate.
const back = readFileSync(outPath, "utf8");
if (back !== LINE) throw new Error("round-trip mismatch");
if (LINE.length < 1 || LINE.length > 200) throw new Error("length gate failed");
if (LINE.includes("\n") || LINE.includes("\r")) throw new Error("must be one line");
if (LINE.trim() !== LINE) throw new Error("no leading/trailing whitespace");
if (LINE.includes("\t") || /  /.test(LINE))
  throw new Error("no tabs or double spaces inside the line");
console.log(`wrote ${LINE.length} chars to ${outPath}`);
