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

  const containerRegex = /({\/\* ============ OVERLAPPING CARDS[\s\S]*?<\/div>\s*<\/div>)/;
  const match = content.match(containerRegex);

  if (match) {
    let block = match[1];
    
    if (block.includes("Mobile Marquee")) {
       console.log(`Already has marquee: ${file}`);
       continue;
    }

    let innerFlexRegex = /<div className="flex flex-wrap[^>]+justify-center">([\s\S]*?)\s*<\/div>\s*<\/div>/;
    let innerMatch = block.match(innerFlexRegex);
    
    if (innerMatch) {
       let rawCardsContent = innerMatch[1].trim();
       let rawCards = rawCardsContent.split('<div className="bg-white').filter(s => s.trim().length > 0);
       
       let mobileCards = '';
       let desktopCards = '';
       
       for (let raw of rawCards) {
         let cardHtml = '<div className="bg-white' + raw;
         
         // Build Mobile card
         let mCard = cardHtml.replace(/md:rounded-\[14px\]/g, '')
                             .replace(/lg:rounded-\[14px\]/g, '')
                             .replace(/md:px-5/g, '')
                             .replace(/lg:px-4/g, '')
                             .replace(/md:py-3\.5/g, '')
                             .replace(/lg:py-3/g, '')
                             .replace(/md:gap-3/g, '')
                             .replace(/md:w-6/g, '')
                             .replace(/md:h-6/g, '')
                             .replace(/md:text-\[14\.5px\]/g, '')
                             .replace(/xl:text-\[14px\]/g, '');
         
         mCard = mCard.replace(/rounded-\[12px\]|rounded-\[10px\]/g, 'rounded-[10px]')
                      .replace(/px-3/g, 'px-4')
                      .replace(/py-2\.5|py-2/g, 'py-2.5')
                      .replace(/gap-2/g, 'gap-2 shrink-0')
                      .replace(/text-\[12px\]|text-\[13px\]/g, 'text-[13px]');
                      
         // Ensure border exists for mobile cards so they look defined in marquee
         if (!mCard.includes('border-[#ebdcc7]')) {
             mCard = mCard.replace('flex items-center gap-2 shrink-0"', 'flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50"');
         }
         mobileCards += `              ${mCard}\n`;
         
         // Desktop card keeps original structure
         desktopCards += `          ${cardHtml}\n`;
       }
       
       let newBlock = `{/* ============ OVERLAPPING CARDS (MINIMAL/FLAT) ============ */}
      <div className="max-w-[1200px] mx-auto relative z-20 -mt-6 md:-mt-10 mb-8 md:mb-12 overflow-hidden">
        
        {/* Mobile Marquee */}
        <div className="md:hidden flex w-max animate-scroll gap-3 px-4 py-2 hover:[animation-play-state:paused]">
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
${mobileCards}            </React.Fragment>
          ))}
        </div>

        {/* Desktop Normal Grid */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center px-4">
${desktopCards}        </div>
      </div>`;

       content = content.replace(containerRegex, newBlock);
       fs.writeFileSync(file, content);
       console.log(`Updated cards in ${file}`);
    } else {
       console.log(`Inner flex not found in ${file}`);
    }
  } else {
    console.log(`Overlapping cards section not found in ${file}`);
  }
}
