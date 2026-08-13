const fs = require('fs');
const path = require('path');

const pages = [
  { dir: 'career-astrology', slug: 'career-astrology', client: 'CareerAstrologyClient', title: 'Career Astrology & Job Predictions | VaidikTalk', desc: 'Get accurate career astrology predictions, job changes, and business success insights using Vedic astrology.' },
  { dir: 'child-astrology', slug: 'child-astrology', client: 'ChildAstrologyClient', title: 'Child Astrology & Pregnancy Predictions | VaidikTalk', desc: 'Discover astrological insights about childbirth, progeny, and your child’s future using Vedic astrology.' },
  { dir: 'education-astrology', slug: 'education-astrology', client: 'EducationAstrologyClient', title: 'Education Astrology & Studies | VaidikTalk', desc: 'Find out the best field of study and overcome educational hurdles with Vedic astrology predictions.' },
  { dir: 'finance-astrology', slug: 'finance-astrology', client: 'FinanceAstrologyClient', title: 'Finance & Wealth Astrology | VaidikTalk', desc: 'Unlock the secrets of wealth generation and overcome financial issues with Finance Astrology.' },
  { dir: 'health-astrology', slug: 'health-astrology', client: 'HealthAstrologyClient', title: 'Health Astrology & Medical Predictions | VaidikTalk', desc: 'Predict potential health issues and find astrological remedies with Medical Astrology.' },
  { dir: 'love-astrology', slug: 'love-astrology', client: 'LoveAstrologyClient', title: 'Love Astrology & Relationship Predictions | VaidikTalk', desc: 'Find your true love, predict marriage timing, and resolve relationship issues with Love Astrology.' },
  { dir: 'marriage-astrology', slug: 'marriage-astrology', client: 'MarriageAstrologyClient', title: 'Marriage Astrology & Kundali Milan | VaidikTalk', desc: 'Predict your marriage timing, spouse characteristics, and resolve delays with Marriage Astrology.' }
];

const basePath = path.join(__dirname, 'src/app/(main)');

pages.forEach(p => {
  const filePath = path.join(basePath, p.dir, 'page.tsx');
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('generateMetadata')) return; // Already patched

  const importStr = `import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';\nimport PageSeoProvider from '@/components/shared/PageSeoProvider';\nimport { Metadata } from 'next';\n`;
  const metaStr = `
export async function generateMetadata(): Promise<Metadata> {
  const slug = '${p.slug}';
  const defaultMeta = {
    title: "${p.title}",
    description: "${p.desc}",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}
`;

  // Insert imports
  content = content.replace(`import ${p.client}`, `${importStr}import ${p.client}`);
  
  // Insert metadata before fetchInitialData
  content = content.replace('async function fetchInitialData', `${metaStr}\nasync function fetchInitialData`);
  
  // Wrap return in fragments and add PageSeoProvider
  const clientTag = `<${p.client}`;
  content = content.replace(clientTag, `<>\n      <PageSeoProvider slug="${p.slug}" />\n      <${p.client}`);
  
  // Close fragment
  content = content.replace('/>\n  );\n}', '/>\n    </>\n  );\n}');

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${p.dir}`);
});
