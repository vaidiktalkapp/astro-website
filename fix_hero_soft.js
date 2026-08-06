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
    
    // Remove the 25% shift from the images
    if(content.includes(' md:translate-x-[25%]')) {
        content = content.replace(/ md:translate-x-\[25%\]/g, '');
        modified = true;
    }
    // Just in case it has other translations
    if(content.match(/ md:translate-x-\[[0-9]+%\]/)) {
        content = content.replace(/ md:translate-x-\[[0-9]+%\]/g, '');
        modified = true;
    }
    
    // Replace the hard black gradient with a soft transparent fade
    const oldGradient = 'md:from-black md:from-[25%] md:via-black/50 md:via-[45%] md:to-transparent md:to-[60%]';
    const oldGradient2 = 'md:from-black md:via-black/80 md:via-30% md:to-transparent md:to-50%'; // in case some were missed
    const newGradient = 'md:from-black/90 md:via-black/50 md:to-transparent';

    if(content.includes(oldGradient)) {
        content = content.replace(oldGradient, newGradient);
        modified = true;
    }
    if(content.includes(oldGradient2)) {
        content = content.replace(oldGradient2, newGradient);
        modified = true;
    }
    
    // Check for the [slug] page which had a different gradient initially
    if(content.includes('from-black/95 via-black/60 to-transparent')) {
        content = content.replace('from-black/95 via-black/60 to-transparent', 'md:from-black/90 md:via-black/50 md:to-transparent');
        modified = true;
    }
    
    // Make sure we have the exact right gradient for mobile too.
    // The current is bg-black/60 md:bg-transparent md:bg-gradient-to-r ...
    // If it's already there, great.
    
    if(modified) {
        fs.writeFileSync(f, content);
        count++;
    }
});

console.log('Fixed ' + count + ' files.');
