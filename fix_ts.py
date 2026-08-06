import os
import re

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx':
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            content = content.replace('].map((t, idx)', '].filter((item: any) => item).map((t: any, idx: number)')
            content = content.replace('].map((v, idx)', '].filter((item: any) => item).map((v: any, idx: number)')
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("TypeScript fix done!")
