import { Metadata } from 'next';
import Script from 'next/script';
import { getImageUrl } from '@/lib/imageUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchLandingPageSettings() {
  try {
    const res = await fetch(`${API_URL}/pujas/book-a-puja`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await fetchLandingPageSettings();
  
  const title = settings?.seoTitle || 'Book Vedic Pujas Online - Verified Pandits | AstroSolution';
  const description = settings?.seoDescription || 'Book authentic Vedic pujas online with verified Pandits. Every ritual is performed with your personal sankalp and gotra. Live streaming & prasad delivery available.';
  const keywords = settings?.seoKeywords || 'Book Puja Online, Vedic Puja, Online Pandit, AstroSolution';
  const url = `https://AstroSolution.com/book-a-puja`;
  const image = settings?.image ? (settings.image.startsWith('/pooja') ? `https://AstroSolution.com${settings.image}` : getImageUrl(settings.image, 'Book a Puja')) : 'https://AstroSolution.com/pooja/Rudraabhishek.webp';

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'AstroSolution', url: 'https://AstroSolution.com/' }],
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'AstroSolution',
      images: [
        {
          url: image,
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
      images: [image],
    },
  };
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const settings = await fetchLandingPageSettings();

  const faqLd = settings?.faqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: settings.faqs.map((faq: any) => ({
      '@type': 'Question',
      name: faq.q || faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a || faq.answer
      }
    }))
  } : null;

  return (
    <>
      {settings?.schemaMarkup && (
        <Script id="schema-markup-landing" type="application/ld+json" dangerouslySetInnerHTML={{ __html: settings.schemaMarkup }} />
      )}
      {faqLd && (
        <Script id="faq-schema-landing" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      {children}
    </>
  );
}
