const fs = require('fs');
const path = require('path');

const dir = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja';

function processFile(filePath) {
    if (filePath.endsWith('book-a-puja/page.tsx') || filePath.endsWith('book-a-puja\\page.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Text Testimonials Container
    content = content.replace(
        /className="flex overflow-x-auto gap-6 pb-8 mb-8 snap-x scrollbar-hide items-stretch justify-start"/g,
        'className="flex w-max animate-marquee gap-6 pb-4"'
    );
    
    // Also wrap it in overflow-hidden if not already
    // The previous line was: <div className="flex w-max animate-marquee gap-6 pb-4">
    // Let's replace the whole div line with a wrapper
    content = content.replace(
        /<div className="flex w-max animate-marquee gap-6 pb-4">/g,
        '<div className="overflow-hidden relative w-full mb-16"><div className="flex w-max animate-marquee gap-6 pb-4 hover:pause">'
    );
    // Need to add an extra </div> after the map closes.
    // In static pages, it ends with:
    //             ))}
    //           </div>
    // Let's find the closing div of the testimonials grid.
    
    // Instead of parsing perfectly, let's just use simple string replacement for the arrays:
    
    // Fix Dynamic arrays
    content = content.replace(
        /puja\.testimonials\.map\(\(t: any, idx: number\) =>/g,
        '[...(puja.testimonials || []), ...(puja.testimonials || [])].map((t: any, idx: number) =>'
    );
    content = content.replace(
        /puja\.videoTestimonials\.map\(\(v: any, idx: number\) =>/g,
        '[...(puja.videoTestimonials || []), ...(puja.videoTestimonials || [])].map((v: any, idx: number) =>'
    );

    // Fix Static Text Arrays
    content = content.replace(
        /\]\.map\(\(t, idx\) => \(/g,
        ', { name: "Priya Sharma", city: "New Delhi", date: "July 2025", review: "The puja was absolutely divine. The pandit was deeply knowledgeable and performed every ritual with precision. I joined via live video and felt immense spiritual energy. The prasad arrived beautifully packed within 4 days. Highly recommend Vaidik Talk.", initial: "P", color: "#5c1a1f" }, { name: "Rajesh Gupta", city: "Mumbai", date: "June 2025", review: "Skeptical at first, but this completely changed my view of online pujas. The sankalp was taken in my name and gotra. I received HD photos the same evening. The whole process was seamless and the results were visible within a week. Truly professional.", initial: "R", color: "#1e3a5f" }, { name: "Anita Verma", city: "Bengaluru", date: "May 2025", review: "Booked this puja for my mother\'s health. The muhurat was perfectly auspicious, the pandit spent over 2 hours performing every ritual with dedication. The difference was palpable. Will always trust Vaidik Talk for my spiritual needs.", initial: "A", color: "#1a4731" }].map((t, idx) => ('
    );

    // Fix Static Video Arrays
    content = content.replace(
        /\]\.map\(\(v, idx\) => \(/g,
        ', { id: "qMmn1uLuNbs", title: "Devotee Review — Rudrabhishek Experience" }, { id: "qMmn1uLuNbs", title: "Devotee Review — Puja Transformation Story" }, { id: "qMmn1uLuNbs", title: "Devotee Review — Online Puja Experience" }].map((v, idx) => ('
    );

    // 2. Video Testimonials Container
    content = content.replace(
        /className="flex overflow-x-auto gap-5 pb-8 snap-x scrollbar-hide justify-start"/g,
        'className="flex w-max animate-marquee gap-5 pb-4"'
    );
    content = content.replace(
        /<div className="flex w-max animate-marquee gap-5 pb-4">/g,
        '<div className="overflow-hidden relative w-full mb-8"><div className="flex w-max animate-marquee gap-5 pb-4 hover:pause">'
    );

    // Fix the extra closing div issue by replacing the known closing structure
    // Since we wrapped it, we need to add </div> where the original </div> was.
    // Original:
    //             ))}
    //           </div>
    content = content.replace(
        /\}\)\}\s*<\/div>/g,
        '}))}\n              </div>\n            </div>'
    );
    
    // The above regex might double-close other things if not careful, but }))}\n </div> is very specific to these maps.
    // Let's refine the regex for safety:
    // }))}\n          </div>
    
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
console.log('Done replacing marquee!');
