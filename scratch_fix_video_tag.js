const fs = require('fs');

const paths = [
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/kundali-matching/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/detailed/gemstone/page.tsx'
];

paths.forEach(p => {
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    // Replace <source src={...} /> with src on <video>
    content = content.replace(
      /<video autoPlay loop muted playsInline className="([^"]+)">\s*<source src=\{settings\.banner\.url\} type="video\/[^"]+" \/>\s*<\/video>/g,
      '<video autoPlay loop muted playsInline className="$1" src={settings.banner.url} />'
    );
    
    // Do the same for the default video
    content = content.replace(
      /<video autoPlay loop muted playsInline className="([^"]+)">\s*<source src="([^"]+)" type="video\/[^"]+" \/>\s*<\/video>/g,
      '<video autoPlay loop muted playsInline className="$1" src="$2" />'
    );
    
    fs.writeFileSync(p, content);
    console.log('Fixed React video source issue in ' + p);
  } else {
    console.log('File not found: ' + p);
  }
});
