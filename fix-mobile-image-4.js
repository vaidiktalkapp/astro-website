const fs = require('fs');
const path = require('path');

const dir = 'src/app/(main)';
const files = fs.readdirSync(dir).filter(f => f.endsWith('-astrology'));

for (const folder of files) {
  const filePath = path.join(dir, folder, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Shift the focus slightly more to the right (from 80% to 95%)
    content = content.replace(
      /className="w-full h-\[320px\] object-cover object-\[80%_top\] opacity-95 mix-blend-multiply"/g,
      'className="w-full h-[320px] object-cover object-[95%_top] opacity-95 mix-blend-multiply"'
    );

    fs.writeFileSync(filePath, content);
    console.log(`Adjusted mobile image focal point to 95% in ${folder}`);
  }
}
