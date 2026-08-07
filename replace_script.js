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

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('View all testimonials on YouTube')) {
    const updated = content.replace(/href="[^"]*"([^>]*>\s*View all testimonials on YouTube)/g, 'href="https://www.youtube.com/channel/UC9R0W5yvEFM7BavR85woAFQ"$1');
    if (updated !== content) {
      fs.writeFileSync(file, updated);
      changed++;
      console.log('Updated', file);
    }
  }
});
console.log('Total files changed:', changed);
