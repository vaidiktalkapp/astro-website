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
    
    // Find the img tag inside the absolute inset-0 block (hero image)
    const imgRegex = /<div className="absolute inset-0">\s*<img[^>]*className="([^"]+)"/g;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
        let oldClass = match[1];
        let newClass = oldClass
            .replace(/ scale-\[.*?\]/g, '')
            .replace(/ md:scale-\[.*?\]/g, '')
            .replace(/ md:h-\[130%\]/g, ' h-full')
            .replace(/ h-\[.*?\]/g, ' h-full'); // ensure it's h-full
            
        // ensure it has w-full h-full object-cover
        if (!newClass.includes('w-full')) newClass = 'w-full ' + newClass;
        if (!newClass.includes('h-full')) newClass = newClass.replace('object-cover', 'h-full object-cover');
        
        if (oldClass !== newClass) {
            content = content.replace(oldClass, newClass);
            modified = true;
        }
    }
    
    if(modified) {
        fs.writeFileSync(f, content);
        count++;
    }
});

console.log('Fixed ' + count + ' files.');
