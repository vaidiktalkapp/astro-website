import React from 'react';
import PagePlaceholder from '@/components/shared/PagePlaceholder';
import { Book } from 'lucide-react';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'learn-astrology';
  const defaultMeta = {
    title: "Learn Astrology | AstroSolution",
    description: "Access beginner-friendly guides and in-depth tutorials to understand the language of the stars.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function LearnAstrologyPage() {
  return (
    <>
      <PageSeoProvider slug="learn-astrology" />
      <PagePlaceholder 
        title="Learn Astrology" 
        description="Access beginner-friendly guides and in-depth tutorials to understand the language of the stars."
        icon={<Book size={48} />}
      />
    </>
  );
}
