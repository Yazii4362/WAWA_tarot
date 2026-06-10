/**
 * Generate favicons from public/images/wawa/angel.webp.
 *
 * Output (브라우저 호환성을 위해 PNG 유지):
 *  - public/favicon-16.png
 *  - public/favicon-32.png
 *  - public/favicon-48.png
 *  - public/apple-touch-icon.png  (180×180, iOS는 PNG 필수)
 *
 * Usage: node scripts/build-favicon.mjs
 */
import sharp from "sharp";
import { resolve } from "node:path";
import { statSync } from "node:fs";

const SRC = resolve("public/images/wawa/angel.webp");

const TARGETS = [
  { size: 16, name: "favicon-16.png" },
  { size: 32, name: "favicon-32.png" },
  { size: 48, name: "favicon-48.png" },
  { size: 180, name: "apple-touch-icon.png" },
];

// 투명 여백을 잘라낸 버전을 한 번만 만들어 모든 사이즈에서 재사용.
const trimmedBuf = await sharp(SRC).trim().png().toBuffer();

for (const { size, name } of TARGETS) {
  const dst = resolve(`public/${name}`);
  await sharp(trimmedBuf)
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9, palette: size <= 48 })
    .toFile(dst);
  const kb = (statSync(dst).size / 1024).toFixed(2);
  console.log(`✓ ${name}  (${size}×${size}, ${kb} KB)`);
}
