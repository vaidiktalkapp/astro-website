const fs = require('fs');
const files = [
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/detailed/gemstone/page.tsx'
];

for(let f of files) {
  if(!fs.existsSync(f)) continue;
  let c = fs.readFileSync(f, 'utf8');
  
  // Clean up any extra closing divs that I created before the section
  // Replace 4 divs with 3
  c = c.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<section className="pb-12 md:pb-16/g, '</div>\n      </div>\n      </div>\n\n      <section className="pb-12 md:pb-16');
  
  // Replace 4 divs with 3 for the EVERYTHING YOU NEED comment
  c = c.replace(/<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*{\/\* ============ EVERYTHING YOU NEED/g, '</div>\n      </div>\n      </div>\n\n      {/* ============ EVERYTHING YOU NEED');
  
  fs.writeFileSync(f, c);
  console.log('Fixed ' + f);
}
