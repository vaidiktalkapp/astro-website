import { Metadata } from 'next';
import AtlasClient from './AtlasClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'atlas';
  const defaultMeta = {
    title: "Astrology Atlas & Lat Long | VaidikTalk",
    description: "Find accurate latitude, longitude, and timezone for astrology calculations.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

import React, { Suspense } from 'react';

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="atlas" />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <AtlasClient />
      </Suspense>
    </>
  );
}
