import { Metadata } from 'next';
import AstrologersChatClient from './AstrologersChatClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'astrologers-chat';
  const defaultMeta = {
    title: "Chat with Astrologers Online | AstroSolution",
    description: "Chat with verified Vedic astrologers online. Get accurate predictions for your future, career, and relationships.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function AstrologersChatPage() {
  return (
    <>
      <PageSeoProvider slug="astrologers-chat" />
      <AstrologersChatClient />
    </>
  );
}
