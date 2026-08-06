const fs = require('fs');
const path = require('path');

const dirs = [
  'kundali/vaidik-smart-kundali-10-years',
  'kundali/kundali-matching',
  'kundali/personalized-lal-kitab',
  'kundali/hastlikhit-kundali',
  'numerology/fortune-numerology',
  'numerology/name-mobile-number-numerology',
];

const baseDir = path.join(__dirname, 'src', 'app', '(main)', 'report');

dirs.forEach(dir => {
  const pagePath = path.join(baseDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  let content = fs.readFileSync(pagePath, 'utf-8');

  // Regex to match old alert-based handleSubmit
  const oldHandleSubmitRegex = /const handleSubmit = \(e: any\) => \{\s*e\.preventDefault\(\);\s*alert\([^)]+\);\s*\};/g;

  if (oldHandleSubmitRegex.test(content)) {
    content = content.replace(oldHandleSubmitRegex, '');
    fs.writeFileSync(pagePath, content, 'utf-8');
    console.log('✅ Removed old handleSubmit from:', dir);
  } else {
    console.log('OK (no stale handleSubmit):', dir);
  }
});
