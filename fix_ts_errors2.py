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

                # Fix the corrupted onClick handler
                new_content = content.replace('onClick={(: number) =>', 'onClick={() =>')
                
                # Fix the corrupted map handler missing number
                # Specifically replace: .map((img: string, idx) =>
                new_content = re.sub(r'\.map\(\(\s*img:\s*string,\s*idx\s*\)\s*=>', r'.map((img: string, idx: number) =>', new_content)
                
                # Specifically replace: .map((r: any, idx) =>
                new_content = re.sub(r'\.map\(\(\s*r:\s*any,\s*idx\s*\)\s*=>', r'.map((r: any, idx: number) =>', new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {slug}")

if __name__ == '__main__':
    update_files()
