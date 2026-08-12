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
  const files = fs.readdirSync(folderPath);
  const clientFile = files.find(f => f.endsWith('Client.tsx'));
  
  if (clientFile) {
    const clientPath = path.join(folderPath, clientFile);
    let clientContent = fs.readFileSync(clientPath, 'utf8');
    
    // Widen Hero section text container
    clientContent = clientContent.replace(/max-w-\[1300px\]/g, 'max-w-[1500px]');
    
    // Widen all other sections
    clientContent = clientContent.replace(/max-w-\[1200px\]/g, 'max-w-[1500px]');
    
    fs.writeFileSync(clientPath, clientContent);
    console.log(`Updated ${clientFile}`);
  }
}
console.log('All layouts widened!');
