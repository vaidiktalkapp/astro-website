const fs = require('fs');

const files = [
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/detailed/gemstone/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/kundali-matching/checkout/page.tsx'
];

for (let f of files) {
  if (!fs.existsSync(f)) continue;
  let c = fs.readFileSync(f, 'utf8');

  // Ensure router is imported (it usually is, but just to be safe)
  if (!c.includes('const router = useRouter()')) {
    console.log("No router found in " + f);
  }

  // Prevent double adding
  if (c.includes('Back')) {
    console.log("Back button already present in " + f);
    continue;
  }

  const backHtml = `      <div className="bg-white border-b border-[#ebdcc7] sticky top-0 z-50 mb-4">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center">
          <button onClick={() => router.back()} type="button" className="flex items-center gap-2 text-[#5c1a1f] font-bold text-[14px] hover:text-[#d68636] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 pt-2 pb-8 md:pt-4 md:pb-12 space-y-6">`;

  c = c.replace(/<div className="max-w-\[900px\] mx-auto px-4 pt-2 pb-8 md:pt-4 md:pb-12 space-y-6">/, backHtml);
  fs.writeFileSync(f, c);
  console.log('Added back button to ' + f);
}
