import { Metadata } from 'next';
import Script from 'next/script';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
const REPORT_SLUG = 'name-mobile-number-numerology';

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
  
  const title = settings?.seoTitle || 'Name & Mobile Number Numerology Report';
  const description = settings?.seoDescription || 'Get your personalized Name & Mobile Number Numerology report. Discover the hidden meaning behind your name and mobile number, and how to optimize them for success.';
  const keywords = settings?.seoKeywords || 'Name Numerology, Mobile Number Numerology, Numerology Report, Lucky Number, Business Numerology';

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'AstroSolution', url: 'https://AstroSolution.com/' }],
    alternates: {
      canonical: `https://AstroSolution.com/report/numerology/${REPORT_SLUG}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: `https://AstroSolution.com/report/numerology/${REPORT_SLUG}`,
      siteName: 'AstroSolution',
      images: [
        {
          url: settings?.banner?.url || 'https://AstroSolution.com/astrosolution-logo.png', 
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        }],
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [settings?.banner?.url || 'https://AstroSolution.com/astrosolution-logo.png'],
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
