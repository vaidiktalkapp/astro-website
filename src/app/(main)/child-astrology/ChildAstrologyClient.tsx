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
  { q: 'Can astrology predict my chances of clearing competitive exams?', a: 'Yes. By analyzing your 6th house (competitions) and 5th house (intelligence), along with the placement of Mercury and Jupiter, we can predict your success rate and timing.' },
  { q: 'Which planets are responsible for lack of focus in studies?', a: 'A weak or afflicted Mercury causes lack of concentration. An afflicted Moon leads to a wandering mind, while Rahu causes distractions and illusions regarding career paths.' },
  { q: 'How do Vedic remedies help in education?', a: 'Remedies like wearing an Emerald (Panna), chanting Saraswati Mantras, or performing Ganesh Puja strengthen Mercury and Jupiter, significantly improving memory and focus.' },
  { q: 'Can astrology tell me which stream or subjects to choose?', a: 'Absolutely. Your 5th house (intellect), 9th house (higher education), and 10th house (career) indicate where your natural talents lie, guiding you to choose the right subjects.' },
  { q: 'Will I get an opportunity to study abroad?', a: 'If your 9th house (long journeys, higher education) or 12th house (foreign lands) is connected with the 5th house or Ascendant, studying abroad is highly indicated in your chart.' }
];

const defaultSuccessStories = [
  {
    name: 'Rohan M.',
    before: '"I couldn\'t concentrate on my studies and failed my engineering entrance twice."',
    after: '"After following the suggested remedies for my afflicted Mercury, my focus improved immensely. I cleared the exam on my third attempt with top ranks!"'
  },
  {
    name: 'Priya K.',
    before: '"I was totally confused between pursuing Medical or Commerce. My mind was always wavering."',
    after: '"A Kundali analysis showed a strong Jupiter-Moon connection. I chose Commerce and am now excelling as a Chartered Accountant."'
  },
  {
    name: 'Arjun S.',
    before: '"Despite studying hard, I would forget everything during the actual exam."',
    after: '"The astrologer identified Rahu transiting my 5th house. I performed a Saraswati Puja and started wearing an Emerald. My memory retention skyrocketed."'
  },
  {
    name: 'Sneha V.',
    before: '"My dream of studying in the US seemed impossible due to constant visa rejections."',
    after: '"Vedic astrology revealed a block in my 9th house. I did the specific remedies and my visa was approved within 3 months!"'
  },
  {
    name: 'Karan D.',
    before: '"I was dealing with severe exam anxiety and depression due to peer pressure."',
    after: '"Strengthening my Moon with a simple Shiva remedy helped me regain my mental peace and confidence to face my board exams."'
  },
  {
    name: 'Neha A.',
    before: '"I was a bright student but suddenly lost all interest in studies during 11th grade."',
    after: '"It was a malefic Rahu Mahadasha effect. Following the remedies brought my academic interest and grades back on track."'
  }
];

export default function ChildAstrologyClient({ 
  initialAstrologers = [], 
  initialAiAstrologers = [], 
  initialFaqs = null, 
  initialSuccessStories = null, 
  initialBanner = null 
}: any) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [astrologers, setAstrologers] = useState<any[]>(Array.isArray(initialAstrologers) ? initialAstrologers : []);
  const [loadingAstros, setLoadingAstros] = useState(initialAstrologers.length === 0);
  const [aiAstrologers, setAiAstrologers] = useState<any[]>(Array.isArray(initialAiAstrologers) ? initialAiAstrologers : []);
  const [loadingAiAstros, setLoadingAiAstros] = useState(initialAiAstrologers.length === 0);

  const [faqs, setFaqs] = useState<{q: string; a: string}[]>(initialFaqs || defaultFaqs);
  const [successStories, setSuccessStories] = useState<{name: string; before: string; after: string}[]>(initialSuccessStories || defaultSuccessStories);
  const [banner, setBanner] = useState(initialBanner || { url: '' });

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
      if (initialAstrologers.length > 0) return;
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
      if (initialAiAstrologers.length > 0) return;
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
      if (initialFaqs || initialSuccessStories || initialBanner) return;
      try {
        const response = await apiClient.get('/smart-kundali-settings/education-astrology');
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
      title: 'Delay in Childbirth (Progeny Issues)',
      content: 'Facing unexplained delays or medical complications in conception? We analyze your 5th house and Jupiter (Guru) to identify astrological blocks and provide precise Vedic remedies for successful conception.',
      icon: <HeartHandshake className="w-6 h-6 text-[#ee6c1e]" />,
      report: { name: 'Talk to Expert', link: '/astrologers-chat' }
    },
    {
      title: 'Child\'s Health & Well-being',
      content: 'Constantly worried about your child falling sick or facing recurring health issues? A weak Moon or malefic influences on the 5th house can be the root cause. Discover protective rituals for your child.',
      icon: <ShieldAlert className="w-6 h-6 text-[#d97706]" />,
      tool: { name: 'Free Kundli', link: '/kundli' },
      report: { name: 'Talk to Expert', link: '/astrologers-chat' }
    },
    {
      title: 'Behavioral Issues in Children',
      content: 'Is your child extremely stubborn, aggressive, or struggling with focus? Malefic Rahu or Mars can cause hyperactivity. Simple astrological remedies can bring peace and improve their nature.',
      icon: <Sparkles className="w-6 h-6 text-[#4f46e5]" />,
      tool: { name: 'Talk to Expert', link: '/astrologers-chat' },
      report: { name: 'Premium Report', link: '/report/kundali/vaidik-smart-kundali-10-years' }
    },
    {
      title: 'Family Disputes & Disharmony',
      content: 'Constant arguments between family members or joint family issues? Afflictions to the 2nd and 4th houses destroy domestic peace. Re-establish harmony with targeted Vastu and astrological solutions.',
      icon: <Sun className="w-6 h-6 text-[#e11d48]" />,
      report: { name: 'Talk to Expert', link: '/astrologers-chat' }
    },
    {
      title: 'Adoption Astrology',
      content: 'Planning to adopt? Astrology can guide you on the most favorable time to bring a child home and ensure a smooth, loving bond between the child and the family.',
      icon: <CheckCircle2 className="w-6 h-6 text-[#ee6c1e]" />,
      tool: { name: 'Consult Expert', link: '/astrologers-chat' },
      report: { name: 'Premium Report', link: '/report/kundali/vaidik-smart-kundali-10-years' }
    },
    {
      title: 'Parent-Child Relationship',
      content: 'Experiencing a disconnect or frequent clashes with your teenager? Understanding their chart allows you to parent them according to their astrological temperament, rebuilding your bond.',
      icon: <Star className="w-6 h-6 text-[#ea580c]" />,
      report: { name: 'Talk to Expert', link: '/astrologers-chat' }
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
            src={banner?.url || "/images/children-family.webp"}
            alt="Children & Family Astrology Consultation"
            className="h-full lg:h-[100%] my-auto md:w-[60%] lg:w-[85%] object-cover object-[85%_center] mix-blend-multiply"
            style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 100%)' }}
          />
        </div>

        {/* Text Content */}
        <div className="relative z-20 w-full px-6 md:px-10 mx-auto max-w-[1500px] flex-shrink-0 lg:-mt-16">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-[650px] lg:max-w-[800px]">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#f0ddc0] shadow-sm text-[#8a1c2a] text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 text-[#22c55e]" />
              Vedic Astrology Solutions
            </motion.div>

            <motion.h1 variants={fadeInUp} className="premium-serif font-bold text-[#3a1216] text-[38px] md:text-[56px] leading-[1.1] mb-6 tracking-tight">
              Resolve Children & Family Challenges <br />
              <span className="relative inline-block mt-2">
                <span className="text-[#ee6c1e]">Through Vedic Astrology</span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#f0ddc0] -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10" fill="transparent" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-[#5e4339] text-[16px] md:text-[18px] leading-relaxed mb-8 max-w-[550px] font-medium">
              Whether you are facing delays in childbirth, worrying about your child's health and future, or dealing with family disputes — your Kundali holds precise answers.
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
              src={banner?.url || "/images/children-family.webp"}
              alt="Children & Family Astrology"
              className="w-full h-[320px] object-cover object-right-top scale-[1.15] origin-right opacity-95 mix-blend-multiply"
              style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
            />
          </motion.div>
        </div>
      </section>

      {/* Visible Problems Grid */}
      <section className="px-6 md:px-10 py-16 md:py-20 relative z-20">
        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-14">
            <h2 className="premium-serif font-bold text-[36px] md:text-[42px] text-[#3a1216] mb-4">
              Answers to Your <span className="text-[#ee6c1e]">Family & Child Concerns</span>
            </h2>
            <p className="text-[#5e4339] text-[17px] max-w-2xl mx-auto">Select a concern to see how Vedic astrology reveals the root cause and provides practical remedies for your family.</p>
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
        <div className="max-w-[1500px] mx-auto text-center">
          <h2 className="premium-serif font-bold text-[32px] md:text-[38px] text-[#3a1216] mb-3">
            Instantly Gain <span className="text-[#ee6c1e]">Clarity</span>
          </h2>
          <p className="text-[#5e4339] text-[16px] md:text-[17px] mb-10 max-w-2xl mx-auto">Not ready to consult yet? Use our precision Vedic calculators to get instant, free insights.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: 'Progeny Prediction', desc: 'Check your 5th house for childbirth blocks', icon: <Heart className="w-7 h-7" />, link: '/kundli', color: 'bg-green-50', text: 'text-[#ee6c1e]' },
              { title: 'Free Janam Kundali', desc: 'Know your 6th house placement', icon: <ShieldCheck className="w-7 h-7" />, link: '/kundli', color: 'bg-orange-50', text: 'text-[#ee6c1e]' },
              { title: 'Daily Horoscope', desc: 'Today\'s wellness insights', icon: <Sparkles className="w-7 h-7" />, link: '/daily-horoscope', color: 'bg-blue-50', text: 'text-[#ee6c1e]' }
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
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <h2 className="premium-serif font-bold text-[36px] md:text-[42px] text-[#3a1216] mb-3">
                Consult Family & Child <span className="text-[#ee6c1e]">Specialists</span>
              </h2>
              <p className="text-[#5e4339] text-[17px]">Talk to verified Vedic astrologers who specialise in progeny, child behavior, and family harmony.</p>
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
                    {(astro.specializations?.length ? astro.specializations : ['Love', 'Relationships']).slice(0, 3).map((skill: string, idx: number) => (
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
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl">
              <h2 className="premium-serif font-bold text-[36px] md:text-[42px] text-[#3a1216] mb-3">
                Ask Our <span className="text-[#ee6c1e]">AI Astrologers</span>
              </h2>
              <p className="text-[#5e4339] text-[17px]">Get instant, personalized answers to your family questions from our advanced AI astrologers, available 24/7.</p>
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
                    {(astro.specialization?.length ? astro.specialization : ['Love', 'Compatibility']).slice(0, 3).map((skill: string, idx: number) => (
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
        <div className="max-w-[1500px] mx-auto">
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
                  { title: 'Kundali Matching Report', link: '/report/kundali/kundali-matching' },
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
                  { title: 'Ganesh Ji Ko Laddoo Arpan', link: '/book-a-puja/ganesh-ji-ko-laddoo-arpan' },
                  { title: 'Vishnu Sahasranamam Puja', link: '/book-a-puja/vishnu-sahasranamam-puja' },
                  { title: 'Rudrabhishek (For Focus)', link: '/book-a-puja/rudrabhishek' }
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
        <div className="max-w-[1500px] mx-auto">
          {/* Top Row: Intro & Astrologer Card */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start mb-12 md:mb-16">
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#fdf3e7] text-[#ee6c1e] text-sm font-semibold mb-4 border border-[#f0ddc0]/50">
                <Star className="w-4 h-4" /> Why Astrology for Family?
              </div>
              <h2 className="premium-serif font-bold text-[28px] md:text-[42px] text-[#3a1216] leading-tight md:leading-[1.2] mb-5 md:mb-6">
                Decoding Your Child's Future & <br className="hidden md:block" />Family Harmony With <span className="text-[#ee6c1e]">Vedic Astrology</span>
              </h2>
              <p className="text-[#5e4339] text-[15.5px] md:text-[17px] leading-relaxed mb-4">
                Your family's prosperity, the timing of childbirth, and your child's well-being are deeply connected to the planetary alignments in your Kundali. Vedic astrology provides profound insights into progeny issues, helps identify doshas causing domestic discord, and reveals the astrological remedies to protect your family's happiness.
              </p>
              <p className="text-[#5e4339] text-[16px] md:text-[17px] leading-relaxed">
                The <strong className="text-[#3a1216]">5th House</strong> governs children and intelligence, while the <strong className="text-[#3a1216]">2nd and 4th Houses</strong> rule your immediate family and domestic peace. By analyzing these houses along with Jupiter (the significator of children), an expert astrologer can suggest precise remedies to remove blocks in conception and accelerate your child's success.
              </p>
            </div>

            <div className="flex-1 w-full relative mt-4 lg:mt-0">
              <div className="absolute inset-0 bg-[#f8e2c9] rounded-[2.5rem] blur-[60px] opacity-40 -z-10"></div>
              <div className="bg-[#fdfaf7] border border-[#f0ddc0]/80 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 shadow-[0_10px_40px_rgba(138,28,42,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-[#fdf3e7] rounded-bl-[80px] md:rounded-bl-[100px] -z-10"></div>
                <h3 className="premium-serif font-bold text-[24px] md:text-[28px] text-[#3a1216] mb-6 md:mb-8">How Astrologers Help Your Family</h3>
                <ul className="space-y-6">
                  {[
                    { title: 'Childbirth Timing & Prediction', desc: 'Identify astrological blocks causing delays in conception.' },
                    { title: 'Child Behavior & Health', desc: 'Understand the astrological reasons behind your child\'s stubbornness or frequent illnesses.' },
                    { title: 'Favorable Timing (Muhurat)', desc: 'Find the most auspicious time for IVF, conception, or important family ceremonies.' },
                    { title: 'Powerful Vedic Remedies', desc: 'Powerful pujas like Santan Gopal, rudraksha, and gemstone therapy for progeny blessings.' },
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
                    Talk to a Family Expert
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 SEO Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {/* Card 1 */}
            <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#fdfaf7] border border-[#f0ddc0]/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(5,150,105,0.08)] hover:border-[#059669]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-[#ee6c1e] group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] md:text-[24px] text-[#3a1216] mb-3">5th House: The House of Progeny</h3>
              <p className="text-[#5e4339] text-[14.5px] md:text-[15.5px] leading-relaxed">
                The 5th house is the primary indicator of childbirth and children. A strong 5th house ensures a healthy progeny and joy from kids. Afflictions from Rahu, Ketu, or Saturn here often cause miscarriages, delays, or strained relationships with children.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#fdfaf7] border border-[#f0ddc0]/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(2,132,199,0.08)] hover:border-[#0284c7]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-[#ee6c1e] group-hover:scale-110 transition-transform duration-300">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] md:text-[24px] text-[#3a1216] mb-3">Jupiter: The Significator of Children</h3>
              <p className="text-[#5e4339] text-[14.5px] md:text-[15.5px] leading-relaxed">
                Jupiter (Guru) is the natural Karaka (significator) for children. If Jupiter is debilitated, combust, or afflicted by malefic planets, one may face severe obstacles in expanding their family. Strengthening Jupiter is the first step in progeny astrology.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 md:p-8 rounded-[1.5rem] bg-[#fdfaf7] border border-[#f0ddc0]/80 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(225,29,72,0.08)] hover:border-[#e11d48]/40 transition-all duration-300 group">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 text-[#e11d48] group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] md:text-[24px] text-[#3a1216] mb-3">4th House: Domestic Peace & Harmony</h3>
              <p className="text-[#5e4339] text-[14.5px] md:text-[15.5px] leading-relaxed">
                The 4th house represents your home environment, mother, and domestic happiness. Malefic influences like Mars or Saturn on this house create a toxic home environment, family disputes, and lack of peace. Healing the 4th house brings families together.
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

        <div className="max-w-[1500px] mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#ee6c1e] text-sm font-semibold mb-4 border border-[#f0ddc0]/80 shadow-sm">
              <Key className="w-4 h-4" /> The Secrets of Family Astrology
            </div>
            <h2 className="premium-serif font-bold text-[32px] md:text-[40px] text-[#3a1216] mb-4 leading-tight">
              Planets, Houses & <span className="text-[#ee6c1e]">Family Harmony</span>
            </h2>
            <p className="text-[#5e4339] text-[16.5px] max-w-3xl mx-auto leading-relaxed">
              Vedic Astrology provides a precise analysis of your family destiny. Our experts decode the alignments of Jupiter, Moon, and specific Bhavas (houses) in your Kundali to reveal the absolute truth about your progeny prospects and family harmony.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Planets */}
            <div className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f0ddc0]/80 shadow-[0_8px_30px_rgba(138,28,42,0.03)] hover:shadow-[0_8px_30px_rgba(5,150,105,0.06)] transition-all">
              <div className="w-14 h-14 bg-[#fff8f0] rounded-2xl flex items-center justify-center mb-6 border border-[#f0ddc0]/50">
                <Sun className="w-7 h-7 text-[#ee6c1e]" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] text-[#3a1216] mb-4">Role of Key Planets</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Jupiter (Guru):</strong> The ultimate giver of children (Santan Karaka). A strong Jupiter blesses you with healthy and obedient kids.</p>
                </li>
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Moon (Chandra):</strong> Represents motherhood, emotions, and family bonds. Afflictions here cause emotional distance in the family.</p>
                </li>
                <li className="flex gap-3">
                  <Star className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Mars (Mangal):</strong> Governs blood and surgeries. Often responsible for miscarriages or C-section deliveries if placed in the 5th or 8th house.</p>
                </li>
              </ul>
            </div>

            {/* Houses */}
            <div className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f0ddc0]/80 shadow-[0_8px_30px_rgba(138,28,42,0.03)] hover:shadow-[0_8px_30px_rgba(5,150,105,0.06)] transition-all">
              <div className="w-14 h-14 bg-[#f0f9ff] rounded-2xl flex items-center justify-center mb-6 border border-[#bae6fd]/50">
                <ShieldCheck className="w-7 h-7 text-[#ee6c1e]" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] text-[#3a1216] mb-4">Crucial Family Houses</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">2nd House:</strong> The house of 'Kutumb' (Family). It dictates the size of your family and overall harmony between members.</p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">4th House:</strong> Represents domestic happiness, peace at home, and the relationship with your mother.</p>
                </li>
                <li className="flex gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">5th House:</strong> The primary house for conception, pregnancy, and the well-being of your children.</p>
                </li>
              </ul>
            </div>

            {/* Remedies */}
            <div className="bg-[#fdfaf7] p-8 rounded-3xl border border-[#f0ddc0]/80 shadow-[0_8px_30px_rgba(138,28,42,0.03)] hover:shadow-[0_8px_30px_rgba(5,150,105,0.06)] transition-all">
              <div className="w-14 h-14 bg-[#fdf4ff] rounded-2xl flex items-center justify-center mb-6 border border-[#fbcfe8]/50">
                <Sparkles className="w-7 h-7 text-[#c026d3]" />
              </div>
              <h3 className="premium-serif font-bold text-[22px] text-[#3a1216] mb-4">Powerful Vedic Remedies</h3>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Heart className="w-5 h-5 text-[#d946ef] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Santan Gopal Puja:</strong> An extremely powerful Vedic ritual dedicated to Lord Krishna in his infant form, highly effective for couples facing delays in childbirth.</p>
                </li>
                <li className="flex gap-3">
                  <Heart className="w-5 h-5 text-[#d946ef] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed">
                    <strong className="text-[#3a1216]">Gemstone Therapy:</strong> Wearing a Yellow Sapphire (Pukhraj) for Jupiter can remove blocks in expanding your family and bring immense domestic prosperity.{' '}
                    <a href="https://vaidiktalk.store/" target="_blank" rel="noopener noreferrer" className="text-[#ee6c1e] font-semibold hover:underline inline-flex items-center gap-1 mt-1">
                      Explore Spiritual Store <ArrowRight className="w-3 h-3" />
                    </a>
                  </p>
                </li>
                <li className="flex gap-3">
                  <Heart className="w-5 h-5 text-[#d946ef] shrink-0 mt-0.5" />
                  <p className="text-[#5e4339] text-[14.5px] leading-relaxed"><strong className="text-[#3a1216]">Mantra Chanting:</strong> Daily chanting of the Santan Gopal Mantra or performing Garbh Gauri Rudraksha therapy protects the pregnancy and child.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="px-6 md:px-10 py-16 md:py-20 bg-[#fdfaf7] border-t border-[#f0ddc0]/50 overflow-hidden">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#d97706] text-sm font-semibold mb-4 border border-[#f0ddc0]/80 shadow-sm">
                <Star className="w-4 h-4" /> Success Stories
              </div>
              <h2 className="premium-serif font-bold text-[32px] md:text-[40px] text-[#3a1216] mb-4">
                Real Transformations <span className="text-[#d97706]">& Real Results</span>
              </h2>
              <p className="text-[#5e4339] text-[16.5px]">See how Vedic astrology brought immense joy and peace to families.</p>
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
            Take Control of Your <br /> Physical & Mental Well-being
          </h2>
          <p className="text-[#5e4339] text-[17px] mb-10 max-w-xl mx-auto font-medium">
            Connect with a verified medical astrologer today or start by generating your free detailed Kundali.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/astrologers-chat" className="w-full sm:w-auto inline-flex justify-center items-center bg-[#8a1c2a] text-white font-bold px-8 py-4 rounded-xl hover:bg-[#721522] hover:-translate-y-1 transition-all shadow-[0_8px_20px_rgba(138,28,42,0.15)] text-[16px]">
              Talk to a Family Astrologer
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
