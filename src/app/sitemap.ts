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
    url: `https://AstroSolution.com/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt || b.publishedAt || Date.now()),
  }));

  const pujaUrls = pujas
    .filter((p: any) => p.slug !== 'book-a-puja')
    .map((p: any) => ({
      url: `https://AstroSolution.com/book-a-puja/${p.slug}`,
      lastModified: new Date(p.updatedAt || p.createdAt || Date.now()),
  }));

  const astrologerUrls = astrologers
    .map((a: any) => ({
      url: `https://AstroSolution.com/astrologer/${a.slug || a._id}`,
      lastModified: new Date(a.updatedAt || Date.now()),
  }));

  const aiAstrologerUrls = aiAstrologers
    .map((a: any) => ({
      url: `https://AstroSolution.com/ai-astrologer/${a.slug || a._id || a.id}`,
      lastModified: new Date(a.updatedAt || Date.now()),
  }));

  const signs = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  const horoscopeUrls = signs.flatMap(sign => [
    { url: `https://AstroSolution.com/daily-horoscope/${sign}` },
    { url: `https://AstroSolution.com/horoscope/tomorrow/${sign}` },
    { url: `https://AstroSolution.com/horoscope/weekly/${sign}` },
    { url: `https://AstroSolution.com/horoscope/monthly/${sign}` },
    { url: `https://AstroSolution.com/horoscope/yearly/${sign}` },
  ]).map(route => ({
    ...route,
    lastModified: new Date(),
  }));

  const staticUrls = [
    { url: 'https://AstroSolution.com' },
    { url: 'https://AstroSolution.com/about-us' },
    { url: 'https://AstroSolution.com/contact-us' },
    { url: 'https://AstroSolution.com/faq' },
    { url: 'https://AstroSolution.com/privacy-policy' },
    { url: 'https://AstroSolution.com/terms-and-conditions' },
    { url: 'https://AstroSolution.com/refund-policy' },
    { url: 'https://AstroSolution.com/disclaimer' },
    { url: 'https://AstroSolution.com/register-astrologer' },

    // Core Services
    { url: 'https://AstroSolution.com/blog' },
    { url: 'https://AstroSolution.com/book-a-puja' },

    
    // Tools & Calculators
    { url: 'https://AstroSolution.com/astrology-calculators' },
    { url: 'https://AstroSolution.com/free-reports' },
    { url: 'https://AstroSolution.com/free-reports/gemstone' },
    { url: 'https://AstroSolution.com/free-reports/kaal-sarp' },
    { url: 'https://AstroSolution.com/free-reports/manglik' },
    { url: 'https://AstroSolution.com/free-reports/sade-sati' },
    
    // Horoscopes
    { url: 'https://AstroSolution.com/daily-horoscope' },
    { url: 'https://AstroSolution.com/horoscope/tomorrow' },
    { url: 'https://AstroSolution.com/horoscope/weekly' },
    { url: 'https://AstroSolution.com/horoscope/monthly' },
    { url: 'https://AstroSolution.com/horoscope/yearly' },
    { url: 'https://AstroSolution.com/chinese-horoscope' },
    { url: 'https://AstroSolution.com/love-horoscope' },
    
    // Astrology Domains
    { url: 'https://AstroSolution.com/career-astrology' },
    { url: 'https://AstroSolution.com/child-astrology' },
    { url: 'https://AstroSolution.com/education-astrology' },
    { url: 'https://AstroSolution.com/finance-astrology' },
    { url: 'https://AstroSolution.com/health-astrology' },
    { url: 'https://AstroSolution.com/love-astrology' },
    { url: 'https://AstroSolution.com/marriage-astrology' },
    { url: 'https://AstroSolution.com/property-astrology' },
    
    // More Tools
    { url: 'https://AstroSolution.com/kundli' },
    { url: 'https://AstroSolution.com/horoscope-matching' },
    { url: 'https://AstroSolution.com/lal-kitab' },
    { url: 'https://AstroSolution.com/numerology' },
    { url: 'https://AstroSolution.com/panchang' },
    { url: 'https://AstroSolution.com/moon-signs' },
    { url: 'https://AstroSolution.com/muhurat' },
    { url: 'https://AstroSolution.com/muhurat/directory' },
    { url: 'https://AstroSolution.com/rahu-kaal' },
    { url: 'https://AstroSolution.com/rashi-calculator' },
    
    // Baby Names
    { url: 'https://AstroSolution.com/baby-names' },
    { url: 'https://AstroSolution.com/baby-names/search' },
    
    // Hubs
    { url: 'https://AstroSolution.com/healing' },
    { url: 'https://AstroSolution.com/matrimony' },
    { url: 'https://AstroSolution.com/occult-directory' },
    { url: 'https://AstroSolution.com/celebrity-horoscopes' },
    { url: 'https://AstroSolution.com/calendar' },
    { url: 'https://AstroSolution.com/festivals' },
    { url: 'https://AstroSolution.com/learn' },
    { url: 'https://AstroSolution.com/learn-astrology' },
    { url: 'https://AstroSolution.com/planets' },
    { url: 'https://AstroSolution.com/atlas' },


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
