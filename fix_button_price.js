const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'app', '(main)', 'report');

const dirs = [
  'kundali/vaidik-smart-kundali-10-years',
  'kundali/kundali-matching',
  'kundali/personalized-lal-kitab',
  'kundali/hastlikhit-kundali',
  'numerology/fortune-numerology',
  'numerology/name-mobile-number-numerology',
];

const defaults = {
  'vaidik-smart-kundali-10-years': 649,
  'kundali-matching': 499,
  'personalized-lal-kitab': 799,
  'hastlikhit-kundali': 999,
  'fortune-numerology': 449,
  'name-mobile-number-numerology': 399,
};

dirs.forEach(dir => {
  const slug = dir.split('/').pop();
  const def = defaults[slug];
  const pagePath = path.join(baseDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Fix: button should show discountedPrice (the actual amount), not price (original/strikethrough)
  // Current wrong pattern: settings?.price || settings?.discountedPrice || X
  // Correct pattern:       settings?.discountedPrice || X
  content = content.replace(
    /`Submit & Proceed to Payment — ₹\$\{settings\?\.price \|\| settings\?\.discountedPrice \|\| (\d+)\}`/g,
    `\`Submit & Proceed to Payment — ₹\${settings?.discountedPrice || ${def}}\``
  );

  fs.writeFileSync(pagePath, content, 'utf-8');
  console.log('✅ Fixed button price in:', dir);
});

console.log('\nButton price fix complete!');
