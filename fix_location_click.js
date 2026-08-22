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
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace onClick with onMouseDown for location suggestions
    content = content.replace(
      /onClick=\{\(\) => \{\s+setUserData\(\{ \.\.\.userData, pob: displayName/g, 
      'onMouseDown={(e) => { e.preventDefault(); setUserData({ ...userData, pob: displayName'
    );
    // Also, just in case they have a different variable name in Kundali Matching (Male/Female POB)
    content = content.replace(
      /onClick=\{\(\) => \{\s+setMaleData\(\{ \.\.\.maleData, pob: displayName/g, 
      'onMouseDown={(e) => { e.preventDefault(); setMaleData({ ...maleData, pob: displayName'
    );
    content = content.replace(
      /onClick=\{\(\) => \{\s+setFemaleData\(\{ \.\.\.femaleData, pob: displayName/g, 
      'onMouseDown={(e) => { e.preventDefault(); setFemaleData({ ...femaleData, pob: displayName'
    );
    
    fs.writeFileSync(file, content);
    console.log("Fixed suggestion click in:", file);
  }
});
