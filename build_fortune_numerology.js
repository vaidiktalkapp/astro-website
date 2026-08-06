const fs = require('fs');
let content = fs.readFileSync('src/app/(main)/report/kundali/hastlikhit-kundali/page.tsx', 'utf8');

// Global Replacements
content = content.replace(/WHAT IS A HASTLIKHIT KUNDALI\?/g, 'WHAT IS FORTUNE NUMEROLOGY?');
content = content.replace(/Hastlikhit Kundali Report/g, 'Fortune Numerology Report');
content = content.replace(/Hastlikhit Kundali/g, 'Fortune Numerology');
content = content.replace(/hastlikhit-kundali\.png/g, 'fortune-numerology.png');

// Form Submit text
content = content.replace(/Submit & Proceed to Payment — ₹3599/, 'Submit & Proceed to Payment — ₹699');

// Subtitle in Hero
content = content.replace(/A Sacred and Personalized Horoscope Crafted by Hand/g, 'Decode Your Destiny with Numbers');

// Hero Paragraph
content = content.replace(
  /At Vaidik Talk, we honour the timeless power of traditional Vedic astrology through our Hasth Likhit Kundali – a meticulously Hastlikhit birth chart that offers spiritual authenticity and personalized insight\./g, 
  'Have you ever wondered why certain phases of your life feel effortless, while others are filled with unexplained delays or emotional chaos? Or why some people seem naturally lucky, while others keep hitting invisible blocks? That’s the hidden influence of Numerology — the science that reveals how numbers connected to your name, birth date, and mobile number silently shape your life.'
);

// Pricing block
content = content.replace(/<span className="premium-serif text-\[36px\] md:text-\[42px\] font-bold text-\[\#5c1420\]">₹3599<\/span>\s*<span className="text-\[16px\] md:text-\[18px\] text-\[\#8a4410\] opacity-70 line-through">₹5500<\/span>\s*<\/div>\s*<span className="text-\[10px\] md:text-\[11\.5px\] border border-\[\#d97706\] text-\[\#d97706\] px-2 md:px-3 py-1 font-bold tracking-wider uppercase bg-\[\#d97706\]\/10 rounded">SAVE 34%<\/span>/, '<span className="premium-serif text-[36px] md:text-[42px] font-bold text-[#5c1420]">₹699</span></div>');

// Replace features
content = content.replace(/const features = \[\s*\{[\s\S]*?\];/, `const features = [
  {
    icon: <BookOpen className="w-5 h-5 text-[#8a1c2a]" />,
    title: "Birth Chart & Life Path Analysis",
    points: [
      "Understand your core destiny number, life path number, and karmic patterns",
      "Learn how your birth numbers impact your personality, career, health, and relationships",
      "Discover your soul purpose and challenges"
    ],
  },
  {
    icon: <Sparkles className="w-5 h-5 text-[#d97706]" />,
    title: "Name Vibration & Correction",
    points: [
      "Deep analysis of your full name’s vibration (using Chaldean and Vedic numerology)",
      "Find out if your name is blocking your success or attracting negative energies",
      "Suggest the most aligned and energetically powerful name spelling for personal and professional success",
      "Includes options for name correction for self, business, or children"
    ],
  },
  {
    icon: <Heart className="w-5 h-5 text-[#8a1c2a]" />,
    title: "Mobile Number Compatibility",
    points: [
      "Decode your current mobile number's effect on your energy",
      "Identify if it's aligned with your destiny or causing energetic friction",
      "Suggest lucky mobile number combinations to support success, love, and inner peace"
    ],
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-[#8a1c2a]" />,
    title: "House Number & Lucky Numbers",
    points: [
      "Evaluate your house number’s numerology vibration",
      "Personalized list of numbers to attract success in money, relationships, health, business",
      "List of numbers to avoid for major decisions, vehicle numbers, accounts, etc.",
      "Color, day, and direction suggestions based on your numbers"
    ],
  },
];`);

// Replace highlights
content = content.replace(/const highlights = \[\s*\{[\s\S]*?\];/, `const highlights = [
  {
    title: "Based on ancient systems",
    description: "Chaldean + Vedic Numerology systems",
  },
  {
    title: "Expert Numerologists",
    description: "Crafted with spiritual and intuitive depth",
  },
  {
    title: "100% personalized",
    description: "Not software-generated, fully custom",
  },
  {
    title: "Easy-to-follow remedies",
    description: "Real-world advice and actionable steps",
  },
  {
    title: "Ideal for anyone",
    description: "Useful for individuals, parents, and entrepreneurs",
  },
];`);

// Replace FAQs
content = content.replace(/const faqs = \[\s*\{[\s\S]*?\n\];/, `const faqs = [
  {
    question: "What is Fortune Numerology?",
    answer: "Fortune Numerology is the science of understanding how numbers derived from your birth date and name influence your destiny. It reveals life patterns related to career, finances, relationships, health, and spiritual growth."
  },
  {
    question: "How is Fortune Numerology different from basic numerology?",
    answer: "Basic numerology gives general meanings of numbers, while Fortune Numerology deeply analyzes your life path, destiny number, karmic numbers, lucky timings, and remedies based on Vedic and Chaldean systems."
  },
  {
    question: "What details are required for a Fortune Numerology report?",
    answer: "Date of Birth\\nFull Name (as currently used)\\nOptional: Mobile number & location"
  },
  {
    question: "What insights does a Fortune Numerology report provide?",
    answer: "- Life purpose and karmic lessons\\n- Career and financial growth guidance\\n- Relationship compatibility\\n- Lucky numbers, colors, days & directions\\n- Remedies to overcome obstacles"
  },
  {
    question: "Is Fortune Numerology personalized?",
    answer: "Yes. At VaidikTalk, Fortune Numerology reports are 100% personalized and manually interpreted by expert numerologists — not auto-generated software reports."
  },
  {
    question: "Can Fortune Numerology improve my life?",
    answer: "Yes. By aligning your actions, timing, and numbers with your destiny vibration, Fortune Numerology helps remove energetic blocks and attracts clarity, growth, and balance."
  },
  {
    question: "Who should opt for Fortune Numerology?",
    answer: "This report is ideal for individuals facing career confusion, financial instability, relationship challenges, or anyone seeking clarity and success in life."
  },
  {
    question: "How long does it take to receive the report?",
    answer: "Typically, the Fortune Numerology report is delivered within 2–4 working days after successful form submission."
  }
];`);


// Fix difference table
// "Common Problems" / "Issues With Other Kundali Reports"
content = content.replace(/Issues With Other Kundali Reports/g, 'Limitations of Generic Numerology Reports');
content = content.replace(/'Too Complex and Full of Sanskrit Terminology',\s*'No Visual or Graphical Representation',\s*'Generic Remedies , Not Personalized',\s*'No Clear Timeline for Life Events',\s*'No Ongoing Support or Guidance',\s*'Unverified or Automated Reports'/g, 
`'Only provides basic lucky numbers without life context',
'Same interpretations reused for everyone',
'No correction guidance for name or mobile numbers',
'Ignores karmic patterns and emotional cycles',
'No remedies to balance negative number vibrations'`
);

content = content.replace(/Vaidik Talk's Report/g, 'Fortune Numerology');
content = content.replace(/Fortune Numerology Features/g, 'VaidikTalk’s Fortune Numerology Report');
content = content.replace(/'Graphical & Easy to Visualize Format',\s*'Simple User Friendly Language',\s*'Customized Remedies & Gemstone Suggestions',\s*'Clear Timelines for Major Life Events',\s*'Backed by Top Astrologers',\s*'Covers All Aspects of Life - Career, Marriage, Health & Finance'/g, 
`'Deep analysis of Life Path, Destiny & Karmic Numbers',
'Personalized insights based on birth date & name',
'Identifies success blocks in career, money & relationships',
'Includes lucky numbers, colors, days & directions',
'Actionable remedies to realign life with number vibrations'`
);


// Section Headings Replacements
content = content.replace(/How Fortune Numerology Works/g, 'What’s Included in the Fortune Numerology Report?');
content = content.replace(/Why Choose Fortune Numerology\?/g, 'Why Choose the VaidikTalk Fortune Numerology Report?');

// Intro paragraph 01
content = content.replace(/The creation of personalized astrological documents requires the evaluation of individual planetary combinations which must follow traditional Fortune Numerology principles. The book uses this method to deliver personal insights which reflect actual human situations instead of presenting theoretical outcomes./g, 'At VaidikTalk, we bring you a Complete Fortune Numerology Report — a powerful, personalized guide that dives deep into your number blueprint to help you realign your energies and unlock your full potential.');
content = content.replace(/This structured format helps individuals interpret planetary patterns in a simplified way. Developers focused their efforts on creating practical systems which control astrological information through direct astrological details./g, 'A small energetic shift — a letter change, a new number, or vibration correction — can change the entire course of your life. Your name and numbers are not fixed; they are keys to your transformation.');

// Why Choose section
content = content.replace(/Astrological research requires people to select individual analysis for their needs instead of using generic template reports which exist online./g, 'Individuals seeking clarity, peace, or success. Parents naming a newborn, couples planning marriage.');
content = content.replace(/This document preparation process establishes a connection between planetary positions and the basic Fortune Numerology framework through simplified methods./g, 'Business owners launching or renaming brands. Anyone feeling stuck or confused about life direction.');
content = content.replace(/The observation presents information which applies to standard operational situations./g, 'With the Complete Numerology Report by VaidikTalk, you\'re not just getting answers — you\'re getting aligned.');

// Final CTA
content = content.replace(/Get Your Personalised Fortune Numerology<br \/>for Practical Life Solutions/g, 'Ready to Align Your Life with the Power of Numbers?');
content = content.replace(/Visit our website for expert Fortune Numerology matching services and practical remedies to optimize your future relationship development and daily life./g, 'Take your first step toward clarity, harmony, and energetic success.\\nOrder your Complete Numerology Report today and invite the wisdom of numbers into your life.');

content = content.replace(/Book Now @ ₹3599/g, 'Book Now @ ₹699');

// Remove Time of birth from form
content = content.replace(/<div className="flex flex-col gap-2">\s*<label className="text-\[12px\] font-bold text-\[\#3a1216\] tracking-\[0\.5px\] uppercase">Time of Birth \*<\/label>\s*<input required type="time" name="tob" value=\{formData\.tob\} onChange=\{handleChange\} className="w-full border-b-\[1\.5px\] border-\[\#ebdcc7\] py-2\.5 px-1 bg-transparent outline-none focus:border-\[\#761e27\] text-\[15px\] transition-colors" \/>\s*<\/div>/g, '');

fs.writeFileSync('src/app/(main)/report/numerology/fortune-numerology/page.tsx', content);
