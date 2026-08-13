import { Metadata } from 'next';
import CalendarClient from './CalendarClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'calendar';
  const defaultMeta = {
    title: "Hindu Calendar | VaidikTalk",
    description: "View the detailed Hindu Vedic calendar for festivals, muhurats, and tithis.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="calendar" />
      <CalendarClient />
    </>
  );
}
