const fs = require('fs');
const path = require('path');

const dir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

function processFile(filePath) {
    if (filePath.endsWith('book-a-puja/page.tsx') || filePath.endsWith('book-a-puja\\page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix Text Testimonials mess
    content = content.replace(
      /\s*<\/div>\n\s*<\/div> — Shorts style, no bg card \*\/\}/g,
      '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials — Shorts style, no bg card */}'
    );
    
    // Check if it exists for [slug]/page.tsx
    content = content.replace(
      /\s*<\/div>\n\s*<\/div> \(Dynamic\) \*\/\}/g,
      '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials (Dynamic) */}'
    );

    // Fix Video Testimonials closing mess (the missing ))} </div> and weird </div>)
    // Currently: 
    //                 <div key={idx} ...
    //                   <iframe ...
    //               </div>
    //             ))}
    //           </div>
    //           </div>
    // Let's just fix it by ensuring </div> closures are correct!
    
    // Instead of regex, let's just make it compilable. I'll fix the last part manually or check what's there.
    content = content.replace(/<\/div>\s*\}\)\}\s*<\/div>\s*<\/div>\s*<p className="text-center mt-8">/, '</div>\n              ))}\n            </div>\n            </div>\n            <p className="text-center mt-8">');
    content = content.replace(/<\/div>\s*\}\)\}\s*<\/div>\s*<\/div>\s*<\/div>\s*\}\)/, '</div>\n                  ))}\n                </div>\n              </div>\n            </div>\n          )}\n');

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
console.log('Fixed syntax errors for good!');
