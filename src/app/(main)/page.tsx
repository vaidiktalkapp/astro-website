import { Metadata } from 'next';
import Script from 'next/script';
import HomePageClient from './HomePageClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchHeroSettings() {
  try {
    const res = await fetch(`${API_URL}/hero-settings`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchHeroSettings();
  
  const title = settings?.seoTitle || 'VaidikTalk | India\'s Most Trusted Vedic Guidance Platform';
  const description = settings?.seoDescription || 'Chat, call, or consult with India\'s best astrologers and get accurate solutions to your life\'s challenges.';
  const keywords = settings?.seoKeywords || 'astrology, vedic astrology, talk to astrologer, online puja, VaidikTalk';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: 'https://vaidiktalk.com/',
      siteName: 'VaidikTalk',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: 'https://vaidiktalk.com/',
    }
  };
}

export default async function HomePage() {
  const settings = await fetchHeroSettings();

  return (
    <>
      {settings?.schemaMarkup && (
        <Script id="schema-markup-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: settings.schemaMarkup }} />
      )}
      <HomePageClient />
    </>
  );
}
