import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdir, stat } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const projectsDir = join(root, 'public', 'projects');

const files = await readdir(projectsDir);
const pngFiles = files.filter((f) => f.toLowerCase().endsWith('.png'));

console.log(`Convertir ${pngFiles.length} PNG a WebP...\n`);

for (const file of pngFiles) {
  const inputPath = join(projectsDir, file);
  const outputName = file.replace(/\.png$/i, '.webp');
  const outputPath = join(projectsDir, outputName);

  const originalSize = (await stat(inputPath)).size;

  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(outputPath);

  const newSize = (await stat(outputPath)).size;
  const savings = ((1 - newSize / originalSize) * 100).toFixed(1);

  console.log(
    `✓ ${file} (${(originalSize / 1024).toFixed(0)} KB) → ${outputName} (${(newSize / 1024).toFixed(0)} KB, -${savings}%)`
  );
}

console.log('\nConversión completa.');
