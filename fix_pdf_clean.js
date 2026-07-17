const fs = require('fs');
const path = require('path');
const dir = 'd:/server-vaidik/web-vaidik-main/src/lib';
const files = fs.readdirSync(dir).filter(f => f.endsWith('PdfGenerator.ts') && f !== 'celebrityPdfGenerator.ts' && f !== 'kundliPdfGenerator.ts');

const replace1 = `const clean = (txt: any) => {
            if (!txt) return 'N/A';
            let decoded = String(txt).replace(/<[^>]*>?/gm, '');
            if (typeof document !== 'undefined') {
                const temp = document.createElement('textarea');
                temp.innerHTML = decoded;
                decoded = temp.value;
            } else {
                decoded = decoded.replace(/&nbsp;/g, ' ').replace(/\\u00A0/g, ' ');
            }
            return decoded.replace(/[\\n\\r\\t]+/g, ' ').replace(/\\s+/g, ' ').trim();
        };`;

const replace2 = `const clean = (txt: any): string => {
            if (txt === undefined || txt === null) return '-';
            let decoded = String(txt).replace(/<[^>]*>?/gm, '');
            if (typeof document !== 'undefined') {
                const temp = document.createElement('textarea');
                temp.innerHTML = decoded;
                decoded = temp.value;
            } else {
                decoded = decoded.replace(/&nbsp;/g, ' ').replace(/\\u00A0/g, ' ');
            }
            return decoded.replace(/[\\n\\r\\t]+/g, ' ').replace(/\\s+/g, ' ').trim();
        };`;

let updatedCount = 0;

files.forEach(f => {
    const full = path.join(dir, f);
    let content = fs.readFileSync(full, 'utf8');
    let originalContent = content;
    
    // Pattern 1
    const p1 = "const clean = (txt: any) => {\n            if (!txt) return 'N/A';\n            return String(txt).replace(/<[^>]*>?/gm, '').replace(/\\s+/g, ' ').trim();\n        };";
    const p1a = "const clean = (txt: any) => {\r\n            if (!txt) return 'N/A';\r\n            return String(txt).replace(/<[^>]*>?/gm, '').replace(/\\s+/g, ' ').trim();\r\n        };";
    const p1b = "const clean = (txt: any) => {\n      if (!txt) return 'N/A';\n      return String(txt).replace(/<[^>]*>?/gm, '').replace(/\\s+/g, ' ').trim();\n    };";
    const p1c = "const clean = (txt: any) => {\r\n      if (!txt) return 'N/A';\r\n      return String(txt).replace(/<[^>]*>?/gm, '').replace(/\\s+/g, ' ').trim();\r\n    };";

    // Pattern 2
    const p2 = "const clean = (txt: any): string => {\n            if (txt === undefined || txt === null) return '-';\n            return String(txt).replace(/<[^>]*>?/gm, '').replace(/\\s+/g, ' ').trim();\n        };";
    const p2a = "const clean = (txt: any): string => {\r\n            if (txt === undefined || txt === null) return '-';\r\n            return String(txt).replace(/<[^>]*>?/gm, '').replace(/\\s+/g, ' ').trim();\r\n        };";

    content = content.replace(p1, replace1);
    content = content.replace(p1a, replace1);
    content = content.replace(p1b, replace1);
    content = content.replace(p1c, replace1);
    
    content = content.replace(p2, replace2);
    content = content.replace(p2a, replace2);

    if (content !== originalContent) {
        fs.writeFileSync(full, content);
        updatedCount++;
    } else {
        // use regex just for the clean function body if simple replace fails
        const regex = /const\s+clean\s*=\s*\([^)]*\)\s*(?::\s*string\s*)?=>\s*\{[\s\S]*?return\s+String[^}]+\};/m;
        const match = content.match(regex);
        if (match) {
            const hasStringReturn = match[0].includes('return "-";') || match[0].includes("return '-';");
            content = content.replace(regex, hasStringReturn ? replace2 : replace1);
            fs.writeFileSync(full, content);
            updatedCount++;
        }
    }
});

console.log('Updated ' + updatedCount + ' files');
