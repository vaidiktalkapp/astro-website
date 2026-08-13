import { Metadata } from 'next';
import AstrologersCallClient from './AstrologersCallClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'astrologers-call';
  const defaultMeta = {
    title: "Call Astrologers Online | Talk to Astrologers | VaidikTalk",
    description: "Talk to the best Vedic astrologers online on call. Get instant guidance on love, career, marriage, and finance.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function AstrologersCallPage() {
  return (
    <>
      <PageSeoProvider slug="astrologers-call" />
      <AstrologersCallClient />
    </>
  );
}
