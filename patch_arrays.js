const fs = require('fs');
const path = require('path');

const folders = [
  'marriage-astrology',
  'career-astrology',
  'finance-astrology',
  'love-astrology',
  'health-astrology',
  'education-astrology',
  'child-astrology',
  'property-astrology'
];

const basePath = path.join(__dirname, 'src/app/(main)');

for (const folder of folders) {
  const folderPath = path.join(basePath, folder);
  const pagePath = path.join(folderPath, 'page.tsx');
  
  if (fs.existsSync(pagePath)) {
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Patch to ensure arrays
    content = content.replace(
      /astrologers: astrosData\.data \|\| \[\],/,
      `astrologers: Array.isArray(astrosData?.data) ? astrosData.data : (Array.isArray(astrosData) ? astrosData : []),`
    );
    
    content = content.replace(
      /aiAstrologers: aiAstrosData,/,
      `aiAstrologers: Array.isArray(aiAstrosData) ? aiAstrosData : [],`
    );
    
    fs.writeFileSync(pagePath, content);
  }

  // Also patch Client components
  const files = fs.readdirSync(folderPath);
  const clientFile = files.find(f => f.endsWith('Client.tsx'));
  
  if (clientFile) {
    const clientPath = path.join(folderPath, clientFile);
    let clientContent = fs.readFileSync(clientPath, 'utf8');
    
    // Ensure array state
    clientContent = clientContent.replace(
      /const \[astrologers, setAstrologers\] = useState<any\[\]>\(initialAstrologers\);/,
      `const [astrologers, setAstrologers] = useState<any[]>(Array.isArray(initialAstrologers) ? initialAstrologers : []);`
    );
    
    clientContent = clientContent.replace(
      /const \[aiAstrologers, setAiAstrologers\] = useState<any\[\]>\(initialAiAstrologers\);/,
      `const [aiAstrologers, setAiAstrologers] = useState<any[]>(Array.isArray(initialAiAstrologers) ? initialAiAstrologers : []);`
    );
    
    fs.writeFileSync(clientPath, clientContent);
  }
}

console.log('Patched all arrays');
