const fs = require('fs');
const path = require('path');

const targets = [
  { dir: 'about-us', slug: 'about-us', client: 'AboutUsClient', title: 'About Us | VaidikTalk', desc: 'Learn more about VaidikTalk, our mission, and our expert Vedic astrologers.' },
  { dir: 'contact-us', slug: 'contact-us', client: 'ContactUsClient', title: 'Contact Us | VaidikTalk', desc: 'Get in touch with VaidikTalk for astrology consultations and support.' },
  { dir: 'faq', slug: 'faq', client: 'FaqClient', title: 'FAQ | VaidikTalk', desc: 'Frequently asked questions about astrology, predictions, and VaidikTalk services.' },
  { dir: 'book-a-puja', slug: 'book-a-puja', client: 'BookPujaClient', title: 'Book an Online Puja | VaidikTalk', desc: 'Book authentic Vedic Pujas online with verified pandits. Get divine blessings at home.' },
  { dir: 'baby-names', slug: 'baby-names', client: 'BabyNamesClient', title: 'Astrology Baby Names | Nakshatra Names | VaidikTalk', desc: 'Find the perfect Vedic baby name based on birth nakshatra and rashi.' },
  { dir: 'chinese-horoscope', slug: 'chinese-horoscope', client: 'ChineseHoroscopeClient', title: 'Free Chinese Horoscope & Zodiac | VaidikTalk', desc: 'Check your free Chinese astrology predictions based on your birth year animal.' },
  { dir: 'compatibility', slug: 'compatibility', client: 'CompatibilityClient', title: 'Zodiac Sign Compatibility Calculator | VaidikTalk', desc: 'Check love and marriage compatibility between zodiac signs.' },
  { dir: 'atlas', slug: 'atlas', client: 'AtlasClient', title: 'Astrology Atlas & Lat Long | VaidikTalk', desc: 'Find accurate latitude, longitude, and timezone for astrology calculations.' },
  { dir: 'astrology-calculators', slug: 'astrology-calculators', client: 'AstrologyCalculatorsClient', title: 'Free Astrology Calculators | VaidikTalk', desc: 'Use our free online astrology calculators for Kundli, Doshas, Numerology, and more.' },
  { dir: 'free-reports', slug: 'free-reports', client: 'FreeReportsClient', title: 'Free Astrology Reports | VaidikTalk', desc: 'Get free personalized astrology reports, dosha checks, and gemstone recommendations.' },
  { dir: 'celebrity-horoscopes', slug: 'celebrity-horoscopes', client: 'CelebrityHoroscopeClient', title: 'Celebrity Horoscopes & Kundli | VaidikTalk', desc: 'Explore birth charts and astrological analysis of famous celebrities.' },
  { dir: 'calendar', slug: 'calendar', client: 'CalendarClient', title: 'Hindu Calendar | VaidikTalk', desc: 'View the detailed Hindu Vedic calendar for festivals, muhurats, and tithis.' },
  { dir: 'planets', slug: 'planets', client: 'PlanetsClient', title: 'Planets in Astrology | VaidikTalk', desc: 'Learn about the impact and significance of all 9 planets in Vedic astrology.' }
];

const basePath = path.join(__dirname, 'src/app/(main)');

targets.forEach(t => {
  const filePath = path.join(basePath, t.dir, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    console.log(`Skipped ${t.dir} - Not found`);
    return;
  }
  
  // Read content
  const content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('generateMetadata')) {
    console.log(`Skipped ${t.dir} - Already SSR`);
    return;
  }
  
  // Rename to Client.tsx
  const clientPath = path.join(basePath, t.dir, `${t.client}.tsx`);
  fs.writeFileSync(clientPath, content);
  
  // Create SSR wrapper
  const wrapperContent = `import { Metadata } from 'next';
import ${t.client} from './${t.client}';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = '${t.slug}';
  const defaultMeta = {
    title: "${t.title}",
    description: "${t.desc}",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="${t.slug}" />
      <${t.client} />
    </>
  );
}
`;
  
  fs.writeFileSync(filePath, wrapperContent);
  console.log(`Updated ${t.dir}`);
});
