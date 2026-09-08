const sharp = require('sharp');
const path = 'd:/Vaidik Talk Updated/astro-frontend/public/founder.webp';

sharp(path).metadata().then(metadata => {
  console.log(`Width: ${metadata.width}, Height: ${metadata.height}`);
}).catch(err => {
  console.error(err);
});
