const fs = require('fs');
const path = require('path');

const pages = [
  'kundali/kundali-matching',
  'kundali/personalized-lal-kitab',
  'kundali/hastlikhit-kundali',
  'numerology/fortune-numerology',
  'numerology/name-mobile-number-numerology',
];

const baseDir = path.join(__dirname, 'src', 'app', '(main)', 'report');

pages.forEach(dir => {
  const pagePath = path.join(baseDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) return;
  let content = fs.readFileSync(pagePath, 'utf-8');

  const brokenPattern = "import {\nimport { useReportBooking } from '../../../../../hooks/useReportBooking';";
  const fixedPattern = "import { useReportBooking } from '../../../../../hooks/useReportBooking';\nimport {";

  if (content.includes(brokenPattern)) {
    content = content.replace(brokenPattern, fixedPattern);
    fs.writeFileSync(pagePath, content, 'utf-8');
    console.log('Fixed:', dir);
  } else {
    console.log('OK (no fix needed):', dir);
  }
});
