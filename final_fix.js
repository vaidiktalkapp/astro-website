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
  
  // Replace missing </div> for mobile fragment
  c = c.replace(/<\/span>\s*<\/React\.Fragment>/g, '</span>\n  </div>\n            </React.Fragment>');
  
  // Fix Desktop cards closing tags (removing stray } and ensuring exactly 3 </div> tags before the next section)
  // Find where it ends:
  c = c.replace(/<\/div>\s*<\/div>\s*}\s*<section className="pb-12 md:pb-16/g, '</div>\n      </div>\n      </div>\n\n      <section className="pb-12 md:pb-16');
  c = c.replace(/<\/div>\s*<\/div>\s*<section className="pb-12 md:pb-16/g, '</div>\n      </div>\n      </div>\n\n      <section className="pb-12 md:pb-16');
  
  // Also check if there's a comment in between
  c = c.replace(/<\/div>\s*<\/div>\s*}\s*{\/\* ============ EVERYTHING YOU NEED/g, '</div>\n      </div>\n      </div>\n\n      {/* ============ EVERYTHING YOU NEED');
  c = c.replace(/<\/div>\s*<\/div>\s*{\/\* ============ EVERYTHING YOU NEED/g, '</div>\n      </div>\n      </div>\n\n      {/* ============ EVERYTHING YOU NEED');
  
  fs.writeFileSync(f, c);
  console.log('Fixed ' + f);
}
