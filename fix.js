const fs = require('fs');
const path = require('path');

const dir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

function processFile(filePath) {
    if (filePath.endsWith('book-a-puja/page.tsx') || filePath.endsWith('book-a-puja\\page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the bad line entirely, and replace it properly
    // The bad line contains "Shorts style" and "no bg card"
    content = content.replace(
      /<\/div>\s*—\s*Shorts style,\s*no bg card\s*\*\/\}/g,
      '  </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials — Shorts style, no bg card */}'
    );
    
    // Also if it got replaced with \uFFFD in previous script:
    content = content.replace(
      /<\/div>\s*\s*Shorts style,\s*no bg card\s*\*\/\}/g,
      '  </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials — Shorts style, no bg card */}'
    );

    // Dynamic page error:
    content = content.replace(
      /<\/div>\s*\(Dynamic\)\s*\*\/\}/g,
      '  </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials (Dynamic) */}'
    );

    // Fix the video array closure
    content = content.replace(
      /<\/div>\s*\n\s*<\/div>\s*\n\s*<p className="text-center mt-8">/g,
      '  </div>\n                  ))}\n                </div>\n              </div>\n            </div>\n          )}\n          <p className="text-center mt-8">'
    );

    // Revert the video map to simple to be sure it parses
    content = content.replace(/<\/div>\s*\}\)\}\s*<\/div>\s*<\/div>/g, '');
    
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
console.log('Fixed for sure!');
