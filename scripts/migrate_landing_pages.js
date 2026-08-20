const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../src/app/(main)/book-a-puja');
const folders = [
  'attract-your-love-spell',
  'commitment-spell',
  'ganesh-ji-ko-laddoo-arpan',
  'hanuman-sindoor-boondi-arpan',
  'job-attract-confirm-puja',
  'love-marriage-healing',
  'mangal-dosh-nivaran-puja',
  'rahu-ketu-grah-shanti-puja',
  'shani-tel-arpan-aarti',
  'vishnu-sahasranamam-puja'
];

folders.forEach(folder => {
  const filePath = path.join(baseDir, folder, 'page.tsx');
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Parse Title
  let titleMatch = content.match(/title:\s*'([^']+)'/);
  const title = titleMatch ? titleMatch[1] : folder;

  // Parse Subtitle
  let subtitleMatch = content.match(/<span className="text-\[#f5d08b\][^>]*>([^<]+)<\/span>/);
  let subtitle = subtitleMatch ? subtitleMatch[1].trim() : 'Premium Vedic Ritual';

  // Parse Price
  let priceMatch = content.match(/amount:.*?(\d+)/);
  const price = priceMatch ? parseInt(priceMatch[1]) : 1599;

  // Parse Image
  let imgMatch = content.match(/src="(\/pooja\/[^"]+)"/);
  const img = imgMatch ? imgMatch[1] : '';

  // Parse Benefits
  let benefits = [];
  const benefitsRegex = /<ul className="space-y-4">[\s\S]*?\{\[\s*([\s\S]*?)\s*\]\.map/m;
  const bMatch = content.match(benefitsRegex);
  if (bMatch) {
    const arrStr = '[' + bMatch[1] + ']';
    try {
      benefits = eval(arrStr);
    } catch(e) { console.log(e); }
  }

  // Parse FAQs
  let faqs = [];
  const faqRegex = /faqs\s*:\s*\[\s*([\s\S]*?)\s*\]\)\.map/m;
  let fMatch = content.match(faqRegex);
  if (!fMatch) {
      const faqRegexAlt = /dynamicData\.faq\s*:\s*\[\s*([\s\S]*?)\s*\]\)\.map/m;
      fMatch = content.match(faqRegexAlt);
  }
  if (!fMatch) {
      const faqRegexAlt2 = /faqs\?\.length > 0 \? dynamicData\.faqs : \[\s*([\s\S]*?)\s*\]\)\.map/m;
      fMatch = content.match(faqRegexAlt2);
  }
  if (fMatch) {
     const faqStr = '[' + fMatch[1] + ']';
     try {
       faqs = eval(faqStr);
     } catch(e) { console.log('FAQ Eval Error:', e); }
  }

  // Parse Process (How it works)
  let process = [];
  const processRegex = /before:to-transparent">\s*\{\[\s*([\s\S]*?)\s*\]\.map/m;
  const pMatch = content.match(processRegex);
  if (pMatch) {
      try {
          process = eval('[' + pMatch[1] + ']');
      } catch(e) { console.log(e); }
  }
  
  // Extract About text safely using Regex
  let aboutTextHtml = '';
  const aboutRegex = /<h2 className="premium-serif text-3xl md:text-5xl font-bold text-\[#5c1a1f\] mb-6">[\s\S]*?<div className="w-20 h-1 bg-\[#d4af37\] mb-8" \/>([\s\S]*?)(<h3|<ul|<\/div>)/;
  const matchAbout = content.match(aboutRegex);
  if (matchAbout) {
      aboutTextHtml = matchAbout[1].trim();
  }

  const camelCaseFolder = folder.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');

  const templateStr = `'use client';
import React from 'react';
import { PujaLandingTemplate } from '@/components/PujaLandingTemplate';

export default function ${camelCaseFolder}Page() {
  const benefits = ${JSON.stringify(benefits, null, 4)};

  const processSteps = ${JSON.stringify(process, null, 4)};

  const faqs = ${JSON.stringify(faqs, null, 4)};

  const aboutText = (
    <>
      ${aboutTextHtml.replace(/\{/g, '{"{"}').replace(/\}/g, '{"}"}')}
    </>
  );

  return (
    <PujaLandingTemplate 
      slug="${folder}"
      title="${title}"
      subtitle="${subtitle}"
      basePrice={${price}}
      image="${img}"
      aboutText={aboutText}
      benefits={benefits}
      processSteps={processSteps}
      faqs={faqs}
    />
  );
}
`;

  fs.writeFileSync(filePath, templateStr);
  console.log('Successfully updated', folder);
});
