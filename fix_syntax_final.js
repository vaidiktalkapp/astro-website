const fs = require('fs');
const path = require('path');

const dir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

function processFile(filePath) {
    if (filePath.endsWith('book-a-puja/page.tsx') || filePath.endsWith('book-a-puja\\page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix the broken comment
    content = content.replace(
      /(\s*<\/div>\s*|\s*)<\/div> — Shorts style, no bg card \*\/\}/g,
      '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials — Shorts style, no bg card */}'
    );
    
    // Fix the Dynamic broken comment
    content = content.replace(
      /(\s*<\/div>\s*|\s*)<\/div> \(Dynamic\) \*\/\}/g,
      '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials (Dynamic) */}'
    );

    // Ensure the iframe div is closed properly in video testimonials
    // In video testimonials:
    //                 <div key={idx} ...
    //                   <iframe ... />
    //               </div>
    //             ))}
    //           </div>
    //           </div>
    
    // Currently it might be:
    //                   <iframe ... />
    //               </div>
    //             ))}
    //           </div>
    //           </div>
    //           <p className="text-center mt-8">
    
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
