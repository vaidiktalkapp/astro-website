import os
import re

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx' and 'book-a-puja\\\\page.tsx' not in os.path.join(root, file) and 'book-a-puja\\\\[slug]\\\\page.tsx' not in os.path.join(root, file):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix all JSX expression missing curly brace around the ternary
            
            # The current state is something like:
            # (dynamicData?.faqs?.length > 0 ? dynamicData.faqs : {[
            # We want:
            # {(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : [
            
            content = content.replace('(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : {[', '{(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : [')
            
            # For the others just in case:
            content = content.replace('(dynamicData?.testimonials?.length > 0 ? dynamicData.testimonials : {[', '{(dynamicData?.testimonials?.length > 0 ? dynamicData.testimonials : [')
            content = content.replace('(dynamicData?.videoTestimonials?.length > 0 ? dynamicData.videoTestimonials : {[', '{(dynamicData?.videoTestimonials?.length > 0 ? dynamicData.videoTestimonials : [')

            # And also fix the trailing brace if any
            # Original was:
            # ]).map(...)
            # But the map is already closed inside the parenthesis or brace?
            # Wait, the original was:
            # ].map((faq, idx) => (
            # My script replaced it with:
            # ]).map((faq: any, idx: number) => (
            # But in JSX, the whole expression is { ... }.
            # If we start with {(dynamicData... : [, then it ends with ]).map((faq: any, idx: number) => (.
            # And then the map returns JSX, which is inside { ... }.
            # Wait, }).map or ]).map?
            # The full expression is {( ... : [ ... ]).map(...) }
            # Wait! The closing brace } is needed AT THE END OF THE MAP!
            # Let's check where the closing brace is.
            # The original structure:
            # { [ ... ].map((faq, idx) => ( ... )) }
            # My regex just changed {[ to {(dynamicData... : [ and ].map to ]).map.
            # Wait, the original had a closing } AFTER the .map() parenthesis closes!
            # Let's look at job-attract-confirm-puja/page.tsx line 607:
            # 607:             ]).map((faq: any, idx: number) => (
            # 608:               <details ...>
            # ...
            # 614:             ))}
            # Ah! ))}  is the closing parenthesis of .map and the closing brace } of JSX!
            # Since my regex didn't touch the ))}, it's still there!
            # So {(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : [ ... ]).map( ... ))} is EXACTLY mathematically correct syntax!
            # Awesome! All I need is to replace (dynamicData... : {[ with {(dynamicData... : [

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("JSX fixed!")
