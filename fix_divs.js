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
    
    // But we need to make sure we only replace the ones after the animate-marquee div.
    
    // Instead of regex on the closing div, let's just do a reliable replace:
    
    let parts = content.split('<div className="overflow-hidden relative w-full mb-16"><div className="flex w-max animate-marquee gap-6 pb-4 hover:pause">');
    if (parts.length === 2) {
        // Find the next ))} \n </div> or ))} \n          </div>
        parts[1] = parts[1].replace(/\}\)\}\s*<\/div>/, '}))\n              </div>\n            </div>');
        // Wait, replace doesn't work if I just hardcode it like that.
        // Let's use a simple exact string replacement based on what we know is there.
        // The file has:               </div>\n            ))} \n          </div>
    }
    
    // Let's just fix it by finding the exact blocks and appending </div>
    
    // For text testimonials:
    content = content.replace(
      /(\}\)\}\s*<\/div>)(\s*\{\/\* Video Testimonials)/,
      '\n            </div>'
    );

    // For video testimonials:
    content = content.replace(
      /(\}\)\}\s*<\/div>)(\s*<p className="text-center mt-8">|\s*<\/div>\s*<\/div>\s*\}\))/g,
      '\n            </div>'
    );
    
    // In dynamic page [slug]/page.tsx:
    content = content.replace(
      /(\}\)\}\s*<\/div>)(\s*<\/div>\s*\{\/\* 6\.5 PHOTO GALLERY)/,
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
