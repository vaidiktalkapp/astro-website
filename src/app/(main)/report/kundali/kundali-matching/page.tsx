import React from 'react';
import Link from 'next/link';
import LazyVideo from '@/components/LazyVideo';
import { FaqSection } from '@/components/ReportPageClient';
import {
  CheckCircle2, Plus, Star, BookOpen, FileText, Check, ShieldCheck, Heart, Briefcase, Activity, Flower2
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchSettings() {
  try {
    const res = await fetch(`${API_URL}/smart-kundali-settings/kundali-matching`, { next: { revalidate: 60 } });
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
    q: 'What is Premium Kundali Matching?',
    content: [
      { type: 'p', text: 'Premium Kundali Matching, also known as Kundali Milan or Gun Milan, is the Vedic process of analysing the compatibility between two individuals based on their birth charts (Janma Kundalis) before marriage. It compares the astrological positions of planets, the Moon, and other celestial factors to determine emotional, mental, and spiritual harmony between the prospective bride and groom.' }
    ]
  },
  {
    q: 'Why is Premium Kundali Matching important before marriage?',
    content: [
      { type: 'p', text: 'Premium Kundali Matching holds immense importance in Indian culture because it helps assess compatibility, harmony, and long-term relationship success. It predicts various dimensions of marital life, including:' },
      { type: 'list', items: ['Emotional and mental compatibility', 'Physical attraction and health harmony', 'Financial stability and family well-being', 'Longevity of the relationship', 'Fertility and progeny', 'Mutual respect and understanding'] }
    ]
  },
  {
    q: 'What details are required for Premium Kundali Matching?',
    content: [
      { type: 'p', text: 'For accurate Premium Kundali Matching, the following birth details of both the bride and groom are essential:' },
      { type: 'list', items: ['Full Name', 'Date of Birth (DD/MM/YYYY)', 'Exact Time of Birth', 'Place of Birth (City, State, Country)'] }
    ]
  },
  {
    q: 'What is the Ashtakoota method in Premium Kundali Matching?',
    content: [
      { type: 'p', text: 'The Ashtakoota Milan system is the most widely used method in Vedic astrology for assessing marital compatibility. It involves comparing eight different parameters (Kootas), collectively contributing 36 points (Gunas) in total.' },
      {
        type: 'table',
        headers: ['Koota (Aspect)', 'Meaning', 'Max Points'],
        rows: [
          ['1. Varna', 'Spiritual compatibility', '1'],
          ['2. Vashya', 'Mutual attraction', '2'],
          ['3. Tara', 'Birth star compatibility', '3'],
          ['4. Yoni', 'Physical and sexual compatibility', '4'],
          ['5. Graha Maitri', 'Mental and emotional harmony', '5'],
          ['6. Gana', 'Temperament and nature', '6'],
          ['7. Bhakut', 'Family, health, prosperity', '7'],
          ['8. Nadi', 'Genetic and health factors', '8']
        ]
      }
    ]
  },
  {
    q: 'What is considered a good Premium Kundali Matching score?',
    content: [
      { type: 'p', text: 'The total score of Guna Milan ranges from 0 to 36. The general compatibility guidelines are:' },
      { type: 'list', items: ['Above 30 Gunas: Excellent match, highly compatible couple.', '25–30 Gunas: Good match, prosperous marriage.', '18–24 Gunas: Average match, acceptable with minor remedies.', 'Below 18 Gunas: Not recommended, may lead to disharmony.'] }
    ]
  },
  {
    q: 'What is Manglik Dosha and how does it affect marriage?',
    content: [
      { type: 'p', text: "Manglik Dosha (Mangal Dosha) occurs when Mars (Mangal) is positioned in certain houses (1st, 2nd, 4th, 7th, 8th, or 12th) in a person's horoscope. It can create challenges in marital life such as conflicts or instability." },
      { type: 'p', text: 'Remedies include:' },
      { type: 'list', items: ['Manglik Dosha Nivaran Puja', 'Kumbh Vivah (symbolic ritual)', 'Recitation of Hanuman Chalisa or Mangal Mantra', 'Wearing of gemstones like Red Coral'] }
    ]
  }
];

export default async function KundaliMatchingPage() {
  const settings = await fetchSettings();

  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const defaultTestimonials = [
    {
      name: "Ramesh & Priya",
      city: "Delhi",
      date: "October 2025",
      review: "We were confused about our Gun Milan score because of Nadi Dosha. The detailed report from VaidikTalk explained exactly what the dosha meant for us and the remedies have brought us so much peace of mind.",
      initial: "R",
      color: "#5c1a1f"
    },
    {
      name: "Sneha & Amit",
      city: "Mumbai",
      date: "September 2025",
      review: "I loved how detailed the compatibility analysis was. It didn't just give a score, it told us about our financial alignment and emotional harmony. Truly a modern yet authentic approach.",
      initial: "S",
      color: "#d97706"
    },
    {
      name: "Karan Verma",
      city: "Pune",
      date: "August 2025",
      review: "I got this for my son's marriage. The Manglik dosha analysis was very clear and the astrologer consultation add-on was the best decision. We got proper guidance.",
      initial: "K",
      color: "#1a0a0b"
    }
  ];

  const testimonials = settings?.testimonials?.length ? settings.testimonials : defaultTestimonials;
  const validScreenshots = (settings?.screenshots || []).filter((s: any) => s.url);
  const screenshots = validScreenshots.length > 0 ? validScreenshots : [
    { url: '/images/kundali-page-1.jpg' },
    { url: '/images/kundali-page-2.jpg' },
    { url: '/images/kundali-page-3.jpg' }
  ];
  const validVideos = (settings?.videos || []).filter((v: any) => v.url);
  const faqList = settings?.faqs?.length > 0
    ? settings.faqs.map((f: any) => ({ q: f.q, content: [{ type: 'p' as const, text: f.a }] }))
    : faqData;

  return (
    <div className="w-full min-h-screen bg-[#fdfaf6] font-sans text-gray-850 relative">

      {/* ============ HERO ============ */}
      <section className="relative w-full pt-6 pb-16 overflow-hidden bg-[#7a4b3a]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 bg-[#4c2918]">
          {settings?.banner?.url && /\.(mp4|webm|mov)(\?.*)?$/i.test(settings.banner.url) ? (
            <LazyVideo src={settings.banner.url} className="w-full h-full object-cover object-center opacity-100" />
          ) : settings?.banner?.url ? (
            <img src={settings.banner.url} alt="Premium Kundali Matching" className="w-full h-full object-cover object-center opacity-100" />
          ) : (
            <LazyVideo src="/smart%20kundali.mp4" className="w-full h-full object-cover object-center opacity-100" />
          )}
          {/* Gradient dark overlay for perfect text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 text-center mt-1">
          <h1 className="text-[28px] md:text-[48px] lg:text-[58px] font-bold mb-2 font-serif leading-tight text-white drop-shadow-md">{settings?.heroHeading || "Ashtakoot Milan: Ensure a Harmonious & Dosha-Free Marriage"}</h1>
          <p className="text-[16px] md:text-[20px] text-white/100 mb-4 max-w-2xl mx-auto font-semibold drop-shadow-sm">{settings?.heroSubheading || "Premium Kundali Matching Report by India's Most Trusted Astrologer"}</p>

          <Link href="/report/kundali/kundali-matching/checkout" className="inline-block bg-white text-[#b06126] font-bold text-[15px] md:text-[18px] px-5 md:px-10 py-3 md:py-4 rounded-xl shadow-lg hover:scale-105 transition-transform mb-5">
            {settings?.heroCtaText || "Get Your Matching Report"} @ <span className="line-through text-[#3a1216] mx-1">₹{settings?.price || 1299}</span> ₹{settings?.discountedPrice || 649}
          </Link>

          {/* Happy Customers Avatars */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" />
            </div>
            <span className="text-white text-[13px] font-bold tracking-wide drop-shadow-sm">10 Lakh+ Happy Couples</span>
          </div>
        </div>
      </section>

      {/* ============ OVERLAPPING CARDS (MINIMAL/FLAT) ============ */}
      <div className="max-w-[1200px] mx-auto relative z-20 -mt-6 md:-mt-10 mb-8 md:mb-12 overflow-hidden">
        
        {/* Mobile Marquee */}
        <div className="md:hidden flex w-max animate-scroll gap-3 px-4 py-2 hover:[animation-play-state:paused]">
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
              <div className="bg-white rounded-[10px] shadow-sm px-4 py-2.5 flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                  <rect x="2" y="2" width="20" height="20" stroke="#f97316" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="6" stroke="#ef4444" strokeWidth="1.5" />
                  <path d="M12 2L12 22M2 12L22 12" stroke="#f97316" strokeWidth="1.5" />
                  <circle cx="12" cy="12" r="2" fill="#ef4444" />
                </svg>
                <span className="text-[#5c1a1f] font-bold text-[13px]">{settings?.featureCards?.[0] || "Ashtakoota Milan"}</span>
              </div>
              <div className="bg-white rounded-[10px] shadow-sm px-4 py-2.5 flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                  <path d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="17" r="2" fill="#ec4899" />
                  <circle cx="12" cy="8" r="3" stroke="#f472b6" strokeWidth="1.5" />
                  <path d="M7 10C7 7 9 5 12 5C15 5 17 7 17 10" stroke="#f472b6" strokeWidth="1.5" />
                  <path d="M5 14L8 12M19 14L16 12" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-[#5c1a1f] font-bold text-[13px]">{settings?.featureCards?.[1] || "Manglik Dosha Check"}</span>
              </div>
              <div className="bg-white rounded-[10px] shadow-sm px-4 py-2.5 flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                  <path d="M6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
                  <path d="M9 10H15M9 14H13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="6" r="1.5" fill="#b45309" />
                </svg>
                <span className="text-[#5c1a1f] font-bold text-[13px]">{settings?.featureCards?.[2] || "Detailed Remedies"}</span>
              </div>
              <div className="bg-white rounded-[10px] shadow-sm px-4 py-2.5 flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                  <circle cx="12" cy="10" r="7" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1.5" />
                  <path d="M8 20H16" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
                  <path d="M10 17L9 20M14 17L15 20" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M11 7L12 8M13 11L14 10" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="text-[#5c1a1f] font-bold text-[13px]">{settings?.featureCards?.[3] || "Financial Alignment"}</span>
              </div>
              <div className="bg-white rounded-[10px] shadow-sm px-4 py-2.5 flex items-center gap-2 shrink-0 border border-[#ebdcc7]/50">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 shrink-0">
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-20 12 12)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
                  <circle cx="12" cy="12" r="4" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
                  <circle cx="19" cy="9" r="1.5" fill="#3b82f6" />
                  <circle cx="4" cy="16" r="2" fill="#ef4444" />
                </svg>
                <span className="text-[#5c1a1f] font-bold text-[13px]">{settings?.featureCards?.[4] || "Mutual Harmony"}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Desktop Normal Grid */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center px-4">
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3.5 flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
              <rect x="2" y="2" width="20" height="20" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="6" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M12 2L12 22M2 12L22 12" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2" fill="#ef4444" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[0] || "Ashtakoota Milan"}</span>
          </div>
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3.5 flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
              <path d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="2" fill="#ec4899" />
              <circle cx="12" cy="8" r="3" stroke="#f472b6" strokeWidth="1.5" />
              <path d="M7 10C7 7 9 5 12 5C15 5 17 7 17 10" stroke="#f472b6" strokeWidth="1.5" />
              <path d="M5 14L8 12M19 14L16 12" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[1] || "Manglik Dosha Check"}</span>
          </div>
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3.5 flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
              <path d="M6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M9 10H15M9 14H13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="6" r="1.5" fill="#b45309" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[2] || "Detailed Remedies"}</span>
          </div>
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3.5 flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
              <circle cx="12" cy="10" r="7" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1.5" />
              <path d="M8 20H16" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 17L9 20M14 17L15 20" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 7L12 8M13 11L14 10" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[3] || "Financial Alignment"}</span>
          </div>
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3.5 flex items-center gap-3">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 shrink-0">
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-20 12 12)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="12" cy="12" r="4" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="19" cy="9" r="1.5" fill="#3b82f6" />
              <circle cx="4" cy="16" r="2" fill="#ef4444" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[4] || "Mutual Harmony"}</span>
          </div>
        </div>
      </div>

      {/* ============ EVERYTHING YOU NEED ============ */}
      <section className="pb-12 md:pb-16 bg-[#fdfaf6]">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-row items-start justify-center gap-4 md:gap-10">

          {/* Astrologer Profile */}
          <div className="flex flex-col items-center shrink-0 mt-1 md:mt-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-[3px] md:border-[4px] border-white shadow-md mb-1 bg-white flex items-center justify-center">
              <img src="/vaidiktalklogo.webp" alt="Vaidik Talk" className="w-[85%] h-[85%] object-contain" />
            </div>
            <span className="hidden md:block font-bold text-[#1a1a1a] text-[14px]">Vaidik Talk</span>
          </div>

          {/* Content & Tags */}
          <div className="text-left flex-1">
            <h2 className="text-[18px] sm:text-[22px] md:text-[26px] font-bold text-[#6b3112] mb-1 leading-tight">{settings?.highlightsHeading || "Everything You Need For A Happy Union"}</h2>
            <p className="text-[13px] md:text-[15px] text-[#6b3112]/80 font-medium mb-3 md:mb-4">{settings?.highlightsSubheading || "Deep insights into compatibility beyond just a 36-point score."}</p>

            <div className="grid grid-cols-3 md:flex md:flex-wrap gap-1.5 md:gap-2.5 w-full">
              {(() => {
                const tagsList = settings?.highlightTags?.length ? settings.highlightTags : ['Marriage', 'Doshas', 'Remedies', 'Longevity', 'Prosperity', 'Understanding', 'Varna', 'Nadi Check', 'Mutual Trust'];
                const icons = [Heart, ShieldCheck, Flower2, Plus, Star, BookOpen, Briefcase, Activity, CheckCircle2];
                return tagsList.map((tag: string, i: number) => {
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={i} className="bg-[#f26522] text-white px-1 md:px-4 py-1 md:py-1.5 rounded-full md:rounded-full font-bold text-[8.5px] sm:text-[10px] md:text-[13px] flex items-center justify-center md:justify-start gap-1 md:gap-1.5 shadow-sm overflow-hidden text-center">
                      <Icon className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 shrink-0" strokeWidth={2.5} />
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
            <img src={settings?.mockups?.pdf || "/images/vaidiktalk-kundli-mockup.webp"} alt="Premium Kundali Matching Report" className="w-full max-w-[470px] rounded-xl mix-blend-multiply" />
          </div>
          
          {/* Content */}
          <div className="w-full md:w-1/2 flex flex-col">
            
            {/* Mobile Title & Thumbnail Row */}
            <div className="flex items-center gap-4 mb-4 md:mb-3">
              {/* Mobile Thumbnail */}
              <div className="md:hidden shrink-0 w-[85px] sm:w-[100px] flex items-center justify-center">
                <img src={settings?.mockups?.pdf || "/images/vaidiktalk-kundli-mockup.webp"} className="w-full h-auto object-contain drop-shadow-md rounded-sm mix-blend-multiply" alt="Premium Kundali Matching" />
              </div>
              <h2 className="text-[22px] sm:text-3xl md:text-4xl font-serif font-bold text-[#5c1a1f] leading-tight">{settings?.productHeading || "Premium Kundali Matching Report"}</h2>
            </div>

            <p className="text-[#5c1a1f] text-[14px] md:text-[15px] leading-relaxed mb-6 font-medium whitespace-pre-wrap">
              {settings?.productDescription || "A comprehensive compatibility analysis focusing on the 8 Kootas, Manglik dosha presence, planetary friendships, and karmic alignment for a successful marriage."}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8">
              {(() => {
                const features = settings?.productFeatures?.length ? settings.productFeatures : [
                  'Detailed Gun Milan',
                  'In-depth Dosha Analysis',
                  'Financial Compatibility',
                  'Practical Remedies',
                  'Available in English, Hindi & More.'
                ];
                return features.map((feat: string, i: number) => (
                  <li key={i} className={`flex items-start gap-2.5 text-[#5c1a1f] text-[14px] font-bold ${(i === features.length - 1 && features.length % 2 !== 0) ? 'sm:col-span-2' : ''}`}>
                    <Check className="text-[#d68636] w-4 h-4 shrink-0 mt-0.5" strokeWidth={3} /> {feat}
                  </li>
                ));
              })()}
            </ul>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-[32px] md:text-[40px] font-bold text-[#5c1a1f]">₹{settings?.discountedPrice || 649}</span>
              <span className="text-lg text-[#3a1216] line-through font-medium">₹{settings?.price || 1299}</span>
              <span className="bg-[#e8ffd6] text-[#2e7d32] text-[12px] font-bold px-3 py-1 rounded-full border border-[#a5d6a7] uppercase tracking-wide ml-2 inline-flex items-center gap-1.5 shadow-sm"><span className="w-1.5 h-1.5 rounded-full bg-[#2e7d32] animate-pulse"></span> SPECIAL OFFER</span>
            </div>

            <Link href="/report/kundali/kundali-matching/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[16px] px-10 py-4 rounded-lg shadow-lg hover:bg-[#b06126] transition-colors w-full md:w-auto text-center">
              {settings?.imageSectionCtaText || "Get Your Premium Kundali Matching Report →"}
            </Link>
          </div>
        </div>
      </section>

      {/* ============ STATS ROW ============ */}
      <section className="border-y border-[#ebdcc7] py-10 bg-[#fdfaf6]">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center text-center gap-8 md:gap-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[22px] md:text-[26px] font-bold text-[#b07d54] mb-1">
              <ShieldCheck className="w-6 h-6" /> 10 Lakh+
            </div>
            <div className="text-[12px] text-gray-850 font-bold uppercase tracking-wider">Couples Guided</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#ebdcc7]"></div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[22px] md:text-[26px] font-bold text-[#b07d54] mb-1">
              <BookOpen className="w-6 h-6" /> 50+ Pages
            </div>
            <div className="text-[12px] text-gray-850 font-bold uppercase tracking-wider">Detailed Analysis</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#ebdcc7]"></div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[22px] md:text-[26px] font-bold text-[#b07d54] mb-1">
              <Star className="w-6 h-6 fill-current" /> 4.9/5
            </div>
            <div className="text-[12px] text-gray-850 font-bold uppercase tracking-wider">Average Rating</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#ebdcc7]"></div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[22px] md:text-[26px] font-bold text-[#b07d54] mb-1">
              <Heart className="w-6 h-6" /> Vedic
            </div>
            <div className="text-[12px] text-gray-850 font-bold uppercase tracking-wider">Authentic Method</div>
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
            <h2 className="text-[28px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-serif font-bold text-[#5c1a1f] mb-10 leading-tight xl:whitespace-nowrap">{settings?.whatItRevealsHeading || "What Your Matching Report Reveals"}</h2>

            <div className="space-y-6 mb-12">
              {(settings?.whatItReveals?.length ? settings.whatItReveals : [
                'Gun Milan & Ashtakoota Score Breakdown',
                'Manglik, Nadi, & Bhakut Dosha Check',
                'Emotional, Physical & Spiritual Harmony',
                'Financial Luck After Marriage',
                'Behavioral Traits & Compatibility',
                'Remedies for a Peaceful & Happy Union'
              ]).map((item: string, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <Check className="text-[#b06126] w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} />
                  <h4 className="font-medium text-[#5c1a1f] text-[16px] md:text-[18px] leading-snug">{item}</h4>
                </div>
              ))}
            </div>

            <a href="/report/kundali/kundali-matching/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[16px] px-10 py-4 rounded-xl shadow-md hover:bg-[#8c4d1e] transition-colors w-full md:w-auto text-center">
              {settings?.videoSectionCtaText || "Get Your Premium Kundali Matching Report →"}
            </a>
          </div>
        </div>
      </section>

      {/* ============ EXTRA CONTENT (RICH TEXT) ============ */}
      {settings?.extraContent && (
        <section className="py-12 bg-white border-t border-[#ebdcc7]">
          <div className="max-w-[1000px] mx-auto px-4">
            <div
              className="rich-content prose prose-lg prose-slate w-full max-w-none text-[#3a1216] text-[16px] leading-[1.8] break-words text-justify
                prose-headings:font-bold prose-headings:text-[#5c1a1f]
                prose-h2:text-[28px] prose-h2:mb-4
                prose-h3:text-[22px] prose-h3:text-[#d68636] prose-h3:mb-3
                prose-a:!text-[#d68636] prose-a:underline hover:prose-a:text-[#b06126]
                prose-img:rounded-xl prose-img:shadow-sm
                prose-strong:text-[#5c1a1f] prose-strong:font-bold
                prose-ul:list-disc prose-ol:list-decimal prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: settings.extraContent }}
            />
          </div>
        </section>
      )}

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
            <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c1a1f] mb-12">Watch Matching Insights</h2>

            <div className="relative overflow-hidden w-full group py-2">
              <div className="animate-scroll gap-6 md:gap-8 flex px-4">
                {[...validVideos, ...validVideos, ...validVideos, ...validVideos].map((v: any, i: number) => {
                  const ytId = getYoutubeVideoId(v.url);

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
      <section className="py-16 md:py-24 bg-[#f4ece3] overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-center text-[#d68636] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">REVIEWS</p>
          <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c1a1f] mb-12 text-center">Happy Couples</h2>

          <div className="relative overflow-hidden w-full group">
            <div className="animate-scroll gap-6 md:gap-8 flex pl-6">
              {[...testimonials, ...testimonials, ...testimonials, ...testimonials].map((t: any, i: number) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-transparent hover:border-[#ebdcc7] transition-all flex flex-col w-[300px] md:w-[350px] shrink-0">
                  <div className="flex gap-1 mb-5 text-[#d68636]">
                    {[...Array(5)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-850 text-[14px] leading-relaxed mb-8 flex-1 italic">"{t.review}"</p>
                  <div className="flex items-center gap-4 border-t border-gray-100 pt-5">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ backgroundColor: t.color || '#5c1a1f' }}>{t.initial}</div>
                    <div>
                      <h4 className="font-bold text-[#5c1a1f] text-[14px] leading-none mb-1">{t.name}</h4>
                      {t.city && <p className="text-[12px] text-gray-850">{t.city}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQS ============ */}
      <FaqSection faqs={faqList} />

      {/* ============ CTA / GET IT NOW ============ */}
      <section className="pt-16 pb-28 md:py-24 bg-[#fdfaf6] border-t border-[#ebdcc7]">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="premium-serif text-center text-[28px] md:text-[36px] font-bold text-[#5c1a1f] mb-4 leading-tight">Ready to Find Your Cosmic Match?</h2>
          <p className="text-center text-[#3a1216] text-[15px] md:text-[16px] mb-10 max-w-[600px] mx-auto">Get your Premium Kundali Matching Report today and understand the spiritual, emotional, and physical alignment with your partner.</p>
          <Link href="/report/kundali/kundali-matching/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[18px] px-12 py-4 rounded-xl shadow-[0_8px_20px_rgba(214,134,54,0.3)] hover:bg-[#b06126] transition-all hover:scale-105">
            {settings?.bottomCtaText || "Check Compatibility Now"}
          </Link>
        </div>
      </section>

      {/* ============ MOBILE STICKY BOTTOM CTA ============ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-[60] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Link href="/report/kundali/kundali-matching/checkout" className="flex items-center justify-center bg-[#b06126] text-white font-bold text-[16px] py-3.5 rounded-lg shadow-sm hover:bg-[#8c481c] transition-colors w-full">
          {settings?.stickyCtaText || "Get Your Premium Kundali Matching Report →"}
        </Link>
      </div>

    </div>
  );
}
