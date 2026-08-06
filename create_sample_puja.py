import requests
import json

url = 'http://localhost:3001/api/v1/pujas'

payload = {
    "title": "Kaal Sarp Dosh Nivaran Puja",
    "slug": "kaal-sarp-dosh-nivaran-puja-test",
    "shortDesc": "Nullify the malefic effects of Rahu and Ketu, bringing peace, prosperity, and success in life by removing Kaal Sarp Dosh.",
    "description": "<p><strong>Kaal Sarp Dosh</strong> is formed when all seven planets are situated between Rahu and Ketu in a Kundali. This dosh can cause extreme struggles in career, health, and marriage.</p><p>Our expert Pandits perform this powerful Anushthan at Trimbakeshwar or Ujjain to completely eradicate the negative karmic effects and open the doors to fortune.</p>",
    "price": 2599,
    "discountedPrice": 2199,
    "image": "/pooja/Rahu Ketu Grah Shanti Puja.png",
    "status": "active",
    "popular": True,
    "duration": "4-5 Hours",
    "rating": "4.9",
    "reviews": "1,200",
    "benefits": [
        "Removes obstacles in career and business",
        "Resolves delays in marriage and relationship issues",
        "Improves mental peace and physical health",
        "Brings financial stability and growth",
        "Protects from accidents and sudden misfortunes"
    ],
    "wisdomCardTitle": "The Power of Rahu-Ketu Shanti",
    "wisdomCardText": "When Rahu and Ketu are pacified through authentic Vedic mantras, their destructive energy transforms into a protective shield, accelerating your spiritual and material growth.",
    "processSteps": [
        "Book the Kaal Sarp Dosh Nivaran Puja online with your exact birth details.",
        "Our astrologers analyze your Kundali to find the most potent Muhurat for the Anushthan.",
        "A personalized Sankalp is taken in your name by our expert Pandits at a Jyotirlinga.",
        "The elaborate Puja, including Rudrabhishek and Nag-Nagin Joda Visarjan, is performed.",
        "Blessed Prasad and energized silver Nag-Nagin are sent to your home for lifelong protection."
    ],
    "whyChooseUs": [
        "Performed exclusively by certified Pandits from Ujjain and Trimbakeshwar.",
        "100% pure and authentic Samagri used as per Vedic scriptures.",
        "Live streaming of your personal Sankalp and main rituals.",
        "Free Kundali analysis to confirm the exact type of Kaal Sarp Dosh.",
        "Over 10,000 successful Kaal Sarp pujas performed with proven life-changing results."
    ],
    "faqs": [
        {
            "q": "Do I need to be physically present at Ujjain or Trimbakeshwar?",
            "a": "No, you don't need to travel. Our Pandits will take the Sankalp in your name and perform the entire ritual on your behalf. You can watch it live."
        },
        {
            "q": "How long does it take to see the results?",
            "a": "Devotees usually start experiencing positive shifts in their mental peace and blocked work within 21 to 41 days after the Puja."
        }
    ],
    "gallery": [
        "/pooja/Rudraabhishek.png",
        "/pooja/Rahu Ketu Grah Shanti Puja.png",
        "/pooja/Hanuman Sindoor  Boondi Puja.png"
    ],
    "relatedPujas": [
        {
            "title": "Rahu Ketu Shanti",
            "slug": "rahu-ketu-grah-shanti-puja",
            "price": "₹1,599",
            "img": "/pooja/Rahu Ketu Grah Shanti Puja.png",
            "tag": "Dosh Nivaran"
        },
        {
            "title": "Mangal Dosh Nivaran",
            "slug": "mangal-dosh-nivaran-puja",
            "price": "₹1,899",
            "img": "/pooja/Mangal Dosh Nivaran Puja.png",
            "tag": "Marriage & Peace"
        }
    ]
}

headers = {
    'Content-Type': 'application/json'
}

response = requests.post(url, headers=headers, data=json.dumps(payload))
print("Status Code:", response.status_code)
print("Response:", response.text)
