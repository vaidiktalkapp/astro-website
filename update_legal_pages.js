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
    
    // Replace the specific div with white card styling
    content = content.replace(
      'className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-14 border border-[#e8d8c0]/50 relative overflow-hidden"',
      'className="max-w-6xl mx-auto relative px-4 md:px-8"'
    );
    
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  } else {
    console.log('File not found: ' + file);
  }
});
