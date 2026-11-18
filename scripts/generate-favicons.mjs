import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = join(root, "public/images/brand/o.png");
const output = join(root, "public");
const background = "#06060b";

async function render(size) {
  const markSize = Math.round(size * 0.86);
  const crop = await sharp(source)
    .extract({ left: 0, top: 830, width: 390, height: 380 })
    .png()
    .toBuffer();
  const mark = await sharp(crop)
    .trim()
    .resize(markSize, markSize, { fit: "contain", kernel: "lanczos3" })
    .png()
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: mark, gravity: "centre" }])
    .png({ palette: true, effort: 10 })
    .toBuffer();
}

// ICO files may contain PNG frames; this keeps the exact supplied artwork in
// each size and provides a browser fallback without a second drawing.
function makeIco(frames) {
  const header = Buffer.alloc(6 + frames.length * 16);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);
  let offset = header.length;
  frames.forEach(({ size, bytes }, index) => {
    const entry = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entry);
    header.writeUInt8(size === 256 ? 0 : size, entry + 1);
    header.writeUInt16LE(1, entry + 4);
    header.writeUInt16LE(32, entry + 6);
    header.writeUInt32LE(bytes.length, entry + 8);
    header.writeUInt32LE(offset, entry + 12);
    offset += bytes.length;
  });
  return Buffer.concat([header, ...frames.map(frame => frame.bytes)]);
}

await mkdir(output, { recursive: true });
for (const [filename, size] of [
  ["favicon-32.png", 32],
  ["icon-192.png", 192],
  ["apple-touch-icon.png", 180],
]) {
  await writeFile(join(output, filename), await render(size));
}
const icoFrames = await Promise.all([16, 32, 48].map(async size => ({ size, bytes: await render(size) })));
await writeFile(join(output, "favicon.ico"), makeIco(icoFrames));
