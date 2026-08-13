import { Metadata } from 'next';
import BabyNamesClient from './BabyNamesClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'baby-names';
  const defaultMeta = {
    title: "Astrology Baby Names | Nakshatra Names | VaidikTalk",
    description: "Find the perfect Vedic baby name based on birth nakshatra and rashi.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="baby-names" />
      <BabyNamesClient />
    </>
  );
}
