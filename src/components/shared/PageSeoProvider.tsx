import React from 'react';
import Script from 'next/script';
import { fetchPageSeo, generateFaqSchema } from '@/lib/fetchPageSeo';

interface Props {
  slug: string;
}

export default async function PageSeoProvider({ slug }: Props) {
  const seoData = await fetchPageSeo(slug);
  
  if (!seoData) return null;

  const faqLd = generateFaqSchema(seoData.faqs);

  return (
    <>
      {seoData.schemaMarkup && (
        <Script 
          id={`custom-schema-${slug}`} 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: seoData.schemaMarkup }} 
        />
      )}
      {faqLd && (
        <Script 
          id={`faq-schema-${slug}`} 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} 
        />
      )}
    </>
  );
}
