const fs = require('fs');
const path = require('path');

const dir = 'src/app/(main)';
const files = fs.readdirSync(dir).filter(f => f.endsWith('-astrology'));

for (const folder of files) {
  const filePath = path.join(dir, folder, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix the image positioning from object-top (which centers it and crops the content on the right)
    // to object-[80%_top] (which focuses on the right side where the actual content is!)
    content = content.replace(
      /className="w-full h-\[320px\] object-cover object-top opacity-95 mix-blend-multiply"/g,
      'className="w-full h-[320px] object-cover object-[80%_top] opacity-95 mix-blend-multiply"'
    );

    fs.writeFileSync(filePath, content);
    console.log(`Fixed mobile image focal point in ${folder}`);
  }
}
