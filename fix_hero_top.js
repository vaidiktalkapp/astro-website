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
    
    // Change md:object-right to md:object-right-top to prevent top cutting on desktop
    if(content.includes(' md:object-right ')) {
        content = content.replace(/ md:object-right /g, ' md:object-right-top ');
        modified = true;
    }
    
    if(modified) {
        fs.writeFileSync(f, content);
        count++;
    }
});

console.log('Fixed ' + count + ' files.');
