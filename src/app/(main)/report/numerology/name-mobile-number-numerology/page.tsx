'use client';
import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { useReportBooking } from '../../../../../hooks/useReportBooking';
import LocationInput from '@/components/ui/LocationInput';
import {
  Calendar,
  BarChart3,
  ShieldCheck,
  User,
  Briefcase,
  GraduationCap,
  Heart,
  Activity,
  ArrowRight,
  Star,
  Compass,
  Check,
  Gift,
  X,
  Clock,
  BookOpen,
  Feather,
  Sparkles,
  Users,
  FileText,
  Layers,
  ChevronDown
} from 'lucide-react';

type ContentBlock =
  | { type: 'p'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] };

interface FaqItem {
  q: string;
  content: ContentBlock[];
}

interface ReportSection {
  heading: string;
  blocks: ContentBlock[];
}

const reportSections: ReportSection[] = [
  {
    heading: 'Overview',
    blocks: [
      { type: 'p', text: 'At VaidikTalk, we bring you a Complete Name & Mobile Number Numerology Report — a powerful, personalized guide that dives deep into your number blueprint to help you realign your energies and unlock your full potential. The goal is to achieve a complete understanding about how planetary forces impact all aspects of human existence including work, social bonds, and money management.' },
      { type: 'p', text: 'A small change in your name or number can lead to a big shift in your energy and life path. Change your number, shift your vibration. Let your phone number become a source of strength, not struggle. The document presents remedies together with observations which match the typical conditions of daily human life.' }
    ]
  },
  {
    heading: 'Product Highlights',
    blocks: [
      { type: 'p', text: "The report uses classical methods to assess personal birth details through its birth data evaluation process. The layout of the document presents planetary combinations as the central focus which affects both daily choices and major life decisions." },
      { type: 'p', text: "People search for Best price lal kitab while they assess various astrological options. The report's importance depends on two factors which are the precise calculations and the organized presentation of planetary analysis results presented in a way that reflects practical application rather than symbolic interpretation." }
    ]
  },
  {
    heading: 'Report Specifications',
    blocks: [
      {
        type: 'list', items: [
          'Product Name: Name & Mobile Number (Report & Rectification) Numerology',
          'Product Type: Personalized horoscope report',
          'Methodology: Traditional Name & Mobile Number (Report & Rectification) Numerology principles',
          'Basis: Individual birth details',
          'Format: Structured digital report',
          'Focus Areas: Career, Finance, Relationships, Stability',
          'Remedies: Tips for modifying lifestyles'
        ]
      }
    ]
  },
  {
    heading: 'Analytical Framework',
    blocks: [
      { type: 'p', text: 'The content of the book results from an evaluation of planetary positions through birth chart analysis which experts use to interpret Name & Mobile Number (Report & Rectification) Numerology. The arrangement of planetary houses plays an important role in understanding situational tendencies.' },
      { type: 'p', text: 'People who choose lal kitab online solutions usually want simplified information which they can apply to their actual life situations. The book presents a practical method to explain planetary positions through demonstration of their real-world applications.' }
    ]
  },
  {
    heading: 'Personalization Process',
    blocks: [
      { type: 'p', text: 'The creation of each report starts with the birth details which people have submitted for examination. The personal planetary arrangements of the individual require direct connection for proper interpretation.' },
      { type: 'p', text: 'People who want accessible astrological guidance without needing traditional consultation methods prefer to Shop Name & Mobile Number (Report & Rectification) Numerology online. The report format enables readers to understand its content through simple language which requires no specialized knowledge to comprehend.' }
    ]
  },
  {
    heading: 'Structural Composition',
    blocks: [
      { type: 'p', text: 'The document contains findings which demonstrate how planetary forces affect both their position and their recommended behavior changes. The solutions which have been provided to us serve as essential tools which people need to establish balance throughout their daily lives.' },
      { type: 'p', text: 'The text describes planetary alignments by showing how current situations affect their occurrence but not their ability to forecast events. The reader can connect the text to his or her personal situation through this method of presentation.' }
    ]
  },
  {
    heading: 'Practical Relevance',
    blocks: [
      { type: 'p', text: 'People who want to use astrology for their everyday decisions choose the Lal kitab as their preferred book. The report tries to deliver unbiased results which match with everyday situations.' },
      { type: 'p', text: 'The document specifically identifies emerging trends which need monitoring while it avoids making general predictions about the future. The method enables people to assess their personal situations through an organized framework.' }
    ]
  },
  {
    heading: 'Application Areas',
    blocks: [
      {
        type: 'list', items: [
          'Planning for a bright career',
          'Manage financial stability',
          'Relationship Stability',
          'Environmental Balance',
          'Routine Decision Making'
        ]
      },
      { type: 'p', text: 'The report recommends solutions which people can follow through with basic changes to their daily habits. The elements are present to create equilibrium but need no intensive procedural compliance.' }
    ]
  },
  {
    heading: 'Planetary Observations',
    blocks: [
      { type: 'p', text: 'The evaluation of planetary positions starts with their assessment to determine the appropriate assignment. The research findings use a framework to show how people normally make decisions and behave socially when they encounter different environmental situations.' },
      { type: 'p', text: 'The assessment uses practical language to describe results that stem from its evaluation process. The purpose of this program is to help people understand how planetary forces affect their everyday activities which include work, management of financial stability, and social relationships.' }
    ]
  },
  {
    heading: 'Remedial Recommendations',
    blocks: [
      { type: 'p', text: 'The book provides solutions which require people to change their behavior or their environmental conditions instead of using traditional ceremonial methods. The solutions involve basic adjustments which include changes in daily activities and specific item placement within personal spaces with the control of certain everyday activities.' },
      { type: 'p', text: 'The remedies present their implementation process through sequential steps which enable users to execute the solution without needing extra support.' }
    ]
  },
  {
    heading: 'Benefits',
    blocks: [
      { type: 'p', text: 'The report provides details about planetary motion which affects all areas of human existence. The document functions as an organized guide for people who want to use astrology in a methodical way.' },
      { type: 'p', text: 'The document keeps its personal format to create a clear understanding for readers who would become confused by generic reports. The arrangement of insights aims to support a consistent understanding of situational influences.' }
    ]
  },
  {
    heading: 'Ideal For',
    blocks: [
      {
        type: 'list', items: [
          'Professionals',
          'Students',
          'Business Owners',
          'Householders',
          'Individuals Interested in Structured Astrological Guidance'
        ]
      }
    ]
  }
];

const faqData: FaqItem[] = [
  {
    q: 'What is a Personalised Name & Mobile Number (Report & Rectification) Numerology?',
    content: [
      { type: 'p', text: 'A Personalised Name & Mobile Number (Report & Rectification) Numerology is an individualised astrological report based on the unique planetary positions in your birth chart, interpreted using Name & Mobile Number (Report & Rectification) Numerology principles. It focuses on karmic causes of life events and prescribes simple yet powerful remedies to balance planetary energies.' },
      { type: 'p', text: 'The term \u201cName & Mobile Number (Report & Rectification) Numerology\u201d means \u201cThe Red Book\u201d \u2014 containing ancient astrological wisdom that connects life with deeds (karma). Using your exact date, time, and place of birth, astrologers prepare a customised report offering precise insights and remedies tailored to your horoscope.' }
    ]
  },
  {
    q: 'How is Name & Mobile Number (Report & Rectification) Numerology different from traditional Vedic astrology?',
    content: [
      { type: 'p', text: 'While both share planetary science roots, their methods differ significantly:' },
      {
        type: 'table', headers: ['Aspect', 'Vedic Astrology', 'Name & Mobile Number (Report & Rectification) Numerology Astrology'], rows: [
          ['Focus', 'Planetary strength, yogas, and doshas', 'Karmic causes and behavioural patterns'],
          ['Remedies', 'Pujas, gemstones, mantras', 'Simple household and charity-based remedies'],
          ['Charts Used', 'Divisional charts, Nakshatras', 'House-based horoscope (simplified)'],
          ['Interpretation', 'Spiritual and cosmic', 'Practical and result-oriented']
        ]
      },
      { type: 'p', text: 'Thus, Name & Mobile Number (Report & Rectification) Numerology is known for its practicality and real-life applications.' }
    ]
  },
  {
    q: 'What details are required to prepare a Personalised Name & Mobile Number (Report & Rectification) Numerology?',
    content: [
      { type: 'list', items: ['Full Name', 'Date of Birth (DD/MM/YYYY)', 'Exact Time of Birth', 'Place of Birth (City, State, Country)'] },
      { type: 'p', text: 'Using these details, astrologers prepare your unique Name & Mobile Number (Report & Rectification) Numerology chart, interpret it, and provide personalised remedies and predictions.' }
    ]
  },
  {
    q: 'What kind of insights does a Personalised Name & Mobile Number (Report & Rectification) Numerology offer?',
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
    q: 'What are Name & Mobile Number (Report & Rectification) Numerology remedies, and how do they work?',
    content: [
      { type: 'p', text: 'Name & Mobile Number (Report & Rectification) Numerology remedies (Upaay) are simple and powerful karmic corrections. They include:' },
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
    q: 'Is Name & Mobile Number (Report & Rectification) Numerology astrology scientific or spiritual?',
    content: [
      { type: 'p', text: 'Name & Mobile Number (Report & Rectification) Numerology blends science, logic, and spirituality. It simplifies planetary analysis into house-based systems and uses karmic remedies for energy correction and psychological healing \u2014 creating spiritual and practical balance.' }
    ]
  },
  {
    q: 'What are the benefits of having a Personalised Name & Mobile Number (Report & Rectification) Numerology report?',
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
    q: 'Can Name & Mobile Number (Report & Rectification) Numerology remedies remove doshas like Manglik or Kaal Sarp Dosh?',
    content: [
      { type: 'p', text: 'Yes, Name & Mobile Number (Report & Rectification) Numerology remedies can help reduce doshas like Manglik, Kaal Sarp, or Shani Dosh. Remedies include donations, feeding the poor, or offering oil to Shani temples \u2014 focusing on karma correction rather than costly rituals.' }
    ]
  },
  {
    q: 'How frequently should one consult their Personalised Name & Mobile Number (Report & Rectification) Numerology?',
    content: [
      { type: 'p', text: 'It\u2019s ideal to review your Name & Mobile Number (Report & Rectification) Numerology every 5\u20137 years or during major life transitions like marriage, job change, or health shifts. Planetary positions remain fixed, but Dasha periods change life patterns \u2014 making updates essential.' }
    ]
  },
  {
    q: 'Where can one get an authentic Personalised Name & Mobile Number (Report & Rectification) Numerology prepared?',
    content: [
      { type: 'p', text: 'For authentic reports, consult expert Name & Mobile Number (Report & Rectification) Numerology astrologers. VaidikTalk offers accurate, personalised Name & Mobile Number (Report & Rectification) Numerology reports prepared using your complete birth details, including:' },
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

export default function LalKitabPage() {
  
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const [settings, setSettings] = useState<any>(null);

  const { formData, handleChange, handleSubmit, isProcessing } = useReportBooking({
    name: 'Name & Mobile Numerology',
    slug: 'name-mobile-number-numerology',
    amount: settings?.price || settings?.discountedPrice || 399,
  });
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get('/smart-kundali-settings/name-mobile-number-numerology');
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    fetchSettings();
  }, []);

  // Fallback default values
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
    { url: '/images/kundali-page-3.jpg' },
    { url: '/images/kundali-page-4.jpg' },
    { url: '/images/kundali-page-5.jpg' }
  ];
  const video = settings?.video || { url: '', thumbnail: '/images/kundali-video-thumb.jpg' };
  const samplePdf = settings?.samplePdf;




  const Kicker = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="w-2 h-2 bg-[#d4af37] rotate-45"></div>
      <span className="text-[11.5px] tracking-[2.5px] uppercase text-[#761e27] font-bold">{text}</span>
      <div className="w-2 h-2 bg-[#d4af37] rotate-45"></div>
    </div>
  );

  const SectionHeading = ({ title, sub }: { title: string; sub?: string }) => (
    <div className="text-center mb-8 md:mb-10 px-2">
      <h2 className="premium-serif text-[26px] md:text-[36px] font-bold text-[#5c1a1f] mb-3 md:mb-4 leading-tight">{title}</h2>
      {sub && <p className="text-gray-850 text-[15px] md:text-[17px] max-w-[560px] mx-auto leading-relaxed">{sub}</p>}
    </div>
  );

  const ContentBlocks = ({ blocks }: { blocks: ContentBlock[] }) => (
    <div className="text-gray-850 text-[14.5px] md:text-[15.5px] leading-relaxed space-y-4">
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return <p key={i}>{block.text}</p>;
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2.5 items-start">
                  <span className="text-[#d4af37] font-bold flex-shrink-0 mt-[1px]">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'table') {
          return (
            <div key={i} className="overflow-x-auto border border-[#ebdcc7] rounded-md">
              <table className="w-full text-left border-collapse min-w-[420px]">
                <thead>
                  <tr className="bg-[#5c1a1f]">
                    {block.headers.map((h, hi) => (
                      <th key={hi} className="text-[#d4af37] text-[11.5px] md:text-[12.5px] font-bold uppercase tracking-wide px-3 py-2.5 whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? 'bg-white' : 'bg-[#fffdf8]'}>
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-3 py-2.5 text-[13px] md:text-[13.5px] border-t border-[#ebdcc7] ${ci === 0 ? 'font-bold text-[#5c1a1f] whitespace-nowrap' : ''}`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-transparent font-sans text-gray-850 relative selection:bg-[#ee6c1e] selection:text-white">

      {/* ============ HERO ============ */}
      <section className="relative w-full min-h-[550px] lg:min-h-[600px] flex flex-col md:flex-row md:items-center overflow-hidden pt-12 md:py-20 z-10">
        <div className="absolute inset-0 z-0 hidden lg:flex justify-end pointer-events-none">
          <img
            src={settings?.banner?.url || "/images/name-numerology.webp"}
            alt="Name & Mobile Number (Report & Rectification) Numerology"
            className="h-full lg:w-[45%] object-cover object-center mix-blend-multiply opacity-95 lg:-translate-x-1"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)' }}
          />
        </div>

        <div className="relative z-20 w-full px-5 md:px-10 mx-auto max-w-[1300px] flex-shrink-0 md:-mt-8 lg:-mt-12">
          <div className="max-w-[650px] lg:max-w-[750px]">
            <div className="inline-block bg-[#f6e2c8] text-[#8a4410] text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full mb-4 md:mb-5 shadow-sm uppercase tracking-wider">
              WHAT IS NAME & MOBILE NUMEROLOGY?
            </div>
            <h1 className="premium-serif font-bold text-[#5c1420] text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.2] mb-4 md:mb-6 relative z-10 whitespace-normal">
              Name & Mobile Number (Report & Rectification) Numerology
            </h1>
            <p className="text-[15.5px] sm:text-[17px] md:text-[19px] text-[#412a1e] font-medium leading-[1.6] mb-6 md:mb-8 max-w-[560px]">
              Have you ever felt like something invisible is blocking your success, draining your energy, or creating repeated challenges in your personal or professional life? It might not be bad luck — it could be your name or mobile number vibration working against you.
            </p>

            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-7 flex-wrap">
              <div className="flex items-baseline gap-2 md:gap-3">
                <span className="premium-serif text-[36px] md:text-[42px] font-bold text-[#5c1420]">₹{settings?.discountedPrice || 399}</span>
                {settings?.price > 0 && <span className="text-[16px] md:text-[18px] text-[#8a4410] opacity-70 line-through">₹{settings.price}</span>}
              </div>
              {settings?.price > 0 && settings?.discountedPrice > 0 && (
                <span className="text-[10px] md:text-[11.5px] border border-[#d97706] text-[#d97706] px-2 md:px-3 py-1 font-bold tracking-wider uppercase bg-[#d97706]/10 rounded">
                  SAVE {Math.round(((settings.price - settings.discountedPrice) / settings.price) * 100)}%
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <a href="#order-form" className="inline-flex justify-center items-center gap-2 bg-[#8a1c2a] text-white font-semibold text-[15.5px] px-8 py-3.5 md:py-4 rounded-xl shadow-md hover:bg-[#721522] transition-colors w-full sm:w-auto">
                Book Now <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#faqSection" className="inline-flex justify-center items-center gap-2 bg-white/90 backdrop-blur-sm text-[#8a1c2a] border-[1.5px] border-[#8a1c2a] font-semibold text-[15.5px] px-8 py-3.5 md:py-4 rounded-xl shadow-sm hover:bg-white transition-colors w-full sm:w-auto">
                Read FAQs
              </a>
            </div>
          </div>

          <div className="block lg:hidden mt-12 mb-4">
            <img
              src="/images/name-numerology.webp"
              alt="Name & Mobile Number (Report & Rectification) Numerology"
              className="w-full max-w-[500px] mx-auto h-auto object-contain drop-shadow-xl rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* ============ INTRO ============ */}
      <section className="py-16 md:py-24 bg-transparent">
        <div className="max-w-[1140px] mx-auto px-6 flex flex-col md:flex-row gap-6 md:gap-12 items-start">
          <div className="premium-serif text-[70px] md:text-[100px] leading-none font-bold text-[#d4af37] opacity-30 flex-shrink-0 md:w-[140px]">
            01
          </div>
          <div className="flex-1">
            <h2 className="premium-serif text-[26px] md:text-[36px] font-bold text-[#5c1a1f] mb-4 md:mb-6">
              Name & Mobile Number Numerology Report
            </h2>
            <div className="space-y-4 text-gray-850 text-[15.5px] md:text-[17px] leading-relaxed">
              <p>
                At VaidikTalk, we bring you a Complete Name & Mobile Number Numerology Report — a powerful, personalized guide that dives deep into your number blueprint to help you realign your energies and unlock your full potential.
              </p>
              <p>
                A small change in your name or number can lead to a big shift in your energy and life path. Change your number, shift your vibration. Let your phone number become a source of strength, not struggle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ REPORT SECTIONS ============ */}
      <section className="py-16 md:py-24 bg-[#fffdf8] border-y border-[#ebdcc7]">
        <Kicker text="Understanding The Report" />
        <SectionHeading title="How Name & Mobile Number Numerology Report Works" />
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
            {reportSections.map((section, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-[#ebdcc7] p-6 md:p-8 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:border-[#d4af37] transition-all duration-300 relative overflow-hidden flex flex-col h-full"
              >
                {/* Decorative background element on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#fffdf8] to-transparent border-l border-b border-[#ebdcc7]/30 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="flex gap-4 md:gap-5 mb-5 md:mb-6 relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#fffdf8] border border-[#d4af37] text-[#8a1c2a] flex items-center justify-center font-bold text-[16px] md:text-[18px] premium-serif shadow-sm shrink-0 group-hover:bg-[#8a1c2a] group-hover:text-white transition-colors duration-300">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-[18px] md:text-[22px] font-bold text-[#5c1a1f] leading-tight pt-1 md:pt-2">{section.heading}</h3>
                </div>

                <div className="relative z-10">
                  <ContentBlocks blocks={section.blocks} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS (PROCESS) ============ */}
      <section className="py-16 md:py-24">
        <Kicker text="Process" />
        <SectionHeading title="How it works" />
        <div className="max-w-[1140px] mx-auto px-6 mt-8 md:mt-12">
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-4 md:gap-4">
            <div className="hidden md:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-[#ebdcc7] z-0"></div>
            {[
              { step: 1, title: 'Fill the Form', desc: 'Submit all the required details carefully through the online form.' },
              { step: 2, title: 'Make Payment', desc: 'Complete payment securely using our trusted payment gateway.' },
              { step: 3, title: 'Receive Report', desc: 'Your handwritten Kundali is prepared and delivered to you.' },
              { step: 4, title: 'Implement Remedies', desc: 'Follow the suggested remedies for positive life transformation.' },
            ].map((item, i) => (
              <div key={i} className="text-center relative z-10">
                <div className="premium-serif w-[45px] h-[45px] md:w-[60px] md:h-[60px] rounded-full bg-[#fffdf8] border-[2px] border-[#761e27] text-[#761e27] flex items-center justify-center mx-auto mb-3 md:mb-5 text-[18px] md:text-[24px] font-bold shadow-sm">
                  {item.step}
                </div>
                <h4 className="text-[15.5px] md:text-[18px] font-bold text-[#5c1a1f] mb-1.5 md:mb-3">{item.title}</h4>
                <p className="text-gray-850 text-[13.5px] md:text-[15px] max-w-[220px] mx-auto leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FORM SHELL ============ */}
      <section className="py-16 md:py-24 bg-[#fffdf8] border-y border-[#ebdcc7]" id="order-form">
        <div className="max-w-[1140px] mx-auto px-4 md:px-6">
          <div className="bg-white max-w-[700px] mx-auto p-6 md:p-12 border border-[#ebdcc7] border-t-[4px] border-t-[#d4af37] shadow-[0_10px_40px_rgba(0,0,0,0.05)] rounded-lg">
            <Kicker text="Get Started" />
            <h2 className="premium-serif text-center text-[28px] md:text-[34px] font-bold text-[#5c1a1f] mb-2 md:mb-3 leading-tight">Fill the Form Below</h2>
            <p className="text-center text-gray-850 text-[15px] md:text-[16px] mb-8 md:mb-12">Kindly provide accurate information for more precise calculations</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">Full Name *</label>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors" placeholder="Full Name" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">Gender *</label>
                  <select required name="gender" value={formData.gender} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors">
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">Date of Birth *</label>
                  <input required type="date" name="dob" value={formData.dob} onChange={handleChange} onClick={(e) => e.currentTarget.showPicker && e.currentTarget.showPicker()} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors cursor-pointer" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">Time of Birth *</label>
                  <input required type="time" name="tob" value={formData.tob} onChange={handleChange} onClick={(e) => e.currentTarget.showPicker && e.currentTarget.showPicker()} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors cursor-pointer" />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">Place of Birth *</label>
                  <LocationInput required name="pob" value={formData.pob} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors" placeholder="Place Of Birth" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">Country of Birth *</label>
                  <input required type="text" name="country" value={formData.country} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors" placeholder="Country Of Birth" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">State of Birth *</label>
                  <input required type="text" name="state" value={formData.state} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors" placeholder="State Of Birth" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">Report Language *</label>
                  <input required type="text" name="language" value={formData.language} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors" placeholder="Report Language" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">Email *</label>
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors" placeholder="Email" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-[#3a1216] tracking-[0.5px] uppercase">Phone No. *</label>
                  <input required type="tel" maxLength={10} pattern="[0-9]{10}" onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }} name="phone" value={formData.phone} onChange={handleChange} className="w-full border-b-[1.5px] border-[#ebdcc7] py-2.5 px-1 bg-transparent outline-none focus:border-[#761e27] text-[15px] transition-colors" placeholder="Phone No." />
                </div>
              </div>

              <div>
                <button type="submit" disabled={isProcessing} className="w-full bg-[#d4af37] hover:bg-[#c29f2f] text-[#3a1216] font-bold text-[17px] py-4 rounded-md transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
                  {isProcessing ? 'Processing...' : `Submit & Proceed to Payment — ₹${settings?.discountedPrice || 399}`}
                </button>
                <p className="text-center text-[13.5px] text-gray-850 mt-5">
                  Your details are used only to prepare your Name & Mobile Number (Report & Rectification) Numerology report and are kept confidential.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="py-16 md:py-24">
        <Kicker text="The Difference" />
        <SectionHeading title="Why Choose Name & Mobile Number Numerology Report?" />
        <div className="max-w-[1140px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#ebdcc7]">

            <div className="bg-[#fffdf8]">
              <div className="p-6 md:p-8 border-b border-[#ebdcc7]">
                <strong className="premium-serif block text-[22px] md:text-[24px] font-bold text-[#5c1a1f] mb-1">Common Problems</strong>
                <span className="text-[13px] md:text-[14px] text-gray-850">Problems with Generic Name & Mobile Number Analysis</span>
              </div>
              <ul className="p-6 md:p-8 space-y-4 md:space-y-5">
                {[
                  'Only checks total number, ignores vibrations',
                  'No linkage with birth date or destiny number',
                  'Random spelling changes without logic',
                  'No explanation of emotional or financial impact',
                  'Does not guide which numbers to avoid'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 md:gap-4 text-[15px] md:text-[16px] text-gray-850 items-start">
                    <X className="w-4 h-4 md:w-5 md:h-5 text-red-700 flex-shrink-0 mt-0.5 md:mt-1" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border-t md:border-t-0 md:border-l border-[#ebdcc7]">
              <div className="p-6 md:p-8 border-b border-[#ebdcc7] bg-[#5c1a1f]">
                <strong className="premium-serif block text-[22px] md:text-[24px] font-bold text-[#d4af37] mb-1">Name & Mobile Number (Report & Rectification) Numerology</strong>
                <span className="text-[13px] md:text-[14px] text-[#e8d8c0]">Name & Mobile Number Numerology Report Features</span>
              </div>
              <ul className="p-6 md:p-8 space-y-4 md:space-y-5">
                {[
                  'Advanced Chaldean + Vedic numerology analysis',
                  'Name compatibility with Life Path & Destiny numbers',
                  'Mobile number impact on money, peace & success',
                  'Accurate name spelling & lucky number suggestions',
                  'Helps remove energetic blocks & attract growth'
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 md:gap-4 text-[15px] md:text-[16px] text-gray-850 font-medium items-start">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-green-700 flex-shrink-0 mt-0.5 md:mt-1" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ============ WHY CHOOSE + HARMONIOUS UNION ============ */}
      <section className="py-16 md:py-24 bg-[#fffdf8] border-y border-[#ebdcc7]">
        <Kicker text="Good to Know" />
        <SectionHeading title="Why Choose This Report" />
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-[1px] bg-[#ebdcc7] border border-[#ebdcc7]">

            <div className="flex-1 bg-white p-6 md:p-10">
              <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-[#d4af37] mb-4 md:mb-5" strokeWidth={1.5} />
              <h3 className="text-[18px] md:text-[20px] font-bold text-[#5c1a1f] mb-3 md:mb-4">🔮 Practical Understanding</h3>
              <ul className="space-y-2 md:space-y-3 text-gray-850 text-[15px] md:text-[16px]">
                <li className="relative pl-5 md:pl-6 before:content-['—'] before:absolute before:left-0 before:text-[#d4af37] leading-relaxed">With VaidikTalk’s expert-guided numerology reports, you gain the awareness and tools to realign your life path.</li>
                <li className="relative pl-5 md:pl-6 before:content-['—'] before:absolute before:left-0 before:text-[#d4af37] leading-relaxed">Whether you’re launching a career, starting a relationship, or just seeking peace — these reports can guide your next step.</li>
                <li className="relative pl-5 md:pl-6 before:content-['—'] before:absolute before:left-0 before:text-[#d4af37] leading-relaxed">You are not stuck. Your numbers might be. Let's align them.</li>
              </ul>
            </div>

            <div className="flex-1 bg-white p-6 md:p-10">
              <Gift className="w-7 h-7 md:w-8 md:h-8 text-[#d4af37] mb-4 md:mb-5" strokeWidth={1.5} />
              <h3 className="text-[18px] md:text-[20px] font-bold text-[#5c1a1f] mb-2 md:mb-3">🌟 Gifting Consideration</h3>
              <p className="text-gray-850 text-[15px] md:text-[16px] leading-relaxed mb-3">
                A personalized astrological report may also be considered as a gift for individuals who appreciate traditional frameworks for life planning. The document contains personal information about the person's celestial body positions which serves as educational material.
              </p>
              <p className="text-gray-850 text-[15px] md:text-[16px] leading-relaxed">
                Explore our website to learn more about the Name & Mobile Number (Report & Rectification) Numerology and practical remedies based on solid predictions to optimize guidance for healthy, balanced living.
              </p>
            </div>

          </div>
        </div>
      </section>

      
      {/* ============ SAMPLE REPORT PREVIEW & MOCKUPS ============ */}
      <section className="py-16 md:py-24 bg-white">
        <Kicker text="Report Preview" />
        <SectionHeading title="See what you're getting" sub="Explore a sample of the report before you purchase. Available beautifully on all your devices." />
        
        <div className="max-w-[1140px] mx-auto px-6 mt-8 md:mt-12">
          
          {/* Mockups Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            <div onClick={() => samplePdf?.url && window.open(samplePdf.url, '_blank')} className={`bg-[#fffdf8] border border-[#ebdcc7] rounded-xl p-6 text-center shadow-sm flex flex-col items-center transition-all group ${samplePdf?.url ? 'cursor-pointer hover:border-[#5c1a1f] hover:shadow-md hover:-translate-y-1' : ''}`}>
               <div className="w-16 h-16 rounded-full bg-[#5c1a1f]/5 flex items-center justify-center mb-4 group-hover:bg-[#5c1a1f]/10 transition-colors">
                 <FileText className="w-8 h-8 text-[#5c1a1f]" />
               </div>
               <h3 className="font-bold text-[#5c1a1f] text-lg mb-2">PDF Format</h3>
               <p className="text-sm text-gray-850 mb-6">Download a high-quality PDF ready for print.</p>
               <div className="relative w-full mb-4 flex-1">
                 <img src={settings?.mockups?.pdf || "/images/kundali-pdf-mockup.webp"} alt="PDF Preview" className="w-full max-w-[200px] h-auto mx-auto rounded drop-shadow-md bg-gray-100 min-h-[150px] object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x500/f8f9fa/333333?text=PDF+Preview' }} />
               </div>
               {samplePdf?.url ? (
                 <div className="bg-[#5c1a1f] text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg group-hover:bg-[#761e27] transition-colors flex items-center justify-center gap-2 mt-auto w-full max-w-[200px] mx-auto">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                   View Sample PDF
                 </div>
               ) : (
                 <div className="mt-auto opacity-50 bg-gray-200 text-gray-850 px-6 py-2.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed w-full max-w-[200px] mx-auto">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                   View Sample PDF
                 </div>
               )}
            </div>
            
            <div onClick={() => samplePdf?.url && window.open(samplePdf.url, '_blank')} className={`bg-[#fffdf8] border border-[#ebdcc7] rounded-xl p-6 text-center shadow-sm flex flex-col items-center transition-all group ${samplePdf?.url ? 'cursor-pointer hover:border-[#5c1a1f] hover:shadow-md hover:-translate-y-1' : ''}`}>
               <div className="w-16 h-16 rounded-full bg-[#5c1a1f]/5 flex items-center justify-center mb-4 group-hover:bg-[#5c1a1f]/10 transition-colors">
                 <svg className="w-8 h-8 text-[#5c1a1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
               </div>
               <h3 className="font-bold text-[#5c1a1f] text-lg mb-2">Mobile View</h3>
               <p className="text-sm text-gray-850 mb-6">Read your report seamlessly on any smartphone.</p>
               <img src={settings?.mockups?.mobile || "/images/kundali-mobile-mockup.webp"} alt="Mobile Preview" className="w-full max-w-[150px] h-auto mx-auto rounded-3xl drop-shadow-lg border-[4px] border-gray-800 bg-gray-100 min-h-[250px] object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x600/f8f9fa/333333?text=Mobile+View' }} />
            </div>

            <div onClick={() => samplePdf?.url && window.open(samplePdf.url, '_blank')} className={`bg-[#fffdf8] border border-[#ebdcc7] rounded-xl p-6 text-center shadow-sm flex flex-col items-center transition-all group ${samplePdf?.url ? 'cursor-pointer hover:border-[#5c1a1f] hover:shadow-md hover:-translate-y-1' : ''}`}>
               <div className="w-16 h-16 rounded-full bg-[#5c1a1f]/5 flex items-center justify-center mb-4 group-hover:bg-[#5c1a1f]/10 transition-colors">
                 <svg className="w-8 h-8 text-[#5c1a1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               </div>
               <h3 className="font-bold text-[#5c1a1f] text-lg mb-2">Desktop View</h3>
               <p className="text-sm text-gray-850 mb-6">Explore interactive charts on the web portal.</p>
               <img src={settings?.mockups?.desktop || "/images/kundali-desktop-mockup.webp"} alt="Desktop Preview" className="w-full max-w-[280px] h-auto mx-auto rounded-lg drop-shadow-md border-2 border-gray-200 bg-gray-100 min-h-[160px] object-cover group-hover:scale-105 transition-transform duration-300" onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/f8f9fa/333333?text=Desktop+View' }} />
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-[#5c1a1f] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center mb-16">
             <div className="p-8 md:p-12 lg:w-1/2">
                <h3 className="premium-serif text-3xl font-bold text-[#d4af37] mb-4">Watch Sample Report</h3>
                <p className="text-white/80 text-[15px] mb-8 leading-relaxed">Take a quick 30-second tour of what exactly you will receive. See the level of detail, the planetary charts, and the predictive breakdowns.</p>
                {video.url ? (
                  <button onClick={() => setIsPlaying(true)} className="inline-flex items-center gap-3 bg-[#d4af37] text-[#3a1216] px-6 py-3 rounded-full font-bold hover:bg-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Play Video
                  </button>
                ) : (
                  <button className="flex items-center gap-3 bg-[#d4af37] text-[#3a1216] px-6 py-3 rounded-full font-bold hover:bg-white transition-colors cursor-not-allowed">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Play Video
                  </button>
                )}
             </div>
             <div className="lg:w-1/2 w-full aspect-video bg-black relative group cursor-pointer" onClick={() => video.url && setIsPlaying(true)}>
                {isPlaying && video.url && getYoutubeVideoId(video.url) ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(video.url)}?autoplay=1`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <>
                    <img src={video.thumbnail && video.thumbnail !== '/images/kundali-video-thumb.jpg' ? video.thumbnail : (getYoutubeVideoId(video.url) ? `https://img.youtube.com/vi/${getYoutubeVideoId(video.url)}/hqdefault.jpg` : (video.thumbnail || undefined))} alt="Video Thumbnail" className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80" onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x450/1a1a1a/ffffff?text=Video+Thumbnail' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-[#3a1216] ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                       </div>
                    </div>
                  </>
                )}
             </div>
          </div>

          {/* Screenshot Gallery */}
          <SectionHeading title="A Glimpse Inside" sub="Swipe to view actual pages from the report." />
          <div className={`flex overflow-x-auto gap-4 pb-8 snap-x scrollbar-hide items-center ${screenshots.filter((s: any) => s.url).length <= 3 ? 'justify-center' : 'justify-start md:px-4 px-2'}`}>
            {screenshots.filter((s: any) => s?.url).map((shot: any, idx: number) => (
              <div key={idx} onClick={() => setLightboxImg(shot.url)} className="w-[80%] sm:w-[280px] md:w-[320px] h-[350px] md:h-[450px] flex-shrink-0 snap-center rounded-xl overflow-hidden shadow-md bg-white border border-[#ebdcc7] cursor-pointer group relative flex items-center justify-center p-2">
                <div className="absolute inset-0 bg-[#5c1a1f]/0 group-hover:bg-[#5c1a1f]/5 transition-colors z-10 flex items-center justify-center pointer-events-none"><div className="opacity-0 group-hover:opacity-100 bg-[#5c1a1f] text-white p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-all duration-300"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg></div></div><img src={shot.url} alt={`Sample Page ${idx + 1}`} className="max-w-full max-h-full w-auto h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-300 relative z-0" onError={(e) => { e.currentTarget.src = `https://placehold.co/400x550/f8f9fa/5c1a1f?text=Image+${idx + 1}` }} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============ TESTIMONIALS & TRUST ============ */}
      <section className="py-16 md:py-24 bg-[#fffdf8] border-b border-[#ebdcc7]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#d97706] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Trusted by 68,000+ Users</p>
            <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#1a0a0b] mb-4">Life-Changing Insights</h2>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="flex">{[1,2,3,4,5].map(s => <span key={s} className="text-[#f59e0b] text-lg">★</span>)}</div>
              <span className="text-[#111827] font-bold text-sm">4.8 out of 5</span>
              <span className="text-[#D1D5DB] mx-1">|</span>
              <span className="text-[#374151] text-sm">68,000+ Reports Delivered</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl p-7 border border-[#ebdcc7] flex flex-col hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <span key={s} className="text-[#f59e0b] text-[15px]">★</span>)}</div>
                </div>
                <p className="text-[#374151] text-[13.5px] leading-[1.85] flex-grow mb-6">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#ebdcc7]">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0" style={{backgroundColor: t.color}}>{t.initial}</div>
                  <div className="flex-1">
                    <p className="font-bold text-[#111827] text-[13px] leading-none mb-1">{t.name}</p>
                    <p className="text-[#9CA3AF] text-[11px]">{t.city} · {t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ (ACCORDION) ============ */}
      <section className="py-16 md:py-24" id="faqSection">
        <Kicker text="FAQs" />
        <SectionHeading title="Name & Mobile Number Numerology FAQs" />
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-12 border-t border-[#ebdcc7] items-start">
            <div className="flex flex-col">
              {(settings?.faqs?.length ? settings.faqs : faqData).filter((_: any, i: number) => i % 2 === 0).map((faq: any, idx: number) => {
                const i = idx * 2; // Original index for state
                return (
                  <div key={i} className="border-b border-[#ebdcc7]">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-start md:items-center justify-between py-5 md:py-6 text-left font-bold text-[#5c1a1f] text-[15.5px] md:text-[17px] hover:text-[#761e27] transition-colors gap-4"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-[#d4af37] transition-transform duration-200 flex-shrink-0 mt-0.5 md:mt-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[1400px] pb-5 md:pb-6' : 'max-h-0'}`}>
                      {faq.a ? (
                        <div className="text-gray-850 text-[15px] md:text-[16px] leading-relaxed whitespace-pre-wrap">{faq.a}</div>
                      ) : (
                        <ContentBlocks blocks={faq.content} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col">
              {(settings?.faqs?.length ? settings.faqs : faqData).filter((_: any, i: number) => i % 2 !== 0).map((faq: any, idx: number) => {
                const i = idx * 2 + 1; // Original index for state
                return (
                  <div key={i} className="border-b border-[#ebdcc7]">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-start md:items-center justify-between py-5 md:py-6 text-left font-bold text-[#5c1a1f] text-[15.5px] md:text-[17px] hover:text-[#761e27] transition-colors gap-4"
                    >
                      <span className="leading-snug">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-[#d4af37] transition-transform duration-200 flex-shrink-0 mt-0.5 md:mt-0 ${openFaq === i ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-[1400px] pb-5 md:pb-6' : 'max-h-0'}`}>
                      {faq.a ? (
                        <div className="text-gray-850 text-[15px] md:text-[16px] leading-relaxed whitespace-pre-wrap">{faq.a}</div>
                      ) : (
                        <ContentBlocks blocks={faq.content} />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <div className="bg-[#fffdf8] border border-[#ebdcc7] shadow-[0_15px_40px_rgba(0,0,0,0.05)] rounded-2xl p-8 md:p-16 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-[#d4af37]"></div>
            <h2 className="premium-serif text-[28px] md:text-[42px] font-bold text-[#5c1a1f] mb-3 md:mb-4 leading-tight relative z-10">
              Your Name & Number Are Keys to Your Destiny
            </h2>
            <p className="text-gray-850 text-[14.5px] md:text-[16px] mb-6 md:mb-8 relative z-10 max-w-[500px] mx-auto leading-relaxed">
              With VaidikTalk’s expert-guided numerology reports, you gain the awareness and tools to realign your life path.\nOrder today and invite the wisdom of numbers into your life.
            </p>
            <a href="#order-form" className="inline-flex justify-center w-full sm:w-auto items-center gap-2 bg-[#d4af37] hover:bg-[#c29f2f] text-[#3a1216] font-bold text-[16px] md:text-[17px] px-8 md:px-10 py-4 rounded-md transition-colors shadow-md relative z-10">
              Book Now @ ₹599 <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div 
          id="lightbox"
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImg(null)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white bg-white/10 hover:bg-[#5c1a1f] rounded-full p-2 transition-colors z-[10000]"
            onClick={() => setLightboxImg(null)}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <img 
            src={lightboxImg} 
            alt="Preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </div>
  );
}

