import json
with open('test_astrology_response.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    print("KEYS in data:", list(data.get('data', {}).keys()))
    print("KEYS in panchang:", list(data.get('data', {}).get('panchang', {}).keys()))
