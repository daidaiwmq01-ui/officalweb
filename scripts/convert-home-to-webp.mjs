#!/usr/bin/env node
/**
 * 将 public/image/home 下所有图片转为 WebP，并删除原图
 */
import sharp from 'sharp';
import { readdirSync, unlinkSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const homeDir = join(__dirname, '..', 'public', 'image', 'home');

const exts = /\.(png|jpe?g)$/i;
const files = readdirSync(homeDir).filter((f) => exts.test(f));

for (const file of files) {
  const src = join(homeDir, file);
  const base = file.replace(exts, '');
  const webpPath = join(homeDir, base + '.webp');
  try {
    await sharp(src).webp({ quality: 88, effort: 6 }).toFile(webpPath);
    console.log('已转换:', file, '->', base + '.webp');
    unlinkSync(src);
    console.log('已删除原图:', file);
  } catch (err) {
    console.error('失败:', file, err.message);
  }
}
console.log('完成. home 目录共处理', files.length, '个文件.');
