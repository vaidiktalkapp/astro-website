import React from 'react';
import Link from 'next/link';
import LazyVideo from '@/components/LazyVideo';
import { FaqSection } from '@/components/ReportPageClient';
import {
  CheckCircle2, Plus, Star, BookOpen, FileText, Check, ShieldCheck, Heart, Briefcase, Activity, Flower2, Clock, Users, Hash
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchSettings() {
  try {
    const res = await fetch(`${API_URL}/smart-kundali-settings/hastlikhit-kundali`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

type FaqBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

interface FaqItem {
  q: string;
  content: FaqBlock[];
}

const faqData: FaqItem[] = [
  {
    q: 'What is a Personalised Hastlikhit Kundali?',
    content: [
      { type: 'p', text: 'A Personalised Hastlikhit Kundali is an individualised astrological report based on the unique planetary positions in your birth chart, interpreted using Hastlikhit Kundali principles. It focuses on karmic causes of life events and prescribes simple yet powerful remedies to balance planetary energies.' },
      { type: 'p', text: 'The term \u201cHastlikhit Kundali\u201d means \u201cThe Red Book\u201d \u2014 containing ancient astrological wisdom that connects life with deeds (karma). Using your exact date, time, and place of birth, astrologers prepare a customised report offering precise insights and remedies tailored to your horoscope.' }
    ]
  },
  {
    q: 'How is Hastlikhit Kundali different from traditional Vedic astrology?',
    content: [
      { type: 'p', text: 'While both share planetary science roots, their methods differ significantly:' },
      {
        type: 'table', headers: ['Aspect', 'Vedic Astrology', 'Hastlikhit Kundali Astrology'], rows: [
          ['Focus', 'Planetary strength, yogas, and doshas', 'Karmic causes and behavioural patterns'],
          ['Remedies', 'Pujas, gemstones, mantras', 'Simple household and charity-based remedies'],
          ['Charts Used', 'Divisional charts, Nakshatras', 'House-based horoscope (simplified)'],
          ['Interpretation', 'Spiritual and cosmic', 'Practical and result-oriented']
        ]
      },
      { type: 'p', text: 'Thus, Hastlikhit Kundali is known for its practicality and real-life applications.' }
    ]
  },
  {
    q: 'What details are required to prepare a Personalised Hastlikhit Kundali?',
    content: [
      { type: 'list', items: ['Full Name', 'Date of Birth (DD/MM/YYYY)', 'Exact Time of Birth', 'Place of Birth (City, State, Country)'] },
      { type: 'p', text: 'Using these details, astrologers prepare your unique Hastlikhit Kundali chart, interpret it, and provide personalised remedies and predictions.' }
    ]
  },
  {
    q: 'What kind of insights does a Personalised Hastlikhit Kundali offer?',
    content: [
      {
        type: 'list', items: [
          'Personality traits and behaviour patterns',
          'Financial and career guidance',
          'Family and relationship compatibility',
          'Health, emotional, and spiritual balance',
          'Planetary strengths and karmic debts',
          'Predictions for major life events'
        ]
      },
      { type: 'p', text: 'It serves as both a spiritual guide and a life manual for clarity and growth.' }
    ]
  },
  {
    q: 'What are Hastlikhit Kundali remedies, and how do they work?',
    content: [
      { type: 'p', text: 'Hastlikhit Kundali remedies (Upaay) are simple and powerful karmic corrections. They include:' },
      {
        type: 'list', items: [
          'Feeding specific animals like cows or crows',
          'Donating items such as wheat, jaggery, or copper',
          'Avoiding actions that increase negative karma',
          'Maintaining cleanliness and moral discipline'
        ]
      },
      { type: 'p', text: 'They balance energies through positive actions, leading to natural planetary harmony.' }
    ]
  },
  {
    q: 'Is Hastlikhit Kundali astrology scientific or spiritual?',
    content: [
      { type: 'p', text: 'Hastlikhit Kundali blends science, logic, and spirituality. It simplifies planetary analysis into house-based systems and uses karmic remedies for energy correction and psychological healing \u2014 creating spiritual and practical balance.' }
    ]
  },
  {
    q: 'What are the benefits of having a Personalised Hastlikhit Kundali report?',
    content: [
      {
        type: 'list', items: [
          'Brings clarity about life\u2019s purpose',
          'Identifies root causes of struggles',
          'Gives practical, easy-to-follow remedies',
          'Improves peace, prosperity, and stability',
          'Balances planetary influences',
          'Acts as a lifelong karmic guide'
        ]
      }
    ]
  },
  {
    q: 'Can Hastlikhit Kundali remedies remove doshas like Manglik or Kaal Sarp Dosh?',
    content: [
      { type: 'p', text: 'Yes, Hastlikhit Kundali remedies can help reduce doshas like Manglik, Kaal Sarp, or Shani Dosh. Remedies include donations, feeding the poor, or offering oil to Shani temples \u2014 focusing on karma correction rather than costly rituals.' }
    ]
  },
  {
    q: 'How frequently should one consult their Personalised Hastlikhit Kundali?',
    content: [
      { type: 'p', text: 'It\u2019s ideal to review your Hastlikhit Kundali every 5\u20137 years or during major life transitions like marriage, job change, or health shifts. Planetary positions remain fixed, but Dasha periods change life patterns \u2014 making updates essential.' }
    ]
  },
  {
    q: 'Where can one get an authentic Personalised Hastlikhit Kundali prepared?',
    content: [
      { type: 'p', text: 'For authentic reports, consult expert Hastlikhit Kundali astrologers. AstroSolution offers accurate, personalised Hastlikhit Kundali reports prepared using your complete birth details, including:' },
      {
        type: 'list', items: [
          'Detailed planetary analysis',
          'Personalised predictions and remedies',
          'Karmic correction and guidance'
        ]
      },
      { type: 'p', text: 'Our reports combine traditional wisdom with modern clarity to ensure practical and result-oriented outcomes.' }
    ]
  },
  {
    q: 'Is this report based on personal birth details?',
    content: [
      { type: 'p', text: 'Definitely, the report involves every birth detail that makes sure about unique and personal discernment.' }
    ]
  },
  {
    q: 'Can the report be accessed digitally?',
    content: [
      { type: 'p', text: 'Yes, it is provided in a structured digital form so that it can be read conveniently.' }
    ]
  },
  {
    q: 'Shall the report be meant for routine use?',
    content: [
      { type: 'p', text: 'Yes, it may refer to the ongoing purpose of the routine reference.' }
    ]
  },
  {
    q: 'Do I need any prior knowledge of astrology to be able to comprehend it?',
    content: [
      { type: 'p', text: 'No. Our reports are designed to make it very easy for our clients to understand.' }
    ]
  }
];

export default async function HastlikhitKundaliPage() {
  const settings = await fetchSettings();

  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const defaultTestimonials = [
    {
      name: "Amit Sharma",
      city: "Delhi",
      date: "December 2025",
      review: "The Hastlikhit Kundali report completely changed my perspective. The remedies were so simple yet effective. My business has finally started picking up pace.",
      initial: "A",
      color: "#5c1a1f"
    },
    {
      name: "Neha Reddy",
      city: "Hyderabad",
      date: "November 2025",
      review: "Very detailed analysis of my numbers! It told me exactly which numbers were blocking my career and suggested a small name correction that worked wonders.",
      initial: "N",
      color: "#d97706"
    },
    {
      name: "Ravi Kumar",
      city: "Jaipur",
      date: "October 2025",
      review: "I was struggling with unexplained delays in my life. The karmic debt analysis in this report explained everything perfectly. Highly authentic and practical.",
      initial: "R",
      color: "#1a0a0b"
    }
  ];

  const testimonials = settings?.testimonials?.length ? settings.testimonials : defaultTestimonials;
  const validScreenshots = (settings?.screenshots || []).filter((s: any) => s.url);
  const screenshots = validScreenshots.length > 0 ? validScreenshots : [
    { url: '/images/numerology-page-1.jpg' },
    { url: '/images/numerology-page-2.jpg' },
    { url: '/images/numerology-page-3.jpg' }
  ];
  const validVideos = (settings?.videos || []).filter((v: any) => v.url);
  const faqList = settings?.faqs?.length > 0
    ? settings.faqs.map((f: any) => ({ q: f.q, content: [{ type: 'p' as const, text: f.a }] }))
    : faqData;

  return (
    <div className="w-full min-h-screen bg-[#fdfaf6] font-sans text-gray-850 relative">

      {/* ============ HERO ============ */}
      <section className="relative w-full pt-6 pb-12 overflow-hidden bg-[#7a4b3a]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 bg-[#4c2918]">
          {settings?.banner?.url && /\.(mp4|webm|mov)(\?.*)?$/i.test(settings.banner.url) ? (
            <LazyVideo src={settings.banner.url} className="w-full h-full object-cover object-center opacity-100" />
          ) : settings?.banner?.url ? (
            <img src={settings.banner.url} alt="Hastlikhit Kundali" className="w-full h-full object-cover object-center opacity-80" />
          ) : (
            <LazyVideo src="/smart%20kundali.mp4" className="w-full h-full object-cover object-center opacity-100" />
          )}
          {/* Gradient dark overlay for perfect text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/5 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 text-center mt-2">
          <h1 className="text-[28px] md:text-[48px] lg:text-[58px] font-bold mb-3 font-serif leading-tight text-white drop-shadow-md">
            {settings?.heroHeading || "Hastlikhit Kundali: Discover the Blueprint of Your Destiny"}
          </h1>
          <p className="text-[16px] md:text-[20px] text-white/100 mb-6 max-w-2xl mx-auto font-semibold drop-shadow-sm">
            {settings?.heroSubheading || "Unlock Your True Potential with Ancient Wisdom"}
          </p>

          <Link href="/report/numerology/hastlikhit-kundali/checkout" className="inline-block bg-white text-[#b06126] font-bold text-[16px] md:text-[18px] px-10 py-3.5 md:py-4 rounded-xl shadow-lg hover:scale-105 transition-transform mb-6">
            {settings?.heroCtaText || "Get Your Report"} @ <span className="line-through text-[#3a1216] mx-1">₹{settings?.price || 600}</span> ₹{settings?.discountedPrice || 549}
          </Link>

          {/* Happy Customers Avatars */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" />
            </div>
            <span className="text-white text-[13px] font-bold tracking-wide drop-shadow-sm">Trusted by thousands of believers</span>
          </div>
        </div>
      </section>

      {/* ============ OVERLAPPING CARDS (MINIMAL/FLAT) ============ */}
      <div className="max-w-[1200px] mx-auto relative z-20 -mt-6 md:-mt-10 mb-8 md:mb-12 overflow-hidden">
        
        {/* Mobile Marquee */}
        <div className="md:hidden flex w-max animate-scroll gap-3 px-4 py-2 hover:[animation-play-state:paused]">
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
              <div className="bg-white rounded-[10px] shadow-sm px-4  py-2.5  flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50">
            <Hash className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] ">{settings?.featureCards?.[0] || "Deep Name Analysis"}</span>
          </div>

          
              <div className="bg-white rounded-[10px] shadow-sm px-4  py-2.5  flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50">
            <Star className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] ">{settings?.featureCards?.[1] || "Lucky Numbers"}</span>
          </div>

          
              <div className="bg-white rounded-[10px] shadow-sm px-4  py-2.5  flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50">
            <Briefcase className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] ">{settings?.featureCards?.[2] || "Career Guidance"}</span>
          </div>

          
              <div className="bg-white rounded-[10px] shadow-sm px-4  py-2.5  flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50">
            <ShieldCheck className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] ">{settings?.featureCards?.[3] || "Remedies & Solutions"}</span>
   </div>
            </React.Fragment>
          ))}
        </div>

        {/* Desktop Normal Grid */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center px-4">
          <div className="bg-white rounded-[12px] shadow-sm px-3 lg:px-4 py-2.5 lg:py-3 flex items-center gap-2">
            <Hash className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] xl:text-[14px]">{settings?.featureCards?.[0] || "Deep Name Analysis"}</span>
          </div>

          
          <div className="bg-white rounded-[12px] shadow-sm px-3 lg:px-4 py-2.5 lg:py-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] xl:text-[14px]">{settings?.featureCards?.[1] || "Lucky Numbers"}</span>
          </div>

          
          <div className="bg-white rounded-[12px] shadow-sm px-3 lg:px-4 py-2.5 lg:py-3 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] xl:text-[14px]">{settings?.featureCards?.[2] || "Career Guidance"}</span>
          </div>

          
          <div className="bg-white rounded-[12px] shadow-sm px-3 lg:px-4 py-2.5 lg:py-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] xl:text-[14px]">{settings?.featureCards?.[3] || "Remedies & Solutions"}</span>
        </div>
      </div>
      </div>

      <section className="pb-12 md:pb-16 bg-[#fdfaf6]">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-row items-start justify-center gap-6 md:gap-10">

          {/* Astrologer Profile */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-[4px] border-white shadow-md mb-2 bg-white flex items-center justify-center">
              <img src="/astrosolution-logo.png" alt="Astro Solution" className="w-[85%] h-[85%] object-contain" />
            </div>
            <span className="hidden md:block font-bold text-[#1a1a1a] text-[14px]">Astro Solution</span>
          </div>

          {/* Content & Tags */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#5c1a1f] mb-1">{settings?.highlightsHeading || "Empower your life journey with numerical alignment"}</h2>
            <p className="text-[14px] md:text-[15px] text-[#5c1a1f]/80 font-medium mb-4">{settings?.highlightsSubheading || "Understand the karmic impact of your birth numbers and name vibration to remove blocks."}</p>

            <div className="grid grid-cols-3 md:flex md:flex-wrap gap-1.5 md:gap-2.5 w-full">
              {(() => {
                const tagsList = settings?.highlightTags?.length ? settings.highlightTags : ['Name Correction', 'Birth Date Analysis', 'Mobile No. Check', 'Lucky Colors', 'Karmic Debt', 'Wealth Numbers'];
                const icons = [CheckCircle2, ShieldCheck, Flower2, Clock, Star, BookOpen];
                return tagsList.map((tag: string, i: number) => {
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={i} className="bg-[#fdfaf6] text-[#b06126] border border-[#ebdcc7] px-1 md:px-4 py-1 md:py-1.5 rounded-md md:rounded-full font-bold text-[8.5px] sm:text-[10px] md:text-[13px] flex items-center justify-center md:justify-start gap-1 md:gap-1.5 shadow-sm overflow-hidden text-center">
                      <Icon className="w-3.5 h-3.5 text-[#c57636]" strokeWidth={2.5} />
                      <span className="truncate whitespace-nowrap">{tag}</span>
                    </div>
                  );
                });
              })()}
            </div>
          </div>

        </div>
      </section>

      {/* ============ SECTION 2: BOOK MOCKUP ============ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-20">
          
          {/* Desktop Image (Hidden on mobile) */}
          <div className="hidden md:flex md:w-1/2 justify-center">
            <img src={settings?.mockups?.pdf || "/images/AstroSolution-kundli-mockup.webp"} alt="Premium Hastlikhit Kundali" className="w-full max-w-[470px] rounded-xl mix-blend-multiply" />
          </div>
          
          {/* Content */}
          <div className="w-full md:w-1/2 flex flex-col">
            
            {/* Mobile Title & Thumbnail Row */}
            <div className="flex items-center gap-4 mb-4 md:mb-3">
              <div className="md:hidden shrink-0 w-[85px] sm:w-[100px] flex items-center justify-center">
                <img src={settings?.mockups?.pdf || "/images/AstroSolution-kundli-mockup.webp"} alt="Premium Hastlikhit Kundali" className="w-full h-auto object-contain drop-shadow-md rounded-sm mix-blend-multiply" />
              </div>
              <h2 className="text-[22px] sm:text-3xl md:text-4xl font-serif font-bold text-[#5c1a1f] leading-tight">{settings?.productHeading || "Premium Hastlikhit Kundali"}</h2>
            </div>

            <p className="text-[#3a1216]/90 text-[15px] leading-relaxed mb-6 font-medium whitespace-pre-wrap">
              {settings?.productDescription || "A small energetic shift — a letter change, a new number, or vibration correction — can change the entire course of your life. Your name and numbers are not fixed; they are keys to your transformation."}
            </p>

            <ul className="grid grid-cols-1 gap-y-4 mb-8">
              {(() => {
                const features = settings?.productFeatures?.length ? settings.productFeatures : [
                  'Detailed analysis of Life Path, Destiny & Karmic Numbers.',
                  'Identification of success blocks in career, money & relationships.',
                  'Personalized lucky numbers, colors, days & directions.',
                  'Actionable remedies to realign life with number vibrations.'
                ];
                return features.map((feat: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-[#5c1a1f] text-[15px] font-bold">
                    <Check className="text-[#d68636] w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} /> {feat}
                  </li>
                ));
              })()}
            </ul>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-[32px] md:text-[40px] font-bold text-[#5c1a1f]">₹{settings?.discountedPrice || 549}</span>
              <span className="text-lg text-[#3a1216]/60 line-through font-medium">₹{settings?.price || 600}</span>
              <span className="bg-[#e8ffd6] text-[#2e7d32] text-[12px] font-bold px-3 py-1 rounded-full border border-[#a5d6a7] uppercase tracking-wide ml-2 inline-flex items-center gap-1.5 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32] animate-pulse"></span> SPECIAL OFFER</span>
            </div>

            <Link href="/report/numerology/hastlikhit-kundali/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[16px] px-10 py-4 rounded-lg shadow-lg hover:bg-[#b06126] transition-colors w-full md:w-auto text-center">
              {settings?.imageSectionCtaText || "Fill The Form Below →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHAT IT REVEALS ============ */}
      <section className="py-16 md:py-24 bg-[#fdfaf6]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-[45%] lg:w-[40%] xl:-ml-6">
            <LazyVideo
              src={settings?.video?.url || "/vaidik video.mp4"}
              className="w-full rounded-[2rem] shadow-lg object-cover object-[center_15%] aspect-square md:aspect-[4/4.5]"
            />
          </div>
          <div className="md:w-[55%] lg:w-[60%] md:pl-6 lg:pl-10">
            <h2 className="text-[28px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-serif font-bold text-[#5c1a1f] mb-10 leading-tight xl:whitespace-nowrap">{settings?.whatItRevealsHeading || "What You Will Receive"}</h2>

            <div className="space-y-6 mb-12">
              {(settings?.whatItReveals?.length ? settings.whatItReveals : [
                'Deep analysis of your personalized astrological chart',
                'Detailed planetary positions and their life impacts',
                'Guidance on career, relationships, and financial stability',
                'Specific timelines for major life events and transitions',
                'Simple, effective remedies to balance planetary energies'
              ]).map((item: string, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <Check className="text-[#d68636] w-6 h-6 shrink-0 mt-0.5" strokeWidth={3} />
                  <h4 className="font-medium text-[#3a1216] text-[16px] md:text-[17px] leading-snug">{item}</h4>
                </div>
              ))}
            </div>

            <a href="/report/numerology/hastlikhit-kundali/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[16px] px-10 py-4 rounded-xl shadow-md hover:bg-[#b06126] transition-colors w-full md:w-auto text-center">
              {settings?.videoSectionCtaText || "Order Your Hastlikhit Kundali →"}
            </a>
          </div>
        </div>
      </section>

      {/* ============ IN THE SPOTLIGHT & TESTIMONIALS CSS ============ */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scrollLeft 30s linear infinite;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .hide-scroll::-webkit-scrollbar {
          display: none;
        }
        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ============ IN THE SPOTLIGHT ============ */}
      {validVideos.length > 0 && (
        <section className="py-16 md:py-24 bg-[#fdfaf6] border-y border-[#ebdcc7] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 text-center">
            <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c1a1f] mb-12">Hastlikhit Kundali Insights</h2>

            <div className="relative overflow-hidden w-full group py-2">
              <div className="animate-scroll gap-6 md:gap-8 flex px-4">
                {[...validVideos, ...validVideos, ...validVideos, ...validVideos].map((v: any, i: number) => {
                  const ytId = getYoutubeVideoId(v.url);
                  const validVideos = (settings?.videos || []).filter((v: any) => v.url);

  return (
    <div key={i} className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] aspect-video bg-black rounded-2xl overflow-hidden relative shadow-xl snap-center flex-shrink-0 border-[3px] border-white">
                      {ytId ? (
                        <iframe loading="lazy" className="w-full h-full pointer-events-auto" src={`https://www.youtube.com/embed/${ytId}`} allowFullScreen></iframe>
                      ) : (
                        <video className="w-full h-full object-cover pointer-events-auto" src={v.url} controls playsInline preload="none"></video>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============ TESTIMONIALS ============ */}
      <section className="py-16 md:py-24 bg-[#fdfaf6] overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-center text-[#c57636] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">REVIEWS</p>
          <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c1a1f] mb-12 text-center">What Believers Say</h2>

          <div className="relative overflow-hidden w-full group">
            <div className="animate-scroll gap-6 md:gap-8 flex pl-6">
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t: any, i: number) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-[#ebdcc7] hover:border-[#c57636] transition-all flex flex-col w-[300px] md:w-[350px] shrink-0">
                  <div className="flex gap-1 mb-5 text-[#f59e0b]">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-850 text-[14px] leading-relaxed mb-8 flex-1 italic">"{t.review}"</p>
                  <div className="flex items-center gap-4 border-t border-[#ebdcc7] pt-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: t.color || '#d68636' }}>{t.initial}</div>
                    <div>
                      <h4 className="font-bold text-[#5c1a1f] text-[14px] leading-none mb-1">{t.name}</h4>
                      {t.city && <p className="text-[12px] text-[#3a1216]/60">{t.city}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQS ============ */}
      <FaqSection faqs={faqList} accentColor="#d68636" />

      {/* ============ CTA / GET IT NOW ============ */}
      <section className="py-16 md:py-24 bg-[#fdfaf6] text-white">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="premium-serif text-center text-[28px] md:text-[36px] font-bold text-[#3a1216] mb-4 leading-tight">Ready to Unlock Your Destiny?</h2>
          <p className="text-center text-[#3a1216]/80 text-[15px] md:text-[16px] mb-10 max-w-[600px] mx-auto">Get your personalized Hastlikhit Kundali today and remove the blocks holding you back.</p>
          <Link href="/report/numerology/hastlikhit-kundali/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[18px] px-12 py-4 rounded-xl shadow-[0_8px_20px_rgba(214,134,54,0.3)] hover:bg-[#b06126] transition-all hover:scale-105">
            {settings?.bottomCtaText || "Book Hastlikhit Kundali"}
          </Link>
        </div>
      </section>

    </div>
  );
}
