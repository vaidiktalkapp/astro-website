import os
import re
import requests
import json

API_URL = 'http://localhost:3001/api/v1'

def extract_faqs(content):
    match = re.search(r'\? dynamicData\.faqs : \[\s*(.*?)\s*\]\)\.map', content, re.DOTALL)
    if not match:
        return []
    
    faq_str = match.group(1)
    faqs = []
    
    q_matches = re.finditer(r'\{\s*q\s*:\s*"(.*?)",\s*a\s*:\s*"(.*?)"\s*\}', faq_str)
    for m in q_matches:
        faqs.append({
            "q": m.group(1).replace('\\"', '"'),
            "a": m.group(2).replace('\\"', '"')
        })
    return faqs

def sync_data():
    dir_path = 'd:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja'
    
    try:
        response = requests.get(f'{API_URL}/pujas')
        all_pujas = response.json().get('data', [])
        puja_map = {p['slug']: p for p in all_pujas}
    except Exception as e:
        print(f"Error fetching pujas: {e}")
        return

    common_testimonials = [
        { "name": "Priya Sharma", "city": "New Delhi", "date": "July 2025", "review": "The puja was absolutely divine. The pandit was deeply knowledgeable and performed every ritual with precision. I joined via live video and felt immense spiritual energy. The prasad arrived beautifully packed within 4 days. Highly recommend Vaidik Talk.", "initial": "P", "color": "#5c1a1f" },
        { "name": "Rajesh Gupta", "city": "Mumbai", "date": "June 2025", "review": "Skeptical at first, but this completely changed my view of online pujas. The sankalp was taken in my name and gotra. I received HD photos the same evening. The whole process was seamless and the results were visible within a week. Truly professional.", "initial": "R", "color": "#1e3a5f" },
        { "name": "Anita Verma", "city": "Bengaluru", "date": "May 2025", "review": "Booked this puja for my mother's health. The muhurat was perfectly auspicious, the pandit spent over 2 hours performing every ritual with dedication. The difference was palpable. Will always trust Vaidik Talk for my spiritual needs.", "initial": "A", "color": "#1a4731" }
    ]

    common_videos = [
        { "youtubeId": "qMmn1uLuNbs", "title": "Devotee Review — Rudrabhishek Experience" },
        { "youtubeId": "qMmn1uLuNbs", "title": "Devotee Review — Puja Transformation Story" },
        { "youtubeId": "qMmn1uLuNbs", "title": "Devotee Review — Online Puja Experience" }
    ]

    for root, dirs, files in os.walk(dir_path):
        for file in files:
            if file == 'page.tsx':
                slug = os.path.basename(root)
                if slug in ['book-a-puja', '[slug]', 'fonts']:
                    continue
                
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()

                faqs = extract_faqs(content)
                
                puja = puja_map.get(slug)
                if puja:
                    puja_id = puja['_id']
                    
                    payload = {
                        "testimonials": common_testimonials,
                        "videoTestimonials": common_videos,
                        "faqs": faqs
                    }
                    
                    try:
                        res = requests.put(f'{API_URL}/pujas/{puja_id}', json=payload)
                        print(f"Updated {slug}: {res.status_code}")
                    except Exception as e:
                        print(f"Error updating {slug}: {e}")

if __name__ == '__main__':
    sync_data()
