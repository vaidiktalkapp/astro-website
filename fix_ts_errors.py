import os
import re

def update_files():
    dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'
    
    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file == 'page.tsx':
                slug = os.path.basename(root)
                if slug in ['book-a-puja', 'fonts']:
                    continue
                
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Fix gallery
                new_content = re.sub(r'\.map\(\(([^:]+):\s*string,\s*([^:]+)\)\s*=>', r'.map((\1: string, \2: number) =>', content)
                
                # Fix related
                new_content = re.sub(r'\.map\(\(([^:]+):\s*any,\s*([^:]+)\)\s*=>', r'.map((\1: any, \2: number) =>', new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {slug}")

if __name__ == '__main__':
    update_files()
