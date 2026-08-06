const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
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

const pujaFiles = walk('d:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja');
const reportFiles = walk('d:/server-vaidik/web-vaidik-main/src/app/(main)/report');
const allFiles = [...pujaFiles, ...reportFiles];

let count = 0;
allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add animate-fade-in-up to the main wrapper
    // We look for the first <div className="w-full and add the animation class
    if (content.includes('className="w-full ') && !content.includes('animate-fade-in-up')) {
        content = content.replace(/className="w-full /g, 'className="w-full animate-fade-in-up ');
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});
console.log(`Added animate-fade-in-up to ${count} files.`);
