import { Metadata } from 'next';
import AiAstrologerChatClient from './AiAstrologerChatClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'ai-astrologer-chat';
  const defaultMeta = {
    title: "AI Astrologers | Chat & Call Online | AstroSolution",
    description: "Connect with our advanced AI Astrologers for instant, accurate Vedic astrology predictions through chat or call.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function AiAstrologerChatPage() {
  return (
    <>
      <PageSeoProvider slug="ai-astrologer-chat" />
      <AiAstrologerChatClient />
    </>
  );
}
