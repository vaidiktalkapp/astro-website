const fs = require('fs');
const path = require('path');

const targetDir = 'd:\\server-vaidik\\web-vaidik-main\\src';

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
            // Skip form and input files
            if (file.includes('Form') || file.includes('Input')) {
                continue;
            }
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;

            // Replace text-gray-100 to text-gray-400 with text-[#3a1216]
            // We use a negative lookbehind (if supported, or just regex) to ensure it's not placeholder:text-gray-
            
            // Regex explanation: 
            // (?<!placeholder:) matches if it's NOT preceded by 'placeholder:'
            // text-gray-(100|200|300|400)
            
            content = content.replace(/(?<!placeholder:)text-gray-(100|200|300|400)\b/g, 'text-[#3a1216]');
            
            // Replace text-gray-500 to text-gray-800 with text-gray-850
            content = content.replace(/(?<!placeholder:)text-gray-(500|600|700|800)\b/g, 'text-gray-850');

            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated: ' + fullPath);
            }
        }
    }
}

processDirectory(targetDir);
console.log('Done!');

