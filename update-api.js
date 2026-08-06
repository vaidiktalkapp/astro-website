const fs = require('fs');
const pages = [
  { path: 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/page.tsx', slug: 'vaidik-smart-kundali-10-years' },
  { path: 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/kundali-matching/page.tsx', slug: 'kundali-matching' },
  { path: 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/page.tsx', slug: 'personalized-lal-kitab' },
  { path: 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/page.tsx', slug: 'hastlikhit-kundali' },
  { path: 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/page.tsx', slug: 'fortune-numerology' },
  { path: 'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/page.tsx', slug: 'name-mobile-number-numerology' }
];

for (const {path, slug} of pages) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/apiClient\.get\('\/smart-kundali-settings'\)/g, `apiClient.get('/smart-kundali-settings/${slug}')`);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Updated', slug);
}
