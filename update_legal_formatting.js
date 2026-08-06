const fs = require('fs');

const files = [
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/terms-and-conditions/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/privacy-policy/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/disclaimer/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/refund-policy/page.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Update the main prose classes for better responsiveness, contrast and visible links
    content = content.replace(
      /className="prose prose-lg text-gray-700 max-w-none prose-headings:text-\[\#5c1a1f\] prose-headings:font-serif prose-a:text-\[\#d4af37\]"/g,
      'className="prose prose-base md:prose-lg text-gray-900 max-w-none prose-headings:text-[#5c1a1f] prose-headings:font-serif prose-p:text-gray-900 prose-p:leading-relaxed prose-li:text-gray-900 prose-a:text-[#ee6c1e] prose-a:font-bold prose-a:underline hover:prose-a:text-[#8a1c2a] prose-strong:text-[#5c1a1f]"'
    );

    // Update specific text colors to be darker/brighter
    content = content.replace(/text-gray-700/g, 'text-gray-900');
    content = content.replace(/text-gray-600/g, 'text-gray-800');
    content = content.replace(/text-gray-500/g, 'text-gray-700');
    
    // Make specific inline links more visible
    content = content.replace(/className="text-\[\#d4af37\] hover:underline"/g, 'className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]"');
    content = content.replace(/className="text-\[\#d4af37\] font-semibold hover:underline"/g, 'className="text-[#ee6c1e] font-bold underline hover:text-[#8a1c2a]"');

    // Make sure table text is dark
    content = content.replace(/text-gray-800/g, 'text-gray-900'); // If we updated 600 to 800 above, this will bump it to 900, which is fine for readability.

    fs.writeFileSync(file, content);
    console.log('Updated formatting in ' + file);
  } else {
    console.log('File not found: ' + file);
  }
});
