const fs = require('fs');
const filePath = 'src/app/(main)/property-astrology/page.tsx';

let content = fs.readFileSync(filePath, 'utf8');

// Component & Endpoint
content = content.replace(/FinanceAstrologyPage/g, 'PropertyVehicleAstrologyPage');
content = content.replace(/\/smart-kundali-settings\/finance-astrology/g, '/smart-kundali-settings/property-astrology');

// Images
content = content.replace(/\/images\/finance-hero\.png\?v=2/g, '/images/property-vehicle.png');
content = content.replace(/Business & Finance Astrology/g, 'Property & Vehicle Astrology');

// Hero Headers
content = content.replace(/Unlock Wealth in Business & Finance/g, 'Secure Property & Vehicle Investments');
content = content.replace(/Whether you're struggling with business losses, planning a new startup, dealing with debt, or seeking massive wealth accumulation/g, "Whether you're facing delays in buying a house, trapped in ancestral property disputes, seeking the best time to buy a vehicle, or suffering from Vahan Dosh");

// Consult section
content = content.replace(/Consult Business & Finance/g, 'Consult Property & Vehicle');

// Why Astrology for...
content = content.replace(/Why Astrology for Wealth & Business\?/g, 'Why Astrology for Property & Vehicle?');
content = content.replace(/Decoding Your Financial Destiny/g, 'Decoding Your Asset & Property Destiny');
content = content.replace(/Your ability to attract, accumulate, and grow wealth is deeply intertwined/g, 'Your ability to buy property, own vehicles, and build tangible assets is deeply intertwined');
content = content.replace(/The <strong className="text-\[#3a1216\]">2nd House<\/strong> \(Dhana Bhava\) and <strong className="text-\[#3a1216\]">11th House<\/strong> \(Labha Bhava\).*?breakthroughs\./g, 'The <strong className="text-[#3a1216]">4th House</strong> (Matru/Sukha Bhava) represents property, vehicles, and comforts. Along with Mars (Land) and Venus (Vehicles), these elements hold the key to answering when you will buy your dream home or recover ancestral property.');

// Problems Array
const problemsRegex = /const problems = \[[\s\S]*?\];/;
const newProblems = `const problems = [
    {
      title: 'Delays in Buying Property',
      content: 'Struggling to buy your dream house? A weak 4th house or afflicted Mars can cause endless delays. We analyze your Dasha to find the exact time you will own property.',
      icon: <ShieldAlert className="w-6 h-6 text-[#e11d48]" />,
      report: { name: 'Talk to Expert', link: '/astrologers-chat' }
    },
    {
      title: 'Ancestral Property Disputes',
      content: 'Trapped in legal battles over family land? The 8th and 4th houses govern inherited assets. We suggest powerful Vedic remedies to win legal cases and resolve family disputes.',
      icon: <Sparkles className="w-6 h-6 text-[#d97706]" />,
      tool: { name: 'Free Kundli', link: '/kundli' },
      report: { name: 'Premium Report', link: '/report/kundali/vaidik-smart-kundali-10-years' }
    },
    {
      title: 'Vehicle Accidents (Vahan Dosh)',
      content: 'Facing frequent car accidents or damage? This is a classic sign of Vahan Dosh caused by afflicted Venus or Rahu. Discover specific protective rituals before buying a vehicle.',
      icon: <HeartHandshake className="w-6 h-6 text-[#4f46e5]" />,
      tool: { name: 'Free Kundli', link: '/kundli' },
      report: { name: 'Premium Report', link: '/report/kundali/vaidik-smart-kundali-10-years' }
    },
    {
      title: 'Vastu Defects (Vastu Dosh)',
      content: 'Lack of peace at home? Astrological combinations in your chart reflect the Vastu of your house. We provide non-destructive astrological Vastu remedies for domestic harmony.',
      icon: <Star className="w-6 h-6 text-[#059669]" />
    },
    {
      title: 'Selling Property Profitably',
      content: 'Unable to sell your land or getting low offers? We advise on the most auspicious timings (Muhurat) and planetary transits for highly profitable real estate transactions.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#0ea5e9]" />
    },
    {
      title: 'Choosing Property Location',
      content: 'Confused where to invest? Astro-Cartography and local directions based on your Kundali reveal which cities and facing-directions (East, North, etc.) bring luck to you.',
      icon: <Sparkles className="w-6 h-6 text-[#ea580c]" />
    }
  ];`;
content = content.replace(problemsRegex, newProblems);

// Default FAQs
const faqRegex = /const defaultFaqs = \[[\s\S]*?\];/;
const newFaqs = `const defaultFaqs = [
  { q: 'Mera apna ghar kab banega?', a: 'Apna ghar banne ka yog 4th house, Mars (Zameen) aur Saturn (Construction) ke transits aur Dasha par depend karta hai. Astrologers exact saal predict kar sakte hain.' },
  { q: 'Property lene mein rukawat aa rahi hai, kya remedy karun?', a: 'Mangal (Mars) ko strong karna sabse zaruri hai. Hanuman ji ki upasana aur specific daan (donations) se rukawat door hoti hai.' },
  { q: 'Nayi gaadi kab kharidni chahiye?', a: 'Gaadi (vehicle) Shukra (Venus) aur 4th house se dekhi jati hai. Shubh Muhurat mein gaadi lene se accidents (Vahan Dosh) se bacha ja sakta hai.' },
  { q: 'Ancestral property dispute kaise solve karein?', a: 'Ancestral property 8th house se aati hai. Agar wahan Rahu ya Ketu ho toh dispute hota hai. Iski shanti ke liye specific grah shanti puja ki jati hai.' }
];`;
content = content.replace(faqRegex, newFaqs);

// Default Success Stories
const storiesRegex = /const defaultSuccessStories = \[[\s\S]*?\];/;
const newStories = `const defaultSuccessStories = [
  { name: 'Ramesh K.', before: '"Our property was stuck in litigation for 12 years."', after: '"Expert suggested Mangal remedies. We won the case out of court in just 4 months!"' },
  { name: 'Sneha R.', before: '"I faced 3 minor car accidents in the same year."', after: '"Discovered a severe Vahan Dosh. Did the suggested Rahu-Venus Puja and bought a new car peacefully."' },
  { name: 'Vikram S.', before: '"My dream of building a house was paused due to continuous financial blocks."', after: '"The timing prediction was spot on. My Shani dasha shifted and the construction finished in 8 months."' }
];`;
content = content.replace(storiesRegex, newStories);

// SEO Cards & Planets
content = content.replace(/Dhana Yogas in Kundli/g, 'Property Yogas in Kundli');
content = content.replace(/A "Dhana Yoga" is formed when the lords.*?windfalls\./g, 'A strong connection between the Lagna lord and the 4th lord guarantees immense property and real estate. Our experts analyze your exact Dasha periods to predict when these yogas will activate and bring massive assets into your life.');

content = content.replace(/Business & Partnership Safety/g, 'Vahan Dosh & Vehicle Safety');
content = content.replace(/Before risking your capital in a new venture.*?Lagna\./g, 'Before purchasing a vehicle, it is crucial to check the 4th house and Venus. If afflicted by Rahu or Saturn, it creates Vahan Dosh, leading to accidents and vehicle damage. We evaluate your chart for safety and suggest auspicious Muhurats.');

content = content.replace(/Escaping the Debt Trap/g, 'Resolving Ancestral Property Disputes');
content = content.replace(/If money flows out faster than it comes in.*?stability\./g, 'Disputes over family inheritance are dictated by the 8th house. We prescribe specific Vedic remedies, such as appeasing Mars (Mangal) and performing targeted Homas to break legal deadlocks and ensure your rightful share is secured.');

content = content.replace(/The Secrets of Wealth Astrology/g, 'The Secrets of Property Astrology');
content = content.replace(/Planets, Houses & <span className="text-\[#d97706\]">Wealth Remedies<\/span>/g, 'Planets, Houses & <span className="text-[#d97706]">Property Remedies</span>');

content = content.replace(/<strong className="text-\[#3a1216\]">Jupiter \(Guru\):<\/strong> The ultimate Karaka.*abundance\./g, '<strong className="text-[#3a1216]">Mars (Mangal):</strong> The ultimate Karaka (significator) of land and real estate. A strong Mars is essential for owning property and winning land disputes.');
content = content.replace(/<strong className="text-\[#3a1216\]">Venus \(Shukra\):<\/strong> Governs luxury, cash flow.*enjoy\./g, '<strong className="text-[#3a1216]">Venus (Shukra):</strong> Governs luxury and vehicles. A strong Venus decides the level of material comfort, beautiful homes, and premium cars you will own.');

content = content.replace(/<strong className="text-\[#3a1216\]">2nd House:<\/strong> The 'Dhana Bhava', representing accumulated bank balance, fixed assets, and family wealth\./g, '<strong className="text-[#3a1216]">4th House:</strong> The \'Sukha Bhava\', representing your own house, lands, mother, vehicles, and domestic happiness.');
content = content.replace(/<strong className="text-\[#3a1216\]">11th House:<\/strong> The 'Labha Bhava', house of gains, profits, and fulfillment of desires\. It decides the ROI of your business\./g, '<strong className="text-[#3a1216]">8th House:</strong> Represents hidden wealth, inheritances, ancestral property, and unexpected gains through family wills.');

content = content.replace(/<strong className="text-\[#3a1216\]">Dhan Laxmi Puja:<\/strong> A highly potent ritual to remove financial curses and invite continuous cash flow into your business\./g, '<strong className="text-[#3a1216]">Mangal Shanti Puja:</strong> A highly potent ritual to remove blockages in property matters, clear land disputes, and speed up house construction.');

fs.writeFileSync(filePath, content);
console.log('Update complete.');
