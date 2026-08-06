const fs = require('fs');
const path = require('path');

const dir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

function processFile(filePath) {
    if (filePath.endsWith('book-a-puja/page.tsx') || filePath.endsWith('book-a-puja\\page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Text testimonials static fix
    content = content.replace(
      /              <\/div>\n            \n            <\/div> — Shorts style, no bg card \*\/\}/g,
      '              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials — Shorts style, no bg card */}'
    );
    // If it had a different space
    content = content.replace(
      /<\/div>\n\s*<\/div> — Shorts style, no bg card \*\/\}/g,
      '</div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials — Shorts style, no bg card */}'
    );

    // Text testimonials dynamic fix
    content = content.replace(
      /<\/div>\n\s*<\/div> \(Dynamic\) \*\/\}/g,
      '</div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials (Dynamic) */}'
    );

    // Fix the ` encoding issue
    content = content.replace(/\uFFFD/g, '—');

    fs.writeFileSync(filePath, content);
}

function walk(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('page.tsx')) {
            processFile(fullPath);
        }
    }
}

walk(dir);
console.log('Fixed syntax errors!');
