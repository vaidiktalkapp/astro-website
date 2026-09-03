import { Metadata } from 'next';
import Script from 'next/script';
import HomePageClient from './HomePageClient';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

// ✅ FIX: Banner SSR pe fetch karo — LCP 18s → ~3-4s
async function fetchHeroBanners() {
  try {
    const res = await fetch(`${API_URL}/banners/active`, { next: { revalidate: 300 } }); // 5 min cache
    if (!res.ok) return [];
    const banners = await res.json();
    return (banners || [])
      .filter((b: any) => b.position === 'hero' && b.isActive !== false)
      .sort((a: any, b: any) => {
        const orderA = a.order ?? 999;
        const orderB = b.order ?? 999;
        if (orderA !== orderB) return orderA - orderB;
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      });
  } catch {
    return [];
  }
}

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

async function fetchTopAstrologers() {
  try {
    const res = await fetch(`${API_URL}/astrologers/search?limit=10&isOnline=true`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data?.astrologers || [];
  } catch (error) {
    return [];
  }
}

async function fetchAiAstrologers() {
  try {
    const res = await fetch(`${API_URL}/ai-astrologers`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

async function fetchDailyPanchang() {
  try {
    const payload = {
      lat: '28.6139',
      lon: '77.2090',
      tzone: 5.5,
      date: new Date().toISOString().split('T')[0]
    };
    const res = await fetch(`${API_URL}/astrology/today`, { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      next: { revalidate: 3600 } 
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    return null;
  }
}

async function fetchDailyHoroscope() {
  try {
    const res = await fetch(`${API_URL}/astrology/daily-horoscope?period=Today&language=English`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const [
    settings, 
    initialFaqs, 
    initialBlogs, 
    initialTestimonials,
    initialTopAstrologers,
    initialAiAstrologers,
    initialDailyPanchang,
    initialDailyHoroscopes,
    initialBanners          // ✅ NEW: Banner SSR se
  ] = await Promise.all([
    fetchHeroSettings(),
    fetchFeaturedFaqs(),
    fetchRecentBlogs(),
    fetchTestimonials(),
    fetchTopAstrologers(),
    fetchAiAstrologers(),
    fetchDailyPanchang(),
    fetchDailyHoroscope(),
    fetchHeroBanners()      // ✅ NEW
  ]);

  // ✅ First hero image preload karo — LCP boost
  const firstBanner = initialBanners?.[0];
  const heroImageUrl = firstBanner?.desktopImageUrl || '/Astrology image.webp';

  return (
    <>
      {/* ✅ Preload LCP hero image — browser ko pehle se pata chalega */}
      <link rel="preload" as="image" href={heroImageUrl} fetchPriority="high" />

      {settings?.schemaMarkup && (
        <Script id="schema-markup-home" type="application/ld+json" dangerouslySetInnerHTML={{ __html: settings.schemaMarkup }} />
      )}
      <HomePageClient 
        initialSettings={settings}
        initialFaqs={initialFaqs} 
        initialBlogs={initialBlogs} 
        initialTestimonials={initialTestimonials} 
        initialTopAstrologers={initialTopAstrologers}
        initialAiAstrologers={initialAiAstrologers}
        initialDailyPanchang={initialDailyPanchang}
        initialDailyHoroscopes={initialDailyHoroscopes}
        initialBanners={initialBanners}   // ✅ NEW prop
      />
    </>
  );
}
