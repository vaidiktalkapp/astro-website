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
    
    // Reduce height of the container
    // Search for w-full h-[500px] md:h-[600px]
    // Or similar variations
    const heightRegex = /className="relative w-full h-\[500px\] md:h-\[[0-9]+px\]/g;
    if (content.match(heightRegex)) {
        content = content.replace(heightRegex, 'className="relative w-full h-[450px] md:h-[500px]');
        modified = true;
    }
    
    // Find the img tag inside the absolute inset-0 block and force object-center
    const imgRegex = /(<div className="absolute inset-0">\s*<img[^>]*className=")([^"]+)(")/g;
    let match;
    let newContent = content;
    while ((match = imgRegex.exec(content)) !== null) {
        let oldClass = match[2];
        let newClass = oldClass
            .replace(/object-\[.*?\]/g, '') // remove custom positions like object-[center_30%]
            .replace(/object-top/g, '')
            .replace(/object-bottom/g, '')
            .replace(/object-left/g, '')
            .replace(/object-right/g, '')
            .replace(/object-center/g, ''); // clear it first
            
        // remove duplicate spaces
        newClass = newClass.replace(/\s+/g, ' ').trim();
        
        // add object-center
        newClass = newClass + ' object-center';
        
        newContent = newContent.replace(oldClass, newClass);
        modified = true;
    }
    content = newContent;
    
    if(modified) {
        fs.writeFileSync(f, content);
        count++;
    }
});

console.log('Fixed ' + count + ' files.');
