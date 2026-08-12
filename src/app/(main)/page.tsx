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

async function fetchFeaturedFaqs() {
  try {
    const res = await fetch(`${API_URL}/faqs?status=active&isFeatured=true&limit=6`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

async function fetchRecentBlogs() {
  try {
    let res = await fetch(`${API_URL}/blogs?status=published&limit=8&isFeatured=true`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    let blogs = data.data || [];
    
    if (blogs.length < 5) {
      const fallbackRes = await fetch(`${API_URL}/blogs?status=published&limit=8`, { next: { revalidate: 60 } });
      const fallbackData = await fallbackRes.json();
      const fallbackBlogs = fallbackData.data || [];
      const existingIds = new Set(blogs.map((b: any) => b._id));
      const additionalBlogs = fallbackBlogs.filter((b: any) => !existingIds.has(b._id));
      blogs = [...blogs, ...additionalBlogs].slice(0, 8);
    }
    return blogs;
  } catch (error) {
    return [];
  }
}

async function fetchTestimonials() {
  try {
    const res = await fetch(`${API_URL}/testimonials`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return await res.json() || [];
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const [settings, initialFaqs, initialBlogs, initialTestimonials] = await Promise.all([
    fetchHeroSettings(),
    fetchFeaturedFaqs(),
    fetchRecentBlogs(),
    fetchTestimonials()
  ]);

  return (
    <>
      {settings?.schemaMarkup && (
        <Script id="schema-markup-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: settings.schemaMarkup }} />
      )}
      <HomePageClient 
        initialFaqs={initialFaqs} 
        initialBlogs={initialBlogs} 
        initialTestimonials={initialTestimonials} 
      />
    </>
  );
}
