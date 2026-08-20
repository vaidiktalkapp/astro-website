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
    
    // Ensure we define validVideos before the return statement
    if (!content.includes('const validVideos =')) {
      content = content.replace(
        /  return \(\s*<div/g,
        '  const validVideos = (settings?.videos || []).filter((v: any) => v.url);\n\n  return (\n    <div'
      );
    }
    
    // Now replace the checks
    content = content.replace(/\{settings\?\.videos && settings\.videos\.length > 0 && \(/g, '{validVideos.length > 0 && (');
    content = content.replace(/\{settings\?\.videos && settings\.videos\.length > 0 \? \(/g, '{validVideos.length > 0 ? (');
    
    // Also replace the mapping arrays
    content = content.replace(/\[\.\.\.settings\.videos,\s*\.\.\.settings\.videos,\s*\.\.\.settings\.videos,\s*\.\.\.settings\.videos\]/g, '[...validVideos, ...validVideos, ...validVideos, ...validVideos]');
    content = content.replace(/\[\.\.\.settings\.videos,\s*\.\.\.settings\.videos\]/g, '[...validVideos, ...validVideos]');
    
    fs.writeFileSync(p, content);
    console.log('Updated ' + p);
  } else {
    console.log('File not found: ' + p);
  }
});
