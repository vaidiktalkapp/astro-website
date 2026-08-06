const fs = require('fs');
const path = require('path');

const dir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

function processFile(filePath) {
    if (filePath.endsWith('book-a-puja/page.tsx') || filePath.endsWith('book-a-puja\\page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // Manually fix the exact string that is broken
    let brokenString1 = 
            </div> — Shorts style, no bg card */};
            
    let fixedString1 =               </div>
            ))}
          </div>
          </div>

          {/* Video Testimonials — Shorts style, no bg card */};
          
    content = content.replace(brokenString1, fixedString1);
    
    // Some might have it without the newline before </div>
    let brokenString1Alt =             </div> — Shorts style, no bg card */};
    content = content.replace(brokenString1Alt, fixedString1);
    
    
    // For Dynamic page
    let brokenString2 = 
            </div> (Dynamic) */};
            
    let fixedString2 =               </div>
            ))}
          </div>
          </div>

          {/* Video Testimonials (Dynamic) */};
          
    content = content.replace(brokenString2, fixedString2);
    
    let brokenString2Alt =             </div> (Dynamic) */};
    content = content.replace(brokenString2Alt, fixedString2);

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
console.log('Fixed exactly!');
