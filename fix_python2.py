# -*- coding: utf-8 -*-
import os
import re

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx' and 'book-a-puja\\\\page.tsx' not in os.path.join(root, file):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix text testimonials
            content = re.sub(
                r'<\/div>\s*<\/div>\s*.\s*Shorts style,\s*no bg card\s*\*\/\}/',
                '</div>\\n            ))}\\n          </div>\\n          </div>\\n\\n          {/* Video Testimonials — Shorts style, no bg card */}',
                content
            )
            
            # The exact string is probably like:
            #             </div>
            #             
            #             </div> — Shorts style, no bg card */}
            # Let's replace anything that ends with Shorts style, no bg card */} and has mismatched divs before it
            content = re.sub(
                r'<\/div>\s*<\/div>.*Shorts style,\s*no bg card\s*\*\/\}/',
                '</div>\\n            ))}\\n          </div>\\n          </div>\\n\\n          {/* Video Testimonials — Shorts style, no bg card */}',
                content
            )

            # Let's just fix it by replacing the broken block using regex dotall
            content = re.sub(
                r'(\s*<\/div>\s*<\/div>.*Shorts style, no bg card \*\/\})',
                r'\\n              </div>\\n            ))}\\n          </div>\\n          </div>\\n\\n          {/* Video Testimonials — Shorts style, no bg card */}',
                content,
                flags=re.DOTALL
            )
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Python fix done!")
