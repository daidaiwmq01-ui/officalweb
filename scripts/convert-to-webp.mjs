#!/usr/bin/env node
/**
 * 将 public/image 下所有 PNG/JPEG 转为 WebP（若同名的 .webp 尚不存在）
 * 需要安装: pnpm add -D sharp
 */
import sharp from 'sharp';
import { readdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicImage = join(__dirname, '..', 'public', 'image');

function* walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) yield* walk(full);
    else if (e.isFile() && /\.(png|jpe?g)$/i.test(e.name)) yield full;
  }
}

let done = 0;
let skipped = 0;
(async () => {
for (const src of walk(publicImage)) {
  const base = src.replace(/\.(png|jpe?g)$/i, '');
  const webp = base + '.webp';
  if (existsSync(webp)) {
    skipped++;
    continue;
  }
  try {
    await sharp(src)
      .webp({ quality: 88, effort: 6 })
      .toFile(webp);
    done++;
    console.log('Converted:', src);
  } catch (err) {
    console.error('Failed:', src, err.message);
  }
}
console.log(`Done: ${done} converted, ${skipped} already had .webp`);
})();
