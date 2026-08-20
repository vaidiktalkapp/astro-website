const fs = require('fs');
const path = require('path');
const dirs = fs.readdirSync('d:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja', { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && dirent.name !== '[slug]' && dirent.name !== 'rudrabhishek')
  .map(dirent => dirent.name);

for (const dir of dirs) {
  const p = path.join('d:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja', dir, 'page.tsx');
  if (fs.existsSync(p)) {
    const content = fs.readFileSync(p, 'utf8');
    
    // extract price
    let price = 1599;
    const priceMatch = content.match(/₹([0-9,]+)/) || content.match(/price:\s*([0-9]+)/) || content.match(/amount:\s*.*?([0-9]+)/);
    if (priceMatch) {
      price = parseInt(priceMatch[1].replace(/,/g, ''));
    }

    let title = dir.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    const customTitles = {
      'attract-your-love-spell': 'Attract Your Love Spell',
      'commitment-spell': 'Commitment Spell',
      'dhan-laxmi-puja': 'Dhan Laxmi Puja',
      'ganesh-ji-ko-laddoo-arpan': 'Ganesh Ji Ko Laddoo Arpan',
      'hanuman-sindoor-boondi-arpan': 'Hanuman Sindoor Boondi Arpan',
      'job-attract-confirm-puja': 'Job Attract Confirm Puja',
      'love-marriage-healing': 'Love Marriage Healing',
      'mangal-dosh-nivaran-puja': 'Mangal Dosh Nivaran Puja',
      'rahu-ketu-grah-shanti-puja': 'Rahu Ketu Grah Shanti Puja',
      'shani-tel-arpan-aarti': 'Shani Tel Arpan Aarti',
      'vishnu-sahasranamam-puja': 'Vishnu Sahasranamam Puja'
    };
    if (customTitles[dir]) title = customTitles[dir];

    const checkoutDir = path.join('d:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja', dir, 'checkout');
    if (!fs.existsSync(checkoutDir)) fs.mkdirSync(checkoutDir);
    
    const checkoutPageContent = `'use client';
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
        pujaTitle="${title}"
        pujaSlug="${dir}"
        defaultPrice={${price}}
        offeringsList={offeringsList}
      />
    </Suspense>
  );
}
`;
    fs.writeFileSync(path.join(checkoutDir, 'page.tsx'), checkoutPageContent);
    console.log('Created checkout for', dir);
  }
}
