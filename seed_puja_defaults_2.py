import requests

url = 'http://localhost:5000/api/v1/pujas'
try:
    response = requests.get(url, timeout=3)
    pujas = response.json().get('data', response.json())
    
    default_process_steps = [
        "Easily book the Anushthan via our platform.",
        "Share your name, gotra, birth details, and financial intentions through the form below.",
        "Your details will be included in the sacred Sankalp, performed at the beginning of the ritual by our expert Pandits.",
        "On the day of the Anushthan, be seated with a calm and focused mind—cover your head with a clean cloth and listen with devotion.",
        "The energy of wealth and divine prosperity will be invoked on your behalf through powerful mantras, havan, and yantra activation."
    ]
    
    default_why_choose_us = [
        "India's most trusted Devotion-Tech platform with thousands of transformative rituals delivered",
        "Authentic Vedic Anushthans led by Pandits from Char Dham, Kashi, Puri, Ujjain, and more",
        "Personalized Sankalp and live-streamed ceremonies for full transparency and involvement",
        "Graphically designed Kundalis with specific insights and astrological remedies",
        "Over 40 years of combined expertise guiding your destiny with precision and devotion"
    ]
    
    if isinstance(pujas, list):
        for p in pujas:
            needs_update = False
            if not p.get('processSteps') or len(p.get('processSteps', [])) == 0:
                p['processSteps'] = default_process_steps
                needs_update = True
            
            if not p.get('whyChooseUs') or len(p.get('whyChooseUs', [])) == 0:
                p['whyChooseUs'] = default_why_choose_us
                needs_update = True
                
            if needs_update:
                pid = p.get('_id')
                put_url = f'{url}/{pid}'
                payload = dict(p)
                payload.pop('_id', None)
                payload.pop('createdAt', None)
                payload.pop('updatedAt', None)
                payload.pop('__v', None)
                
                payload['price'] = float(payload.get('price') or 0)
                if payload.get('discountedPrice'):
                    payload['discountedPrice'] = float(payload.get('discountedPrice'))
                
                res = requests.put(put_url, json=payload, timeout=3)
                if res.status_code in [200, 201]:
                    print(f"Successfully seeded defaults for {p.get('title')}")
                else:
                    print(f"Failed to update {p.get('title')}: {res.status_code}")
    else:
        print("Expected a list of pujas, got:", type(pujas))
except Exception as e:
    print(f"Error: {e}")
