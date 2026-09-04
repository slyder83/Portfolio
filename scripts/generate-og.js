import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

async function generateOgImage() {
  const svgPath = join(root, 'public', 'og-image.svg');
  const pngPath = join(root, 'public', 'og-image.png');

  await sharp(svgPath)
    .resize(1200, 630)
    .png({ quality: 90 })
    .toFile(pngPath);

  console.log('✓ OG image generated: public/og-image.png (1200×630)');
}

generateOgImage().catch((err) => {
  console.error('Failed to generate OG image:', err);
  throw err;
});
