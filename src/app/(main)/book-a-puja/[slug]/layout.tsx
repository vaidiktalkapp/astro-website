import { Metadata } from 'next';
import Script from 'next/script';
import { getImageUrl } from '@/lib/imageUtils';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchPuja(slug: string) {
  try {
    const res = await fetch(`${API_URL}/pujas/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const puja = await fetchPuja(slug);
  if (!puja) return {};
  
  const title = puja.seoTitle || `${puja.title} - Book Online | AstroSolution`;
  const description = puja.seoDescription || puja.shortDesc || `Book ${puja.title} online with verified Vedic Pandits at AstroSolution.`;
  const keywords = puja.seoKeywords || `${puja.title}, Book Puja Online, AstroSolution`;
  const url = `https://AstroSolution.com/book-a-puja/${slug}`;
  const image = puja.image ? (puja.image.startsWith('/pooja') ? `https://AstroSolution.com${puja.image}` : getImageUrl(puja.image, puja.title)) : 'https://AstroSolution.com/pooja/Rudraabhishek.webp';

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

export default async function Layout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const puja = await fetchPuja(slug);

  const faqLd = puja?.faqs?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: puja.faqs.map((faq: any) => ({
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
      {puja?.schemaMarkup && (
        <Script id="schema-markup" type="application/ld+json" dangerouslySetInnerHTML={{ __html: puja.schemaMarkup }} />
      )}
      {faqLd && (
        <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      {children}
    </>
  );
}
