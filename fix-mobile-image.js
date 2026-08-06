const fs = require('fs');
const path = require('path');

const dir = 'src/app/(main)';
const files = fs.readdirSync(dir).filter(f => f.endsWith('-astrology'));

for (const folder of files) {
  const filePath = path.join(dir, folder, 'page.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix wrapper div classes
    content = content.replace(
      /className="w-\[110%\] -ml-\[5%\] mt-12 lg:hidden relative pointer-events-none flex justify-center"/g,
      'className="w-full mt-10 lg:hidden relative pointer-events-none flex justify-center px-4"'
    );

    // Fix image classes (remove opacity-95, change object-top to object-center)
    content = content.replace(
      /className="w-full max-w-\[600px\] h-\[300px\] md:h-\[400px\] object-cover object-top opacity-95 mix-blend-multiply"/g,
      'className="w-full max-w-[500px] h-[280px] md:h-[400px] object-cover object-center mix-blend-multiply"'
    );
    
    // Some files might not have object-top (like child-astrology which has opacity-95)
    content = content.replace(
      /className="w-full max-w-\[600px\] h-\[300px\] md:h-\[400px\] object-cover object-top opacity-95 mix-blend-multiply"/g,
      'className="w-full max-w-[500px] h-[280px] md:h-[400px] object-cover object-center mix-blend-multiply"'
    );

    // Fix the gradient mask from 50% to 80% to reduce white fade effect
    content = content.replace(
      /maskImage: 'linear-gradient\(to bottom, black 50%, transparent 100%\)', WebkitMaskImage: 'linear-gradient\(to bottom, black 50%, transparent 100%\)'/g,
      "maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'"
    );

    fs.writeFileSync(filePath, content);
    console.log(`Updated mobile image in ${folder}`);
  }
}
