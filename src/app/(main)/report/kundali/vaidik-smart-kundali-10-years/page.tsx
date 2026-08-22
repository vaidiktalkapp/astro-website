import React from 'react';
import Link from 'next/link';
import LazyVideo from '@/components/LazyVideo';
import { FaqSection, ScreenshotGallery } from '@/components/ReportPageClient';
import {
  CheckCircle2, Star, BookOpen, FileText, Check, ShieldCheck, Heart, Briefcase, Activity, Flower2, PlayCircle,
  Plus
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchSettings() {
  try {
    const res = await fetch(`${API_URL}/smart-kundali-settings/vaidik-smart-kundali-10-years`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
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
    q: 'What is a Vaidik Smart Kundali for 10 Years?',
    content: [
      {
        type: 'p',
        text: 'A modern, digitally prepared astrological report that provides a comprehensive analysis of your horoscope along with detailed predictions for the next decade. It combines ancient Vedic astrology principles with advanced calculations and data analytics to provide accurate, personalised forecasts.'
      },
      {
        type: 'p',
        text: 'Prepared by expert astrologers at VaidikTalk, it covers all major aspects of your life — career, health, finance, relationships, education and spiritual growth. It also includes yearly planetary movements, Dasha periods, transits and personalised remedies for informed life decisions.'
      }
    ]
  },
  {
    q: 'How does a Vaidik Smart Kundali differ from a traditional Kundali?',
    content: [
      { type: 'p', text: 'While both are based on Vedic astrology, a Vaidik Smart Kundali is a next-generation horoscope analysis:' },
      {
        type: 'table',
        headers: ['Aspect', 'Traditional Kundali', 'Vaidik Smart Kundali (10 Years)'],
        rows: [
          ['Format', 'Handwritten or basic chart', 'Digitally designed with a modern layout'],
          ['Focus', 'Birth-time planetary positions', '10-year life prediction and Dasha analysis'],
          ['Technology', 'Manual calculations', 'Vedic astrology software + expert analysis'],
          ['Accessibility', 'Physical copy only', 'Available in digital and printed formats'],
          ['Features', 'Basic insights', 'Detailed yearly forecast, remedies and guidance']
        ]
      },
      { type: 'p', text: 'The Smart Kundali blends ancient wisdom with modern precision, providing a forward-looking view rather than static birth data.' }
    ]
  },
  {
    q: 'What does the Vaidik Smart Kundali include?',
    content: [
      {
        type: 'list',
        items: [
          'Detailed Birth Chart (Janma Kundali) with Lagna, Moon and Navamsa charts',
          'Planetary Positions and Strength Analysis',
          'Dasha-Bhukti (Mahadasha & Antardasha) interpretation for 10 years',
          'Annual Horoscope (Varshaphal) with year-wise guidance',
          'Transit Analysis (Gochar) of major planets',
          'Personalised Remedies (Mantras, Gemstones, Yantras, Pujas)',
          'Career, Finance, Relationship and Health Forecasts',
          'Favourable Time Periods for important decisions',
          'Astrological Do’s and Don’ts tailored for your chart'
        ]
      }
    ]
  },
  {
    q: 'How accurate are the predictions in the Vaidik Smart Kundali?',
    content: [
      { type: 'p', text: 'Accuracy depends on precise birth data, authentic Vedic algorithms, and expert astrologer interpretation. Charts use NASA-based planetary positions and manual verification.' },
      { type: 'p', text: 'Astrology indicates possibilities and karmic tendencies, so predictions are reliable guidance tools, not rigid certainties.' }
    ]
  },
  {
    q: 'What time period does the 10-year Vaidik Smart Kundali cover?',
    content: [
      { type: 'p', text: 'The Vaidik Smart Kundali provides forecasts for 10 continuous years from the preparation date. For example, a Kundali prepared in October 2025 will cover 2025–2035, helping plan career, finance, family and spiritual decisions with foresight.' }
    ]
  },
  {
    q: 'Who should get a Vaidik Smart Kundali for 10 Years?',
    content: [
      { type: 'p', text: 'Ideal for anyone seeking long-term clarity. Especially helpful for:' },
      {
        type: 'list',
        items: [
          'Students planning education or studies abroad',
          'Professionals aiming for career or business growth',
          'Couples planning marriage or family expansion',
          'Investors making financial decisions',
          'Individuals facing recurring challenges',
          'Spiritual seekers aligning karma with timing'
        ]
      }
    ]
  },
  {
    q: 'What remedies are suggested in the Vaidik Smart Kundali?',
    content: [
      {
        type: 'list',
        items: [
          'Mantra recitation for specific planets',
          'Gemstone recommendations',
          'Yantra suggestions',
          'Puja and ritual advice',
          'Fasting, donation, or lifestyle guidelines'
        ]
      },
      { type: 'p', text: 'Each remedy is designed to balance planetary energies and enhance life outcomes spiritually and scientifically.' }
    ]
  },
  {
    q: 'Is the Vaidik Smart Kundali available in digital formats?',
    content: [
      { type: 'p', text: 'Yes. It is available in PDF digital format accessible on phones, tablets, or computers. The report includes astrologer analysis for convenience and accuracy.' }
    ]
  },
  {
    q: 'How can I order or get my Vaidik Smart Kundali prepared?',
    content: [
      { type: 'p', text: 'Provide the following details via the VaidikTalk website or a consultation:' },
      {
        type: 'list',
        items: [
          'Full Name',
          'Date of Birth (DD/MM/YYYY)',
          'Exact Time of Birth',
          'Place of Birth (City, State, Country)'
        ]
      },
      { type: 'p', text: 'The astrologers prepare your 10-year Smart Kundali and deliver it digitally or in printed form within a few days.' }
    ]
  },
  {
    q: 'What are the benefits of having a Vaidik Smart Kundali for 10 Years?',
    content: [
      {
        type: 'list',
        items: [
          'Long-term clarity on life’s direction and opportunities',
          'Informed decision-making in career, finance, health and relationships',
          'Protection from Doshas through timely remedies',
          'Alignment with favourable planetary cycles for growth'
        ]
      }
    ]
  }
];

export default async function SmartKundaliPage() {
  const settings = await fetchSettings();

  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const defaultTestimonials = [
    {
      name: "Rahul Verma",
      city: "Delhi",
      date: "October 2025",
      review: "The 10-year Kundali gave me exactly what I needed—clarity. The predictions regarding my career switch and timing were incredibly accurate. Highly recommend it to anyone feeling stuck.",
      initial: "R",
      color: "#5c1a1f"
    },
    {
      name: "Sneha Patel",
      city: "Ahmedabad",
      date: "September 2025",
      review: "I was looking for something more than just basic astrology. The Smart Kundali provided a year-by-year breakdown of my finance and health. It’s beautifully designed and very easy to understand.",
      initial: "S",
      color: "#d97706"
    },
    {
      name: "Ankit Sharma",
      city: "Pune",
      date: "August 2025",
      review: "The dosha analysis and personalized remedies were an eye-opener. I downloaded the PDF and read it on my phone. The 30-page report is detailed and authentic.",
      initial: "A",
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

  // Build FAQ list for SSR
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
            <img src={settings.banner.url} alt="Vaidik Smart Kundali" className="w-full h-full object-cover object-center opacity-100" />
          ) : (
            <LazyVideo src="/smart%20kundali.mp4" className="w-full h-full object-cover object-center opacity-100" />
          )}
          {/* Gradient dark overlay for perfect text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/5 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 text-center mt-2">
          <h1 className="text-[28px] md:text-[48px] lg:text-[58px] font-bold mb-3 font-serif leading-tight text-white drop-shadow-md">{settings?.heroHeading || "Unlock the Secrets of Your Future"}</h1>
          <p className="text-[16px] md:text-[20px] text-white/100 mb-6 max-w-2xl mx-auto font-semibold drop-shadow-sm">{settings?.heroSubheading || "Premium Personalized Kundli by India's Most Trusted Astrologer"}</p>

          <Link href="/report/kundali/vaidik-smart-kundali-10-years/checkout" className="inline-block bg-white text-[#b06126] font-bold text-[16px] md:text-[18px] px-10 py-3.5 md:py-4 rounded-xl shadow-lg hover:scale-105 transition-transform mb-6">
            Get Your Kundali Now @ <span className="line-through text-[#3a1216] mx-1">₹1799</span> ₹649
          </Link>

          {/* Happy Customers Avatars */}
          <div className="flex items-center justify-center gap-3">
            <div className="flex -space-x-3">
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
              <img className="w-8 h-8 rounded-full border-2 border-[#4c2918] object-cover" src="https://randomuser.me/api/portraits/men/46.jpg" alt="User" />
            </div>
            <span className="text-white text-[13px] font-bold tracking-wide drop-shadow-sm">10 Lakh+ Happy Customers</span>
          </div>
        </div>
      </section>

      {/* ============ OVERLAPPING CARDS (MINIMAL/FLAT) ============ */}
      <div className="max-w-[1200px] mx-auto relative z-20 -mt-6 md:-mt-10 mb-8 md:mb-12 overflow-hidden">
        
        {/* Mobile Marquee */}
        <div className="md:hidden flex w-max animate-scroll gap-3 px-4 py-2 hover:[animation-play-state:paused]">
          {[1, 2].map((loop) => (
            <React.Fragment key={loop}>
              <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 .5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <rect x="2" y="2" width="20" height="20" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="6" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M12 2L12 22M2 12L22 12" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2" fill="#ef4444" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[0] || "Doshas & Their Impact"}</span>
          </div>

          
              <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 .5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="2" fill="#ec4899" />
              <circle cx="12" cy="8" r="3" stroke="#f472b6" strokeWidth="1.5" />
              <path d="M7 10C7 7 9 5 12 5C15 5 17 7 17 10" stroke="#f472b6" strokeWidth="1.5" />
              <path d="M5 14L8 12M19 14L16 12" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[1] || "Remedies"}</span>
          </div>

          
              <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 .5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M9 10H15M9 14H13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="6" r="1.5" fill="#b45309" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[2] || "250+ Page Kundli Report"}</span>
          </div>

          
              <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 .5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <circle cx="12" cy="10" r="7" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1.5" />
              <path d="M8 20H16" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 17L9 20M14 17L15 20" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 7L12 8M13 11L14 10" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[3] || "Personalized Insights"}</span>
          </div>

          
              <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 .5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-20 12 12)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="12" cy="12" r="4" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="19" cy="9" r="1.5" fill="#3b82f6" />
              <circle cx="4" cy="16" r="2" fill="#ef4444" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[4] || "Planetary Transits"}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Desktop Normal Grid */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center px-4">
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 lg:py-3.5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <rect x="2" y="2" width="20" height="20" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="6" stroke="#ef4444" strokeWidth="1.5" />
              <path d="M12 2L12 22M2 12L22 12" stroke="#f97316" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="2" fill="#ef4444" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[0] || "Doshas & Their Impact"}</span>
          </div>

          
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 lg:py-3.5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" />
              <circle cx="12" cy="17" r="2" fill="#ec4899" />
              <circle cx="12" cy="8" r="3" stroke="#f472b6" strokeWidth="1.5" />
              <path d="M7 10C7 7 9 5 12 5C15 5 17 7 17 10" stroke="#f472b6" strokeWidth="1.5" />
              <path d="M5 14L8 12M19 14L16 12" stroke="#ec4899" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[1] || "Remedies"}</span>
          </div>

          
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 lg:py-3.5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <path d="M6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M6 6C6 4.89543 6.89543 4 8 4H16C17.1046 4 18 4.89543 18 6" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M9 10H15M9 14H13" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="12" cy="6" r="1.5" fill="#b45309" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[2] || "250+ Page Kundli Report"}</span>
          </div>

          
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 lg:py-3.5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <circle cx="12" cy="10" r="7" fill="#e9d5ff" stroke="#a855f7" strokeWidth="1.5" />
              <path d="M8 20H16" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
              <path d="M10 17L9 20M14 17L15 20" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M11 7L12 8M13 11L14 10" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[3] || "Personalized Insights"}</span>
          </div>

          
          <div className="bg-white rounded-[14px] shadow-sm px-5 py-3 lg:py-3.5 flex items-center gap-3">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
              <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-20 12 12)" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="12" cy="12" r="4" fill="#fcd34d" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="19" cy="9" r="1.5" fill="#3b82f6" />
              <circle cx="4" cy="16" r="2" fill="#ef4444" />
            </svg>
            <span className="text-[#5c1a1f] font-bold text-[14.5px]">{settings?.featureCards?.[4] || "Planetary Transits"}</span>
        </div>
      </div>
      </div>

      <section className="pb-12 md:pb-16 bg-[#fdfaf6]">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-row items-start justify-center gap-6 md:gap-10">

          {/* Astrologer Profile */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-[4px] border-white shadow-md mb-2 bg-white flex items-center justify-center">
              <img src="/vaidiktalklogo.webp" alt="Vaidik Talk" className="w-[85%] h-[85%] object-contain" />
            </div>
            <span className="hidden md:block font-bold text-[#1a1a1a] text-[14px]">Vaidik Talk</span>
          </div>

          {/* Content & Tags */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#6b3112] mb-1">{settings?.highlightsHeading || "Everything You Need, In One Report"}</h2>
            <p className="text-[14px] md:text-[15px] text-[#6b3112]/80 font-medium mb-4">{settings?.highlightsSubheading || "Get personalized insights across all areas of your life"}</p>

            <div className="grid grid-cols-3 md:flex md:flex-wrap gap-1.5 md:gap-2.5 w-full">
              {(() => {
                const tagsList = settings?.highlightTags?.length ? settings.highlightTags : ['Marriage', 'Career', 'Business', 'Health', 'Finance', 'Education', 'Doshas', 'Remedies', 'Lucky Years'];
                const icons = [Heart, Briefcase, Activity, Plus, Star, BookOpen, ShieldCheck, Flower2, CheckCircle2];
                return tagsList.map((tag: string, i: number) => {
                  const Icon = icons[i % icons.length];
                  return (
                    <div key={i} className="bg-[#f26522] text-white px-1 md:px-4 py-1 md:py-1.5 rounded-md md:rounded-full font-bold text-[8.5px] sm:text-[10px] md:text-[13px] flex items-center justify-center md:justify-start gap-1 md:gap-1.5 shadow-sm overflow-hidden text-center">
                      <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
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
            <img src={settings?.mockups?.pdf || "/images/vaidiktalk-kundli-mockup.webp"} alt="Premium Personalised VaidikTalk Kundli" className="w-full max-w-[470px] rounded-xl mix-blend-multiply" />
          </div>
          
          {/* Content */}
          <div className="w-full md:w-1/2 flex flex-col">
            
            {/* Mobile Title & Thumbnail Row */}
            <div className="flex items-center gap-4 mb-4 md:mb-3">
              <div className="md:hidden shrink-0 w-[85px] sm:w-[100px] flex items-center justify-center">
                <img src={settings?.mockups?.pdf || "/images/vaidiktalk-kundli-mockup.webp"} alt="Premium Personalised VaidikTalk Kundli" className="w-full max-w-[470px] rounded-xl mix-blend-multiply" />
              </div>
              <h2 className="text-[22px] sm:text-3xl md:text-4xl font-serif font-bold text-[#5c1a1f] leading-tight">{settings?.productHeading || "Vaidik Smart Kundali (10 Years)"}</h2>
            </div>

            <p className="text-[#5c1a1f] text-[15px] leading-relaxed mb-6 font-medium whitespace-pre-wrap">
              {settings?.productDescription || "Explore your important life phases, planetary influences, and potential upcoming events over an extended 10-year period using traditional Vedic calculation techniques."}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 mb-8">
              {(() => {
                const features = settings?.productFeatures?.length ? settings.productFeatures : [
                  '10-Year Detailed Report',
                  'Comprehensive Dosha Analysis',
                  'Marriage & Career Guidance',
                  'Personalized Remedies & Rituals',
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
              <span className="text-[32px] md:text-[40px] font-bold text-[#5c1a1f]">₹649</span>
              <span className="text-lg text-[#3a1216] line-through font-medium">₹1799</span>
              <span className="bg-[#e8ffd6] text-[#2e7d32] text-[11px] font-bold px-2 py-1 rounded border border-[#a5d6a7] uppercase tracking-wide ml-2">SPECIAL</span>
            </div>

            <Link href="/report/kundali/vaidik-smart-kundali-10-years/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[16px] px-10 py-4 rounded-lg shadow-lg hover:bg-[#b06126] transition-colors w-full md:w-auto text-center">
              Get Your Kundali Now →
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
            <div className="text-[12px] text-gray-850 font-bold uppercase tracking-wider">Lives Transformed</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#ebdcc7]"></div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[22px] md:text-[26px] font-bold text-[#b07d54] mb-1">
              <BookOpen className="w-6 h-6" /> 100+ Pages
            </div>
            <div className="text-[12px] text-gray-850 font-bold uppercase tracking-wider">Detailed Horoscope</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#ebdcc7]"></div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[22px] md:text-[26px] font-bold text-[#b07d54] mb-1">
              <Star className="w-6 h-6 fill-current" /> 4.8/5
            </div>
            <div className="text-[12px] text-gray-850 font-bold uppercase tracking-wider">Average Rating</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-[#ebdcc7]"></div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[22px] md:text-[26px] font-bold text-[#b07d54] mb-1">
              <Heart className="w-6 h-6" /> Featured
            </div>
            <div className="text-[12px] text-gray-850 font-bold uppercase tracking-wider">In Top Media</div>
          </div>
        </div>
      </section>

      {/* ============ WHAT IT REVEALS ============ */}
      <section className="py-16 md:py-24 bg-[#fdfaf6]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-[45%] lg:w-[40%] xl:-ml-6">
            <LazyVideo
              src={settings?.video?.url || "/vaidik video.mp4"}
              className="w-full rounded-[2rem] shadow-lg object-cover aspect-square md:aspect-[4/4.5]"
            />
          </div>
          <div className="md:w-[55%] lg:w-[60%] md:pl-6 lg:pl-10">
            <h2 className="text-[28px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-serif font-bold text-[#5c1a1f] mb-10 leading-tight xl:whitespace-nowrap">{settings?.whatItRevealsHeading || "What Your 10-Year Kundali Reveals"}</h2>

            <div className="space-y-6 mb-12">
              {(settings?.whatItReveals?.length ? settings.whatItReveals : [
                'Career Growth & Professional Path',
                'Wealth, Income & Financial Success',
                'Relationships, Marriage & Social Bonds',
                'Health Trends & Physical Well-being',
                'Education & Academic Milestones',
                'Travel & Major Life Decisions'
              ]).map((item: string, i: number) => (
                <div key={i} className="flex gap-4 items-start">
                  <Check className="text-[#b06126] w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} />
                  <h4 className="font-medium text-[#5c1a1f] text-[16px] md:text-[18px] leading-snug">{item}</h4>
                </div>
              ))}
            </div>

            <a href="/report/kundali/vaidik-smart-kundali-10-years/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[16px] px-10 py-4 rounded-xl shadow-md hover:bg-[#8c4d1e] transition-colors w-full md:w-auto text-center">
              Get Your Kundali Now →
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
            <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c1a1f] mb-12">Watch Kundali Insights</h2>

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
      <section className="py-16 md:py-24 bg-[#f4ece3] overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-center text-[#d68636] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">REVIEWS</p>
          <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c1a1f] mb-12 text-center">Real Devotee Experiences</h2>

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
          <h2 className="premium-serif text-center text-[28px] md:text-[36px] font-bold text-[#5c1a1f] mb-4 leading-tight">Ready to Reveal Your Future?</h2>
          <p className="text-center text-[#3a1216] text-[15px] md:text-[16px] mb-10 max-w-[600px] mx-auto">Get your Premium Personalized 10-Year Vaidik Kundali today and gain crystal clear insights into your career, marriage, and wealth.</p>
          <Link href="/report/kundali/vaidik-smart-kundali-10-years/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[18px] px-12 py-4 rounded-xl shadow-[0_8px_20px_rgba(214,134,54,0.3)] hover:bg-[#b06126] transition-all hover:scale-105">
            Unlock Your Future Now
          </Link>
        </div>
      </section>

      {/* ============ MOBILE STICKY BOTTOM CTA ============ */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-[60] shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <Link href="/report/kundali/vaidik-smart-kundali-10-years/checkout" className="flex items-center justify-center bg-[#b06126] text-white font-bold text-[16px] py-3.5 rounded-lg shadow-sm hover:bg-[#8c481c] transition-colors w-full">
          Get Your Report →
        </Link>
      </div>

    </div>
  );
}