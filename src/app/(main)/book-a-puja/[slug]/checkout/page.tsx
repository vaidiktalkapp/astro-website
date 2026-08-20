'use client';
import React, { useEffect, useState, Suspense } from 'react';
import { useParams, notFound } from 'next/navigation';
import axios from 'axios';
import { PujaCheckoutFlow } from '@/components/PujaCheckoutFlow';

const DEFAULT_OFFERINGS = [
  { id: 'gau_sewa', title: 'Gau Sewa', desc: 'A Sacred Service for Peace and Prosperity', price: 151, img: '/pooja/gau-sewa.png' },
  { id: 'anna_sewa', title: 'Anna Sewa', desc: 'For Blessings of Debt Relief', price: 151, img: '/pooja/anna-sewa.png' },
  { id: 'brahman_dakshina', title: 'Brahamn Dakshina', desc: 'For the Completion of Rituals and Anushthans', price: 101, img: '/pooja/brahman-dakshina.png' },
  { id: 'brahmin_bhoj_1', title: 'Brahmin bhoj - For 1 brahmin', desc: 'For Receiving Blessings and Peace', price: 251, img: '/pooja/brahmin-bhoj.png' },
  { id: 'brahmin_bhoj_2', title: 'Brahmin bhoj - For 2 brahmin', desc: 'For Receiving Blessings and Peace', price: 502, img: '/pooja/brahmin-bhoj-2.png' }
];

function DynamicCheckoutContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const [puja, setPuja] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchPuja = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await axios.get(`${apiUrl}/pujas/${slug}`);
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

  if (loading) {
    return <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center font-bold text-[#d97706]">Loading Checkout...</div>;
  }

  if (!puja) {
    notFound();
  }

  // Use offerings from DB if available, else fall back to defaults
  const offeringsList = puja.offerings && puja.offerings.length > 0
    ? puja.offerings
    : DEFAULT_OFFERINGS;

  return (
    <PujaCheckoutFlow 
      pujaTitle={puja.title}
      pujaSlug={slug}
      defaultPrice={puja.discountedPrice || puja.price || 1599}
      offeringsList={offeringsList}
    />
  );
}

export default function DynamicCheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5] flex items-center justify-center font-bold text-[#d97706]">Loading Checkout...</div>}>
      <DynamicCheckoutContent />
    </Suspense>
  );
}
