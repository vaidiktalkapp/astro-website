'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import astrologyService from '@/lib/astrologyService';
import { Roboto } from 'next/font/google';
import ReactMarkdown from 'react-markdown';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

const ZODIACS = [
  { id: 'aries', name: 'Aries', hindi: 'Mesh', date: 'Mar 21 - Apr 19', icon: '♈' },
  { id: 'taurus', name: 'Taurus', hindi: 'Vrishabh', date: 'Apr 20 - May 20', icon: '♉' },
  { id: 'gemini', name: 'Gemini', hindi: 'Mithun', date: 'May 21 - Jun 20', icon: '♊' },
  { id: 'cancer', name: 'Cancer', hindi: 'Karka', date: 'Jun 21 - Jul 22', icon: '♋' },
  { id: 'leo', name: 'Leo', hindi: 'Simha', date: 'Jul 23 - Aug 22', icon: '♌' },
  { id: 'virgo', name: 'Virgo', hindi: 'Kanya', date: 'Aug 23 - Sep 22', icon: '♍' },
  { id: 'libra', name: 'Libra', hindi: 'Tula', date: 'Sep 23 - Oct 22', icon: '♎' },
  { id: 'scorpio', name: 'Scorpio', hindi: 'Vrishchik', date: 'Oct 23 - Nov 21', icon: '♏' },
  { id: 'sagittarius', name: 'Sagittarius', hindi: 'Dhanu', date: 'Nov 22 - Dec 21', icon: '♐' },
  { id: 'capricorn', name: 'Capricorn', hindi: 'Makar', date: 'Dec 22 - Jan 19', icon: '♑' },
  { id: 'aquarius', name: 'Aquarius', hindi: 'Kumbh', date: 'Jan 20 - Feb 18', icon: '♒' },
  { id: 'pisces', name: 'Pisces', hindi: 'Meen', date: 'Feb 19 - Mar 20', icon: '♓' },
];

const SIGN_TRAITS: Record<string, any> = {
  aries: { element: 'Fire', planet: 'Mars', gem: 'Red Coral', nature: 'Movable', symbol: 'The Ram' },
  taurus: { element: 'Earth', planet: 'Venus', gem: 'Diamond', nature: 'Fixed', symbol: 'The Bull' },
  gemini: { element: 'Air', planet: 'Mercury', gem: 'Emerald', nature: 'Dual', symbol: 'The Twins' },
  cancer: { element: 'Water', planet: 'Moon', gem: 'Pearl', nature: 'Movable', symbol: 'The Crab' },
  leo: { element: 'Fire', planet: 'Sun', gem: 'Ruby', nature: 'Fixed', symbol: 'The Lion' },
  virgo: { element: 'Earth', planet: 'Mercury', gem: 'Emerald', nature: 'Dual', symbol: 'The Virgin' },
  libra: { element: 'Air', planet: 'Venus', gem: 'Diamond', nature: 'Movable', symbol: 'The Scales' },
  scorpio: { element: 'Water', planet: 'Mars', gem: 'Red Coral', nature: 'Fixed', symbol: 'The Scorpion' },
  sagittarius: { element: 'Fire', planet: 'Jupiter', gem: 'Yellow Sapphire', nature: 'Dual', symbol: 'The Archer' },
  capricorn: { element: 'Earth', planet: 'Saturn', gem: 'Blue Sapphire', nature: 'Movable', symbol: 'The Goat' },
  aquarius: { element: 'Air', planet: 'Saturn', gem: 'Blue Sapphire', nature: 'Fixed', symbol: 'The Water Bearer' },
  pisces: { element: 'Water', planet: 'Jupiter', gem: 'Yellow Sapphire', nature: 'Dual', symbol: 'The Fish' },
};

const generateFaqs = (period: string) => {
  if (period === 'weekly') {
    return [
      {
        q: "How does a weekly horoscope differ from a daily one?",
        a: "While daily horoscopes track the fast-moving Moon (Chandrama), a weekly reading looks at the combined effect of slower transits (Gochar) like the Sun, Mars, and Mercury, providing a broader look at upcoming events."
      },
      {
        q: "Can a weekly reading predict my financial gains?",
        a: "Yes, it can highlight favorable planetary combinations (Yogas) forming during the week that may bring wealth, or warn against unnecessary expenses during weak transits."
      },
      {
        q: "Should I read the weekly forecast for my Moon sign or Sun sign?",
        a: "In Vedic astrology, the Moon sign (Rashi) is always the most accurate for tracking Gochar (transit) effects, as it reflects your direct emotional and mental experiences."
      },
      {
        q: "What if my weekly horoscope shows a challenging period?",
        a: "Vedic astrology is about guidance, not fear. If challenging planetary alignments are indicated, you can perform simple remedies (Upayas) like chanting mantras or donating to mitigate the effects."
      }
    ];
  }

  if (period === 'monthly') {
    return [
      {
        q: "How do planetary transits shape the monthly horoscope?",
        a: "A monthly forecast focuses on major transits of slower planets like Jupiter (Guru), Saturn (Shani), and the Sun (Surya). When these planets change houses, they bring significant shifts in career, health, and relationships."
      },
      {
        q: "Can this reading replace my personalized Kundli?",
        a: "No. A monthly horoscope gives you the general 'cosmic weather' for your sign based on Gochar. A Kundli reading analyzes your specific Mahadasha and Antardasha for pinpoint accuracy."
      },
      {
        q: "How do lunar phases affect my monthly reading?",
        a: "Amavasya (New Moon) and Purnima (Full Moon) bring intense shifts in energy. Your monthly reading highlights how these lunar phases will impact your specific Rashi."
      },
      {
        q: "What if my zodiac sign is undergoing Sade Sati?",
        a: "If you are going through Shani Sade Sati or Dhaiya, your monthly reading will reflect the ongoing lessons and challenges, along with the best times to practice patience."
      }
    ];
  }

  if (period === 'yearly') {
    return [
      {
        q: "How does a yearly horoscope differ from a monthly one?",
        a: "A yearly horoscope focuses on the slow-moving planetary transits (like Jupiter, Saturn, Rahu, and Ketu) that shape major life themes over a long period, offering a big-picture view of the year ahead."
      },
      {
        q: "Can a yearly horoscope guide my career decisions?",
        a: "Yes. By analyzing major planetary alignments, a yearly forecast can highlight periods of growth, potential job changes, or times when you should consolidate rather than take risks."
      },
      {
        q: "Does the yearly horoscope consider eclipses?",
        a: "Absolutely. Solar and Lunar eclipses mark significant turning points in Vedic astrology, and their effects are a crucial part of your yearly reading."
      },
      {
        q: "What if my yearly forecast indicates challenges?",
        a: "A yearly reading prepares you in advance. We suggest corresponding Vedic remedies, like specific mantras or gemstone wearing, to help mitigate challenging transits."
      }
    ];
  }

  if (period === 'tomorrow') {
    return [
      {
        q: "Why should I read tomorrow's horoscope today?",
        a: "Reading tomorrow's forecast gives you a tactical advantage. It helps you mentally prepare for the day ahead, letting you schedule important tasks during favorable alignments."
      },
      {
        q: "Is tomorrow's horoscope as accurate as today's?",
        a: "Yes. The planetary transits for tomorrow are mathematically calculated in advance, ensuring the exact same level of precision as your daily reading."
      },
      {
        q: "What if tomorrow's reading predicts challenges?",
        a: "Forewarned is forearmed. If the forecast suggests communication issues or low energy, you can proactively choose to be more patient and avoid scheduling high-stress activities."
      }
    ];
  }

  // Default (Today/Daily)
  return [
    {
      q: "Why is the Moon sign so important for a daily horoscope?",
      a: "The Moon (Chandrama) rules the mind and changes signs every 2.5 days. Its daily movement (Gochar) is the most accurate indicator of your daily mood, interactions, and events."
    },
    {
      q: "Can a daily horoscope help me choose a lucky color?",
      a: "Yes. Each day of the week is ruled by a specific planet (e.g., Sunday by the Sun, Monday by the Moon). Your reading combines this with your Rashi to suggest the most beneficial color."
    },
    {
      q: "Does the daily horoscope account for Rahu Kaal?",
      a: "While the horoscope gives general daily guidance, we recommend cross-checking our Panchang tool to avoid starting important tasks during Rahu Kaal or other inauspicious windows."
    },
    {
      q: "Can a daily horoscope help with relationship issues?",
      a: "It can offer valuable insight into your emotional state and communication patterns for the day, helping you avoid unnecessary friction or choose the right moment for a heart-to-heart."
    }
  ];
};

export default function HoroscopeDetailClient({ 
  initialSign, 
  period = 'today', 
  basePath = "/daily-horoscope",
  initialDailyData,
  initialFaqs
}: { 
  initialSign: string;
  period?: 'today' | 'tomorrow' | 'weekly' | 'monthly' | 'yearly';
  basePath?: string;
  initialDailyData?: any[];
  initialFaqs?: {q: string, a: string}[];
}) {
  const router = useRouter();
  const activeZodiacId = initialSign;
  
  const [clientDailyData, setClientDailyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(!initialDailyData);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [clientFaqs, setClientFaqs] = useState<{q: string, a: string}[]>([]);

  const dailyData = initialDailyData && initialDailyData.length > 0 ? initialDailyData : clientDailyData;
  const faqs = initialFaqs && initialFaqs.length > 0 ? initialFaqs : clientFaqs;

  const activeBaseZodiac = ZODIACS.find(z => z.id === activeZodiacId) || ZODIACS[0];
  const activeDynamicData = dailyData.find(d => d.id === activeZodiacId);
  const active = activeDynamicData ? { ...activeBaseZodiac, ...activeDynamicData } : activeBaseZodiac;

  useEffect(() => {
    // If we have initial data from the server, we don't need to fetch on the client
    if (initialDailyData && initialDailyData.length > 0) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setClientDailyData([]); // Clear previous data so it doesn't flash
      try {
        const [res, zodiacFaqsRes, periodFaqsRes] = await Promise.all([
          astrologyService.getDailyHoroscopeAllSigns(period, 'English'),
          astrologyService.getFaqs(`horoscope_${period}_${activeZodiacId}`),
          astrologyService.getFaqs(`horoscope_${period}`)
        ]);

        if (res?.success && Array.isArray(res.data)) {
          setClientDailyData(res.data);
        }

        if (zodiacFaqsRes?.data && Array.isArray(zodiacFaqsRes.data) && zodiacFaqsRes.data.length > 0) {
          setClientFaqs(zodiacFaqsRes.data.map((f: any) => ({ q: f.question, a: f.answer })));
        } else if (periodFaqsRes?.data && Array.isArray(periodFaqsRes.data) && periodFaqsRes.data.length > 0) {
          setClientFaqs(periodFaqsRes.data.map((f: any) => ({ q: f.question, a: f.answer })));
        } else {
          setClientFaqs(generateFaqs(period));
        }
      } catch (err) {
        console.error(err);
        setClientFaqs(generateFaqs(period));
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [period, activeZodiacId, initialDailyData]);

  const todayStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const dateDisplayString = useMemo(() => {
    const now = new Date();
    if (period === 'today') {
      return now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    if (period === 'tomorrow') {
      const tmrw = new Date(now);
      tmrw.setDate(tmrw.getDate() + 1);
      return tmrw.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    if (period === 'weekly') {
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      const start = new Date(now.setDate(diff));
      const end = new Date(start);
      end.setDate(end.getDate() + 6);
      return `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })} to ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    }
    if (period === 'monthly') {
      return now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
    }
    if (period === 'yearly') {
      return now.getFullYear().toString();
    }
    return '';
  }, [period]);

  // Extract a planetary highlight (take the first sentence of the reading, stripped of HTML/Markdown)
  const planetaryHighlight = useMemo(() => {
    if (!active.reading) return '';
    
    // If it's a manual override (HTML), skip planetary highlight extraction
    // because human admins don't write a dedicated opening highlight sentence.
    if (active.reading.trim().startsWith('<') || active.reading.includes('</p>')) {
      return '';
    }

    // Convert paragraph/break tags to periods so words don't mash together
    let text = active.reading.replace(/<\/(p|div|h[1-6])>/gi, '. ');
    text = text.replace(/<br\s*\/?>/gi, '. ');
    text = text.replace(/<[^>]*>?/gm, ''); // Strip remaining HTML tags
    
    text = text.replace(/&nbsp;/g, ' ')
               .replace(/&amp;/g, '&')
               .replace(/&#39;/g, "'")
               .replace(/&quot;/g, '"'); // Decode common entities
    text = text.replace(/[\*#_]/g, ''); // Strip basic markdown
    text = text.replace(/\s+/g, ' ').trim(); // Clean up extra spaces
    
    // Find the first actual sentence (ignore short headings)
    const sentences = text.split(/\.\s+/).filter((s: string) => s.trim().length > 25);
    
    let highlight = sentences.length > 0 ? sentences[0].trim() : '';
    
    // Truncate if it's abnormally long
    if (highlight.length > 130) {
      highlight = highlight.substring(0, 127).trim() + '...';
    }
    
    return highlight ? highlight + (highlight.endsWith('.') || highlight.endsWith('...') ? '' : '.') : '';
  }, [active.reading]);

  const baseTitle = period === 'today' ? "Today's Horoscope" : 
                    period === 'tomorrow' ? "Tomorrow's Horoscope" : 
                    period === 'weekly' ? "Weekly Horoscope" : 
                    period === 'yearly' ? "Yearly Horoscope" : "Monthly Horoscope";
  
  const pageTitle = `${activeBaseZodiac.name} ${baseTitle}`;

  const periodTitle = period === 'today' ? 'Daily' : period.charAt(0).toUpperCase() + period.slice(1);
  const showNumbers = period === 'today' || period === 'tomorrow';

  return (
    <div className="bg-[#fff9f0] min-h-screen">
      
      {/* New Hero Section */}
      <div className="bg-[#A65F21] text-white w-full mb-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
          
          <Link href={basePath} className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8 text-sm font-medium">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to all signs
          </Link>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left side: Title and Date */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-serif mb-6 drop-shadow-sm">{pageTitle}</h1>
              
              <div className="inline-block border-2 border-[#d9c099] bg-[#d9c099]/10 px-8 py-2 relative">
                {/* Decorative border corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#ffe8cc] -translate-x-1.5 -translate-y-1.5 bg-[#b07b46]"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#ffe8cc] translate-x-1.5 -translate-y-1.5 bg-[#b07b46]"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#ffe8cc] -translate-x-1.5 translate-y-1.5 bg-[#b07b46]"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#ffe8cc] translate-x-1.5 translate-y-1.5 bg-[#b07b46]"></div>
                
                <p className="text-lg font-bold tracking-widest uppercase text-[#fff5e6]">{dateDisplayString}</p>
              </div>
              <p className="text-lg text-white/80 font-medium mt-6">
                {activeBaseZodiac.name} · {activeBaseZodiac.date}
              </p>
            </div>

            {/* Right side: Zodiac Grid */}
            <div className="lg:w-[55%] w-full">
              <div className="grid grid-cols-4 md:grid-cols-6 gap-x-3 gap-y-5">
                {ZODIACS.map((z) => {
                  const isActive = z.id === activeZodiacId;
                  return (
                    <Link
                      key={z.id}
                      href={`${basePath}/${z.id}`}
                      className="flex flex-col items-center justify-center group"
                    >
                      <div className={`w-14 h-14 md:w-[68px] md:h-[68px] rounded-full overflow-hidden flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'shadow-[0_0_20px_rgba(255,255,255,0.6)] ring-[3px] ring-white ring-offset-2 ring-offset-[#925f31] transform scale-110 z-10 relative' 
                          : 'hover:scale-105 border-2 border-transparent'
                      }`}>
                        <Image src={`/zodiacs/${z.id}.png`} alt={z.name} width={68} height={68} className="w-full h-full object-cover" />
                      </div>
                      <span className={`mt-2 text-[10px] md:text-xs font-medium transition-colors ${isActive ? 'text-[#ffe8cc] font-bold' : 'text-white/80 group-hover:text-white'}`}>
                        {z.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Explore Horoscope Prediction Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-8">
          <span className="text-[#5c1420]">Explore</span> <span className="text-[#d97706]">Horoscope Prediction</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'today', title: "Today's\nHoroscope", basePath: '/daily-horoscope' },
            { id: 'tomorrow', title: "Tomorrow's\nHoroscope", basePath: '/horoscope/tomorrow' },
            { id: 'weekly', title: "Weekly\nHoroscope", basePath: '/horoscope/weekly' },
            { id: 'monthly', title: "Monthly\nHoroscope", basePath: '/horoscope/monthly' },
            { id: 'yearly', title: "Yearly\nHoroscope", basePath: '/horoscope/yearly' }
          ].filter(item => item.id !== period).slice(0, 4).map((item, idx) => (
            <Link href={`${item.basePath}/${activeZodiacId}`} key={idx} className="flex items-center gap-4 bg-white p-2 border border-[#f0ddc0] hover:border-[#d97706] shadow-sm hover:shadow-md transition-all group">
              <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 border border-[#f0ddc0] group-hover:border-[#d97706] transition-colors bg-[#fff5e6]">
                <Image src={`/zodiacs/${activeZodiacId}.png`} alt={activeBaseZodiac.name} width={56} height={56} className="w-full h-full object-cover" />
              </div>
              <span className="font-serif font-bold text-[#5c1420] text-sm md:text-base group-hover:text-[#d97706] transition-colors pr-2 leading-tight whitespace-pre-line">{item.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-[0_8px_40px_rgba(92,20,32,0.04)] relative overflow-hidden mb-16 mt-4">
        {isLoading && (
          <div className="absolute inset-0 bg-[#fff9f0]/70 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#f0ddc0] border-t-[#ee6c1e] rounded-full animate-spin mb-3"></div>
            <p className="text-[#5c1420] font-bold animate-pulse">Calculating Planetary Transits...</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 pb-3 border-b border-[#f0ddc0]">
              <span className="text-[#5c1420]">{activeBaseZodiac.name} {periodTitle}</span>{' '}
              <span className="text-[#d97706]">Horoscope</span>{' '}
              <span className="text-[#5c1420] opacity-80 text-xl md:text-2xl">({dateDisplayString})</span>
            </h2>
            
            {planetaryHighlight && (
              <div className="inline-block bg-[#fdf0e0] border border-[#f0ddc0] text-[#ee6c1e] text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide mb-6 shadow-sm">
                ✨ Planetary Highlight: {planetaryHighlight}
              </div>
            )}
            
            {/* Stats Grid Above Text */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 mt-6">
              {['love', 'career', 'health', 'money'].map((statKey) => {
                const statObj = active.stats || {};
                const stat = statObj[statKey] || statObj[statKey.charAt(0).toUpperCase() + statKey.slice(1)] || statObj[statKey.toUpperCase()];
                
                const colors: any = { love: 'bg-red-500', career: 'bg-yellow-500', health: 'bg-green-500', money: 'bg-orange-500' };
                return (
                  <div key={statKey} className="bg-white/50 rounded-xl p-4 border border-[#f0ddc0]/50 shadow-sm flex flex-col justify-center">
                    <div className="flex justify-between items-center text-xs font-bold uppercase text-[#5c1420] mb-2">
                      <span>{statKey}</span>
                      <span>{stat?.label || 'Loading'}</span>
                    </div>
                    <div className="w-full bg-[#f0ddc0]/60 h-2 rounded-full overflow-hidden">
                      <div className={`${colors[statKey]} h-full rounded-full transition-all duration-700`} style={{ width: `${stat?.value || 0}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="min-h-[300px]">
              {active.reading ? (
                <div className="prose prose-p:text-[#3a1216] prose-headings:text-[#5c1420] prose-a:text-[#ee6c1e] max-w-none text-base md:text-lg leading-relaxed">
                  {active.reading.trim().startsWith('<') || active.reading.includes('</p>') ? (
                    <div className="break-words overflow-x-auto max-w-full" dangerouslySetInnerHTML={{ __html: active.reading }} />
                  ) : (
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
                        h3: ({ node, children, ...props }) => {
                          const text = Array.isArray(children) ? children[0] : children;
                          if (typeof text === 'string' && text.includes('Horoscope')) {
                            const parts = text.split('Horoscope');
                            return (
                              <h3 className="text-2xl md:text-3xl font-serif font-normal mt-10 mb-4 border-b border-[#f0ddc0]/30 pb-2" {...props}>
                                <span className="text-[#5c1420]">{parts[0]}</span>
                                <span className="text-[#d97706]">Horoscope</span>
                                <span className="text-[#5c1420]">{parts[1]}</span>
                              </h3>
                            );
                          }
                          return <h3 className="text-2xl md:text-3xl font-serif font-normal mt-10 mb-4 text-[#5c1420] border-b border-[#f0ddc0]/30 pb-2" {...props}>{children}</h3>;
                        },
                        strong: ({ node, ...props }) => <strong className="font-bold text-[#b07b46]" {...props} />,
                      }}
                    >
                      {active.reading}
                    </ReactMarkdown>
                  )}
                </div>
              ) : (
                !isLoading && (
                  <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-850 font-medium">Cosmic energies are shifting. Reading is unavailable.</p>
                  </div>
                )
              )}
            </div>

            {/* Badges for Mood, Lucky Number, Aura Color */}
            {showNumbers && active?.mood && (
              <div className="flex flex-wrap gap-3 md:gap-4 mt-8 mb-6 border-t border-[#f0ddc0]/50 pt-6">
                
                {/* Mood Badge */}
                <div className="flex items-center gap-2 bg-[#fff9f0] border border-[#f0ddc0] px-4 py-2 rounded-full shadow-sm">
                  <span className="text-[#412a1e] text-xs md:text-sm opacity-80 font-medium">Mood:</span>
                  <span className="font-bold text-[#5c1420] text-sm">{active.mood}</span>
                </div>

                {/* Lucky Number Badge */}
                {active?.luckyNumber && (
                  <div className="flex items-center gap-2 bg-[#fff9f0] border border-[#f0ddc0] px-4 py-2 rounded-full shadow-sm">
                    <span className="text-[#412a1e] text-xs md:text-sm opacity-80 font-medium">Lucky Number:</span>
                    <span className="font-bold text-[#ee6c1e] text-sm">{active.luckyNumber}</span>
                  </div>
                )}

                {/* Aura Color Badge */}
                {(active?.auraColor || active?.color) && (() => {
                  let colorVal = active.auraColor || active.color;
                  let displayVal = colorVal;
                  // If admin typed a tailwind class like bg-red-500, clean it up for inline style
                  if (colorVal.startsWith('bg-')) {
                    const parts = colorVal.split('-');
                    colorVal = parts[1] || 'red'; // fallback to just the color name
                    displayVal = colorVal;
                  }
                  
                  return (
                    <div className="flex items-center gap-2 bg-[#fff9f0] border border-[#f0ddc0] px-4 py-2 rounded-full shadow-sm">
                      <span className="text-[#412a1e] text-xs md:text-sm opacity-80 font-medium">Lucky Color:</span>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-4 rounded-full shadow-sm border border-gray-200" style={{ backgroundColor: colorVal.toLowerCase() }}></div>
                        <span className="font-bold text-[#5c1420] text-sm capitalize">{displayVal}</span>
                      </div>
                    </div>
                  );
                })()}

              </div>
            )}

            <div className="flex flex-wrap gap-4 mt-2">
              <Link href="/astrologers-chat" className="bg-[#ee6c1e] text-white font-bold py-3 px-6 md:px-8 rounded-full hover:bg-[#d95c14] transition-colors shadow-sm">
                Talk to {activeBaseZodiac.name} Expert
              </Link>
              <button className="bg-white border-2 border-[#5c1420] text-[#5c1420] font-bold py-3 px-6 md:px-8 rounded-full hover:bg-[#5c1420] hover:text-white transition-colors">
                Get Free Kundli
              </button>
              <Link href="/kundli-matching" className="bg-white border-2 border-[#d97706] text-[#d97706] font-bold py-3 px-6 md:px-8 rounded-full hover:bg-[#d97706] hover:text-white transition-colors">
                Free Horoscope Matching
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Know More About Sign Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#5c1420] mb-8 text-center md:text-left border-b border-[#f0ddc0] pb-4">Know More About {activeBaseZodiac.name}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-white border border-[#f0ddc0] rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-[#fdf0e0] text-[#ee6c1e] rounded-full flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              </div>
              <h4 className="text-[#3a1216] font-bold text-sm mb-1">Symbol</h4>
              <p className="text-[#ee6c1e] text-xs font-semibold">{SIGN_TRAITS[activeBaseZodiac.id]?.symbol}</p>
            </div>
            
            <div className="bg-white border border-[#f0ddc0] rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-[#fdf0e0] text-[#ee6c1e] rounded-full flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
              </div>
              <h4 className="text-[#3a1216] font-bold text-sm mb-1">Element</h4>
              <p className="text-[#ee6c1e] text-xs font-semibold">{SIGN_TRAITS[activeBaseZodiac.id]?.element}</p>
            </div>

            <div className="bg-white border border-[#f0ddc0] rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-[#fdf0e0] text-[#ee6c1e] rounded-full flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <h4 className="text-[#3a1216] font-bold text-sm mb-1">Ruling Planet</h4>
              <p className="text-[#ee6c1e] text-xs font-semibold">{SIGN_TRAITS[activeBaseZodiac.id]?.planet}</p>
            </div>

            <div className="bg-white border border-[#f0ddc0] rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-[#fdf0e0] text-[#ee6c1e] rounded-full flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h4 className="text-[#3a1216] font-bold text-sm mb-1">Lucky Gem</h4>
              <p className="text-[#ee6c1e] text-xs font-semibold">{SIGN_TRAITS[activeBaseZodiac.id]?.gem}</p>
            </div>

            <div className="bg-white border border-[#f0ddc0] rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 mx-auto bg-[#fdf0e0] text-[#ee6c1e] rounded-full flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <h4 className="text-[#3a1216] font-bold text-sm mb-1">Nature</h4>
              <p className="text-[#ee6c1e] text-xs font-semibold">{SIGN_TRAITS[activeBaseZodiac.id]?.nature}</p>
            </div>
          </div>
        </div>

        {/* How we prepare the horoscope / SEO text */}
        <div className="mb-16 text-[#412a1e] leading-relaxed">
          <h2 className="text-3xl font-bold text-[#5c1420] mb-6 border-b border-[#f0ddc0] pb-4">How We Prepare Your {activeBaseZodiac.name} {periodTitle} Horoscope</h2>
          <div className="bg-white p-6 rounded-2xl border border-[#f0ddc0] shadow-sm">
            <p className="mb-4">
              Our expert Vedic astrologers prepare the {activeBaseZodiac.name} {periodTitle} horoscope by meticulously analyzing the planetary transits (Gochar) and their alignment with the {activeBaseZodiac.name} zodiac sign. We use precise Vedic astrology calculations to map out how the current movements of the Sun, Moon, and other planets will influence your life.
            </p>
            <p className="mb-4">
              Since {activeBaseZodiac.name} is ruled by <strong>{SIGN_TRAITS[activeBaseZodiac.id]?.planet}</strong> and belongs to the <strong>{SIGN_TRAITS[activeBaseZodiac.id]?.element}</strong> element, its transits play a crucial role in shaping your experiences. Whether it's career advancements, romantic opportunities, or health precautions, our goal is to provide you with actionable insights that help you navigate life's challenges.
            </p>
            <h3 className="text-2xl font-bold text-[#5c1420] mb-4 mt-8">What {activeBaseZodiac.name} {periodTitle} Covers</h3>
            <p>
              Apart from the main forecast, our comprehensive reading dives into the key aspects of your life. The <strong>Love</strong> section highlights romantic harmony and relationship compatibility, while the <strong>Career</strong> section points out growth opportunities, financial gains, and professional interactions. The <strong>Health</strong> and <strong>Money</strong> meters give you a quick visual summary of where you stand for the {periodTitle.toLowerCase()}.
            </p>
          </div>
        </div>

        {/* Other Tools */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#5c1420] mb-6 border-b border-[#f0ddc0] pb-4">Explore More Astrology Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/free-kundali" className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#f0ddc0] hover:border-[#ee6c1e] shadow-sm group transition-all">
              <div className="w-12 h-12 bg-[#fdf0e0] text-[#ee6c1e] rounded-xl flex items-center justify-center group-hover:bg-[#ee6c1e] group-hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/><circle cx="12" cy="12" r="4"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#3a1216] group-hover:text-[#ee6c1e] transition-colors">Free Kundli</h4>
                <p className="text-xs text-[#412a1e] opacity-80 mt-1">Generate your birth chart</p>
              </div>
            </Link>

            <Link href="/horoscope-matching" className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#f0ddc0] hover:border-[#ee6c1e] shadow-sm group transition-all">
              <div className="w-12 h-12 bg-[#fdf0e0] text-[#ee6c1e] rounded-xl flex items-center justify-center group-hover:bg-[#ee6c1e] group-hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#3a1216] group-hover:text-[#ee6c1e] transition-colors">Matchmaking</h4>
                <p className="text-xs text-[#412a1e] opacity-80 mt-1">Check compatibility</p>
              </div>
            </Link>

            <Link href="/panchang" className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-[#f0ddc0] hover:border-[#ee6c1e] shadow-sm group transition-all">
              <div className="w-12 h-12 bg-[#fdf0e0] text-[#ee6c1e] rounded-xl flex items-center justify-center group-hover:bg-[#ee6c1e] group-hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#3a1216] group-hover:text-[#ee6c1e] transition-colors">Today's Panchang</h4>
                <p className="text-xs text-[#412a1e] opacity-80 mt-1">Daily astrological calendar</p>
              </div>
            </Link>
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#5c1420] mb-8 text-center md:text-left border-b border-[#f0ddc0] pb-4">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`bg-white border ${openFaqIndex === idx ? 'border-[#ee6c1e]' : 'border-[#f0ddc0]'} rounded-xl shadow-sm overflow-hidden transition-all duration-300 cursor-pointer hover:border-[#ee6c1e]/50`}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
              >
                <div className="p-5 flex justify-between items-center">
                  <h4 className={`font-bold transition-colors ${openFaqIndex === idx ? 'text-[#ee6c1e]' : 'text-[#3a1216]'} pr-8`}>{faq.q}</h4>
                  <div className={`text-[#ee6c1e] transform transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                <div 
                  className={`transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-5 pb-5 pt-1 border-t border-[#f0ddc0]/30">
                    <p className="text-[#412a1e] text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
