import { Metadata } from 'next';
import Script from 'next/script';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const REPORT_SLUG = 'kundali-matching';

async function fetchSettings() {
  try {
    const res = await fetch(`${API_URL}/smart-kundali-settings/${REPORT_SLUG}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  
  const title = settings?.seoTitle || 'Kundali Matching - Horoscope Matching for Marriage';
  const description = settings?.seoDescription || 'Get comprehensive Kundali Matching (Ashtakoot Guna Milan) report. Check compatibility, Manglik dosha, and get personalized remedies for a happy married life.';
  const keywords = settings?.seoKeywords || 'Kundali Matching, Horoscope Matching, Guna Milan, Marriage Compatibility, Kundli Milan';

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'VaidikTalk', url: 'https://vaidiktalk.com/' }],
    alternates: {
      canonical: `https://vaidiktalk.com/report/kundali/${REPORT_SLUG}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `https://vaidiktalk.com/report/kundali/${REPORT_SLUG}`,
      siteName: 'VaidikTalk',
      images: [
        {
          url: settings?.banner?.url || 'https://vaidiktalk.com/vaidiktalklogo.webp', 
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [settings?.banner?.url || 'https://vaidiktalk.com/vaidiktalklogo.webp'],
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#5c1a1f',
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const settings = await fetchSettings();

  const faqLd = settings?.faqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: settings.faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  } : null;

  return (
    <>
      {settings?.schemaMarkup && (
        <Script id="schema-markup" type="application/ld+json" dangerouslySetInnerHTML={{ __html: settings.schemaMarkup }} />
      )}
      {faqLd && (
        <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      {children}
    </>
  );
}
