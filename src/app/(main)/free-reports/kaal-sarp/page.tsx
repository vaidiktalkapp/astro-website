import { Metadata } from 'next';
import KaalSarpClient from './KaalSarpClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'free-reports/kaal-sarp';
  const defaultMeta = {
    title: "Free Kaal Sarp Dosha Calculator & Remedies | VaidikTalk",
    description: "Find out if you have Kaal Sarp Yoga in your birth chart. Get detailed analysis of all 12 types of Kaal Sarp Dosh and remedies.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="free-reports/kaal-sarp" />
      <KaalSarpClient />
    </>
  );
}
