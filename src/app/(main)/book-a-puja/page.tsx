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

export default function Page() {
  return (
    <>
      <PageSeoProvider slug="book-a-puja" />
      <BookPujaClient />
    </>
  );
}
