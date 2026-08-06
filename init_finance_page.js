const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace text
  content = content.replace(/Career \& Job/g, 'Business & Finance');
  content = content.replace(/career/g, 'finance');
  content = content.replace(/Career/g, 'Business & Finance');
  content = content.replace(/Job/g, 'Business');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

const dir = path.join(__dirname, 'src/app/(main)/finance-astrology');
replaceInFile(path.join(dir, 'layout.tsx'));
replaceInFile(path.join(dir, 'page.tsx'));
