/**
 * Convertit public/profile.jpg → public/profile.webp
 * Usage : node scripts/convert-images.mjs
 * Prérequis : npm install sharp --save-dev
 */
import sharp from "sharp";
import { existsSync } from "fs";

const src = "public/profile.jpg";
const dest = "public/profile.webp";

if (!existsSync(src)) {
  console.warn(`⚠️  ${src} introuvable — place ton image dans public/`);
  process.exit(0);
}

await sharp(src).webp({ quality: 82, effort: 6 }).toFile(dest);
console.log(`✅  ${dest} généré`);
