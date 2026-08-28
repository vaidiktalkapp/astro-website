import { Metadata } from 'next';
import Script from 'next/script';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchSettings() {
  try {
    const res = await fetch(`${API_URL}/smart-kundali-settings/vaidik-smart-kundali-10-years`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchSettings();
  
  const title = settings?.seoTitle || 'Premium Personalised Kundli (10-Year Forecast) - Career, Marriage & Wealth';
  const description = settings?.seoDescription || 'Get your 10-Year Premium Vaidik Kundali by India\'s most trusted astrologers. Unlock detailed predictions on career, finance, marriage, karmic lessons, and personalized remedies.';
  const keywords = settings?.seoKeywords || 'Vaidik Kundali, 10 Year Kundli, Premium Kundli, Astrology Report, Career Prediction';

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'VaidikTalk', url: 'https://vaidiktalk.com/' }],
    alternates: {
      canonical: 'https://vaidiktalk.com/report/kundali/vaidik-smart-kundali-10-years',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title,
      description,
      url: 'https://vaidiktalk.com/report/kundali/vaidik-smart-kundali-10-years',
      siteName: 'VaidikTalk',
      images: [
        {
          url: settings?.banner?.url || 'https://vaidiktalk.com/images/vaidik-smart-kundali-og.jpg', 
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
      images: [settings?.banner?.url || 'https://vaidiktalk.com/images/vaidik-smart-kundali-og.jpg'],
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
