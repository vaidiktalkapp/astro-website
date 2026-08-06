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
    
    // Add translation back to shift the couple to the right
    if(content.includes(' md:object-right"')) {
        content = content.replace(/ md:object-right"/g, ' md:object-right md:translate-x-[25%]"');
        modified = true;
    }
    
    // Fix the gradient overlay to hide the sharp edge of the shifted image
    if(content.includes('md:from-black md:via-black/80 md:via-30% md:to-transparent md:to-50%')) {
        content = content.replace(
            'md:from-black md:via-black/80 md:via-30% md:to-transparent md:to-50%', 
            'md:from-black md:from-[25%] md:via-black/50 md:via-[45%] md:to-transparent md:to-[60%]'
        );
        modified = true;
    }
    
    if(modified) {
        fs.writeFileSync(f, content);
        count++;
    }
});

console.log('Fixed ' + count + ' files.');
