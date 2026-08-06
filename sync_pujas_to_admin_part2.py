import requests

API_URL = 'http://localhost:3001/api/v1'

def sync_data():
    try:
        response = requests.get(f'{API_URL}/pujas')
        all_pujas = response.json().get('data', [])
    except Exception as e:
        print(f"Error fetching pujas: {e}")
        return

    gallery = [
        '/pooja/Rudraabhishek.png',
        '/pooja/Rahu Ketu Grah Shanti Puja.png',
        '/pooja/Hanuman Sindoor  Boondi Puja.png',
        '/pooja/Shani Tel Arpan and Aarti.png',
        '/pooja/Mangal Dosh Nivaran Puja.png',
        '/pooja/Ganesh Ji Ko Laddoo Arpan.png'
    ]
    
    relatedPujas = [
        { "title": "Rudrabhishek Puja", "slug": "rudrabhishek", "price": "₹1599", "img": "/pooja/Rudraabhishek.png", "tag": "Health & Peace" },
        { "title": "Rahu Ketu Shanti", "slug": "rahu-ketu-grah-shanti-puja", "price": "₹1599", "img": "/pooja/Rahu Ketu Grah Shanti Puja.png", "tag": "Dosh Nivaran" },
        { "title": "Hanuman Puja", "slug": "hanuman-sindoor-boondi-arpan", "price": "₹999", "img": "/pooja/Hanuman Sindoor  Boondi Puja.png", "tag": "Strength & Protection" },
        { "title": "Shani Tel Arpan", "slug": "shani-tel-arpan-aarti", "price": "₹1199", "img": "/pooja/Shani Tel Arpan and Aarti.png", "tag": "Remove Shani Dosh" }
    ]

    for puja in all_pujas:
        puja_id = puja['_id']
        payload = {
            "gallery": gallery,
            "relatedPujas": relatedPujas
        }
        
        try:
            res = requests.put(f'{API_URL}/pujas/{puja_id}', json=payload)
            print(f"Updated {puja['slug']}: {res.status_code}")
        except Exception as e:
            print(f"Error updating {puja['slug']}: {e}")

if __name__ == '__main__':
    sync_data()
