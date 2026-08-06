const fs = require('fs');
const path = require('path');

const career = fs.readFileSync(path.join(__dirname, '../src/app/(main)/career-astrology/page.tsx'), 'utf8');

// Replace API slug
let love = career.replace(
  "apiClient.get('/smart-kundali-settings/career-astrology')",
  "apiClient.get('/smart-kundali-settings/love-astrology')"
);

// Replace component name
love = love.replace('export default function CareerJobPage()', 'export default function LoveCompatibilityPage()');

// Replace hero image
love = love.replace(/career-job-hero\.png/g, 'love-compatibility-hero.png');

// Replace page title
love = love.replace(
  'Career & Job \n              <br />\n              <span className="relative inline-block mt-2">\n                <span className="text-[#ee6c1e]">Astrology Guidance</span>',
  'Love & Compatibility \n              <br />\n              <span className="relative inline-block mt-2">\n                <span className="text-[#ee6c1e]">Astrology Guidance</span>'
);

// Replace hero description
love = love.replace(
  "Whether you're facing job instability, looking for career growth, confused about business vs job, or awaiting promotion — your Kundali holds precise, judgement-free answers.",
  "Whether you're struggling to find love, dealing with relationship conflicts, confused about compatibility, or seeking the right time to commit — your Kundali holds precise, judgement-free answers."
);

// Replace CTA button text
love = love.replace('Consult an Expert', 'Consult a Love Expert');
love = love.replace('/horoscope-matching', '/compatibility');
love = love.replace('>Try Free Match<', '>Check Compatibility<');

// Replace section headings
love = love.replace(
  'Answers to Your <span className="text-[#d97706]">Deepest Concerns</span>',
  'Answers to Your <span className="text-[#d97706]">Love & Relationship Concerns</span>'
);
love = love.replace(
  'Select a concern to see how Vedic astrology reveals the root cause and provides practical remedies.',
  'Select a concern to see how Vedic astrology reveals the root cause and provides practical remedies for your love life.'
);

// Replace astrologers section heading
love = love.replace(
  'Consult Career & Job <span className="text-[#d97706]">Specialists</span>',
  'Consult Love & Compatibility <span className="text-[#d97706]">Specialists</span>'
);
love = love.replace(
  'Talk to verified Vedic astrologers who specialise in relationship compatibility, dosh remedies, and marital harmony.',
  'Talk to verified Vedic astrologers who specialise in love compatibility, relationship remedies, and soulmate predictions.'
);

// Replace expert card content
love = love.replace(
  'Talk to a Career Expert',
  'Talk to a Love Expert'
);

// Replace SEO section
love = love.replace(
  'Decoding Your Professional Success',
  'Decoding Your Love & Compatibility'
);
love = love.replace(
  'With <span className="text-[#d97706]">Vedic Astrology</span>',
  'With <span className="text-[#d97706]">Vedic Astrology</span>'
);
love = love.replace(
  'Your career path, financial success, and professional fulfillment are deeply intertwined with the planetary alignments at your time of birth. Vedic astrology provides a razor-sharp blueprint of your strengths, hidden talents, and the specific industries where you are destined to shine. By understanding your Kundali, you can stop guessing and start building a successful future.',
  'Your love life, romantic destiny, and relationship harmony are deeply shaped by the planetary alignments at your time of birth. Vedic astrology provides a precise blueprint of your emotional nature, compatibility with partners, and the specific timing when love will flourish in your life. By understanding your Kundali, you can stop guessing and start attracting the right love.'
);
love = love.replace(
  'The <strong className="text-[#3a1216]">10th House</strong> (Karma Bhava) in your birth chart represents your career, ambition, and public reputation. Along with the 2nd and 11th houses of wealth and gains, these elements hold the key to answering when you\'ll get a job, whether business suits you better, and when you can expect financial breakthroughs.',
  'The <strong className="text-[#3a1216]">7th House</strong> (Vivah Bhava) in your birth chart represents partnerships, love, and marriage. Along with the 5th house (romance) and Venus (love planet), these elements hold the key to answering when you\'ll meet your soulmate, whether a relationship will last, and how to attract the right partner.'
);
love = love.replace('How Our Astrologers Help', 'How Our Astrologers Help Your Love Life');

// Replace problems array content
love = love.replace(
  `const problems = [
    {
      title: 'Job Delay or Unemployment',
      content: 'If you are struggling to find a job, the 10th house and Saturn (Karma karaka) often hold the reason. We analyze planetary transits to identify when a job offer is likely.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#059669]" />,
      report: { name: 'Talk to Expert', link: '/astrologers-chat' }
    },
    {
      title: 'Promotion & Increment',
      content: 'Awaiting a promotion? The 11th house of gains and the sun (authority) dictate your professional rise. We decode when your next big career jump will happen.',
      icon: <Sparkles className="w-6 h-6 text-[#d97706]" />,
      tool: { name: 'Free Kundli', link: '/kundli' },
      report: { name: 'Premium Report', link: '/report/kundali/vaidik-smart-kundali-10-years' }
    },
    {
      title: 'Business vs Job',
      content: 'Confused whether to do business or a job? The strength of the 7th house (business) vs 6th house (service) reveals the most profitable path for you.',
      icon: <ShieldCheck className="w-6 h-6 text-[#4f46e5]" />,
      tool: { name: 'Free Kundli', link: '/kundli' },
      report: { name: 'Premium Report', link: '/report/kundali/vaidik-smart-kundali-10-years' }
    },
    {
      title: 'Workplace Politics',
      content: 'Facing issues with bosses or colleagues? Afflictions to the 6th house (enemies/competition) can cause this. We suggest simple remedies to calm the environment.',
      icon: <ShieldAlert className="w-6 h-6 text-[#e11d48]" />
    },
    {
      title: 'Government Job Yoga',
      content: 'The Sun, Moon, and Jupiter must form specific yogas for a government job. Find out if your Kundali promises success in competitive exams and government services.',
      icon: <Star className="w-6 h-6 text-[#059669]" />
    },
    {
      title: 'Changing Profession',
      content: 'Thinking of a completely new career path? Transitions are guided by the Dasha system. We identify the best sector for your long-term success.',
      icon: <HeartHandshake className="w-6 h-6 text-[#ea580c]" />
    }
  ];`,
  `const problems = [
    {
      title: 'When Will I Find Love?',
      content: 'The 7th house and Venus transit determine when love enters your life. We analyze your Dasha sequence to predict the exact window when your soulmate appears.',
      icon: <Heart className="w-6 h-6 text-[#e11d48]" />,
      report: { name: 'Talk to Expert', link: '/astrologers-chat' }
    },
    {
      title: 'Love Marriage vs Arranged',
      content: 'The strength of the 5th house (romance) vs 9th house (tradition) reveals whether love or arranged marriage is written in your destiny.',
      icon: <Sparkles className="w-6 h-6 text-[#d97706]" />,
      tool: { name: 'Free Kundli', link: '/kundli' },
      report: { name: 'Kundali Matching', link: '/report/kundali/kundali-matching' }
    },
    {
      title: 'Compatibility Check',
      content: 'Beyond Guna Milan (36 points), true compatibility lies in Navamsha chart, Nadi Dosh, and Venus-Moon synergy. We check all factors for long-term harmony.',
      icon: <ShieldCheck className="w-6 h-6 text-[#4f46e5]" />,
      tool: { name: 'Free Matching', link: '/compatibility' },
      report: { name: 'Premium Report', link: '/report/kundali/kundali-matching' }
    },
    {
      title: 'Relationship Conflicts',
      content: 'Frequent fights or emotional distance? Mars afflictions and Saturn in the 7th house cause relationship friction. Targeted remedies can restore peace and love.',
      icon: <ShieldAlert className="w-6 h-6 text-[#e11d48]" />
    },
    {
      title: 'Ex Back & Reconciliation',
      content: 'If your charts show a strong karmic bond, reconciliation is possible. We analyze both charts to determine if reunion is destined and advise accordingly.',
      icon: <HeartHandshake className="w-6 h-6 text-[#059669]" />
    },
    {
      title: 'Family Approval for Love',
      content: 'Facing family opposition? We analyze the 9th house (family/tradition) and suggest powerful remedies to gain parental blessings for your love marriage.',
      icon: <Star className="w-6 h-6 text-[#ea580c]" />
    }
  ];`
);

// Replace success stories section heading
love = love.replace(
  'See how Vedic astrology provided clarity and career breakthroughs for our clients.',
  'See how Vedic astrology transformed the love lives of our clients.'
);

// Default FAQs for love page
love = love.replace(
  `const defaultFaqs = [
  { q: 'Government job lagne ke yog hain ya nahi, kaise pata chalega?', a: 'Government job ke liye Sun (Surya), Moon (Chandra), aur Jupiter (Guru) ka 10th ya 6th house ke sath connection strong hona chahiye. Astrologers in yogas ko analyze karke apko batate hain.' },
  { q: 'Mujhe job karni chahiye ya business?', a: 'Ye 6th house (job/service) aur 7th house (business/partnership) ki strength par depend karta hai. Agar 7th house strong hai to business successful hota hai, otherwise job better rehti hai.' },
  { q: 'Mera promotion kab hoga?', a: 'Promotion ka time aapki current Mahadasha, Antardasha aur transiting Jupiter aur Saturn ki 10th/11th house par drishti se accurately predict kiya ja sakta hai.' },
  { q: 'Career growth ke liye konse remedies aur crystals use karne chahiye?', a: 'Career growth ke liye generally Pyrite, specific healing bracelets, aur Siddh Rudraksha use kiye jaate hain. Lekin konsi remedy aapke liye best hai, ye purely aapke lagna aur chart par depend karta hai. Bina consultation ke decide na karein.' },
  { q: 'Workplace politics se kaise bachein?', a: '6th house enemies aur competition ka hota hai. Isko pacify karne ke liye specific mantras aur remedies (jaise Surya Dev ko jal chadhana) bahut madadgar hote hain.' }
];`,
  `const defaultFaqs = [
  { q: 'When will I meet my soulmate?', a: 'Your 7th house (partnerships) and 5th house (romance) dictate love. By analyzing your planetary dashas and Venus transits, we can predict the exact timing of when you will meet your soulmate.' },
  { q: 'Can astrology bring my ex back?', a: 'If your charts show a strong karmic bond and your current Dasha supports reconciliation, yes. Specific Venus remedies can help remove misunderstandings and rebuild the connection.' },
  { q: 'Is it true love or just infatuation?', a: 'Infatuation is driven by Rahu (illusion), while true love is governed by a well-placed Venus and Moon. A quick chart analysis can reveal the reality of your feelings.' },
  { q: 'How can I fix my toxic relationship?', a: 'Toxic traits often stem from Mars (anger) or Saturn (delays) afflicting the 7th house. Identifying the root astrological cause allows us to prescribe targeted remedies.' },
  { q: 'What if we have inter-caste or family issues in love marriage?', a: 'If the 5th and 7th houses are strong, love marriage is destined. Remedies for the 9th house (parents/tradition) and Sun can help soften family resistance.' }
];`
);

// Default success stories for love page
love = love.replace(
  `const defaultSuccessStories = [
  {
    name: 'Amit K.',
    before: '"I was struggling to find a job after college for almost 2 years despite giving many interviews."',
    after: '"The astrologer identified a weak Sun. I wore a suggested Pyrite bracelet and got placed in an MNC within 3 months!"'
  },
  {
    name: 'Neha R.',
    before: '"I was stuck in the same role for 4 years without any promotion or increment."',
    after: '"An expert suggested Surya Arghya and timed my next move. I was promoted to Senior Manager in the very next appraisal!"'
  },
  {
    name: 'Rohan S.',
    before: '"I was deeply confused between joining my family business and taking up a corporate job."',
    after: '"Kundali analysis showed a very strong 6th house for service. I chose corporate, and now I lead a whole division."'
  },
  {
    name: 'Priya M.',
    before: '"My toxic boss and severe office politics were making my life hell and affecting my mental health."',
    after: '"I did a simple remedy for the 6th house to calm my enemies. Unbelievably, the boss got transferred 2 weeks later!"'
  },
  {
    name: 'Vikas T.',
    before: '"I desperately wanted a government job but had failed the entrance exams twice."',
    after: '"The astrologer\'s timing prediction was accurate. I focused my prep for that specific window and finally cleared the exam!"'
  },
  {
    name: 'Ananya D.',
    before: '"I was facing frequent job losses and had a very unstable, stressful career path."',
    after: '"I found out it was a harsh Shani Mahadasha issue. The suggested rituals brought stability, and I am now settled in a great firm."'
  }
];`,
  `const defaultSuccessStories = [
  {
    name: 'Simran & Aman',
    before: '"My parents were strictly against our inter-caste relationship. We were about to break up after 4 years together."',
    after: '"The astrologer gave us specific remedies for the Sun and Jupiter. Within 6 months, both families agreed and we are happily married!"'
  },
  {
    name: 'Ravi T.',
    before: '"I went through a terrible breakup and was completely depressed. I wanted my ex back at any cost."',
    after: '"Astrology revealed we had no long-term compatibility and it was just a Rahu illusion. I moved on, and found my actual soulmate a year later!"'
  },
  {
    name: 'Kavya M.',
    before: '"My boyfriend was very non-committal. He loved me but kept avoiding marriage discussions for years."',
    after: '"A simple Venus and 7th house remedy shifted his mindset. He proposed to me exactly in the time window predicted by the expert!"'
  },
  {
    name: 'Vikash S.',
    before: '"I felt cursed in love. Every relationship I started ended in betrayal within a few months."',
    after: '"Found out I had a strong Venus affliction. After performing the suggested Puja, I met a wonderful, loyal partner. We are engaged now."'
  },
  {
    name: 'Anita & Raj',
    before: '"Our relationship became extremely toxic. We loved each other but fought daily over trivial things."',
    after: '"Kundali matching showed an unresolved Mars conflict. We started a joint remedy, and our relationship is now more peaceful than ever."'
  },
  {
    name: 'Sonia P.',
    before: '"I was 32, single, and had given up on finding true love. I felt completely hopeless."',
    after: '"The astrologer accurately predicted a meeting during my Jupiter sub-period. I met my husband two months later through a common friend!"'
  }
];`
);

// Fix Free Tools section for love
love = love.replace(
  "{ title: 'Free Janam Kundali', desc: 'Detailed life blueprint', icon: <Heart className=\"w-7 h-7\" />, link: '/kundli', color: 'bg-orange-50', text: 'text-[#ee6c1e]' },\n              { title: 'Numerology Report', desc: 'Discover your lucky numbers', icon: <ShieldCheck className=\"w-7 h-7\" />, link: '/numerology', color: 'bg-rose-50', text: 'text-[#e11d48]' },\n              { title: 'Daily Horoscope', desc: 'Read today\\'s career predictions', icon: <Sparkles className=\"w-7 h-7\" />, link: '/daily-horoscope', color: 'bg-indigo-50', text: 'text-[#4f46e5]' }",
  "{ title: 'Kundali Matching', desc: 'Check love compatibility score', icon: <Heart className=\"w-7 h-7\" />, link: '/compatibility', color: 'bg-pink-50', text: 'text-[#e11d48]' },\n              { title: 'Free Janam Kundali', desc: 'Know your Venus placement', icon: <ShieldCheck className=\"w-7 h-7\" />, link: '/kundli', color: 'bg-orange-50', text: 'text-[#ee6c1e]' },\n              { title: 'Daily Love Horoscope', desc: 'Today\\'s relationship insights', icon: <Sparkles className=\"w-7 h-7\" />, link: '/daily-horoscope', color: 'bg-rose-50', text: 'text-[#f43f5e]' }"
);

// Fix Reports section
love = love.replace(
  "{ title: 'Job Attract Confirm Puja', link: '/book-a-puja/job-attract-confirm-puja' },\n                  { title: 'Shani Tel Arpan Aarti', link: '/book-a-puja/shani-tel-arpan-aarti' },\n                  { title: 'Dhan Laxmi Puja', link: '/book-a-puja/dhan-laxmi-puja' }",
  "{ title: 'Vashikaran Puja', link: '/book-a-puja/vashikaran-puja' },\n                  { title: 'Kamdev Puja', link: '/book-a-puja/kamdev-puja' },\n                  { title: 'Swayamvar Parvati Puja', link: '/book-a-puja/swayamvar-parvati-puja' }"
);

// Fix SEO deep dive section
love = love.replace(
  "The Secrets of Vedic Compatibility",
  "The Secrets of Vedic Love Astrology"
);
love = love.replace(
  "Planets, Houses & <span className=\"text-[#d97706]\">Remedies</span>",
  "Planets, Houses & <span className=\"text-[#d97706]\">Love Remedies</span>"
);
love = love.replace(
  "Vedic Astrology provides a surgical analysis of your career potential. Our experts decode the precise geometric alignments of the Navagrahas (nine planets) and specific Bhavas (houses) in your Kundali to reveal the absolute truth about your professional destiny.",
  "Vedic Astrology provides a surgical analysis of your romantic destiny. Our experts decode the precise geometric alignments of Venus, the Moon, and specific Bhavas (houses) in your Kundali to reveal the absolute truth about your love life."
);

// Fix planet descriptions
love = love.replace(
  '<strong className="text-[#3a1216]">Saturn (Shani):</strong> The supreme planet of karma and profession. It demands hard work, discipline, and defines your core career structure.',
  '<strong className="text-[#3a1216]">Venus (Shukra):</strong> The planet of love, beauty, and romance. Its placement in your chart determines your relationship style and when love will bloom.'
);
love = love.replace(
  '<strong className="text-[#3a1216]">Sun (Surya):</strong> Represents authority, leadership, and success in government jobs or higher management roles.',
  '<strong className="text-[#3a1216]">Moon (Chandra):</strong> Represents emotions, feelings, and emotional compatibility. A well-placed Moon ensures deep emotional bonding with your partner.'
);
love = love.replace(
  '<strong className="text-[#3a1216]">Mercury (Buddh):</strong> The planet of intelligence, communication, and commerce. A strong Mercury is essential for business success.',
  '<strong className="text-[#3a1216]">Mars (Mangal):</strong> Governs passion, desire, and Manglik Dosh. Its placement determines the intensity and conflicts in your romantic relationships.'
);

// Fix houses descriptions
love = love.replace(
  '<strong className="text-[#3a1216]">10th House:</strong> The \'Karma Bhava\', representing your status, profession, fame, and public achievements.',
  '<strong className="text-[#3a1216]">7th House:</strong> The \'Vivah Bhava\' — the house of marriage, partnerships, and long-term commitments. This is the primary house for love and marriage.'
);
love = love.replace(
  '<strong className="text-[#3a1216]">11th House:</strong> The house of gains, income, and fulfillment of desires. Connected to salary hikes and business profits.',
  '<strong className="text-[#3a1216]">5th House:</strong> The house of romance, dating, and new love. Strong 5th house indicates vibrant romantic opportunities and love affairs.'
);
love = love.replace(
  '<strong className="text-[#3a1216]">2nd House:</strong> Represents accumulated wealth and bank balance. Indicates how well you retain the money you earn.',
  '<strong className="text-[#3a1216]">9th House:</strong> Represents dharma, traditions, and family values. Connected to parental blessings and approval for love marriages.'
);

// Fix remedies section
love = love.replace(
  '<strong className="text-[#3a1216]">Job Attract Puja:</strong> Specialized Vedic rituals and Homas that clear blockages in your professional path and invite new opportunities.',
  '<strong className="text-[#3a1216]">Swayamvar Parvati Puja:</strong> A powerful ritual dedicated to Goddess Parvati that removes obstacles in finding the right life partner.'
);
love = love.replace(
  'Using Pyrite, Siddh Rudraksha, or specific healing bracelets can clear career blocks and attract growth.',
  'Rose Quartz, Siddh Rose Quartz, or specific love-attracting bracelets can open your heart chakra and magnetize the right partner.'
);
love = love.replace(
  '<strong className="text-[#3a1216]">Surya Arghya:</strong> Offering water to the Sun God daily is a simple yet extremely potent remedy for job stability and promotions.',
  '<strong className="text-[#3a1216]">Venus Remedies:</strong> Offering white flowers and sweets to Venus on Fridays is a simple yet extremely potent remedy for attracting love and improving relationship harmony.'
);

// Fix the expert card helper list
love = love.replace(
  "{ title: 'Job Timing Prediction', desc: 'Identify the exact months when you are most likely to land a high-paying job.' },",
  "{ title: 'Love Timing Prediction', desc: 'Identify the exact months when you are most likely to meet your soulmate.' },"
);
love = love.replace(
  "{ title: 'Business vs Job Guidance', desc: 'Clear the confusion with data-driven astrological analysis of your 6th and 7th houses.' },",
  "{ title: 'Compatibility Analysis', desc: 'Clear the confusion with a deep Navamsha and Guna Milan analysis of both charts.' },"
);
love = love.replace(
  "{ title: 'Overcome Workplace Politics', desc: 'Practical remedies to defeat enemies and gain favor with superiors.' },",
  "{ title: 'Overcome Relationship Conflicts', desc: 'Practical remedies to reduce fights, heal past wounds, and restore love.' },"
);
love = love.replace(
  "{ title: 'Wealth & Success Remedies', desc: 'Powerful pujas, gemstones, and rituals to attract prosperity and promotions.' },",
  "{ title: 'Love & Marriage Remedies', desc: 'Powerful pujas, gemstones, and rituals to attract the right partner and ensure a blissful marriage.' },"
);

// Fix success stories section header text
love = love.replace(
  'See how Vedic astrology provided clarity and career breakthroughs for our clients.',
  'See how Vedic astrology transformed the love lives and relationships of our clients.'
);

// Fix specializations shown on astrologer cards
love = love.replace(
  "(astro.specializations?.length ? astro.specializations : ['Career', 'Business'])",
  "(astro.specializations?.length ? astro.specializations : ['Love', 'Relationships'])"
);
love = love.replace(
  "(astro.specialization?.length ? astro.specialization : ['Career', 'Business'])",
  "(astro.specialization?.length ? astro.specialization : ['Love', 'Compatibility'])"
);

// Fix Page title SEO / metadata comment
love = love.replace(
  'alt="Career & Job Astrology Consultation"',
  'alt="Love & Compatibility Astrology Consultation"'
);
love = love.replace(
  'alt="Career Astrology"',
  'alt="Love & Compatibility Astrology"'
);

// Fix the "Why Astrology" badge
love = love.replace('Why Astrology for Career?', 'Why Astrology for Love?');

// Fix Reports section heading
love = love.replace(
  '{ title: \'Vaidik Smart Kundali (10 Years)\', link: \'/report/kundali/vaidik-smart-kundali-10-years\' },',
  '{ title: \'Kundali Matching Report\', link: \'/report/kundali/kundali-matching\' },'
);

fs.writeFileSync(
  path.join(__dirname, '../src/app/(main)/love-astrology/page.tsx'),
  love,
  'utf8'
);

console.log('Love & Compatibility page created successfully!');
console.log('Lines:', love.split('\n').length);
