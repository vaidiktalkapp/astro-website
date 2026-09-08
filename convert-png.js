const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = 'd:/Vaidik Talk Updated/astro-frontend/public/images/reports';

async function convertAll() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace('.png', '.webp'));
      console.log(`Converting ${file} to ${path.basename(outputPath)}...`);
      try {
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
        console.log(`Successfully converted ${file}.`);
      } catch (err) {
        console.error(`Error converting ${file}:`, err.message);
      }
    }
  }
}

convertAll();
