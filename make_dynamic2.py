import os
import re

dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'

for root, _, files in os.walk(dir_path):
    for file in files:
        if file == 'page.tsx' and 'book-a-puja\\\\page.tsx' not in os.path.join(root, file) and 'book-a-puja\\\\[slug]\\\\page.tsx' not in os.path.join(root, file):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Get slug from directory name
            slug = os.path.basename(os.path.dirname(filepath))

            # 1. Inject hook and axios
            if 'const [dynamicData, setDynamicData]' not in content:
                # Find the start of the component
                comp_match = re.search(r'export default function \w+\(\)\s*\{', content)
                if comp_match:
                    hook_code = """
  const [dynamicData, setDynamicData] = useState<any>(null);
  useEffect(() => {
    import('axios').then(axios => {
      const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1') + '/pujas/""" + slug + """';
      axios.default.get(url)
        .then(res => setDynamicData(res.data))
        .catch(err => console.log('Dynamic data not found yet'));
    });
  }, []);
"""
                    content = content[:comp_match.end()] + hook_code + content[comp_match.end():]

            # 2. Fix Text Testimonials
            if 'dynamicData?.testimonials?.length > 0' not in content:
                content = re.sub(
                    r'(\{\[\s*\{\s*name:\s*[\'"]Priya Sharma[\'"].*?\]\.filter\(\(item:\s*any\)\s*=>\s*item\))',
                    r'(dynamicData?.testimonials?.length > 0 ? dynamicData.testimonials : \1)',
                    content,
                    flags=re.DOTALL
                )
                
            # 3. Fix Video Testimonials
            if 'dynamicData?.videoTestimonials?.length > 0' not in content:
                content = re.sub(
                    r'(\{\[\s*\{\s*id:\s*[\'"]qMmn1uLuNbs[\'"].*?\]\.filter\(\(item:\s*any\)\s*=>\s*item\))',
                    r'(dynamicData?.videoTestimonials?.length > 0 ? dynamicData.videoTestimonials : \1)',
                    content,
                    flags=re.DOTALL
                )
                
                # Fix v.id to v.youtubeId || v.id
                content = re.sub(
                    r'getYoutubeId\(v\.id\)',
                    r'getYoutubeId(v.youtubeId || v.id)',
                    content
                )

                # Fix dynamic map parameter
                content = re.sub(
                    r'\]\.filter\(\(item: any\) => item\)\.map\(\(t: any, idx: number\)',
                    r'].filter((item: any) => item)).map((t: any, idx: number)',
                    content
                )
                # Ensure parentheses are balanced.
                content = content.replace(') : {', ') : (')
                # Wait, my regex injected: (dynamicData?.testimonials?.length > 0 ? dynamicData.testimonials : {[...])
                # the {[  should just be ( [ 
                # Let's fix that.
                
                
            # 4. Fix FAQs
            if 'dynamicData?.faqs?.length > 0' not in content:
                content = re.sub(
                    r'(\{\s*\[\s*\{\s*q:.*?\])\.map\(\(faq,\s*idx\)\s*=>',
                    r'(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : \1).map((faq: any, idx: number) =>',
                    content,
                    flags=re.DOTALL
                )
                
                content = re.sub(
                    r'\{faq\.q\}',
                    r'{faq.question || faq.q}',
                    content
                )
                content = re.sub(
                    r'\{faq\.a\}',
                    r'{faq.answer || faq.a}',
                    content
                )
                
            # Clean up syntax issues from array replacements
            content = content.replace('(dynamicData?.testimonials?.length > 0 ? dynamicData.testimonials : {[', '{(dynamicData?.testimonials?.length > 0 ? dynamicData.testimonials : [')
            content = content.replace('(dynamicData?.videoTestimonials?.length > 0 ? dynamicData.videoTestimonials : {[', '{(dynamicData?.videoTestimonials?.length > 0 ? dynamicData.videoTestimonials : [')
            content = content.replace('(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : { [', '{(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : [')
            content = content.replace('(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : {\n            [', '{(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : [\n            ')


            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)

print("Dynamic integration complete!")
