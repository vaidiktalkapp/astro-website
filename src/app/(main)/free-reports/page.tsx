import { Metadata } from 'next';
import FreeReportsClient from './FreeReportsClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'free-reports';
  const defaultMeta = {
    title: "Free Astrology Reports | VaidikTalk",
    description: "Get free personalized astrology reports, dosha checks, and gemstone recommendations.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="free-reports" />
      <FreeReportsClient />
    </>
  );
}
