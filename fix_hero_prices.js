const fs = require('fs');
const path = require('path');

// Pages with their default prices for fallback
const pages = [
  {
    dir: 'kundali/kundali-matching',
    defaultDiscounted: 649,
    defaultOriginal: 5200,
  },
  {
    dir: 'kundali/personalized-lal-kitab',
    defaultDiscounted: 799,
    defaultOriginal: 2499,
  },
  {
    dir: 'kundali/hastlikhit-kundali',
    defaultDiscounted: 999,
    defaultOriginal: 2999,
  },
  {
    dir: 'numerology/fortune-numerology',
    defaultDiscounted: 449,
    defaultOriginal: 1499,
  },
  {
    dir: 'numerology/name-mobile-number-numerology',
    defaultDiscounted: 399,
    defaultOriginal: 1199,
  },
];

const baseDir = path.join(__dirname, 'src', 'app', '(main)', 'report');

const dynamicPriceBlock = (defaultDiscounted) => `<div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-7 flex-wrap">
              <div className="flex items-baseline gap-2 md:gap-3">
                <span className="premium-serif text-[36px] md:text-[42px] font-bold text-[#5c1420]">₹{settings?.discountedPrice || ${defaultDiscounted}}</span>
                {settings?.price > 0 && <span className="text-[16px] md:text-[18px] text-[#8a4410] opacity-70 line-through">₹{settings.price}</span>}
              </div>
              {settings?.price > 0 && settings?.discountedPrice > 0 && (
                <span className="text-[10px] md:text-[11.5px] border border-[#d97706] text-[#d97706] px-2 md:px-3 py-1 font-bold tracking-wider uppercase bg-[#d97706]/10 rounded">
                  SAVE {Math.round(((settings.price - settings.discountedPrice) / settings.price) * 100)}%
                </span>
              )}
            </div>`;

pages.forEach(({ dir, defaultDiscounted }) => {
  const pagePath = path.join(baseDir, dir, 'page.tsx');
  if (!fs.existsSync(pagePath)) {
    console.log('NOT FOUND:', pagePath);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');

  // Replace hero price block — pattern: div containing price span + strikethrough + save badge
  // Regex to match the static price display block
  const priceBlockRegex = /<div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-7 flex-wrap">\s*<div className="flex items-baseline gap-2 md:gap-3">\s*<span className="premium-serif[^"]*">₹\d+<\/span>\s*<span className="[^"]*line-through[^"]*">₹\d+<\/span>\s*<\/div>\s*<span className="[^"]*">SAVE \d+%<\/span>\s*<\/div>/s;

  if (priceBlockRegex.test(content)) {
    content = content.replace(priceBlockRegex, dynamicPriceBlock(defaultDiscounted));
    fs.writeFileSync(pagePath, content, 'utf-8');
    console.log('✅ Updated hero price in:', dir);
  } else {
    console.log('⚠️ Pattern not found in:', dir, '— may need manual update');
  }
});

console.log('\nHero price dynamic update complete!');
