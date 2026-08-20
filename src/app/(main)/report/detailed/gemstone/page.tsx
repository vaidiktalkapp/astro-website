'use client';
import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import Link from 'next/link';
import {
  CheckCircle2, Plus, Minus, Star, PlayCircle, BookOpen, FileText, Check, ShieldCheck, Heart, Briefcase, Activity, Flower2, X, Clock
} from 'lucide-react';

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
    q: 'What is a Gemstone Report?',
    content: [
      { type: 'p', text: 'It is a horoscope-based gemstone consultation that analyzes your chart to identify weak or malefic planets, strong yogas, and natural planetary benefactors. Based on this, you receive a clear recommendation of the primary gemstone(s) that will work best for you — both astrologically and energetically.' }
    ]
  },
  {
    q: 'How do I know which stone is right for me?',
    content: [
      { type: 'p', text: 'Our Gemstone Report takes the guesswork out of it. We analyze your unique birth chart (Janma Kundali) to recommend stones that support your beneficial planets and warn you against stones that might clash with your astrological chart.' }
    ]
  },
  {
    q: 'Does the report include wearing instructions?',
    content: [
      { type: 'p', text: 'Yes! The report includes complete wearing instructions, including the right metal (gold, silver, panchdhatu), the correct day and time to wear it, the specific finger, the mantra to chant, and the puja vidhi for energizing (pran pratistha) the stone.' }
    ]
  },
  {
    q: 'Can wearing the wrong gemstone cause harm?',
    content: [
      { type: 'p', text: 'Yes, wearing a gemstone that belongs to a malefic or enemy planet in your horoscope can bring negative results, blockages, or health issues. That is why a personalized astrology report is highly recommended before investing in any gemstone.' }
    ]
  },
  {
    q: 'Is this based on my Sun sign or Moon sign?',
    content: [
      { type: 'p', text: 'Neither! Generic advice is often based solely on your Sun or Moon sign, which is inaccurate. This report is 100% personalized based on your exact Date, Time, and Place of Birth, analyzing the exact degrees of all planets in your chart.' }
    ]
  }
];

export default function GemstoneReportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [settings, setSettings] = useState<any>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const getYoutubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get('/smart-kundali-settings/gemstone');
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    fetchSettings();
  }, []);

  const defaultTestimonials = [
    {
      name: "Suresh Gupta",
      city: "Delhi",
      date: "December 2025",
      review: "I was wearing a Blue Sapphire based on someone's random advice and was facing huge losses. This report showed me my actual lucky stone. Since wearing the right one, my business has stabilized completely.",
      initial: "S",
      color: "#5c1a1f"
    },
    {
      name: "Meera Reddy",
      city: "Hyderabad",
      date: "November 2025",
      review: "Very detailed! It didn't just tell me the stone, it told me exactly which finger, which metal, and the exact mantra to chant while wearing it. Excellent service by Vaidik Talk.",
      initial: "M",
      color: "#d97706"
    },
    {
      name: "Vikram Singh",
      city: "Jaipur",
      date: "October 2025",
      review: "A must-buy before you spend thousands on a gemstone. The report clearly warned me against a stone I was about to buy, saving me from a huge astrological mistake. Highly authentic.",
      initial: "V",
      color: "#1a0a0b"
    }
  ];

  const testimonials = settings?.testimonials?.length ? settings.testimonials : defaultTestimonials;
  const validScreenshots = (settings?.screenshots || []).filter((s: any) => s.url);
  const screenshots = validScreenshots.length > 0 ? validScreenshots : [
    { url: '/images/gemstone-page-1.jpg' },
    { url: '/images/gemstone-page-2.jpg' },
    { url: '/images/gemstone-page-3.jpg' }
  ];

  const FaqAnswer = ({ blocks }: { blocks: FaqBlock[] }) => (
    <div className="text-gray-850 text-[15px] leading-relaxed space-y-4 font-medium">
      {blocks.map((block, i) => {
        if (block.type === 'p') {
          return <p key={i}>{block.text}</p>;
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-2.5 items-start">
                  <span className="text-[#0d9488] font-bold flex-shrink-0 mt-[2px]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === 'table') {
          const validVideos = (settings?.videos || []).filter((v: any) => v.url);

  return (
    <div key={i} className="overflow-x-auto border border-[#ebdcc7] rounded-md">
              <table className="w-full text-left border-collapse min-w-[480px]">
                <thead>
                  <tr className="bg-[#fdfaf6]">
                    {block.headers.map((h, hi) => (
                      <th key={hi} className="text-[#5c1a1f] text-[13px] font-bold uppercase tracking-wide px-4 py-3 whitespace-nowrap border-b border-[#ebdcc7]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, ri) => (
                    <tr key={ri} className="bg-white">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-4 py-3 text-[14px] border-b border-[#ebdcc7] ${ci === 0 ? 'font-bold text-[#5c1a1f] whitespace-nowrap' : ''}`}
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

  const validVideos = (settings?.videos || []).filter((v: any) => v.url);

  return (
    <div className="w-full min-h-screen bg-[#fdfaf6] font-sans text-gray-850 relative">

      {/* Lightbox */}
      {lightboxImg && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-6 right-6 text-white bg-white/20 rounded-full p-2 hover:bg-white/40"><X className="w-6 h-6" /></button>
          <img src={lightboxImg} className="max-w-full max-h-full object-contain rounded-lg" alt="Preview" />
        </div>
      )}

      {/* ============ HERO ============ */}
      <section className="relative w-full pt-6 pb-12 overflow-hidden bg-[#7a4b3a]">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 bg-[#4c2918]">
          {settings?.banner?.url && /\.(mp4|webm|mov)(\?.*)?$/i.test(settings.banner.url) ? (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover object-center opacity-100" src={settings.banner.url} />
          ) : settings?.banner?.url ? (
            <img src={settings.banner.url} alt="Gemstone Report" className="w-full h-full object-cover object-center opacity-80" />
          ) : (
            <video autoPlay loop muted playsInline className="w-full h-full object-cover object-center opacity-100" src="/smart%20kundali.mp4" />
          )}
          {/* Gradient dark overlay for perfect text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10 pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 text-center mt-2">
          <h1 className="text-[36px] md:text-[50px] lg:text-[60px] font-bold mb-3 font-serif leading-tight text-white drop-shadow-md">
            Unlock the Power of Planets with the Right Gemstone
          </h1>
          <p className="text-[17px] md:text-[20px] text-white/100 mb-6 max-w-2xl mx-auto font-semibold drop-shadow-sm">
            Based on Your Horoscope & Planetary Alignments
          </p>

          <Link href="/report/detailed/gemstone/checkout" className="inline-block bg-white text-[#b06126] font-bold text-[16px] md:text-[18px] px-10 py-3.5 md:py-4 rounded-xl shadow-lg hover:scale-105 transition-transform mb-6">
            Get Your Gemstone Report @ <span className="line-through text-[#3a1216] mx-1">₹{settings?.price || 600}</span> ₹{settings?.discountedPrice || 549}
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
      <div className="max-w-[1200px] mx-auto px-4 relative z-20 -mt-10 mb-16">
        <div className="flex flex-wrap gap-2 lg:gap-3 justify-center">

          <div className="bg-white rounded-[12px] shadow-sm px-3 lg:px-4 py-2.5 lg:py-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] xl:text-[14px]">100% Based on Chart</span>
          </div>

          <div className="bg-white rounded-[12px] shadow-sm px-3 lg:px-4 py-2.5 lg:py-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] xl:text-[14px]">Avoid Costly Mistakes</span>
          </div>

          <div className="bg-white rounded-[12px] shadow-sm px-3 lg:px-4 py-2.5 lg:py-3 flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] xl:text-[14px]">Protect Your Energy</span>
          </div>

          <div className="bg-white rounded-[12px] shadow-sm px-3 lg:px-4 py-2.5 lg:py-3 flex items-center gap-2">
            <Star className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] xl:text-[14px]">Attract Abundance</span>
          </div>

          <div className="bg-white rounded-[12px] shadow-sm px-3 lg:px-4 py-2.5 lg:py-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#d68636]" />
            <span className="text-[#5c1a1f] font-bold text-[13px] xl:text-[14px]">Wearing Rules</span>
          </div>

        </div>
      </div>

      {/* ============ EVERYTHING YOU NEED ============ */}
      <section className="pb-12 md:pb-16 bg-[#fdfaf6]">
        <div className="max-w-[1000px] mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">

          {/* Astrologer Profile */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-[4px] border-white shadow-md mb-2 bg-white flex items-center justify-center">
              <img src="/vaidiktalklogo.webp" alt="Vaidik Talk" className="w-[85%] h-[85%] object-contain" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Vaidik+Talk&background=fff&color=1e293b&size=200' }} />
            </div>
            <span className="font-bold text-[#1a1a1a] text-[14px]">Vaidik Talk</span>
          </div>

          {/* Content & Tags */}
          <div className="text-center md:text-left flex-1">
            <h2 className="text-[22px] md:text-[26px] font-bold text-[#5c1a1f] mb-1">Empower your life journey with cosmic tools</h2>
            <p className="text-[14px] md:text-[15px] text-[#5c1a1f]/80 font-medium mb-4">Choose your gemstone with confidence — the one meant for your soul, your karma, your journey.</p>

            <div className="flex flex-wrap justify-center md:justify-start gap-2.5">
              {[
                { label: 'Right Finger', icon: CheckCircle2 },
                { label: 'Correct Metal', icon: ShieldCheck },
                { label: 'Energization Puja', icon: Flower2 },
                { label: 'Best Day & Time', icon: Clock },
                { label: 'Planetary Support', icon: Star },
                { label: 'Vedic Mantras', icon: BookOpen }
              ].map((item, i) => (
                <div key={i} className="bg-[#fdfaf6] text-[#b06126] border border-[#ebdcc7] px-4 py-1.5 rounded-full font-bold text-[13px] flex items-center gap-1.5 shadow-sm">
                  <item.icon className="w-3.5 h-3.5 text-[#c57636]" strokeWidth={2.5} />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ============ SECTION 2: BOOK MOCKUP ============ */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div className="md:w-1/2 flex justify-center order-2 md:order-1">
            <img src={settings?.mockups?.pdf || "/images/vaidiktalk-kundli-mockup.webp"} alt="Premium Gemstone Report" className="w-full max-w-[470px] rounded-xl mix-blend-multiply" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x550/f8f9fa/0f3b43?text=Gemstone+Report' }} />
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#5c1a1f] mb-3">Premium Gemstone Report</h2>

            <p className="text-[#3a1216]/90 text-[15px] leading-relaxed mb-6 font-medium">
              Backed by authentic Vedic astrology, this report helps you make a safe, spiritually correct choice before investing in any gem. Ideal before purchasing a gemstone or gifting one to a loved one.
            </p>

            <ul className="grid grid-cols-1 gap-y-4 mb-8">
              <li className="flex items-start gap-3 text-[#5c1a1f] text-[15px] font-bold">
                <Check className="text-[#d68636] w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} /> Explanation of the planet it supports and how it impacts your life.
              </li>
              <li className="flex items-start gap-3 text-[#5c1a1f] text-[15px] font-bold">
                <Check className="text-[#d68636] w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} /> Optional secondary gemstone combinations for maximum benefit.
              </li>
              <li className="flex items-start gap-3 text-[#5c1a1f] text-[15px] font-bold">
                <Check className="text-[#d68636] w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} /> Warnings about gems you should avoid based on chart conflicts.
              </li>
              <li className="flex items-start gap-3 text-[#5c1a1f] text-[15px] font-bold">
                <Check className="text-[#d68636] w-5 h-5 shrink-0 mt-0.5" strokeWidth={3} /> List of do’s and don’ts while wearing the gem.
              </li>
            </ul>

            <div className="flex items-center gap-3 mb-8">
              <span className="text-[32px] md:text-[40px] font-bold text-[#5c1a1f]">₹{settings?.discountedPrice || 549}</span>
              <span className="text-lg text-[#3a1216]/60 line-through font-medium">₹{settings?.price || 600}</span>
              <span className="bg-[#fdfaf6] text-[#d68636] border border-[#ebdcc7] text-[11px] font-bold px-2 py-1 rounded uppercase tracking-wide ml-2">SPECIAL</span>
            </div>

            <Link href="/report/detailed/gemstone/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[16px] px-10 py-4 rounded-lg shadow-lg hover:bg-[#b06126] transition-colors w-full md:w-auto text-center">
              Fill The Form Below →
            </Link>
          </div>
        </div>
      </section>

      {/* ============ WHAT IT REVEALS ============ */}
      <section className="py-16 md:py-24 bg-[#fdfaf6]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
          <div className="md:w-[45%] lg:w-[40%] xl:-ml-6">
            <video
              src={settings?.video?.url || "/vaidik video.mp4"}
              autoPlay loop muted playsInline
              className="w-full rounded-[2rem] shadow-lg object-cover aspect-square md:aspect-[4/4.5]"
            />
          </div>
          <div className="md:w-[55%] lg:w-[60%] md:pl-6 lg:pl-10">
            <h2 className="text-[28px] md:text-[32px] lg:text-[38px] xl:text-[42px] font-serif font-bold text-[#5c1a1f] mb-10 leading-tight xl:whitespace-nowrap">What You Will Receive</h2>

            <div className="space-y-6 mb-12">
              {[
                { t: 'Your most suitable gemstone(s) based on planetary strengths & weaknesses' },
                { t: 'Full wearing instructions: metal, day, finger, mantra, puja vidhi' },
                { t: 'Optional secondary gemstone combinations for maximum benefit' },
                { t: 'Warnings about gems you should avoid based on chart conflicts' },
                { t: 'Guidance on energizing the gemstone (pran pratistha) before use' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <Check className="text-[#d68636] w-6 h-6 shrink-0 mt-0.5" strokeWidth={3} />
                  <h4 className="font-medium text-[#3a1216] text-[16px] md:text-[17px]">{item.t}</h4>
                </div>
              ))}
            </div>

            <a href="/report/detailed/gemstone/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[16px] px-10 py-4 rounded-xl shadow-md hover:bg-[#b06126] transition-colors w-full md:w-auto text-center">
              Order Your Gemstone Report →
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
          display: flex;
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
            <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c1a1f] mb-12">Astrology & Gemstone Insights</h2>

            <div className="relative overflow-hidden w-full group py-2">
              <div className="animate-scroll gap-6 md:gap-8 flex px-4">
                {[...validVideos, ...validVideos, ...validVideos, ...validVideos].map((v: any, i: number) => {
                  const ytId = getYoutubeVideoId(v.url);
                  const validVideos = (settings?.videos || []).filter((v: any) => v.url);

  return (
    <div key={i} className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] aspect-video bg-black rounded-2xl overflow-hidden relative shadow-xl snap-center flex-shrink-0 border-[3px] border-white">
                      {ytId ? (
                        <iframe className="w-full h-full pointer-events-auto" src={`https://www.youtube.com/embed/${ytId}`} allowFullScreen></iframe>
                      ) : (
                        <video className="w-full h-full object-cover pointer-events-auto" src={v.url} controls playsInline></video>
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
      <section className="py-16 md:py-24 bg-white" id="faqSection">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-[28px] md:text-[36px] font-serif font-bold text-[#5c1a1f] mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {(settings?.faqs?.length > 0 ? settings.faqs.map((f: any) => ({ q: f.q, content: [{ type: 'p', text: f.a }] })) : faqData).map((faq: any, i: number) => (
              <div key={i} className="border border-[#ebdcc7] rounded-xl overflow-hidden bg-[#fdfaf6]">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-[#5c1a1f] hover:bg-white transition-colors text-[16px]"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="pr-4">{faq.q}</span>
                  {openFaq === i ? <Minus className="w-5 h-5 flex-shrink-0 text-[#d68636]" /> : <Plus className="w-5 h-5 flex-shrink-0 text-[#d68636]" />}
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pt-2 bg-[#fdfaf6]">
                    <FaqAnswer blocks={faq.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA / GET IT NOW ============ */}
      <section className="py-16 md:py-24 bg-[#fdfaf6] text-white">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <h2 className="premium-serif text-center text-[28px] md:text-[36px] font-bold text-[#3a1216] mb-4 leading-tight">Ready to Find Your Gemstone?</h2>
          <p className="text-center text-[#3a1216]/80 text-[15px] md:text-[16px] mb-10 max-w-[600px] mx-auto">Get your personalized Gemstone Report today and align your energy with the cosmos.</p>
          <Link href="/report/detailed/gemstone/checkout" className="inline-block bg-[#d68636] text-white font-bold text-[18px] px-12 py-4 rounded-xl shadow-[0_8px_20px_rgba(214,134,54,0.3)] hover:bg-[#b06126] transition-all hover:scale-105">
            Book Gemstone Report
          </Link>
        </div>
      </section>

    </div>
  );
}
