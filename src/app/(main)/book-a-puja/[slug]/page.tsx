import { Metadata } from 'next';
import DynamicPujaClient from './DynamicPujaClient';
import { getImageUrl } from '@/lib/imageUtils';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  try {
    const res = await fetch(`${apiUrl}/pujas/${slug}`);
    if (res.ok) {
      const puja = await res.json();
      const image = puja.image ? (puja.image.startsWith('/pooja') ? puja.image : getImageUrl(puja.image, puja.title)) : '/pooja/Rudraabhishek.webp';
      
      return {
        title: `${puja.title} | AstroSolution`,
        description: puja.shortDesc || puja.description?.replace(/<[^>]+>/g, '').slice(0, 150) || `Book ${puja.title} online.`,
        openGraph: {
          title: `${puja.title} | AstroSolution`,
          description: puja.shortDesc || puja.description?.replace(/<[^>]+>/g, '').slice(0, 150) || `Book ${puja.title} online.`,
          images: [image]
        }
      };
    }
  } catch (e) {
    console.error('Error generating metadata:', e);
  }
  
  return { title: 'Book Puja | AstroSolution' };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  let initialPuja = null;

  try {
    const res = await fetch(`${apiUrl}/pujas/${slug}`, { next: { revalidate: 60 } });
    if (res.ok) {
      initialPuja = await res.json();
    }
  } catch (e) {
    console.error('Error fetching puja data:', e);
  }

  return (
    <>
      <DynamicPujaClient initialPuja={initialPuja} slug={slug} />
    </>
  );
}
