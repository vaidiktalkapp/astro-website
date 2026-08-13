export async function fetchPageSeo(slug: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    // Remove leading/trailing slashes for safety
    const normalizedSlug = slug.replace(/^\/+|\/+$/g, '');
    const res = await fetch(`${API_URL}/page-seo/${normalizedSlug}`, { 
      next: { revalidate: 60 } // revalidate every minute
    });
    
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    return null;
  }
}

export function generatePageMetadata(seoData: any, defaultMetadata: any = {}) {
  if (!seoData) return defaultMetadata;

  return {
    ...defaultMetadata,
    title: seoData.seoTitle || defaultMetadata.title,
    description: seoData.seoDescription || defaultMetadata.description,
    keywords: seoData.seoKeywords || defaultMetadata.keywords,
  };
}

export function generateFaqSchema(faqs: {q: string, a: string}[]) {
  if (!faqs || faqs.length === 0) return null;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };
}
