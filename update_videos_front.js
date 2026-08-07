const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('d:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja');
let changed = 0;

const newVideos = `[
                { id: 'https://youtube.com/shorts/_h8Ln2nRAxY?si=zSpUu9Rx6Ux2GbYt', title: 'Devotee Review' },
                { id: 'https://youtube.com/shorts/gbWzyzNObU0?si=ThiR5LLCh5m6_Yb1', title: 'Vaidiktalk' },
                { id: 'https://youtube.com/shorts/0LI8vBrIUf8?si=qyrHk_sx4lMhbuw2', title: 'Vaidiktalk' }
              ]`;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the old video testimonials arrays that contain qMmn1uLuNbs
  const regex = /\[\s*\{\s*id:\s*['"]qMmn1uLuNbs['"].*?\].filter\(\(item:\s*any\)\s*=>\s*item\)/gs;
  
  if (regex.test(content)) {
    content = content.replace(regex, newVideos + ".filter((item: any) => item)");
    fs.writeFileSync(file, content);
    changed++;
    console.log('Updated', file);
  }
  
  // also check without filter
  const regex2 = /\[\s*\{\s*id:\s*['"]qMmn1uLuNbs['"].*?\]/gs;
  if (regex2.test(content)) {
      // some might be just arrays
  }
});

console.log('Total files changed for frontend:', changed);
