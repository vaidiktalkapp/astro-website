const fs = require('fs');
let content = fs.readFileSync('src/app/(main)/book-a-puja/rudrabhishek/page.tsx', 'utf8');

content = content.replace(/Rudrabhishek Puja/g, '{puja?.title || \'Rudrabhishek Puja\'}');
content = content.replace(/>Rudrabhishek</g, '>{puja?.title || \'Rudrabhishek\'}<');
content = content.replace(/dynamicData/g, 'puja');
content = content.replace(/1599/g, '{puja?.discountedPrice || puja?.price || 1599}');
content = content.replace(/\["\{puja\.image \? \(puja\.image\.startsWith\('\/pooja'\) \? puja\.image : getImageUrl\(puja\.image, puja\.title\)\) : '\/pooja\/Rudraabhishek\.webp'\}"/g, '[puja?.image ? (puja.image.startsWith(\'/pooja\') ? puja.image : getImageUrl(puja.image, puja.title)) : \'/pooja/Rudraabhishek.webp\'');
content = content.replace(/href="#booking-section"/g, 'href={`/book-a-puja/${slug}/checkout`}');

const newHeader = `'use client';
import React, { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import axios from 'axios';
import { getImageUrl } from '@/lib/imageUtils';
import { ShieldCheck, Droplet, Flame, Heart, Sparkles, Star, CheckCircle2, Clock, MapPin, Calendar, ChevronDown, UserCheck, Leaf, Lock } from 'lucide-react';
import Link from 'next/link';
import { usePujaBooking } from '../../../../hooks/usePujaBooking';

const getYoutubeId = (url: string) => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\\/|v\\/|u\\/\\w\\/|embed\\/|shorts\\/|watch\\?v=|\\&v=)([^#\\&\\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
};

const ImageCarousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if(!images || images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] group">
      <div 
        className="flex h-full w-full transition-transform duration-500 ease-out" 
        style={{ transform: \`translateX(-\${currentIndex * 100}%)\` }}
      >
        {images.map((src, i) => (
          <img key={i} src={src} className="w-full h-full object-cover shrink-0" alt={\`Slide \${i+1}\`} />
        ))}
      </div>
      
      {images.length > 1 && (
        <>
          <button 
            onClick={() => setCurrentIndex(i => i === 0 ? images.length - 1 : i - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button 
            onClick={() => setCurrentIndex(i => (i + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
             {images.map((_, i) => (
               <button 
                 key={i} 
                 onClick={() => setCurrentIndex(i)}
                 className={\`w-2 h-2 rounded-full transition-all \${currentIndex === i ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}\`} 
               />
             ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function DynamicPujaPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [puja, setPuja] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchPuja = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await axios.get(\`\${apiUrl}/pujas/\${slug}\`);
        setPuja(response.data);
      } catch (error) {
        console.error('Error fetching puja:', error);
        setPuja(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPuja();
  }, [slug]);

  const { formData, handleChange, handleSubmit, isProcessing } = usePujaBooking({
    title: puja?.title || 'Puja',
    slug: slug,
    amount: puja?.discountedPrice || puja?.price || 1599
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">Loading Puja Details...</div>;
  if (!puja) notFound();

  return (
    <div className="w-full bg-[#fcf5eb] font-sans">
`;

const startIndex = content.indexOf('<div className="w-full bg-[#fcf5eb] font-sans">');
content = newHeader + content.substring(startIndex + '<div className="w-full bg-[#fcf5eb] font-sans">'.length);

content = content.replace(/src="\\{puja\\.image/g, 'src={puja.image');
content = content.replace(/webp'\\}"/g, 'webp\\'}');
content = content.replace(/alt="\\{puja\\.title\\} Background"/g, 'alt={`${puja.title} Background`}');
content = content.replace(/href={`\\/book-a-puja\\/rudrabhishek\\/checkout`}/g, 'href={`/book-a-puja/${slug}/checkout`}');

fs.writeFileSync('src/app/(main)/book-a-puja/[slug]/page.tsx', content);
console.log('Done');
