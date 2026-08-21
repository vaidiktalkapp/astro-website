const fs = require('fs');

const files = [
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/page.tsx",
  "d:/server-vaidik/web-vaidik-main/src/app/(main)/report/detailed/gemstone/page.tsx"
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  // 1. Hero text size
  content = content.replace(/text-\[34px\] md:text-\[48px\] lg:text-\[58px\]/g, 'text-[28px] md:text-[48px] lg:text-[58px]');
  content = content.replace(/text-\[17px\] md:text-\[20px\]/g, 'text-[16px] md:text-[20px]');

  // 2. CSS fix
  content = content.replace(/\.animate-scroll\s*\{[\s\S]*?display:\s*flex;[\s\S]*?width:\s*max-content;\s*\}/g, 
    '.animate-scroll {\n          animation: scrollLeft 30s linear infinite;\n          width: max-content;\n        }');

  // 3. Overlapping cards: reduce mb-12 to mb-8
  content = content.replace(/mb-12 md:mb-16/g, 'mb-8 md:mb-12');
  
  // NOTE: Converting the overlapping cards to a Map with Marquee is too complex for regex because of raw SVGs.
  // We will instead just apply a basic layout fix to them:
  // (We'll leave the overlapping cards static on these pages for now to avoid breaking the raw SVGs unless we parse them)

  // 4. "Everything You Need" / "What it reveals" section (The Avatar and tags section)
  // Look for: flex flex-col md:flex-row items-center justify-center
  content = content.replace(/flex flex-col md:flex-row items-center justify-center/g, 'flex flex-row items-start justify-center');
  
  // Avatar size
  content = content.replace(/w-24 h-24 md:w-28 md:h-28/g, 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28');
  
  // Avatar text hide
  content = content.replace(/<span className="font-bold text-\[#1a1a1a\] text-\[14px\]">Vaidik Talk<\/span>/g, '<span className="hidden md:block font-bold text-[#1a1a1a] text-[14px]">Vaidik Talk</span>');

  // Tag grid fix (from flex-wrap to grid-cols-3)
  // This is tricky because the tags array map is different.
  content = content.replace(/<div className="flex flex-wrap justify-center md:justify-start gap-2\.5">/g, '<div className="grid grid-cols-3 md:flex md:flex-wrap gap-1.5 md:gap-2.5 w-full">');
  // Tag item fix
  content = content.replace(/px-4 py-1\.5 rounded-full font-bold text-\[13px\] flex items-center gap-1\.5 shadow-sm/g, 'px-1 md:px-4 py-1 md:py-1.5 rounded-md md:rounded-full font-bold text-[8.5px] sm:text-[10px] md:text-[13px] flex items-center justify-center md:justify-start gap-1 md:gap-1.5 shadow-sm overflow-hidden text-center');
  
  // Replace {item.label} with truncate span
  content = content.replace(/\{item\.label\}/g, '<span className="truncate whitespace-nowrap">{item.label}</span>');
  content = content.replace(/<span className="truncate whitespace-nowrap"><span className="truncate whitespace-nowrap">\{item\.label\}<\/span><\/span>/g, '<span className="truncate whitespace-nowrap">{item.label}</span>');

  // 5. Book Mockup section
  // It starts with <section className="py-12 md:py-20 bg-white">
  // We want to rewrite the structure inside.
  let bookSectionRegex = /(<section className="py-12 md:py-20 bg-white">\s*<div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center) gap-12 md:gap-20">([\s\S]*?)<div className="md:w-1\/2 flex justify-center order-2 md:order-1">([\s\S]*?)<\/div>\s*<div className="md:w-1\/2 order-1 md:order-2">\s*<h2 className="text-3xl md:text-4xl font-serif font-bold text-\[#5c1a1f\] mb-3">([^<]+)<\/h2>/;
  
  let match = content.match(bookSectionRegex);
  if (match) {
    let imgTag = match[3].trim();
    let title = match[4].trim();
    
    let replacement = `${match[1]} md:items-start gap-8 md:gap-20">
          
          {/* Desktop Image (Hidden on mobile) */}
          <div className="hidden md:flex md:w-1/2 justify-center">
            ${imgTag}
          </div>
          
          {/* Content */}
          <div className="w-full md:w-1/2 flex flex-col">
            
            {/* Mobile Title & Thumbnail Row */}
            <div className="flex items-center gap-4 mb-4 md:mb-3">
              <div className="md:hidden shrink-0 w-[85px] sm:w-[100px] flex items-center justify-center">
                ${imgTag.replace('class="w-full max-w-[470px] rounded-xl mix-blend-multiply"', 'className="w-full h-auto object-contain drop-shadow-md rounded-sm mix-blend-multiply"').replace('className="w-full max-w-[470px] rounded-xl mix-blend-multiply"', 'className="w-full h-auto object-contain drop-shadow-md rounded-sm mix-blend-multiply"')}
              </div>
              <h2 className="text-[22px] sm:text-3xl md:text-4xl font-serif font-bold text-[#5c1a1f] leading-tight">${title}</h2>
            </div>`;
            
    content = content.replace(bookSectionRegex, replacement);
  }

  // 6. Sticky CTA
  // Find the last CTA section.
  let lastSectionRegex = /(<section className=")py-16 md:py-24 (bg-\[#fdfaf6\] border-t border-\[#ebdcc7\]">[\s\S]*?)(<Link href="([^"]+)"[^>]*>([\s\S]*?)<\/Link>\s*<\/div>\s*<\/section>)/;
  let ctaMatch = content.match(lastSectionRegex);
  if (ctaMatch && !content.includes("MOBILE STICKY BOTTOM CTA")) {
    let href = ctaMatch[4];
    
    let replacement = `${ctaMatch[1]}pt-16 pb-28 md:py-24 ${ctaMatch[2]}${ctaMatch[3]}

      {/* ============ MOBILE STICKY BOTTOM CTA ============ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-[60] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Link href="${href}" className="flex items-center justify-center bg-[#b06126] text-white font-bold text-[16px] py-3.5 rounded-lg shadow-sm hover:bg-[#8c481c] transition-colors w-full">
          Get Your Report →
        </Link>
      </div>`;
    content = content.replace(lastSectionRegex, replacement);
  }

  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
}
