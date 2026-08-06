import os
import re

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx' and 'book-a-puja\\\\page.tsx' not in os.path.join(root, file):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix Text Testimonials missing div
            # Find:
            #                   <span className="text-[10px] font-bold text-[#16a34a] bg-green-50 border border-green-100 rounded-full px-2 py-1">✓ Verified</span>
            #               </div>
            #             ))}
            
            content = re.sub(
                r'(\s*<span className="text-\[10px\].*?✓ Verified<\/span>\n\s*<\/div>\n)(\s*\}\)\})',
                r'\1                </div>\n\2',
                content
            )

            # Fix Video Testimonials missing div
            # Find:
            #                   <iframe loading="lazy" className="w-full h-full" src={...} title={v.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            #               </div>
            #             ))}
            
            content = re.sub(
                r'(\s*<iframe.*?allowFullScreen \/>\n\s*<\/div>\n)(\s*\}\)\})',
                r'\1                </div>\n\2',
                content
            )

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Missing divs fixed!")
