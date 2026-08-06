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
            results.push(file);
        }
    });
    return results;
}

const files = walk('src/app/(main)/book-a-puja').filter(f => f.endsWith('page.tsx'));
let count = 0;

files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    let modified = false;
    
    // Find the img tag inside the absolute inset-0 block and remove md:h-[920px] etc.
    const imgRegex = /(<div className="absolute inset-0">\s*<img[^>]*className=")([^"]+)(")/g;
    let match;
    let newContent = content;
    while ((match = imgRegex.exec(content)) !== null) {
        let oldClass = match[2];
        let newClass = oldClass
            .replace(/md:h-\[[0-9]+px\]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
        
        if (oldClass !== newClass) {
            newContent = newContent.replace(oldClass, newClass);
            modified = true;
        }
    }
    content = newContent;
    
    if(modified) {
        fs.writeFileSync(f, content);
        count++;
    }
});

console.log('Fixed ' + count + ' files.');
