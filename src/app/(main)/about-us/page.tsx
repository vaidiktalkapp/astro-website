import { Metadata } from 'next';
import AboutUsClient from './AboutUsClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'about-us';
  const defaultMeta = {
    title: "About Us | AstroSolution",
    description: "Learn more about AstroSolution, our mission, and our expert Vedic astrologers.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="about-us" />
      <AboutUsClient />
    </>
  );
}
