const fs = require('fs');
const pages = [
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/kundali-matching/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/page.tsx'
];

for (const p of pages) {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    // Replace the exact map call for FAQs
    // Old: {faqData.map((faq, i) => (
    // New: {(settings?.faqs?.length ? settings.faqs : faqData).map((faq: any, i: number) => (
    
    content = content.replace(/\{faqData\.map\(\(faq, i\) => \(/g, '{(settings?.faqs?.length ? settings.faqs : faqData).map((faq: any, i: number) => (');
    
    // Replace <ContentBlocks blocks={faq.content} /> with the conditional rendering
    content = content.replace(/<ContentBlocks blocks=\{faq\.content\} \/>/g, 
`                  {faq.a ? (
                    <div className="text-gray-800 text-[15px] md:text-[16px] leading-relaxed whitespace-pre-wrap">{faq.a}</div>
                  ) : (
                    <ContentBlocks blocks={faq.content} />
                  )}`);
                  
    fs.writeFileSync(p, content, 'utf8');
    console.log('Updated FAQs in', p);
  } else {
    console.log('File not found:', p);
  }
}
