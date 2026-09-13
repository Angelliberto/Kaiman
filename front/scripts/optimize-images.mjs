/**
 * One-shot web image optimizer for KAIMAN.
 * Reads files into memory first (avoids Windows/path open issues with sharp),
 * resizes to max 1600px wide and recompresses JPEG (quality 78).
 * PNGs over the size threshold are converted to .jpg siblings.
 *
 * Usage: node scripts/optimize-images.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesRoot = path.resolve(__dirname, '../public/images');
const MAX_WIDTH = 1600;
const JPEG_QUALITY = 78;
const MIN_BYTES = 350 * 1024;

const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG', '.WEBP']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (IMAGE_EXT.has(path.extname(entry.name))) {
      files.push(full);
    }
  }

  return files;
}

async function optimizeFile(filePath) {
  const stat = await fs.stat(filePath);
  if (stat.size < MIN_BYTES) return { skipped: true, reason: 'small' };

  const ext = path.extname(filePath).toLowerCase();
  const inputBuffer = await fs.readFile(filePath);

  let pipeline = sharp(inputBuffer, { failOn: 'none' }).rotate();
  const meta = await pipeline.metadata();

  pipeline = sharp(inputBuffer, { failOn: 'none' }).rotate();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const outBuffer = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

  if (ext === '.png') {
    const outPath = filePath.replace(/\.(png|PNG)$/, '.jpg');
    if (outBuffer.length >= stat.size && (!meta.width || meta.width <= MAX_WIDTH)) {
      return { skipped: true, reason: 'no-gain' };
    }
    await fs.writeFile(outPath, outBuffer);
    if (path.resolve(outPath) !== path.resolve(filePath)) {
      await fs.unlink(filePath);
    }
    return {
      optimized: true,
      from: stat.size,
      to: outBuffer.length,
      out: outPath,
      converted: true,
    };
  }

  if (outBuffer.length >= stat.size * 0.95 && (!meta.width || meta.width <= MAX_WIDTH)) {
    return { skipped: true, reason: 'no-gain' };
  }

  await fs.writeFile(filePath, outBuffer);
  return { optimized: true, from: stat.size, to: outBuffer.length, out: filePath };
}

function mb(n) {
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

const files = await walk(imagesRoot);
let saved = 0;
let touched = 0;
let failed = 0;

console.log(`Found ${files.length} images under ${imagesRoot}`);

for (const file of files) {
  try {
    const result = await optimizeFile(file);
    if (result.skipped) continue;
    touched += 1;
    saved += result.from - result.to;
    const rel = path.relative(imagesRoot, result.out);
    console.log(
      `✓ ${rel}: ${mb(result.from)} → ${mb(result.to)}${result.converted ? ' (png→jpg)' : ''}`
    );
  } catch (err) {
    failed += 1;
    console.error(`✗ ${path.relative(imagesRoot, file)}:`, err.message);
  }
}

console.log(`\nDone. Optimized ${touched} files, saved ~${mb(saved)}, failed ${failed}.`);
