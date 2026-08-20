const fs = require('fs');

const pages = [
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/kundali-matching/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/detailed/gemstone/page.tsx'
];

pages.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    // Find the H1 block in the hero section
    // It looks like:
    // <h1 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-extrabold text-white leading-[1.1] drop-shadow-md">
    //   Discover the Hidden Blueprint of Your Life
    // </h1>
    
    // We can use a regex to capture the H1 and its text
    content = content.replace(
      /<h1 className="text-4xl md:text-5xl lg:text-\[64px\] font-serif font-extrabold text-white leading-\[1\.1\] drop-shadow-md">\s*(.*?)\s*<\/h1>/,
      '<h1 className="text-4xl md:text-5xl lg:text-[64px] font-serif font-extrabold text-white leading-[1.1] drop-shadow-md">\n                {settings?.heroHeading || "$1"}\n              </h1>'
    );
    
    // Find the Subheading block
    content = content.replace(
      /<p className="text-\[17px\] md:text-\[20px\] text-white\/90 max-w-\[600px\] font-medium tracking-wide drop-shadow mx-auto md:mx-0">\s*(.*?)\s*<\/p>/,
      '<p className="text-[17px] md:text-[20px] text-white/90 max-w-[600px] font-medium tracking-wide drop-shadow mx-auto md:mx-0">\n                {settings?.heroSubheading || "$1"}\n              </p>'
    );
    
    fs.writeFileSync(p, content);
    console.log('Injected dynamic heroHeading into ' + p);
  }
});
