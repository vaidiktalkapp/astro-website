import os
import re

def update_files():
    dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'
    
    gallery_pattern = re.compile(
        r'(\{\[\s*\'/pooja/Rudraabhishek\.png\',\s*\'/pooja/Rahu Ketu Grah Shanti Puja\.png\',\s*\'/pooja/Hanuman Sindoor\s*Boondi Puja\.png\',\s*\'/pooja/Shani Tel Arpan and Aarti\.png\',\s*\'/pooja/Mangal Dosh Nivaran Puja\.png\',\s*\'/pooja/Ganesh Ji Ko Laddoo Arpan\.png\'\s*\])\.map\(\(([^,]+),\s*([^)]+)\)\s*=>',
        re.DOTALL
    )

    related_pattern = re.compile(
        r'(\{\[\s*\{\s*title:\s*\'Rudrabhishek Puja\',\s*slug:\s*\'rudrabhishek\',\s*price:\s*\'[^\']+\',\s*img:\s*\'/pooja/Rudraabhishek\.png\',\s*tag:\s*\'Health & Peace\'\s*\},\s*\{\s*title:\s*\'Rahu Ketu Shanti\',\s*slug:\s*\'rahu-ketu-grah-shanti-puja\',\s*price:\s*\'[^\']+\',\s*img:\s*\'/pooja/Rahu Ketu Grah Shanti Puja\.png\',\s*tag:\s*\'Dosh Nivaran\'\s*\},\s*\{\s*title:\s*\'Hanuman Puja\',\s*slug:\s*\'hanuman-sindoor-boondi-arpan\',\s*price:\s*\'[^\']+\',\s*img:\s*\'/pooja/Hanuman Sindoor\s*Boondi Puja\.png\',\s*tag:\s*\'Strength & Protection\'\s*\},\s*\{\s*title:\s*\'Shani Tel Arpan\',\s*slug:\s*\'shani-tel-arpan-aarti\',\s*price:\s*\'[^\']+\',\s*img:\s*\'/pooja/Shani Tel Arpan and Aarti\.png\',\s*tag:\s*\'Remove Shani Dosh\'\s*\}\s*\])\.map\(\(([^,]+),\s*([^)]+)\)\s*=>',
        re.DOTALL
    )

    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file == 'page.tsx':
                slug = os.path.basename(root)
                if slug in ['book-a-puja', '[slug]', 'fonts']:
                    continue
                
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Gallery Replacement
                new_content = gallery_pattern.sub(
                    lambda m: r"{(dynamicData?.gallery?.length > 0 ? dynamicData.gallery : " + m.group(1).lstrip("{") + r").map((" + m.group(2) + r": string, " + m.group(3) + r") =>",
                    content
                )

                # Related Pujas Replacement
                new_content = related_pattern.sub(
                    lambda m: r"{(dynamicData?.relatedPujas?.length > 0 ? dynamicData.relatedPujas : " + m.group(1).lstrip("{") + r").map((" + m.group(2) + r": any, " + m.group(3) + r") =>",
                    new_content
                )
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {slug}")

if __name__ == '__main__':
    update_files()
