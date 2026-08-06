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
        } else {
            if (file.endsWith('page.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('d:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja');

let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    if (content.includes('object-cover aspect-square')) {
        content = content.replace(/object-cover\s+aspect-square/g, 'object-cover object-right-top aspect-square');
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});
console.log(`Updated side images in ${count} files.`);
