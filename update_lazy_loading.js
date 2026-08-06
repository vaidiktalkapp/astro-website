const fs = require('fs');

const pagePath = 'd:\\server-vaidik\\web-vaidik-main\\src\\app\\(main)\\page.tsx';
let content = fs.readFileSync(pagePath, 'utf8');

// Replace all <img with <img loading="lazy" if not already present
content = content.replace(/<img (?!loading="lazy")/g, '<img loading="lazy" ');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Lazy loading added to images in page.tsx');
