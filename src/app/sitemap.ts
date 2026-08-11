import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  
  let blogs: any[] = [];
  let pujas: any[] = [];
  let astrologers: any[] = [];
  let aiAstrologers: any[] = [];
  let customSitemapUrls: any[] = [];
  
  try {
    const [resBlogs, resPujas, resAstrologers, resAiAstrologers, resSeoSettings] = await Promise.all([
      fetch(`${apiUrl}/blogs?status=published`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiUrl}/pujas`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiUrl}/astrologers/search?limit=100`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiUrl}/ai-astrologers`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiUrl}/seo-settings`, { next: { revalidate: 3600 } }).catch(() => null),
    ]);

    if (resBlogs?.ok) {
      const data = await resBlogs.json();
      blogs = data.data || [];
    }
    
    if (resPujas?.ok) {
      const data = await resPujas.json();
      pujas = data.data || [];
    }

    if (resAstrologers?.ok) {
      const data = await resAstrologers.json();
      astrologers = data.data?.astrologers || data.data || [];
      
      // Fetch remaining astrologers if there are multiple pages
      const totalPages = data.data?.pagination?.pages || 1;
      if (totalPages > 1) {
        const remainingPages = [];
        // Fetch up to page 10 (1000 astrologers max to prevent sitemap timeout)
        const maxPagesToFetch = Math.min(totalPages, 10); 
        
        for (let i = 2; i <= maxPagesToFetch; i++) {
          remainingPages.push(
            fetch(`${apiUrl}/astrologers/search?limit=100&page=${i}`).then(r => r.ok ? r.json() : null)
          );
        }
        
        const additionalData = await Promise.all(remainingPages);
        additionalData.forEach(pageData => {
          if (pageData && pageData.data && pageData.data.astrologers) {
            astrologers = [...astrologers, ...pageData.data.astrologers];
          }
        });
      }
    }

    if (resAiAstrologers?.ok) {
      const data = await resAiAstrologers.json();
      aiAstrologers = data.data?.astrologers || data.data || data || [];
    }
    
    if (resSeoSettings?.ok) {
      const data = await resSeoSettings.json();
      if (data?.data?.additionalSitemapUrls) {
         customSitemapUrls = data.data.additionalSitemapUrls.map((url: string) => ({
           url,
           lastModified: new Date(),
         }));
      }
    }
  } catch (error) {
    console.error('Failed to fetch dynamic content for sitemap:', error);
  }

  const blogUrls = blogs.map((b: any) => ({
    url: `https://vaidiktalk.com/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt || b.publishedAt || Date.now()),
  }));

  const pujaUrls = pujas
    .filter((p: any) => p.slug !== 'book-a-puja')
    .map((p: any) => ({
      url: `https://vaidiktalk.com/book-a-puja/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
  }));

  const astrologerUrls = astrologers
    .map((a: any) => ({
      url: `https://vaidiktalk.com/astrologer/${a.slug || a._id}`,
      lastModified: new Date(a.updatedAt || Date.now()),
  }));

  const aiAstrologerUrls = aiAstrologers
    .map((a: any) => ({
      url: `https://vaidiktalk.com/ai-astrologer/${a.slug || a._id || a.id}`,
      lastModified: new Date(a.updatedAt || Date.now()),
  }));

  const signs = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  const horoscopeUrls = signs.flatMap(sign => [
    { url: `https://vaidiktalk.com/daily-horoscope/${sign}` },
    { url: `https://vaidiktalk.com/horoscope/tomorrow/${sign}` },
    { url: `https://vaidiktalk.com/horoscope/weekly/${sign}` },
    { url: `https://vaidiktalk.com/horoscope/monthly/${sign}` },
    { url: `https://vaidiktalk.com/horoscope/yearly/${sign}` },
  ]).map(route => ({
    ...route,
    lastModified: new Date(),
  }));

  const staticUrls = [
    { url: 'https://vaidiktalk.com' },
    { url: 'https://vaidiktalk.com/about-us' },
    { url: 'https://vaidiktalk.com/contact-us' },
    { url: 'https://vaidiktalk.com/faq' },
    { url: 'https://vaidiktalk.com/privacy-policy' },
    { url: 'https://vaidiktalk.com/terms-and-conditions' },
    { url: 'https://vaidiktalk.com/refund-policy' },
    { url: 'https://vaidiktalk.com/disclaimer' },
    { url: 'https://vaidiktalk.com/register-astrologer' },

    // Core Services
    { url: 'https://vaidiktalk.com/blog' },
    { url: 'https://vaidiktalk.com/book-a-puja' },
    { url: 'https://vaidiktalk.com/astrologers-chat' },
    { url: 'https://vaidiktalk.com/astrologers-call' },
    { url: 'https://vaidiktalk.com/ai-astrologer-chat' },
    
    // Tools & Calculators
    { url: 'https://vaidiktalk.com/astrology-calculators' },
    { url: 'https://vaidiktalk.com/free-reports' },
    { url: 'https://vaidiktalk.com/free-reports/gemstone' },
    { url: 'https://vaidiktalk.com/free-reports/kaal-sarp' },
    { url: 'https://vaidiktalk.com/free-reports/manglik' },
    { url: 'https://vaidiktalk.com/free-reports/sade-sati' },
    
    // Horoscopes
    { url: 'https://vaidiktalk.com/daily-horoscope' },
    { url: 'https://vaidiktalk.com/horoscope/tomorrow' },
    { url: 'https://vaidiktalk.com/horoscope/weekly' },
    { url: 'https://vaidiktalk.com/horoscope/monthly' },
    { url: 'https://vaidiktalk.com/horoscope/yearly' },
    { url: 'https://vaidiktalk.com/chinese-horoscope' },
    { url: 'https://vaidiktalk.com/love-horoscope' },
    
    // Astrology Domains
    { url: 'https://vaidiktalk.com/career-astrology' },
    { url: 'https://vaidiktalk.com/child-astrology' },
    { url: 'https://vaidiktalk.com/education-astrology' },
    { url: 'https://vaidiktalk.com/finance-astrology' },
    { url: 'https://vaidiktalk.com/health-astrology' },
    { url: 'https://vaidiktalk.com/love-astrology' },
    { url: 'https://vaidiktalk.com/marriage-astrology' },
    { url: 'https://vaidiktalk.com/property-astrology' },
    
    // More Tools
    { url: 'https://vaidiktalk.com/kundli' },
    { url: 'https://vaidiktalk.com/horoscope-matching' },
    { url: 'https://vaidiktalk.com/lal-kitab' },
    { url: 'https://vaidiktalk.com/numerology' },
    { url: 'https://vaidiktalk.com/panchang' },
    { url: 'https://vaidiktalk.com/moon-signs' },
    { url: 'https://vaidiktalk.com/muhurat' },
    { url: 'https://vaidiktalk.com/muhurat/directory' },
    { url: 'https://vaidiktalk.com/rahu-kaal' },
    { url: 'https://vaidiktalk.com/rashi-calculator' },
    
    // Baby Names
    { url: 'https://vaidiktalk.com/baby-names' },
    { url: 'https://vaidiktalk.com/baby-names/search' },
    
    // Hubs
    { url: 'https://vaidiktalk.com/healing' },
    { url: 'https://vaidiktalk.com/matrimony' },
    { url: 'https://vaidiktalk.com/occult-directory' },
    { url: 'https://vaidiktalk.com/celebrity-horoscopes' },
    { url: 'https://vaidiktalk.com/calendar' },
    { url: 'https://vaidiktalk.com/festivals' },
    { url: 'https://vaidiktalk.com/learn' },
    { url: 'https://vaidiktalk.com/learn-astrology' },
    { url: 'https://vaidiktalk.com/planets' },
    { url: 'https://vaidiktalk.com/atlas' },

    // Premium Reports
    { url: 'https://vaidiktalk.com/report/kundali/vaidik-smart-kundali-10-years' },
    { url: 'https://vaidiktalk.com/report/kundali/kundali-matching' },
    { url: 'https://vaidiktalk.com/report/kundali/personalized-lal-kitab' },
    { url: 'https://vaidiktalk.com/report/kundali/hastlikhit-kundali' },
    { url: 'https://vaidiktalk.com/report/numerology/fortune-numerology' },
    { url: 'https://vaidiktalk.com/report/numerology/name-mobile-number-numerology' },
  ].map(route => ({
    ...route,
    lastModified: new Date(),
  }));

  return [
    ...staticUrls,
    ...blogUrls,
    ...pujaUrls,
    ...astrologerUrls,
    ...aiAstrologerUrls,
    ...horoscopeUrls,
    ...customSitemapUrls,
  ];
}
