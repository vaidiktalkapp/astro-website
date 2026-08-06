const fs = require('fs');
const path = require('path');

const dir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

function processFile(filePath) {
    if (filePath.endsWith('book-a-puja/page.tsx') || filePath.endsWith('book-a-puja\\page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Currently, it looks like:
    //             ))}
    //           </div>
    // Let's replace:
    //             ))}
    //           </div>
    // with:
    //             ))}
    //           </div></div>
    
    // For text testimonials:
    content = content.replace(
      /(\)\)\}\s*<\/div>)(\s*\{\/\* Video Testimonials)/,
      '\n            </div>'
    );

    // For video testimonials:
    content = content.replace(
      /(\)\)\}\s*<\/div>)(\s*<p className="text-center mt-8">|\s*<\/div>\s*<\/div>\s*\{\/\* 6\.5)/g,
      '\n            </div>'
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
console.log('Fixed missing div closures!');
