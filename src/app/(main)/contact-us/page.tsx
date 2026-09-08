import { Metadata } from 'next';
import ContactUsClient from './ContactUsClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'contact-us';
  const defaultMeta = {
    title: "Contact Us | AstroSolution",
    description: "Get in touch with AstroSolution for astrology consultations and support.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="contact-us" />
      <ContactUsClient />
    </>
  );
}
