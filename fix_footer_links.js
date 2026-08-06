const fs = require('fs');

let content = fs.readFileSync('d:/server-vaidik/web-vaidik-main/src/components/layout/Footer.tsx', 'utf8');

const linkMap = {
  "Kundli &amp; Reports": "/kundli",
  "Vastu Reports": "/kundli",
  "Numerology Reports": "/numerology",
  "Dosh &amp; Life Reports": "/free-reports",
  
  "Marriage Muhurat 2026": "/muhurat",
  "Griha Pravesh Muhurat 2026": "/muhurat",
  "Mundan Muhurat 2026": "/muhurat",
  
  "Free Astrology Tools": "/astrology-calculators",
  "Horoscope": "/horoscope",
  "Book a Remedy Puja": "/book-a-puja",
  "Knowledge Center": "/learn",
  "Today's Panchang": "/panchang",
  "Today&apos;s Panchang": "/panchang",
  
  "Chat with Astrologer": "/astrologers-chat",
  "Talk to Astrologer": "/astrologers-call",
  "AI Astrologer Chat": "/ai-astrologer-chat",
  
  "Rudraksha": "/book-a-puja",
  "Puja Samagri": "/book-a-puja",
  "Bracelet": "/book-a-puja",
  "Frames": "/book-a-puja",
  "Pyrite": "/book-a-puja",
  "Tower &amp; Tumbles": "/book-a-puja",
  "Women Anklets": "/book-a-puja",
  "Crystal Trees": "/book-a-puja",
  "Parad": "/book-a-puja",
  "Gemstones": "/book-a-puja",
  "Astrology Books": "/book-a-puja",
  "Siddh Rudraksha": "/book-a-puja",
  "Karungali": "/book-a-puja",
  "Kavach": "/book-a-puja",
  "Premium Rudraksha": "/book-a-puja",
  "Evil Eye": "/book-a-puja",
  "Mala": "/book-a-puja",
  "Yantras": "/book-a-puja",
  "VaidikTalk Store": "/book-a-puja",
  "Vastu Remedies": "/book-a-puja",
  "Our Combos": "/book-a-puja",
  "Pyramid": "/book-a-puja",
  "Women Bracelets": "/book-a-puja",
  "Gifting": "/book-a-puja",
  "Pendants": "/book-a-puja",
  
  "About Us": "/about-us"
};

for (const [text, href] of Object.entries(linkMap)) {
  const regex = new RegExp(`href="#"(.*?>${text}<)`, 'g');
  content = content.replace(regex, `href="${href}"$1`);
}

fs.writeFileSync('d:/server-vaidik/web-vaidik-main/src/components/layout/Footer.tsx', content);
console.log("Footer links updated!");
