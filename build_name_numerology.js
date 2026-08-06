const fs = require('fs');
let content = fs.readFileSync('src/app/(main)/report/numerology/fortune-numerology/page.tsx', 'utf8');

// Global Replacements
content = content.replace(/WHAT IS FORTUNE NUMEROLOGY\?/g, 'WHAT IS NAME & MOBILE NUMEROLOGY?');
content = content.replace(/Fortune Numerology Report/g, 'Name & Mobile Number Numerology Report');
content = content.replace(/Fortune Numerology/g, 'Name & Mobile Number (Report & Rectification) Numerology');
content = content.replace(/fortune-numerology\.png/g, 'name-mobile-numerology.png');

// Form Submit text
content = content.replace(/Submit & Proceed to Payment — ₹699/, 'Submit & Proceed to Payment — ₹599');

// Subtitle in Hero
content = content.replace(/Decode Your Destiny with Numbers/g, 'Name & Mobile Number Numerology – Align Your Numbers Align Your Life');

// Hero Paragraph
content = content.replace(
  /Have you ever wondered why certain phases of your life feel effortless, while others are filled with unexplained delays or emotional chaos\? Or why some people seem naturally lucky, while others keep hitting invisible blocks\? That’s the hidden influence of Numerology — the science that reveals how numbers connected to your name, birth date, and mobile number silently shape your life\./g, 
  'Have you ever felt like something invisible is blocking your success, draining your energy, or creating repeated challenges in your personal or professional life? It might not be bad luck — it could be your name or mobile number vibration working against you.'
);

// Pricing block
content = content.replace(/<span className="premium-serif text-\[36px\] md:text-\[42px\] font-bold text-\[\#5c1420\]">₹699<\/span>/, '<span className="premium-serif text-[36px] md:text-[42px] font-bold text-[#5c1420]">₹599</span>');
content = content.replace(/<span className="text-\[10px\] md:text-\[11\.5px\] border border-\[\#d97706\] text-\[\#d97706\] px-2 md:px-3 py-1 font-bold tracking-wider uppercase bg-\[\#d97706\]\/10 rounded">SAVE 30%<\/span>/, '<span className="text-[10px] md:text-[11.5px] border border-[#d97706] text-[#d97706] px-2 md:px-3 py-1 font-bold tracking-wider uppercase bg-[#d97706]/10 rounded">SAVE 40%</span>');

// Replace features (What's Included)
content = content.replace(/const features = \[\s*\{[\s\S]*?\];/, `const features = [
  {
    icon: <BookOpen className="w-5 h-5 text-[#8a1c2a]" />,
    title: "1️⃣ Name Numerology Report",
    points: [
      "Deep analysis of your current name based on birth date",
      "Compatibility with your Life Path and Destiny Numbers",
      "Insights into whether your name supports or blocks your growth",
      "Personalized spelling corrections (if required)",
      "Suitable for individuals, children, professionals, brands & business names"
    ],
  },
  {
    icon: <Heart className="w-5 h-5 text-[#d97706]" />,
    title: "2️⃣ Mobile Number Numerology Report",
    points: [
      "Evaluation using Chaldean & Pythagorean numerology systems",
      "Analysis of your current number’s impact on money, health, love & peace",
      "Suggestions for aligned, lucky mobile number combinations",
      "Business numbers also reviewed for branding and energetic success"
    ],
  }
];`);

// Replace highlights (Why Choose VaidikTalk)
content = content.replace(/const highlights = \[\s*\{[\s\S]*?\];/, `const highlights = [
  {
    title: "Clear insights",
    description: "Easy-to-understand insights — no jargon",
  },
  {
    title: "Practical remedies",
    description: "Name and number corrections with remedies",
  },
  {
    title: "100% personalized",
    description: "No software-generated content",
  },
  {
    title: "Vedic + Chaldean",
    description: "Blended numerology for accuracy and depth",
  },
  {
    title: "Expert Guided",
    description: "Backed by decades of spiritual and intuitive practice",
  },
];`);

// Replace FAQs
content = content.replace(/const faqs = \[\s*\{[\s\S]*?\n\];/, `const faqs = [
  {
    question: "Why is Name Numerology important?",
    answer: "Your name carries a powerful vibration that directly influences your confidence, relationships, career success, and emotional balance."
  },
  {
    question: "Can a wrong name spelling affect success?",
    answer: "Yes. A mismatched name vibration can create delays, stress, emotional imbalance, and financial instability. Correcting it can bring noticeable positive shifts."
  },
  {
    question: "What is Mobile Number Numerology?",
    answer: "Mobile Number Numerology studies how your phone number’s vibration affects your daily energy, communication, finances, peace of mind, and opportunities."
  },
  {
    question: "Can changing a mobile number really help?",
    answer: "Yes. Since your mobile number is frequently used, correcting its vibration can bring improved flow, reduced stress, and better outcomes in life."
  },
  {
    question: "What details are required for Name & Mobile Numerology?",
    answer: "Date of Birth\\nCurrent full name\\nActive mobile number"
  },
  {
    question: "Is the name correction mandatory?",
    answer: "No. Corrections are suggested only if required. Even minor changes like initials or spelling adjustments can bring positive alignment."
  },
  {
    question: "Is this suitable for business names?",
    answer: "Yes. Business owners can use Name & Mobile Numerology to align brand names, contact numbers, and communication for growth and stability."
  },
  {
    question: "How accurate are VaidikTalk numerology reports?",
    answer: "VaidikTalk combines Vedic and Chaldean numerology systems with manual expert analysis, ensuring accuracy, depth, and practical applicability."
  }
];`);


// Fix difference table
// 'Limitations of Generic Numerology Reports' => 'Problems with Generic Name & Mobile Number Analysis'
content = content.replace(/Limitations of Generic Numerology Reports/g, 'Problems with Generic Name & Mobile Number Analysis');
content = content.replace(/'Only provides basic lucky numbers without life context',\n'Same interpretations reused for everyone',\n'No correction guidance for name or mobile numbers',\n'Ignores karmic patterns and emotional cycles',\n'No remedies to balance negative number vibrations'/g, 
`'Only checks total number, ignores vibrations',
'No linkage with birth date or destiny number',
'Random spelling changes without logic',
'No explanation of emotional or financial impact',
'Does not guide which numbers to avoid'`
);

content = content.replace(/VaidikTalk’s Name & Mobile Number \(Report & Rectification\) Numerology Report Features/g, 'VaidikTalk’s Name & Mobile Number Numerology');
content = content.replace(/'Deep analysis of Life Path, Destiny & Karmic Numbers',\n'Personalized insights based on birth date & name',\n'Identifies success blocks in career, money & relationships',\n'Includes lucky numbers, colors, days & directions',\n'Actionable remedies to realign life with number vibrations'/g, 
`'Advanced Chaldean + Vedic numerology analysis',
'Name compatibility with Life Path & Destiny numbers',
'Mobile number impact on money, peace & success',
'Accurate name spelling & lucky number suggestions',
'Helps remove energetic blocks & attract growth'`
);


// Section Headings Replacements
content = content.replace(/What’s Included in the Name & Mobile Number \(Report & Rectification\) Numerology Report\?/g, 'What’s Included in the Numerology Report?');
content = content.replace(/Why Choose the VaidikTalk Name & Mobile Number \(Report & Rectification\) Numerology Report\?/g, 'Why Choose Numerology from VaidikTalk?');

// Intro paragraph 01
content = content.replace(/At VaidikTalk, we bring you a Complete Name & Mobile Number \(Report & Rectification\) Numerology Report — a powerful, personalized guide that dives deep into your number blueprint to help you realign your energies and unlock your full potential\./g, 'At VaidikTalk, we combine ancient numerology wisdom with practical, modern insight to offer two powerful services: your Name Numerology Report and your Mobile Number Analysis. These personalized reports help you understand and correct the hidden energetic patterns that affect your relationships, career, money, health, and peace of mind.');
content = content.replace(/A small energetic shift — a letter change, a new number, or vibration correction — can change the entire course of your life. Your name and numbers are not fixed; they are keys to your transformation\./g, 'A small change in your name or number can lead to a big shift in your energy and life path. Change your number, shift your vibration. Let your phone number become a source of strength, not struggle.');

// Why Choose section
content = content.replace(/Individuals seeking clarity, peace, or success\. Parents naming a newborn, couples planning marriage\./g, 'With VaidikTalk’s expert-guided numerology reports, you gain the awareness and tools to realign your life path.');
content = content.replace(/Business owners launching or renaming brands\. Anyone feeling stuck or confused about life direction\./g, 'Whether you’re launching a career, starting a relationship, or just seeking peace — these reports can guide your next step.');
content = content.replace(/With the Complete Numerology Report by VaidikTalk, you're not just getting answers — you're getting aligned\./g, "You are not stuck. Your numbers might be. Let's align them.");

// Final CTA
content = content.replace(/Ready to Align Your Life with the Power of Numbers\?/g, 'Your Name & Number Are Keys to Your Destiny');
content = content.replace(/Take your first step toward clarity, harmony, and energetic success\.\\nOrder your Complete Numerology Report today and invite the wisdom of numbers into your life\./g, 'With VaidikTalk’s expert-guided numerology reports, you gain the awareness and tools to realign your life path.\\nOrder today and invite the wisdom of numbers into your life.');

content = content.replace(/Book Now @ ₹699/g, 'Book Now @ ₹599');

content = content.replace(/Personalised Name & Mobile Number \(Report & Rectification\) Numerology FAQs/g, 'Name & Mobile Number Numerology FAQs');

fs.writeFileSync('src/app/(main)/report/numerology/name-mobile-number-numerology/page.tsx', content);
