import os
import re

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx' and 'book-a-puja\\\\page.tsx' not in os.path.join(root, file):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix the broken iframe src
            # We are looking for: src={https://www.youtube.com/embed/?rel=0&modestbranding=1}
            # Or similar corrupted variations.
            
            # The correct string should be: src={`https://www.youtube.com/embed/${getYoutubeId(v.youtubeId || v.id)}?rel=0&modestbranding=1`}
            
            content = re.sub(
                r'src=\{https:\/\/www\.youtube\.com\/embed\/\?rel=0&modestbranding=1\}',
                r'src={`https://www.youtube.com/embed/${getYoutubeId(v.youtubeId || v.id)}?rel=0&modestbranding=1`}',
                content
            )

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("IFRAME src fixed completely!")
