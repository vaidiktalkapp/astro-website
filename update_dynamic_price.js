const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'app', '(main)', 'book-a-puja');

fs.readdirSync(directoryPath).forEach(file => {
  const fullPath = path.join(directoryPath, file);
  if (fs.statSync(fullPath).isDirectory() && file !== '[slug]') {
    const pagePath = path.join(fullPath, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf-8');
      
      // We look for amount: 1599 and replace it with dynamicData logic
      content = content.replace(/amount:\s*(\d+)/, (match, p1) => {
        return `amount: dynamicData?.discountedPrice || dynamicData?.price || ${p1}`;
      });
      
      fs.writeFileSync(pagePath, content, 'utf-8');
      console.log('Updated dynamic amount logic in:', file);
    }
  }
});
