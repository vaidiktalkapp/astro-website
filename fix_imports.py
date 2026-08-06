import os
import re

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx' and 'book-a-puja\\\\page.tsx' not in os.path.join(root, file) and 'book-a-puja\\\\[slug]\\\\page.tsx' not in os.path.join(root, file):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Ensure useEffect is imported
            if 'useEffect' not in content[:500]:
                content = re.sub(
                    r'import React, \{\s*useState\s*\} from \'react\';',
                    "import React, { useState, useEffect } from 'react';",
                    content
                )

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Imports fixed!")
