const fs = require('fs');
const path = require('path');

const files = [
  'name-mobile-number-numerology/page.tsx',
  'fortune-numerology/page.tsx',
  'personalized-lal-kitab/page.tsx',
  'kundali-matching/page.tsx',
  'hastlikhit-kundali/page.tsx',
  'vaidik-smart-kundali-10-years/page.tsx'
];

const basePath = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali';
const basePathNum = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology';

for (const file of files) {
  let filePath;
  if (file.includes('numerology')) {
    filePath = path.join(basePathNum, file); // Fixed numerology path issue
  } else {
    filePath = path.join(basePath, file);
  }

  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // Replace the class name
    content = content.replace(
      /className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"/g,
      'className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"'
    );

    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Updated opacity ' + file);
  } else {
    console.log('File not found ' + file);
  }
}
