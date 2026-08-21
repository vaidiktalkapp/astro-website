const fs = require('fs');

const files = [
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/detailed/gemstone/page.tsx"
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace text sizes
    content = content.replace(/text-\[36px\] md:text-\[50px\] lg:text-\[60px\]/g, 'text-[34px] md:text-[48px] lg:text-[58px]');
    
    // Replace paddings/margins in hero to match the kundali matching reduction
    content = content.replace(/pt-10 pb-20/g, 'pt-6 pb-16');
    content = content.replace(/pt-8 pb-15/g, 'pt-6 pb-12'); 
    
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
