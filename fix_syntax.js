const fs = require('fs');
const path = require('path');

const dir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

function processFile(filePath) {
    if (filePath.endsWith('book-a-puja/page.tsx') || filePath.endsWith('book-a-puja\\page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix Text Testimonials mess
    content = content.replace(
      /\s*<\/div>\n\s*<\/div>\n\s*<\/div> — Shorts style, no bg card \*\/}/,
      '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials — Shorts style, no bg card */}'
    );
    
    // Fix Dynamic Text Testimonials mess [slug]/page.tsx
    content = content.replace(
      /\s*<\/div>\n\s*<\/div>\n\s*<\/div> \(Dynamic\) \*\/}/,
      '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials (Dynamic) */}'
    );

    // Fix Video Testimonials mess (Static)
    content = content.replace(
      /\s*<\/div>\n\s*<\/div>\n\s*<a href="https:\/\/www\.youtube\.com\/@VaidikTalk"/,
      '\n              </div>\n            ))}\n          </div>\n          </div>\n          <p className="text-center mt-8">\n            <a href="https://www.youtube.com/@VaidikTalk"'
    );
    
    // Fix Video Testimonials mess (Dynamic) [slug]/page.tsx
    content = content.replace(
      /\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\{\/\* 6\.5 PHOTO GALLERY/,
      '\n              </div>\n            ))}\n          </div>\n          </div>\n        </div>\n      )}\n\n      {/* 6.5 PHOTO GALLERY'
    );

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
