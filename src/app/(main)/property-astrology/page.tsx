'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import astrologerService from '@/lib/astrologerService';
import aiAstrologerService from '@/lib/aiAstrologerService';
import apiClient from '@/lib/api';
import { getImageUrl } from '@/lib/imageUtils';
import { ChevronDown, Heart, ShieldCheck, Star, Sparkles, CheckCircle2, ArrowRight, Phone, MessageCircle, HeartHandshake, ShieldAlert, Sun, Moon, Key } from 'lucide-react';

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const defaultFaqs = [
  { q: 'Mera apna ghar kab banega?', a: 'Apna ghar banne ka yog 4th house, Mars (Zameen) aur Saturn (Construction) ke transits aur Dasha par depend karta hai. Astrologers exact saal predict kar sakte hain.' },
  { q: 'Property lene mein rukawat aa rahi hai, kya remedy karun?', a: 'Mangal (Mars) ko strong karna sabse zaruri hai. Hanuman ji ki upasana aur specific daan (donations) se rukawat door hoti hai.' },
  { q: 'Nayi gaadi kab kharidni chahiye?', a: 'Gaadi (vehicle) Shukra (Venus) aur 4th house se dekhi jati hai. Shubh Muhurat mein gaadi lene se accidents (Vahan Dosh) se bacha ja sakta hai.' },
  { q: 'Ancestral property dispute kaise solve karein?', a: 'Ancestral property 8th house se aati hai. Agar wahan Rahu ya Ketu ho toh dispute hota hai. Iski shanti ke liye specific grah shanti puja ki jati hai.' }
];

const defaultSuccessStories = [
  { name: 'Ramesh K.', before: '"Our property was stuck in litigation for 12 years."', after: '"Expert suggested Mangal remedies. We won the case out of court in just 4 months!"' },
  { name: 'Sneha R.', before: '"I faced 3 minor car accidents in the same year."', after: '"Discovered a severe Vahan Dosh. Did the suggested Rahu-Venus Puja and bought a new car peacefully."' },
  { name: 'Vikram S.', before: '"My dream of building a house was paused due to continuous financial blocks."', after: '"The timing prediction was spot on. My Shani dasha shifted and the construction finished in 8 months."' }
];

export default function PropertyVehicleAstrologyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [astrologers, setAstrologers] = useState<any[]>([]);
  const [loadingAstros, setLoadingAstros] = useState(true);
  const [aiAstrologers, setAiAstrologers] = useState<any[]>([]);
  const [loadingAiAstros, setLoadingAiAstros] = useState(true);

  const [faqs, setFaqs] = useState<{q: string; a: string}[]>(defaultFaqs);
  const [successStories, setSuccessStories] = useState<{name: string; before: string; after: string}[]>(defaultSuccessStories);
  const [banner, setBanner] = useState({ url: '' });

  const astroRef = React.useRef<HTMLDivElement>(null);
  const aiAstroRef = React.useRef<HTMLDivElement>(null);
  const storiesRef = React.useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!isAutoScrolling || !storiesRef.current) return;
    
    let animationFrameId: number;
    
    const scrollStep = () => {
      if (storiesRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = storiesRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          storiesRef.current.scrollLeft = 0;
        } else {
          storiesRef.current.scrollLeft += 1;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };
    
    animationFrameId = requestAnimationFrame(scrollStep);
    
    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoScrolling]);

  useEffect(() => {
    const fetchAstrologers = async () => {
      try {
        const response = await astrologerService.searchAstrologers({ limit: 10, isOnline: true });
        setAstrologers(response.data || []);
      } catch (error) {
        console.error('Failed to fetch astrologers:', error);
      } finally {
        setLoadingAstros(false);
      }
    };
    const fetchAiAstrologers = async () => {
      try {
        const data = await aiAstrologerService.getAllAiAstrologers();
        setAiAstrologers(data || []);
      } catch (error) {
        console.error('Failed to fetch AI astrologers:', error);
      } finally {
        setLoadingAiAstros(false);
      }
    };
    const fetchSettings = async () => {
      try {
        const response = await apiClient.get('/smart-kundali-settings/property-astrology');
        if (response.data) {
          if (response.data.faqs?.length) setFaqs(response.data.faqs);
          if (response.data.successStories?.length) setSuccessStories(response.data.successStories);
          if (response.data.banner) setBanner(response.data.banner);
        }
      } catch (error) {
        console.error('Failed to fetch settings:', error);
      }
    };
    fetchAstrologers();
    fetchAiAstrologers();
    fetchSettings();
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

    const problems = [
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
      tool: { name: 'Talk to Expert', link: '/astrologers-chat' },
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
  ];

  return (
    <div className="relative w-full max-w-[1600px] min-w-[320px] mx-auto overflow-hidden bg-transparent font-sans">

      {/* Premium Ambient Background (Transparent to let stars show) */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-transparent -z-10"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-[#f8e2c9] rounded-full mix-blend-multiply filter blur-[150px] opacity-30 -z-10 animate-pulse" style={{ animationDuration: '8s' }}></div>

      {/* Hero Section */}
      <section className="relative w-full min-h-[550px] lg:min-h-[600px] flex flex-col lg:flex-row lg:items-center overflow-hidden pt-12 md:py-16 lg:py-20 z-10">

        {/* Desktop-only absolute background image (Fades left-to-right) */}
        <div className="absolute inset-0 z-0 hidden lg:flex justify-end pointer-events-none">
          <motion.img
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.95, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src={banner?.url || "/images/property-vehicle.webp"}
            alt="Property & Vehicle Astrology Consultation"
            className="h-full lg:h-[100%] my-auto md:w-[60%] lg:w-[85%] object-cover object-[85%_center] mix-blend-multiply"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)' }}
          />
        </div>

        {/* Text Content */}
        <div className="relative z-20 w-full px-6 md:px-10 mx-auto max-w-[1300px] flex-shrink-0 lg:-mt-16">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-[650px] lg:max-w-[800px]">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#f0ddc0] shadow-sm text-[#8a1c2a] text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-[#d97706]" />
              Vedic Astrology Solutions
            </motion.div>

            <motion.h1 variants={fadeInUp} className="premium-serif font-bold text-[#3a1216] text-[38px] md:text-[56px] leading-[1.1] mb-6 tracking-tight">
              Secure Property & Vehicle Investments <br />
              <span className="relative inline-block mt-2">
                <span className="text-[#ee6c1e]">Through Vedic Astrology</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#f0ddc0] -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[#5e4339] text-[16px] md:text-[18px] leading-relaxed mb-8 max-w-[550px] font-medium">
              Whether you're facing delays in buying a house, trapped in ancestral property disputes, seeking the best time to buy a vehicle, or suffering from Vahan Dosh — your Kundali holds precise, judgement-free answers.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link href="/astrologers-chat" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-[#8a1c2a] text-white font-semibold px-8 py-4 rounded-xl shadow-[0_8px_20px_rgba(138,28,42,0.15)] hover:bg-[#721522] hover:-translate-y-0.5 transition-all duration-300 text-[16px]">
                Consult an Expert <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/kundli" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-white/90 backdrop-blur-sm text-[#5c1420] border-2 border-[#f0ddc0] font-semibold px-8 py-4 rounded-xl hover:border-[#d97706] hover:bg-white transition-all duration-300 shadow-sm text-[16px]">
                Get Free Kundli
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-8 md:mt-10 flex items-center gap-4 md:gap-6 flex-wrap">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-[#22c55e]" /><span className="text-[#412a1e] font-medium text-sm">Verified Experts</span></div>
              <div className="flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[#22c55e]" /><span className="text-[#412a1e] font-medium text-sm">100% Private</span></div>
            </motion.div>
          </motion.div>

          {/* Mobile & Tablet Image (Visible only below lg breakpoint) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-[calc(100%+3rem)] -ml-6 mt-12 lg:hidden relative pointer-events-none flex justify-center"
          >
            <img
              src={banner?.url || "/images/property-vehicle.webp"}
              alt="Property & Vehicle Astrology"
              className="w-full h-[320px] object-cover object-[95%_top] opacity-95 mix-blend-multiply"
              style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Visible Problems Grid */}
      <section className="px-6 md:px-10 py-16 md:py-20 relative z-20">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="premium-serif font-bold text-[36px] md:text-[42px] text-[#3a1216] mb-4">
              Answers to Your <span className="text-[#d97706]">Deepest Concerns</span>
            </h2>
            <p className="text-[#5e4339] text-[17px] max-w-2xl mx-auto">Select a concern to see how Vedic astrology reveals the root cause and provides practical remedies.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group border border-[#f0ddc0]/80 rounded-2xl p-6 bg-[#fdfaf7] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-[#ee6c1e]/40 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-[#fdf8f0] flex items-center justify-center shrink-0">
                    {problem.icon}
                  </div>
                  <h3 className="font-bold text-[#3a1216] text-[18px] leading-tight">{problem.title}</h3>
                </div>

                <p className="text-[#5e4339] text-[14.5px] leading-relaxed mb-6 flex-grow">
                  {problem.content}
                </p>

                <div className="mt-auto pt-4 border-t border-[#f0ddc0]/40 flex flex-wrap gap-2.5">
                  {(problem.tool || problem.report) ? (
                    <>
                      {problem.tool && (
                        <Link href={problem.tool.link} className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#ee6c1e] bg-[#ee6c1e]/10 px-3 py-1.5 rounded-lg hover:bg-[#ee6c1e] hover:text-white transition-all">
                          {problem.tool.name}
                        </Link>
                      )}
                      {problem.report && (
                        <Link href={problem.report.link} className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#8a1c2a] bg-[#8a1c2a]/10 px-3 py-1.5 rounded-lg hover:bg-[#8a1c2a] hover:text-white transition-all">
                          {problem.report.name}
                        </Link>
                      )}
                    </>
                  ) : (
                    <Link href="/astrologers-chat" className="text-[14px] font-bold text-[#d97706] hover:text-[#ee6c1e] flex items-center gap-1">
                      Consult Expert <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Light Theme Free Tools (Compact) */}
      <section className="px-6 md:px-10 py-12 md:py-16 bg-transparent">
        <div className="max-w-[1200px] mx-auto text-center">
          <h2 className="premium-serif font-bold text-[32px] md:text-[38px] text-[#3a1216] mb-3">
            Instantly Gain <span className="text-[#d97706]">Clarity</span>
          </h2>
          <p className="text-[#5e4339] text-[16px] md:text-[17px] mb-10 max-w-2xl mx-auto">Not ready to consult yet? Use our precision Vedic calculators to get instant, free insights.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[
              { title: 'Free Janam Kundali', desc: 'Detailed life blueprint', icon: <Heart className="w-7 h-7" />, link: '/kundli', color: 'bg-orange-50', text: 'text-[#ee6c1e]' },
              { title: 'Numerology Report', desc: 'Discover your lucky numbers', icon: <ShieldCheck className="w-7 h-7" />, link: '/numerology', color: 'bg-rose-50', text: 'text-[#e11d48]' },
              { title: 'Daily Horoscope', desc: 'Read today\'s finance predictions', icon: <Sparkles className="w-7 h-7" />, link: '/daily-horoscope', color: 'bg-indigo-50', text: 'text-[#4f46e5]' }
            ].map((tool, i) => (
              <Link href={tool.link} key={i} className="group flex items-center gap-4 bg-white border border-[#f0ddc0]/80 p-5 rounded-2xl hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 text-left">
                <div className={`shrink-0 w-14 h-14 rounded-full ${tool.color} flex items-center justify-center ${tool.text} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  {tool.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#3a1216] text-[17px] md:text-[18px] mb-1 leading-tight">{tool.title}</h3>
                  <p className="text-[#5e4339] text-[13.5px] leading-snug">{tool.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Astrologers (Dual CTA) */}
      <section className="px-6 md:px-10 py-16 md:py-20 ">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <h2 className="premium-serif font-bold text-[36px] md:text-[42px] text-[#3a1216] mb-3">
                Consult Property & Vehicle <span className="text-[#d97706]">Specialists</span>
              </h2>
              <p className="text-[#5e4339] text-[17px]">Talk to verified Vedic astrologers who specialise in relationship compatibility, dosh remedies, and marital harmony.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 shrink-0">
                <button onClick={() => scrollContainer(astroRef, 'left')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] hover:bg-[#5c1420] hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button onClick={() => scrollContainer(astroRef, 'right')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] hover:bg-[#5c1420] hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
              <Link href="/astrologers-chat" className="shrink-0 hidden md:flex bg-white border border-[#f0ddc0] text-[#5c1420] font-bold px-6 py-3 rounded-xl hover:bg-[#fdf8f0] transition-all items-center gap-2">
                View All Experts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div ref={astroRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 hide-scrollbar w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {loadingAstros ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                <div key={i} className="shrink-0 w-[280px] lg:w-[320px] snap-center h-[280px] rounded-2xl bg-gray-100 animate-pulse"></div>
              ))
            ) : (
              astrologers.slice(0, 8).map((astro: any, i: number) => (
                <Link href={`/astrologer/${astro._id}`} key={i} className="shrink-0 w-[280px] lg:w-[320px] snap-center group flex flex-col h-full border border-[#f0ddc0]/80 hover:border-[#d97706]/40 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.04)] rounded-2xl p-4 bg-white transition-all duration-300">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="relative w-[60px] h-[60px] shrink-0">
                      <div className="w-full h-full rounded-full overflow-hidden border-[1.5px] border-[#22c55e] p-0.5">
                        <img src={getImageUrl(astro.profileImage || astro.profilePicture, astro.name)} alt={astro.name} className="w-full h-full object-cover rounded-full" />
                      </div>
                      {(astro.availability?.isOnline || astro.status === 'online' || astro.isOnline) && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="pt-1">
                      <h3 className="font-bold text-[16px] text-[#3a1216]">{astro.name || 'Astrologer'}</h3>
                      <div className="text-[12px] text-gray-850 mt-0.5 truncate max-w-[120px]">
                        {astro.languages?.slice(0, 2).join(', ') || 'Hindi'} • {astro.experienceYears || 5} yrs
                      </div>
                      <div className="flex items-center gap-1 text-[12.5px] font-bold text-[#2c0d12] mt-1">
                        <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                        4.9
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mb-5 flex-wrap mt-1">
                    {(astro.specializations?.length ? astro.specializations : ['Business & Finance', 'Business']).slice(0, 3).map((skill: string, idx: number) => (
                      <span key={idx} className="text-[10px] font-semibold text-[#5c1420] bg-[#fdf8f0] border border-[#f0ddc0]/50 rounded-full px-2.5 py-1">{skill}</span>
                    ))}
                  </div>

                  {/* Dual CTA: Chat & Call */}
                  <div className="mt-auto flex gap-2 w-full">
                    <div className="flex-1 flex items-center justify-center gap-1.5 border-[1.5px] border-[#8a1c2a] text-[#8a1c2a] rounded-xl py-2 hover:bg-[#8a1c2a] hover:text-white transition-colors duration-300">
                      <Phone className="w-3.5 h-3.5" />
                      <div className="text-[12.5px] font-bold">₹{astro.pricing?.call || 25}/m</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-1.5 border-[1.5px] border-[#8a1c2a] text-[#8a1c2a] rounded-xl py-2 hover:bg-[#8a1c2a] hover:text-white transition-colors duration-300">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <div className="text-[12.5px] font-bold">₹{astro.pricing?.chat || 25}/m</div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="mt-6 flex justify-center md:hidden">
            <Link href="/astrologers-chat" className="bg-white border border-[#f0ddc0] text-[#5c1420] font-bold px-6 py-3 rounded-xl hover:bg-[#fdf8f0] transition-all flex items-center justify-center gap-2 w-full">
              View All Experts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* AI Astrologers (Dual CTA) */}
      <section className="px-6 md:px-10 py-16 md:py-20 border-t border-[#f0ddc0]/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <h2 className="premium-serif font-bold text-[36px] md:text-[42px] text-[#3a1216] mb-3">
                Ask Our <span className="text-[#d97706]">AI Astrologers</span>
              </h2>
              <p className="text-[#5e4339] text-[17px]">Get instant, personalized answers to your relationship questions from our advanced AI astrologers, available 24/7.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 shrink-0">
                <button onClick={() => scrollContainer(aiAstroRef, 'left')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] hover:bg-[#5c1420] hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button onClick={() => scrollContainer(aiAstroRef, 'right')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] hover:bg-[#5c1420] hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </div>
              <Link href="/ai-astrologer-chat" className="shrink-0 hidden md:flex bg-white border border-[#f0ddc0] text-[#5c1420] font-bold px-6 py-3 rounded-xl hover:bg-[#fdf8f0] transition-all items-center gap-2">
                View All AI Experts <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div ref={aiAstroRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 hide-scrollbar w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {loadingAiAstros ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                <div key={i} className="shrink-0 w-[280px] lg:w-[320px] snap-center h-[280px] rounded-2xl bg-gray-100 animate-pulse"></div>
              ))
            ) : (
              aiAstrologers.slice(0, 8).map((astro: any, i: number) => (
                <Link href={`/ai-astrologer/${astro._id}`} key={i} className="shrink-0 w-[280px] lg:w-[320px] snap-center group flex flex-col h-full border border-[#f0ddc0]/80 hover:border-[#d97706]/40 shadow-sm hover:shadow-[0_10px_25px_rgba(0,0,0,0.04)] rounded-2xl p-4 bg-white transition-all duration-300">
                  <div className="flex items-start gap-4 mb-3">
                    <div className="relative w-[60px] h-[60px] shrink-0">
                      <div className="w-full h-full rounded-full overflow-hidden border-[1.5px] border-[#22c55e] p-0.5">
                        <img src={getImageUrl(astro.profileImage, astro.name)} alt={astro.name} className="w-full h-full object-cover rounded-full" />
                      </div>
                      {astro.status === 'active' && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#22c55e] rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="pt-1">
                      <h3 className="font-bold text-[16px] text-[#3a1216]">{astro.name || 'AI Astrologer'}</h3>
                      <div className="text-[12px] text-gray-850 mt-0.5 truncate max-w-[120px]">
                        {astro.languages?.slice(0, 2).join(', ') || 'Hindi'} • {astro.experienceYears || 5} yrs
                      </div>
                      <div className="flex items-center gap-1 text-[12.5px] font-bold text-[#2c0d12] mt-1">
                        <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
                        {astro.rating ? Number(astro.rating).toFixed(1) : '5.0'}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1.5 mb-5 flex-wrap mt-1">
                    {(astro.specialization?.length ? astro.specialization : ['Business & Finance', 'Business']).slice(0, 3).map((skill: string, idx: number) => (
                      <span key={idx} className="text-[10px] font-semibold text-[#5c1420] bg-[#fdf8f0] border border-[#f0ddc0]/50 rounded-full px-2.5 py-1">{skill}</span>
                    ))}
                  </div>

                  {/* Dual CTA: Chat & Call */}
                  <div className="mt-auto flex gap-2 w-full">
                    <div className="flex-1 flex items-center justify-center gap-1.5 border-[1.5px] border-[#8a1c2a] text-[#8a1c2a] rounded-xl py-2 hover:bg-[#8a1c2a] hover:text-white transition-colors duration-300">
                      <Phone className="w-3.5 h-3.5" />
                      <div className="text-[12.5px] font-bold">₹{astro.voiceRate || 10}/m</div>
                    </div>
                    <div className="flex-1 flex items-center justify-center gap-1.5 border-[1.5px] border-[#8a1c2a] text-[#8a1c2a] rounded-xl py-2 hover:bg-[#8a1c2a] hover:text-white transition-colors duration-300">
                      <MessageCircle className="w-3.5 h-3.5" />
                      <div className="text-[12.5px] font-bold">₹{astro.chatRate || 10}/m</div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <div className="mt-6 flex justify-center md:hidden">
            <Link href="/ai-astrologer-chat" className="bg-white border border-[#f0ddc0] text-[#5c1420] font-bold px-6 py-3 rounded-xl hover:bg-[#fdf8f0] transition-all flex items-center justify-center gap-2 w-full">
              View All AI Experts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="px-6 md:px-10 py-16 md:py-20 bg-transparent border-t border-[#f0ddc0]/50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="premium-serif font-bold text-[36px] md:text-[42px] text-[#3a1216] mb-4">
              Premium <span className="text-[#d97706]">Reports & Remedies</span>
            </h2>
            <p className="text-[#5e4339] text-[17px] max-w-2xl mx-auto">Get comprehensive written reports or book targeted rituals to alleviate planetary blocks.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-[#f0ddc0]/80 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="premium-serif font-bold text-[24px] text-[#3a1216] mb-6">Detailed Reports</h3>
              <div className="space-y-3">
                                {[
                  { title: 'Vaidik Smart Kundali (10 Years)', link: '/report/kundali/vaidik-smart-kundali-10-years' },
                  { title: 'Personalized Lal Kitab', link: '/report/kundali/personalized-lal-kitab' },
                  { title: 'Hastlikhit Kundali', link: '/report/kundali/hastlikhit-kundali' }
                ].map((rep, i) => (
                  <Link href={rep.link} key={i} className="flex items-center justify-between p-4 rounded-xl bg-transparent border border-[#f0ddc0]/50 hover:bg-[#fdf8f0] hover:border-[#d97706] group transition-all duration-300">
                    <div className="font-semibold text-[#3a1216] group-hover:text-[#d97706] transition-colors text-[15px]">{rep.title}</div>
                    <ArrowRight className="w-5 h-5 text-[#d97706] group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-[#f0ddc0]/80 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="premium-serif font-bold text-[24px] text-[#3a1216] mb-6">Vedic Pujas</h3>
              <div className="space-y-3">
                                {[
                  { title: 'Business Attract Confirm Puja', link: '/book-a-puja/job-attract-confirm-puja' },
                  { title: 'Shani Tel Arpan Aarti', link: '/book-a-puja/shani-tel-arpan-aarti' },
                  { title: 'Dhan Laxmi Puja', link: '/book-a-puja/dhan-laxmi-puja' }
                ].map((rep, i) => (
                  <Link href={rep.link} key={i} className="flex items-center justify-between p-4 rounded-xl bg-transparent border border-[#f0ddc0]/50 hover:bg-[#fdf8f0] hover:border-[#d97706] group transition-all duration-300">
                    <div className="font-semibold text-[#3a1216] group-hover:text-[#d97706] transition-colors text-[15px]">{rep.title}</div>
                    <ArrowRight className="w-5 h-5 text-[#d97706] group-hover:translate-x-1 transition-transform shrink-0 ml-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive SEO Content Hub */}
      <section className="px-5 md:px-10 py-12 md:py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          {/* Top Row: Intro & Astrologer Card */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-12 md:mb-16">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf3e7] text-[#d97706] text-sm font-semibold mb-4 border border-[#f0ddc0]/50">
                <Star className="w-4 h-4" /> Why Astrology for Property & Vehicle?
              </div>
              <h2 className="premium-serif font-bold text-[28px] md:text-[42px] text-[#3a1216] leading-tight md:leading-[1.2] mb-5 md:mb-6">
                Decoding Your Asset & Property Destiny <br className="hidden md:block" />With <span className="text-[#d97706]">Vedic Astrology</span>
              </h2>
              <p className="text-[#5e4339] text-[15.5px] md:text-[17px] leading-relaxed mb-4">
                Your ability to buy property, own vehicles, and build tangible assets is deeply intertwined with the planetary alignments at your time of birth. Vedic astrology provides a razor-sharp blueprint of your financial strengths, hidden blockages, and the specific industries where you are destined to profit. Stop guessing and start building lasting wealth.
              </p>
              <p className="text-[#5e4339] text-[16px] md:text-[17px] leading-relaxed">
                The <strong className="text-[#3a1216]">4th House</strong> (Matru/Sukha Bhava) represents property, vehicles, and comforts. Along with Mars (Land) and Venus (Vehicles), these elements hold the key to answering when you will buy your dream home or recover ancestral property.
              </p>
            </div>

            <div className="flex-1 w-full relative mt-4 lg:mt-0">
              <div className="absolute inset-0 bg-[#f8e2c9] rounded-[2.5rem] blur-[60px] opacity-40 -z-10"></div>
              <div className="bg-[#fdfaf7] border border-[#f0ddc0]/80 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-[0_10px_40px_rgba(138,28,42,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[#fdf3e7] rounded-bl-[80px] md:rounded-bl-[100px] -z-10"></div>
                <h3 className="premium-serif font-bold text-[24px] md:text-[28px] text-[#3a1216] mb-6 md:mb-8">How Our Astrologers Help</h3>
                <ul className="space-y-6">
                  {[
                    { title: 'Dhana Yoga Analysis', desc: 'Discover hidden wealth combinations (Yogas) in your Kundli that promise financial abundance.' },
                    { title: 'Debt Recovery Solutions', desc: 'Identify the karmic blockages causing financial leakages and learn precise remedies to clear debts.' },
                    { title: 'Investment & Stock Guidance', desc: 'Find out the most auspicious periods for stock trading, real estate, and long-term investments.' },
                    { title: 'Business Partnership Check', desc: 'Avoid massive losses by checking astrological compatibility with potential co-founders.' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 md:gap-5 items-start">
                      <div className="shrink-0 w-7 h-7 mt-0.5 rounded-full bg-[#8a1c2a]/10 text-[#8a1c2a] flex items-center justify-center text-[13px] font-bold">{idx + 1}</div>
                      <div>
                        <h4 className="font-bold text-[#3a1216] text-[15.5px] md:text-[16px] mb-1 leading-snug">{item.title}</h4>
                        <p className="text-[#5e4339] text-[13.5px] md:text-[14px] leading-relaxed">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 md:mt-10">
                  <Link href="/astrologers-chat" className="w-full inline-flex justify-center items-center bg-white border-2 border-[#8a1c2a] text-[#8a1c2a] font-bold px-5 py-3.5 md:py-4 rounded-xl hover:bg-[#8a1c2a] hover:text-white transition-all shadow-sm text-[15px] md:text-[15.5px]">
                    Talk to a Wealth Expert
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 SEO Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {/* Card 1 */}
            <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#fdfaf7] border border-[#f0ddc0]/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(217,119,6,0.08)] hover:border-[#d97706]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-[#d97706] group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] md:text-[24px] text-[#3a1216] mb-3">Property Yogas in Kundli</h3>
              <p className="text-[#5e4339] text-[14.5px] md:text-[15.5px] leading-relaxed">
                A strong connection between the Lagna lord and the 4th lord guarantees immense property and real estate. Our experts analyze your exact Dasha periods to predict when these yogas will activate and bring massive assets into your life.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#fdfaf7] border border-[#f0ddc0]/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(34,197,94,0.08)] hover:border-[#22c55e]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-[#22c55e] group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] md:text-[24px] text-[#3a1216] mb-3">Vahan Dosh & Vehicle Safety</h3>
              <p className="text-[#5e4339] text-[14.5px] md:text-[15.5px] leading-relaxed">
                Before purchasing a vehicle, it is crucial to check the 4th house and Venus. If afflicted by Rahu or Saturn, it creates Vahan Dosh, leading to accidents and vehicle damage. We evaluate your chart for safety and suggest auspicious Muhurats.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#fdfaf7] border border-[#f0ddc0]/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.08)] hover:border-[#e11d48]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-[#e11d48] group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] md:text-[24px] text-[#3a1216] mb-3">Resolving Ancestral Property Disputes</h3>
              <p className="text-[#5e4339] text-[14.5px] md:text-[15.5px] leading-relaxed">
                Disputes over family inheritance are dictated by the 8th house. We prescribe specific Vedic remedies, such as appeasing Mars (Mangal) and performing targeted Homas to break legal deadlocks and ensure your rightful share is secured.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Astrology SEO Section */}
      <section className="px-6 md:px-10 py-16 md:py-20 bg-transparent border-t border-[#f0ddc0]/50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#f8e2c9] rounded-full blur-[120px] opacity-40 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#fdf3e7] rounded-full blur-[100px] opacity-60 -z-10"></div>

        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#d97706] text-sm font-semibold mb-4 border border-[#f0ddc0]/80 shadow-sm">
              <Key className="w-4 h-4" /> The Secrets of Property Astrology
            </div>
            <h2 className="premium-serif font-bold text-[32px] md:text-[40px] text-[#3a1216] mb-4 leading-tight">
              Planets, Houses & <span className="text-[#d97706]">Property Remedies</span>
            </h2>
            <p className="text-[#5e4339] text-[16.5px] max-w-3xl mx-auto leading-relaxed">
              Vedic Astrology provides a surgical analysis of your financial potential. Our experts decode the precise geometric alignments of the Navagrahas (nine planets) and specific Bhavas (houses) in your Kundali to reveal the absolute truth about your prosperity.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Planets */}
            <div className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f0ddc0]/80 shadow-[0_8px_30px_rgba(138,28,42,0.03)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.06)] transition-all">
              <div className="w-14 h-14 bg-[#fff8f0] rounded-2xl flex items-center justify-center mb-6 border border-[#f0ddc0]/50">
                <Sun className="w-7 h-7 text-[#d97706]" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] text-[#3a1216] mb-4">Role of Key Planets</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Mars (Mangal):</strong> The ultimate Karaka (significator) of land and real estate. A strong Mars is essential for owning property and winning land disputes.</p>
                </li>
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Venus (Shukra):</strong> Governs luxury and vehicles. A strong Venus decides the level of material comfort, beautiful homes, and premium cars you will own.</p>
                </li>
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Rahu:</strong> The shadow planet responsible for sudden, massive, and unexpected financial gains, especially in the stock market.</p>
                </li>
              </ul>
            </div>

            {/* Houses */}
            <div className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f0ddc0]/80 shadow-[0_8px_30px_rgba(138,28,42,0.03)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.06)] transition-all">
              <div className="w-14 h-14 bg-[#f0f9ff] rounded-2xl flex items-center justify-center mb-6 border border-[#bae6fd]/50">
                <Moon className="w-7 h-7 text-[#0284c7]" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] text-[#3a1216] mb-4">Crucial Astrology Houses</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">4th House:</strong> The 'Sukha Bhava', representing your own house, lands, mother, vehicles, and domestic happiness.</p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">8th House:</strong> Represents hidden wealth, inheritances, ancestral property, and unexpected gains through family wills.</p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">8th House:</strong> Represents hidden wealth, inheritances, and sudden windfalls through lotteries or trading.</p>
                </li>
              </ul>
            </div>

            {/* Remedies */}
            <div className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f0ddc0]/80 shadow-[0_8px_30px_rgba(138,28,42,0.03)] hover:shadow-[0_8px_30px_rgba(217,119,6,0.06)] transition-all">
              <div className="w-14 h-14 bg-[#fdf4ff] rounded-2xl flex items-center justify-center mb-6 border border-[#fbcfe8]/50">
                <Sparkles className="w-7 h-7 text-[#c026d3]" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] text-[#3a1216] mb-4">Powerful Vedic Remedies</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Heart className="w-5 h-5 text-[#d946ef] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Mangal Shanti Puja:</strong> A highly potent ritual to remove blockages in property matters, clear land disputes, and speed up house construction.</p>
                </li>
                <li className="flex gap-3">
                  <Heart className="w-5 h-5 text-[#d946ef] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed">
                    <strong className="text-[#3a1216]">Spiritual Remedies:</strong> Keeping a Shree Yantra, wearing Yellow Sapphire, or using Pyrite crystals attract massive wealth.{' '}
                    <a href="https://vaidiktalk.store/" target="_blank" rel="noopener noreferrer" className="text-[#d97706] font-semibold hover:underline inline-flex items-center gap-1 mt-1">
                      Explore Spiritual Store <ArrowRight className="w-3 h-3" />
                    </a>
                  </p>
                </li>
                <li className="flex gap-3">
                  <Heart className="w-5 h-5 text-[#d946ef] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Kanakdhara Stotram:</strong> Reciting this stotram daily is known as the ultimate remedy for eradicating poverty and debts.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="px-6 md:px-10 py-16 md:py-20 bg-[#fdfaf7] border-t border-[#f0ddc0]/50 overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#d97706] text-sm font-semibold mb-4 border border-[#f0ddc0]/80 shadow-sm">
                <Star className="w-4 h-4" /> Success Stories
              </div>
              <h2 className="premium-serif font-bold text-[32px] md:text-[40px] text-[#3a1216] mb-4">
                Real Transformations <span className="text-[#d97706]">& Real Results</span>
              </h2>
              <p className="text-[#5e4339] text-[16.5px]">See how Vedic astrology provided clarity and financial breakthroughs for our clients.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => scrollContainer(storiesRef, 'left')} className="w-10 h-10 rounded-full bg-white border border-[#f0ddc0] shadow-sm flex items-center justify-center text-[#5c1420] hover:bg-[#5c1420] hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={() => scrollContainer(storiesRef, 'right')} className="w-10 h-10 rounded-full bg-white border border-[#f0ddc0] shadow-sm flex items-center justify-center text-[#5c1420] hover:bg-[#5c1420] hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
          </div>

          <div 
            ref={storiesRef} 
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            onTouchStart={() => setIsAutoScrolling(false)}
            onTouchEnd={() => setIsAutoScrolling(true)}
            className="flex overflow-x-auto gap-6 pb-6 hide-scrollbar w-full cursor-pointer" 
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)'
            }}
          >
            {successStories.map((story, i) => (
              <div key={i} className="shrink-0 w-[340px] sm:w-[380px] md:w-[500px] bg-white rounded-3xl p-5 md:p-8 border border-[#f0ddc0]/80 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#fdf3e7] rounded-bl-[60px] -z-10 opacity-50"></div>
                <div>
                  <h3 className="font-bold text-[#3a1216] text-[17px] md:text-[18px] mb-3 md:mb-5">{story.name}</h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex gap-3">
                      <div className="w-10 md:w-12 shrink-0 font-bold text-[#8a1c2a] text-[10px] md:text-xs pt-0.5 md:pt-1 uppercase tracking-wider">Before</div>
                      <p className="text-[#5e4339] text-[13.5px] md:text-[14.5px] italic border-l-2 border-[#f0ddc0] pl-3 leading-relaxed">{story.before}</p>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-10 md:w-12 shrink-0 font-bold text-[#22c55e] text-[10px] md:text-xs pt-0.5 md:pt-1 uppercase tracking-wider">After</div>
                      <p className="text-[#5e4339] text-[13.5px] md:text-[14.5px] border-l-2 border-[#22c55e]/30 pl-3 leading-relaxed font-medium">{story.after}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clean FAQs */}
      <section className="px-6 md:px-10 py-16 md:py-20 bg-transparent">
        <div className="max-w-[800px] mx-auto">
          <h2 className="premium-serif font-bold text-[32px] md:text-[40px] text-[#3a1216] text-center mb-10">
            Frequently Asked <span className="text-[#d97706]">Questions</span>
          </h2>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-[#f0ddc0]/60 last:border-0">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left py-5 flex justify-between items-center group"
                >
                  <h3 className="font-bold text-[#3a1216] text-[16px] md:text-[17px] group-hover:text-[#d97706] transition-colors">{faq.q}</h3>
                  <div className={`shrink-0 ml-4 w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-300 ${openFaq === i ? 'border-[#d97706] bg-[#d97706] text-white' : 'border-[#f0ddc0] text-[#8a1c2a] group-hover:border-[#d97706]'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="text-[#5e4339] text-[15px] leading-relaxed pb-6">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Light Premium CTA */}
      <section className="px-6 md:px-10 py-16 md:py-20  border-t border-[#f0ddc0]/50 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#fdf3e7] rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-[800px] mx-auto relative z-10">
                    <h2 className="premium-serif font-bold text-[#3a1216] text-[36px] md:text-[46px] mb-6 leading-tight">
            Take Control of Your <br /> Professional Destiny
          </h2>
          <p className="text-[#5e4339] text-[17px] mb-10 max-w-xl mx-auto font-medium">
            Connect with a verified finance astrologer today or start by generating your free detailed Kundali.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/astrologers-chat" className="w-full sm:w-auto inline-flex justify-center items-center bg-[#8a1c2a] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#721522] hover:-translate-y-1 transition-all shadow-[0_8px_20px_rgba(138,28,42,0.15)] text-[16px]">
              Talk to a Business & Finance Astrologer
            </Link>
            <Link href="/kundli" className="w-full sm:w-auto inline-flex justify-center items-center bg-white border-2 border-[#f0ddc0] text-[#5c1420] font-bold px-8 py-4 rounded-xl hover:bg-[#fdf8f0] hover:border-[#d97706] transition-all shadow-sm text-[16px]">
              Generate Free Kundali
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
