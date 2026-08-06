const fs = require('fs');
const path = require('path');

const reportPages = [
  {
    dir: 'kundali/vaidik-smart-kundali-10-years',
    name: 'Vaidik Smart Kundali 10 Years',
    slug: 'vaidik-smart-kundali-10-years',
    defaultAmount: 649,
    settingsKey: 'vaidik-smart-kundali-10-years',
  },
  {
    dir: 'kundali/kundali-matching',
    name: 'Kundali Matching',
    slug: 'kundali-matching',
    defaultAmount: 499,
    settingsKey: 'kundali-matching',
  },
  {
    dir: 'kundali/personalized-lal-kitab',
    name: 'Personalized Lal Kitab',
    slug: 'personalized-lal-kitab',
    defaultAmount: 799,
    settingsKey: 'personalized-lal-kitab',
  },
  {
    dir: 'kundali/hastlikhit-kundali',
    name: 'Hastlikhit Kundali',
    slug: 'hastlikhit-kundali',
    defaultAmount: 999,
    settingsKey: 'hastlikhit-kundali',
  },
  {
    dir: 'numerology/fortune-numerology',
    name: 'Fortune Numerology',
    slug: 'fortune-numerology',
    defaultAmount: 449,
    settingsKey: 'fortune-numerology',
  },
  {
    dir: 'numerology/name-mobile-number-numerology',
    name: 'Name & Mobile Numerology',
    slug: 'name-mobile-number-numerology',
    defaultAmount: 399,
    settingsKey: 'name-mobile-number-numerology',
  },
];

const baseDir = path.join(__dirname, 'src', 'app', '(main)', 'report');

reportPages.forEach(({ dir, name, slug, defaultAmount }) => {
  const pagePath = path.join(baseDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    console.log('NOT FOUND:', pagePath);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // 1. Add import for useReportBooking if not already present
  if (!content.includes('useReportBooking')) {
    // Find the last import line
    const lastImportIdx = content.lastIndexOf("import ");
    const afterLastImport = content.indexOf('\n', lastImportIdx) + 1;
    content = content.slice(0, afterLastImport) +
      `import { useReportBooking } from '../../../../../hooks/useReportBooking';\n` +
      content.slice(afterLastImport);
  }

  // 2. Replace the old local state and handlers with the hook
  // Remove old formData state
  content = content.replace(
    /const \[formData, setFormData\] = useState\(\{[\s\S]*?\}\);/,
    `const { formData, handleChange, handleSubmit, isProcessing } = useReportBooking({\n    name: '${name}',\n    slug: '${slug}',\n    amount: settings?.price || settings?.discountedPrice || ${defaultAmount},\n  });`
  );

  // 3. Remove old handleChange
  content = content.replace(
    /const handleChange = \(e: any\) => \{\s*setFormData\(\{ \.\.\.formData, \[e\.target\.name\]: e\.target\.value \}\);\s*\};/g,
    ''
  );

  // 4. Replace old handleSubmit
  content = content.replace(
    /const handleSubmit = \(e: any\) => \{\s*e\.preventDefault\(\);\s*alert\([^)]*\);\s*\};/g,
    ''
  );

  // 5. Update submit button - add disabled state and dynamic price
  content = content.replace(
    /<button type="submit" className="([^"]+)">\s*Submit & Proceed to Payment[^<]*<\/button>/g,
    `<button type="submit" disabled={isProcessing} className="$1 disabled:opacity-70 disabled:cursor-not-allowed">\n                  {isProcessing ? 'Processing...' : \`Submit & Proceed to Payment — ₹\${settings?.price || settings?.discountedPrice || ${defaultAmount}}\`}\n                </button>`
  );

  fs.writeFileSync(pagePath, content, 'utf-8');
  console.log('✅ Updated:', dir);
});

console.log('\nAll report pages updated with Razorpay integration!');
