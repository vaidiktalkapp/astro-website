import { Metadata } from 'next';
import BookPujaClient from './BookPujaClient';
import { fetchPageSeo, generatePageMetadata } from '@/lib/fetchPageSeo';
import PageSeoProvider from '@/components/shared/PageSeoProvider';

export async function generateMetadata(): Promise<Metadata> {
  const slug = 'book-a-puja';
  const defaultMeta = {
    title: "Book an Online Puja | VaidikTalk",
    description: "Book authentic Vedic Pujas online with verified pandits. Get divine blessings at home.",
  };

  const seoData = await fetchPageSeo(slug);
  return generatePageMetadata(seoData, defaultMeta);
}

export default async function Page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  let dynamicData = null;
  let dynamicPujas = [];

  try {
    const res = await fetch(`${apiUrl}/pujas/book-a-puja`, { next: { revalidate: 60 } });
    if (res.ok) {
      dynamicData = await res.json();
    }
  } catch (e) {
    console.error('Error fetching dynamicData:', e);
  }

  try {
    const res = await fetch(`${apiUrl}/pujas?status=active`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      dynamicPujas = data.data || [];
    }
  } catch (e) {
    console.error('Error fetching pujas:', e);
  }

  return (
    <>
      <PageSeoProvider slug="book-a-puja" />
      <BookPujaClient initialDynamicData={dynamicData} initialDynamicPujas={dynamicPujas} />
    </>
  );
}
