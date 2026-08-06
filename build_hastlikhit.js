const fs = require('fs');
let content = fs.readFileSync('src/app/(main)/report/kundali/personalized-lal-kitab/page.tsx', 'utf8');

// Replacements
content = content.replace(/WHAT IS LAL KITAB\?/g, 'WHAT IS A HASTLIKHIT KUNDALI?');
content = content.replace(/Personalized Lal Kitab/g, 'Hastlikhit Kundali');
content = content.replace(/The Hastlikhit Kundali is generally preferred by individuals who seek practical astrological guidance that is aligned with their birth details. This approach creates a structured framework which uses planetary positions together with personal charts to establish specific predictions./g, 'At Vaidik Talk, we honour the timeless power of traditional Vedic astrology through our Hasth Likhit Kundali – a meticulously Hastlikhit birth chart that offers spiritual authenticity and personalized insight.');
content = content.replace(/₹1799/g, '₹5500');
content = content.replace(/SAVE 64%/g, 'SAVE 34%');
content = content.replace(/lal-kitab-report\.png/g, 'hastlikhit-kundali.png');
content = content.replace(/₹649/g, '₹3599');

content = content.replace(/const features = \[\s*\{[\s\S]*?\];/, `const features = [
  {
    icon: <BookOpen className="w-5 h-5 text-[#8a1c2a]" />,
    title: "What is a Hastlikhit Kundali?",
    description: "A Hastlikhit Kundali is a physical or scanned digital chart that reflects the cosmic blueprint of your soul, created manually using your exact birth date, time, and place. This ancient method has been practiced for centuries and is considered highly auspicious for puja, rituals, and personal guidance. Every planet, house, and combination is carefully analyzed and interpreted based on your unique life energies. It captures the past karmas, current planetary influences, and future trajectory — written with attention and grace.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-[#d97706]" />,
    title: "What You Will Receive:",
    points: [
      "Complete hand-written horoscope with Lagna, Chandra & Navamsa charts",
      "Analysis of 12 houses (Bhavas) and planetary placements",
      "Detailed readings for all major aspects: career, love, marriage, finance, children, and health",
      "Explanation of yogas and doshas – including Mangal Dosha, Kaal Sarp, Pitra Dosh",
      "Vedic remedies: mantras, pujas, donations, fasts, and rituals",
      "Personalized notes and intuitive insights from the astrologer",
      "High-quality scan or printed physical delivery (on request)"
    ],
  },
  {
    icon: <CheckCircle2 className="w-5 h-5 text-[#8a1c2a]" />,
    title: "Why Choose a Hastlikhit Kundali?",
    points: [
      "Spiritually powerful and energetically charged — not just a document",
      "Prepared with concentration and mantra chanting for energetic accuracy",
      "Helps in graha shanti, pujas, family decisions, and spiritual guidance",
      "100% personalized, no generic templates or auto-generated results",
      "Ideal for traditional families, newlyweds, babies, and those seeking deeper insight",
      "Your life is sacred — let your Kundali reflect that sacredness, created by hand with devotion."
    ],
  },
];`);

content = content.replace(/const highlights = \[\s*\{[\s\S]*?\];/, `const highlights = [
  {
    title: "Authentically handwritten Kundali",
    description: "Prepared by experienced astrologers",
  },
  {
    title: "Based on traditional astrological scriptures",
    description: "Like Brihat Parashara Hora Shastra",
  },
  {
    title: "Detailed analysis of planets",
    description: "Houses, yogas, and doshas in your horoscope",
  },
  {
    title: "Interpretation written in simple language",
    description: "Easy-to-understand guidance",
  },
  {
    title: "Each report is unique",
    description: "Drawn and analyzed manually, not computer-generated",
  },
];`);

content = content.replace(/const faqs = \[\s*\{[\s\S]*?\n\];/, `const faqs = [
  {
    question: "What is a Hastlikhit Kundali?",
    answer: "A Hastlikhit Kundali is a manually written birth chart prepared by a qualified astrologer based on your birth details (date, time, place). Unlike computer-generated charts, it is hand-drawn using traditional methods from classical texts, ensuring authenticity and personal insight. Considered sacred, it is often preserved as a lifelong spiritual guide."
  },
  {
    question: "What is the significance of a Hastlikhit Kundali in astrology?",
    answer: "The Hastlikhit Kundali carries spiritual and cultural importance. Handwritten charts imbibe the divine vibrations of the astrologer’s pen, traditional blessings, and intuition, enhancing accuracy and sacredness. It reflects your cosmic blueprint in a pure and intentional way."
  },
  {
    question: "How is a Hastlikhit Kundali prepared?",
    answer: "Preparation involves:\\n- Collect accurate birth details (date, time, place).\\n- Calculate planetary positions using Panchang and classical formulas.\\n- Draw Lagna chart (D-1) showing planetary positions in 12 houses.\\n- Prepare divisional charts like Navamsa (D-9), Dashamsa (D-10) for deeper insight.\\n- Interpret planetary relationships, aspects, conjunctions, and yogas.\\n- Document by hand with decorative designs and Sanskrit verses.\\nThis meticulous process ensures profound accuracy and personalised astrological readings."
  },
  {
    question: "What is the difference between a Hastlikhit Kundali and a computer-generated Kundali?",
    answer: "Hastlikhit Kundali is manually calculated and written, highly accurate with human intuition, sacred and auspicious, personalized and detailed, and artistically rich. Computer-Generated Kundali is automatically generated, dependent on software input, lacks traditional sanctity, generic, and mechanically printed."
  },
  {
    question: "Why do many people prefer Hastlikhit Kundalis for marriage matching (Kundali Milan)?",
    answer: "Families trust handwritten Kundalis for accurate planetary calculations, detailed analysis of Gunas, Doshas, and compatibility factors. Astrologers interpret Ashtakoota Milan, Manglik Dosha, Bhakut Dosh, and Nadi Dosh manually and suggest remedies, ensuring authenticity and divine energy for marital harmony."
  },
  {
    question: "What information can be derived from a Hastlikhit Kundali?",
    answer: "- Personality traits and behavior\\n- Strengths and weaknesses in life aspects\\n- Career and professional growth\\n- Financial prospects and wealth\\n- Marriage and relationship compatibility\\n- Health predictions and remedies\\n- Favorable and unfavorable planetary periods (Mahadasha & Antardasha)\\n- Spiritual growth and karmic balance"
  },
  {
    question: "Can a Hastlikhit Kundali be updated or corrected later?",
    answer: "Yes, if there is an error in birth time or place. Corrections are documented separately, while the original handwritten Kundali is preserved as sacred. Always verify birth details before preparation."
  },
  {
    question: "How can one verify the authenticity of a Hastlikhit Kundali?",
    answer: "- Astrologer’s signature or seal\\n- Use of Sanskrit terms and traditional symbols\\n- Balanced planetary placements\\n- Detailed handwritten interpretation and remedies"
  },
  {
    question: "What are the spiritual benefits of having a Hastlikhit Kundali?",
    answer: "It brings divine blessings and harmony. Acts as a sacred life guide, helps in performing rituals, remedying Doshas, invoking planetary blessings, and spiritually aligning the individual."
  },
  {
    question: "Where can one get a genuine Hastlikhit Kundali prepared today?",
    answer: "Consult experienced Vedic astrologers or institutions that:\\n- Use Panchang-based manual calculations\\n- Have expertise in Sanskrit astrology texts\\n- Provide detailed interpretations, not just charts\\n- Offer handwritten remedies and rituals\\nOrganizations like Vaidik Talk provide authentic Hastlikhit Kundali services with accuracy, sanctity, and spiritual depth."
  }
];`);

content = content.replace(/Difference in Computer-Generated and Personalized Lal Kitab\?/g, 'Difference in Computer-Generated and Hastlikhit Kundali?');
content = content.replace(/Why Choose VaidikTalk’s Personalized Lal Kitab\?/g, 'Why Choose VaidikTalk’s Hastlikhit Kundali?');
content = content.replace(/Experience the Power of Vedic Astrology/g, 'Experience the Purity of Handwritten Astrology');
content = content.replace(/Our Personalized Lal Kitab reflects the authentic art of Vedic astrology — every detail meticulously analyzed to provide actionable remedies. It carries the essence of customized analysis that generic reports cannot match./g, 'Our Hastlikhit Kundali reflects the authentic art of Vedic astrology — every detail written by hand with devotion and precision. It carries the essence of personalized analysis that digital reports cannot match.');
content = content.replace(/Choose VaidikTalk’s Personalized Lal Kitab to receive a sacred and accurate astrological document that connects tradition, wisdom, and the divine science of the stars — made exclusively for you./g, 'Choose VaidikTalk’s Hastlikhit Kundali to receive a sacred and accurate astrological document that connects tradition, wisdom, and the divine science of the stars — made exclusively for you.');
content = content.replace(/Hastlikhit Kundali FAQs/g, 'Hastlikhit Kundali FAQs'); 
content = content.replace(/Lal Kitab/g, 'Hastlikhit Kundali'); 

// Ensure form fields text is correct if needed, but it already says "Report Language", etc.
// Replace image styling to ensure it's not cut (like we just did for the 10-year Kundali)
// We'll replace the image tag for the desktop
content = content.replace(/className="h-\[110%\] lg:w-\[60%\] object-cover object-\[right_30%\] mix-blend-multiply opacity-95 translate-x-12 -translate-y-15"/g, 'className="h-full lg:w-[42%] object-cover object-center mix-blend-multiply opacity-95 lg:translate-x-8"');

fs.writeFileSync('src/app/(main)/report/kundali/hastlikhit-kundali/page.tsx', content);
