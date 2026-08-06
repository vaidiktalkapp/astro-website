const fs = require('fs');
const path = require('path');

const dir = 'src/app/(main)';
const files = fs.readdirSync(dir).filter(f => f.endsWith('-astrology'));

for (const folder of files) {
  const filePath = path.join(dir, folder, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Re-adjust the wrapper to break out of the px-6 padding perfectly, instead of becoming a box
    content = content.replace(
      /className="w-full mt-10 lg:hidden relative pointer-events-none flex justify-center px-4"/g,
      'className="w-[calc(100%+3rem)] -ml-6 mt-12 lg:hidden relative pointer-events-none flex justify-center"'
    );

    // Re-adjust the image classes to properly blend without harsh lines
    content = content.replace(
      /className="w-full max-w-\[500px\] h-\[280px\] md:h-\[400px\] object-cover object-center mix-blend-multiply"/g,
      'className="w-full h-[320px] object-cover object-top opacity-95 mix-blend-multiply"'
    );

    // Fix the gradient mask to start at 60% (so it's not a box, but doesn't fade too early)
    content = content.replace(
      /maskImage: 'linear-gradient\(to bottom, black 75%, transparent 100%\)', WebkitMaskImage: 'linear-gradient\(to bottom, black 75%, transparent 100%\)'/g,
      "maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'"
    );

    fs.writeFileSync(filePath, content);
    console.log(`Fixed mobile image box issue in ${folder}`);
  }
}
