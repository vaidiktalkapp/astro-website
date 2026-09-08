import React from 'react';
import HealingContent from '@/components/healing/HealingContent';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'healing';
  const defaultMeta = {
    title: "Healing Services | AstroSolution",
    description: "Experience divine healing services, reiki, chakra balancing, and spiritual healing to rejuvenate your mind, body, and soul.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default function HealingPage() {
  return (
    <>
      <PageSeoProvider slug="healing" />
      <HealingContent />
    </>
  );
}
