const fs = require('fs');
const files = [
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/kundali-matching/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/detailed/gemstone/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/checkout/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/className="bg-white border-b border-\[#ebdcc7\] sticky top-0 z-50 mb-4"/g, 'className="bg-white border-b border-[#ebdcc7] mb-4"');
  fs.writeFileSync(file, content);
  console.log("Removed sticky from:", file);
});
