import os
import re

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx' and 'book-a-puja\\\\page.tsx' not in os.path.join(root, file):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix 1: The broken comment in text testimonials
            content = re.sub(
                r'\s*<\/div>\n\s*<\/div>\n\s*<\/div> . Shorts style, no bg card \*\/\}',
                '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials - Shorts style, no bg card */}',
                content
            )

            # Fix 1.5: If it has only one </div>
            content = re.sub(
                r'\s*<\/div>\n\s*<\/div> . Shorts style, no bg card \*\/\}',
                '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials - Shorts style, no bg card */}',
                content
            )

            # Fix 2: The broken video array map closing
            content = re.sub(
                r'\s*<\/div>\n\s*\}\)\}\n\s*<\/div>\n\s*\}\)\}\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\}\)',
                '\n                </div>\n              ))}\n            </div>\n          </div>',
                content
            )

            # Also catch the weird one
            content = re.sub(
                r'<\/div>\s*\}\)\}\s*<\/div>\s*\}\)\}\s*<\/div>\s*<\/div>\s*<\/div>\s*\}\)',
                '</div>\\n              ))}\\n            </div>\\n          </div>',
                content
            )
            
            # Dynamic page
            content = re.sub(
                r'\s*<\/div>\n\s*<\/div>\n\s*<\/div> \(Dynamic\) \*\/\}',
                '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials (Dynamic) */}',
                content
            )

            content = re.sub(
                r'\s*<\/div>\n\s*<\/div> \(Dynamic\) \*\/\}',
                '\n              </div>\n            ))}\n          </div>\n          </div>\n\n          {/* Video Testimonials (Dynamic) */}',
                content
            )
            
            content = re.sub(
                r'<\/div>\s*\}\)\}\s*<\/div>\s*\}\)\}\s*<\/div>\s*<\/div>\s*<\/div>\s*\}\)\s*<\/div>\s*<\/div>\s*\}\)\s*\{\/\* 6\.5 PHOTO GALLERY',
                '</div>\\n              ))}\\n            </div>\\n          </div>\\n        </div>\\n      )}\\n\\n      {/* 6.5 PHOTO GALLERY',
                content
            )

            # The other dynamic fix
            content = re.sub(
                r'<\/div>\s*\}\)\}\s*<\/div>\s*\}\)\}\s*<\/div>\s*<\/div>\s*<\/div>\s*\}\)',
                '</div>\\n              ))}\\n            </div>\\n          </div>',
                content
            )

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Python fix done!")
