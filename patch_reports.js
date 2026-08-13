const fs = require('fs');
const path = require('path');

const reports = [
  { dir: 'manglik', slug: 'free-reports/manglik', client: 'ManglikClient', title: 'Free Manglik Dosha Calculator & Report | VaidikTalk', desc: 'Check if you have Manglik Dosha in your Kundli. Get a free Kuja Dosha report with remedies and impact on marriage.' },
  { dir: 'kaal-sarp', slug: 'free-reports/kaal-sarp', client: 'KaalSarpClient', title: 'Free Kaal Sarp Dosha Calculator & Remedies | VaidikTalk', desc: 'Find out if you have Kaal Sarp Yoga in your birth chart. Get detailed analysis of all 12 types of Kaal Sarp Dosh and remedies.' },
  { dir: 'sade-sati', slug: 'free-reports/sade-sati', client: 'SadeSatiClient', title: 'Free Shani Sade Sati Calculator & Report | VaidikTalk', desc: 'Calculate your Shani Sade Sati phases. Get detailed predictions and astrological remedies to reduce Saturns malefic effects.' },
  { dir: 'gemstone', slug: 'free-reports/gemstone', client: 'GemstoneClient', title: 'Free Gemstone Recommendation | Lucky Stone | VaidikTalk', desc: 'Find your lucky gemstone based on your birth date and time. Get personalized gemstone recommendations for wealth, health, and success.' }
];

const basePath = path.join(__dirname, 'src/app/(main)/free-reports');

reports.forEach(r => {
  const filePath = path.join(basePath, r.dir, 'page.tsx');
  if (!fs.existsSync(filePath)) return;
  
  // Read and rename to Client.tsx
  const content = fs.readFileSync(filePath, 'utf8');
  const clientPath = path.join(basePath, r.dir, `${r.client}.tsx`);
  fs.writeFileSync(clientPath, content);
  
  // Create SSR wrapper
  const wrapperContent = `import { Metadata } from 'next';
import ${r.client} from './${r.client}';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = '${r.slug}';
  const defaultMeta = {
    title: "${r.title}",
    description: "${r.desc}",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="${r.slug}" />
      <${r.client} />
    </>
  );
}
`;
  
  fs.writeFileSync(filePath, wrapperContent);
  console.log(`Updated ${r.dir}`);
});
