/**
 * One-shot: HEAD 쪽 코드만 남기고 머지 충돌 마커를 제거.
 * Usage: node scripts/resolve-conflicts.mjs <path>
 */
import { readFileSync, writeFileSync } from "node:fs";

const target = process.argv[2];
if (!target) {
  console.error("usage: node scripts/resolve-conflicts.mjs <path>");
  process.exit(1);
}

const before = readFileSync(target, "utf-8");
// <<<<<<< HEAD\n...HEAD\n=======\n...incoming\n>>>>>>> hash\n  →  HEAD 부분만
const after = before.replace(
  /^<{7}\s+HEAD\s*\r?\n([\s\S]*?)^={7}\s*\r?\n[\s\S]*?^>{7}[^\n]*\r?\n/gm,
  "$1"
);

if (/^[<=>]{7}/m.test(after)) {
  console.error("⚠ still have conflict markers, abort");
  process.exit(2);
}

writeFileSync(target, after);
console.log(
  `${target}: ${before.length} → ${after.length} chars  (${
    before.split("\n").length
  } → ${after.split("\n").length} lines)`
);
