'use client';
import React, { Suspense } from 'react';
import { PujaCheckoutFlow } from '@/components/PujaCheckoutFlow';

const offeringsList = [
  { id: 'gau_sewa', title: 'Gau Sewa', desc: 'A Sacred Service for Peace and Prosperity', price: 151, img: '/pooja/gau-sewa.png' },
  { id: 'anna_sewa', title: 'Anna Sewa', desc: 'For Blessings of Debt Relief', price: 151, img: '/pooja/anna-sewa.png' },
  { id: 'brahman_dakshina', title: 'Brahamn Dakshina', desc: 'For the Completion of Rituals and Anushthans', price: 101, img: '/pooja/brahman-dakshina.png' },
  { id: 'brahmin_bhoj_1', title: 'Brahmin bhoj - For 1 brahmin', desc: 'For Receiving Blessings and Peace', price: 251, img: '/pooja/brahmin-bhoj.png' },
  { id: 'brahmin_bhoj_2', title: 'Brahmin bhoj - For 2 brahmin', desc: 'For Receiving Blessings and Peace', price: 502, img: '/pooja/brahmin-bhoj-2.png' }
];

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#faf8f5] flex items-center justify-center font-bold text-[#d97706]">Loading Checkout...</div>}>
      <PujaCheckoutFlow 
        pujaTitle="Shani Tel Arpan Aarti"
        pujaSlug="shani-tel-arpan-aarti"
        defaultPrice={899}
        offeringsList={offeringsList}
      />
    </Suspense>
  );
}
