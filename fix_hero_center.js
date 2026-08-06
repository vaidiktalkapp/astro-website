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
    
    if(content.includes(' md:object-right-top')) {
        content = content.replace(/ md:object-right-top/g, '');
        modified = true;
    }
    
    if(modified) {
        fs.writeFileSync(f, content);
        count++;
    }
});

console.log('Fixed ' + count + ' files.');
