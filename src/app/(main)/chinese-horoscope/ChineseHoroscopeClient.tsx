'use client';
import { useTranslation } from '@/context/LanguageContext';

import React, { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChineseZodiacForm from '@/components/chinese-horoscope/ChineseZodiacForm';
import ChineseZodiacResult from '@/components/chinese-horoscope/ChineseZodiacResult';
import ChineseZodiacReading from '@/components/chinese-horoscope/ChineseZodiacReading';
import { astrologyService } from '@/lib/astrologyService';
import { Calendar, Grid } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CHINESE_ANIMALS, CHINESE_ZODIAC_DATA } from '@/lib/chineseZodiacData';
import { chineseZodiacStorage } from '@/lib/chineseZodiacStorage';

// Chinese zodiac years mapping (most recent cycle + next)
const CHINESE_ZODIAC_YEARS: Record<string, string> = {
  Rat: '1996, 2008, 2020, 2032',
  Ox: '1997, 2009, 2021, 2033',
  Tiger: '1998, 2010, 2022, 2034',
  Rabbit: '1999, 2011, 2023, 2035',
  Dragon: '2000, 2012, 2024, 2036',
  Snake: '2001, 2013, 2025, 2037',
  Horse: '2002, 2014, 2026, 2038',
  Goat: '2003, 2015, 2027, 2039',
  Monkey: '2004, 2016, 2028, 2040',
  Rooster: '2005, 2017, 2029, 2041',
  Dog: '2006, 2018, 2030, 2042',
  Pig: '2007, 2019, 2031, 2043'
};

const CHINESE_ANIMAL_PROFILES = [
{
  name: 'Rat',
  element: 'Water',
  yin_yang: 'Yang',
  traits: 'Quick-witted, resourceful, and versatile. The Rat is a natural problem-solver who thrives in social settings and adapts swiftly to change.'
},
{
  name: 'Ox',
  element: 'Earth',
  yin_yang: 'Yin',
  traits: 'Diligent, dependable, and strong-willed. The Ox achieves great things through patience, hard work, and an unwavering sense of duty.'
},
{
  name: 'Tiger',
  element: 'Wood',
  yin_yang: 'Yang',
  traits: 'Brave, competitive, and unpredictable. The Tiger is a born leader who confronts challenges head-on with courage and magnetic energy.'
},
{
  name: 'Rabbit',
  element: 'Wood',
  yin_yang: 'Yin',
  traits: 'Gentle, elegant, and compassionate. The Rabbit is a peacemaker who values harmony, beauty, and deep personal connections.'
},
{
  name: 'Dragon',
  element: 'Earth',
  yin_yang: 'Yang',
  traits: 'Confident, ambitious, and charismatic. The Dragon is the most auspicious sign, known for its extraordinary vitality and natural authority.'
},
{
  name: 'Snake',
  element: 'Fire',
  yin_yang: 'Yin',
  traits: 'Wise, intuitive, and introspective. The Snake possesses deep insight and a quiet intensity that draws others toward them naturally.'
},
{
  name: 'Horse',
  element: 'Fire',
  yin_yang: 'Yang',
  traits: 'Energetic, free-spirited, and enthusiastic. The Horse is always in motion, driven by a passion for adventure and a desire for freedom.'
},
{
  name: 'Goat',
  element: 'Earth',
  yin_yang: 'Yin',
  traits: 'Creative, empathetic, and calm. The Goat is an artistic soul who finds peace in nature and thrives when supported by loving relationships.'
},
{
  name: 'Monkey',
  element: 'Metal',
  yin_yang: 'Yang',
  traits: 'Clever, curious, and playful. The Monkey is a fast thinker with a sharp sense of humor who can find innovative solutions to any problem.'
},
{
  name: 'Rooster',
  element: 'Metal',
  yin_yang: 'Yin',
  traits: 'Observant, hardworking, and courageous. The Rooster is meticulous and honest, always striving for excellence in everything they do.'
},
{
  name: 'Dog',
  element: 'Earth',
  yin_yang: 'Yang',
  traits: 'Loyal, honest, and compassionate. The Dog is a devoted companion who stands by their loved ones with unwavering faithfulness and integrity.'
},
{
  name: 'Pig',
  element: 'Water',
  yin_yang: 'Yin',
  traits: 'Generous, sincere, and diligent. The Pig approaches life with warmth and optimism, always seeking the good in others and the world.'
}];


const FIVE_ELEMENTS = [
{
  element: 'Wood',
  years: 'Years ending in 4 or 5',
  quality: 'Growth, creativity, flexibility',
  animals: 'Tiger, Rabbit',
  color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  dot: 'bg-emerald-500'
},
{
  element: 'Fire',
  years: 'Years ending in 6 or 7',
  quality: 'Passion, energy, transformation',
  animals: 'Snake, Horse',
  color: 'bg-red-50 border-red-200 text-red-800',
  dot: 'bg-red-500'
},
{
  element: 'Earth',
  years: 'Years ending in 8 or 9',
  quality: 'Stability, reliability, nurturing',
  animals: 'Ox, Dragon, Goat, Dog',
  color: 'bg-amber-50 border-amber-200 text-amber-800',
  dot: 'bg-amber-500'
},
{
  element: 'Metal',
  years: 'Years ending in 0 or 1',
  quality: 'Strength, determination, precision',
  animals: 'Monkey, Rooster',
  color: 'bg-gray-100 border-gray-300 text-gray-850',
  dot: 'bg-gray-500'
},
{
  element: 'Water',
  years: 'Years ending in 2 or 3',
  quality: 'Wisdom, intuition, adaptability',
  animals: 'Rat, Pig',
  color: 'bg-blue-50 border-blue-200 text-blue-800',
  dot: 'bg-blue-500'
}];

const CHINESE_HOROSCOPE_FAQS = [
  {
    question: "What is my Chinese Zodiac sign based on?",
    answer: "Your Chinese Zodiac sign is based on your birth year, not your birth month. The cycle repeats every 12 years, with each year represented by one of the 12 animals. However, it follows the Lunar calendar (which usually starts between late January and mid-February), so if you were born early in the year, your sign might belong to the previous year."
  },
  {
    question: "How is the Chinese Zodiac different from Western Astrology?",
    answer: "Western astrology is based on the months of the year and the alignment of constellations (sun signs). The Chinese Zodiac is based on a 12-year lunar cycle, where each year is associated with an animal and one of five elements."
  },
  {
    question: "What does the element in my Chinese Horoscope mean?",
    answer: "Alongside the 12 animals, Chinese astrology uses five elements: Wood, Fire, Earth, Metal, and Water. Your element is determined by the last digit of your birth year. The element interacts with your animal sign to provide a more specific and nuanced reading of your personality and destiny."
  },
  {
    question: "Can I be compatible with any Chinese Zodiac sign?",
    answer: "While any two signs can build a relationship, Chinese astrology groups certain animals into trines (highly compatible) and identifies conflicting signs (challenging). Knowing these dynamics helps in navigating personal and professional relationships."
  },
  {
    question: "Which is the most powerful Chinese Zodiac sign?",
    answer: "In traditional Chinese culture, the Dragon is often considered the most powerful and auspicious sign, symbolizing strength, fortune, and imperial power. However, every sign has its own unique strengths and paths to success."
  }
];

function ChineseHoroscopeContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const modeParam = searchParams.get('mode');
  // Initialize to grid to guarantee SSR matches first client render (avoids hydration error)
  const [viewMode, setViewMode] = useState<'grid' | 'personal'>('grid');
  const [loading, setLoading] = useState(false);

  const [dynamicProfiles, setDynamicProfiles] = useState<any[]>([]);

  // Sync view mode with URL when navigating via sidebar
  useEffect(() => {
    if (modeParam === 'grid' || modeParam === 'personal') {
      setViewMode(modeParam);
    }
  }, [modeParam]);

  const fallbackProfiles = CHINESE_ANIMALS.map((name) => CHINESE_ZODIAC_DATA[name]);
  const profiles = dynamicProfiles.length > 0 ?
  dynamicProfiles.map((p) => ({
    ...p,
    icon: CHINESE_ZODIAC_DATA[p.name]?.icon || p.icon // Ensure correct icon from hardcoded data instead of rat image
  })) :
  fallbackProfiles;

  const [readingResult, setReadingResult] = useState<any>(null);
  const [personalResult, setPersonalResult] = useState<any>(null);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  // Initial check for history item
  useEffect(() => {
    const lastViewed = chineseZodiacStorage.getLastViewed();
    if (lastViewed) {
      if (lastViewed.userName || lastViewed.date) {
        setPersonalResult(lastViewed);
        setViewMode('personal');
        router.replace('/chinese-horoscope?mode=personal', { scroll: false });
      } else if (lastViewed.sign) {
        setReadingResult(lastViewed);
        setSelectedSign(lastViewed.sign);
        setViewMode('grid');
        router.replace('/chinese-horoscope?mode=grid', { scroll: false });
      }
      // We intentionally DO NOT clear lastViewed here so that reloading the page preserves the result!
    }
  }, [router]);

  useEffect(() => {
    const loadProfiles = async () => {
      try {
        const res = await astrologyService.getChineseProfiles();
        if (res.success && Array.isArray(res.data)) {
          setDynamicProfiles(res.data);
        }
      } catch (err) {
        console.error("Error loading Chinese profiles:", err);
      }
    };
    loadProfiles();
  }, []);

  const isUrl = (str: string) => {
    return str && (str.startsWith('http') || str.startsWith('/uploads') || str.includes('.'));
  };

  const fetchSignReading = async (sign: string, p: string = 'daily') => {
    setLoading(true);
    try {
      const res = await astrologyService.calculateChineseZodiac(sign, p);
      if (res.success) {
        setReadingResult(res.data);
        setSelectedSign(sign);
        chineseZodiacStorage.saveData(res.data);
      }
    } catch (err) {
      console.error("Error fetching sign reading");
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalReveal = async (formData: {name: string;date: string;}) => {
    setLoading(true);
    try {
      const res = await astrologyService.calculateChinesePersonal(formData);
      if (res.success) {
        setPersonalResult(res.data);
        chineseZodiacStorage.saveData({ ...res.data, name: formData.name, date: formData.date });
      }
    } catch (err) {
      console.error("Error calculating personal destiny");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToGrid = () => {
    setReadingResult(null);
    setSelectedSign(null);
  };

  return (
    <div className="max-w-7xl mx-auto relative z-10 pt-6 pb-12 px-4 sm:px-6 lg:px-8">

            <style dangerouslySetInnerHTML={{ __html: `
                .chinese-wrap { font-family: 'Inter', sans-serif !important; }
            ` }} />

            <div className="chinese-wrap">

                {/* Mode Switcher */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex p-1 rounded-2xl bg-white/40 backdrop-blur-md border border-[#d6c89a] shadow-sm">
                        <button
              onClick={() => {
                setViewMode('grid');
                setPersonalResult(null);
                setReadingResult(null);
                chineseZodiacStorage.setLastViewed(null);
                router.push('/chinese-horoscope?mode=grid', { scroll: false });
              }}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'grid' ?
              'bg-[#b8962e] text-white shadow-md' :
              'text-amber-900/60 hover:text-[#b8962e]'}`
              }>
              
                            <Grid size={16} />{t("chinese_horoscope.daily_outlook")}
            </button>
                        <button
              onClick={() => {
                setViewMode('personal');
                setPersonalResult(null);
                setReadingResult(null);
                chineseZodiacStorage.setLastViewed(null);
                router.push('/chinese-horoscope?mode=personal', { scroll: false });
              }}
              className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${viewMode === 'personal' ?
              'bg-[#b8962e] text-white shadow-md' :
              'text-amber-900/60 hover:text-[#b8962e]'}`
              }>
              
                            <Calendar size={16} />{t("chinese_horoscope.personal_destiny")}
            </button>
                    </div>
                </div>

                <AnimatePresence mode="wait">

                    {/* 1. GRID MODE VIEW */}
                    {viewMode === 'grid' && !readingResult &&
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full">
            
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 text-[#b8962e] text-sm font-semibold mb-3">
                                    <span className="text-base serif">☯</span>
                                    <span>{t("chinese_horoscope.daily_chinese_reading")}</span>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
{t("chinese_horoscope.what_is_my_chinese_horoscope")}
              </h2>
                                <p className="text-gray-850 text-base leading-relaxed max-w-xl">
{t("chinese_horoscope.select_your_celestial_animal_t")}{' '}
                                    <span className="text-gray-850">{t("chinese_horoscope.journey")}</span>{t("chinese_horoscope.today")}
              </p>
                            </div>

                            {/* Animal Grid - Premium Redesign */}
                            <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white/63 py-12 flex justify-center">
                                <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-12">
                                {profiles.map((animal) =>
                                    <motion.button
                                        key={animal.name}
                                        onClick={() => fetchSignReading(animal.name)}
                                        whileHover={{ y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex flex-col items-center justify-center bg-transparent group text-center cursor-pointer border-none outline-none"
                                    >
                                        <div className="w-28 h-28 mb-4 rounded-full bg-[#fae32c] flex items-center justify-center overflow-hidden border border-transparent shadow-sm group-hover:shadow-md transition-all">
                                            {isUrl(animal.icon) ? (
                                                <img
                                                    src={animal.icon}
                                                    alt={animal.name}
                                                    className="w-[90%] h-[90%] object-contain group-hover:scale-110 transition-transform duration-300 mix-blend-multiply"
                                                />
                                            ) : (
                                                <span className="text-[3rem] leading-none group-hover:scale-110 transition-transform duration-300 grayscale contrast-200 brightness-0 opacity-90">
                                                    {animal.icon}
                                                </span>
                                            )}
                                        </div>

                                        <span className="text-[14px] font-bold text-[#1a1a1a] group-hover:text-[#b8962e] transition-colors tracking-wide">
                                            {animal.name} {animal.name === 'Ox' ? '(or Cow)' : animal.name === 'Goat' ? '(or Sheep)' : animal.name === 'Pig' ? '(or Boar)' : ''}
                                        </span>
                                    </motion.button>
                                )}
                                    </div>
                                </div>
                            </div>

                            {/* Footer quote */}
                            <div className="mt-10 p-7 border border-[#d6c89a] rounded-2xl text-center bg-transparent">
                                <p className="text-gray-850 text-[15px] max-w-2xl mx-auto leading-relaxed">
{t("chinese_horoscope._the_lunar_cycle_reveals_the_w")}{' '}
                                    <span className="text-[#b8962e] font-semibold">{t("chinese_horoscope.ancient_stars")}</span>{' '}
{t("chinese_horoscope.hold_for_you_today")}
              </p>
                            </div>

                            {/* SEO Content Sections */}
                            <div className="mt-16 space-y-12">

                                {/* What is Chinese Horoscope */}
                                <section className="border-t border-[#d6c89a]/50 pt-10">
                                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">{t("chinese_horoscope.chinese_horoscope_what_is_it")}</h2>
                                    <div className="space-y-4 text-gray-850 leading-relaxed text-base">
                                        <p>
{t("chinese_horoscope.the_chinese_horoscope_is_one_o")}
                  </p>
                                        <p>
{t("chinese_horoscope.the_chinese_zodiac_consists_of")}
                  </p>
                                        <p>
{t("chinese_horoscope.each_animal_sign_carries_a_dis")}
                  </p>
                                    </div>
                                </section>

                                {/* Animal Profiles Table */}
                                <section className="border-t border-[#d6c89a]/50 pt-10">
                                    <h2 className="text-3xl font-semibold text-gray-900 mb-2">{t("chinese_horoscope.the_12_chinese_zodiac_animals")}</h2>
                                    <p className="text-gray-850 text-base leading-relaxed mb-6">
{t("chinese_horoscope.each_of_the_12_animals_carries")}
                </p>
                                    <div className="space-y-16 mt-8">
                                        {CHINESE_ANIMALS.map((animalName, index) => {
                                            const zodiacData = CHINESE_ZODIAC_DATA[animalName];
                                            if (!zodiacData) return null;
                                            return (
                                                <div key={animalName} className={`flex flex-col-reverse ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-start justify-between border-b border-[#d6c89a]/30 pb-16 last:border-0`}>
                                                    {/* Text Content */}
                                                    <div className="flex-1 space-y-6">
                                                        <div>
                                                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-wider mb-2 font-sans">
                                                                {animalName} {animalName === 'Ox' ? '(OR COW)' : animalName === 'Goat' ? '(OR SHEEP)' : animalName === 'Pig' ? '(OR BOAR)' : ''}
                                                            </h3>
                                                            <div className="w-16 h-1 bg-[#fae32c]"></div>
                                                        </div>
                                                        
                                                        <p className="text-base text-gray-850 leading-relaxed font-sans text-justify">
                                                            {zodiacData.personality}
                                                        </p>

                                                        <p className="text-base text-gray-850 leading-relaxed font-sans text-justify">
                                                            Listing the {animalName} Zodiac sign weakness, such people do lack certain traits. Though the {animalName} zodiac does good in terms of career, they usually need to work on: {zodiacData.weaknesses.join(', ')}.
                                                        </p>

                                                        <p className="text-base text-gray-850 leading-relaxed font-sans text-justify">
                                                            When it comes to love, the Chinese horoscope for {animalName} tells us how their natural traits shine. With their core element being {zodiacData.elementInfo}, they bring unique energy to relationships.
                                                        </p>

                                                        <p className="text-base text-gray-850 leading-relaxed font-sans text-justify">
                                                            Their best compatibility is with: {zodiacData.compatibility.join(', ')}.
                                                        </p>
                                                    </div>

                                                    {/* Right Icon Card */}
                                                    <div className="w-full md:w-[380px] flex-shrink-0 flex justify-center pt-2">
                                                        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 shadow-sm border-2 border-[#fae32c] w-full max-w-[320px] aspect-square flex items-center justify-center">
                                                            <div className="w-full h-full rounded-full bg-[#fae32c] flex items-center justify-center overflow-hidden border border-transparent shadow-inner">
                                                                {isUrl(zodiacData.icon) ? (
                                                                    <img 
                                                                        src={zodiacData.icon} 
                                                                        alt={animalName} 
                                                                        className="w-[90%] h-[90%] object-contain mix-blend-multiply" 
                                                                    />
                                                                ) : (
                                                                    <span className="text-[8rem] leading-none grayscale contrast-200 brightness-0 opacity-90">
                                                                        {zodiacData.icon}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>

                                {/* The Five Elements */}
                                <section className="border-t border-[#d6c89a]/50 pt-10">
                                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">{t("chinese_horoscope.the_five_elements_in_chinese_a")}</h2>
                                    <div className="space-y-4 text-gray-850 leading-relaxed text-base mb-6">
                                        <p>
{t("chinese_horoscope.in_addition_to_the_12_year_ani")}
                  </p>
                                        <p>
{t("chinese_horoscope.for_example_a_wood_dragon_and")}
                  </p>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {FIVE_ELEMENTS.map((el, i) =>
                  <div key={i} className={`p-5 rounded-2xl border ${el.color}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className={`w-2.5 h-2.5 rounded-full ${el.dot}`} />
                                                    <p className="font-bold text-[15px]">{el.element}</p>
                                                </div>
                                                <p className="text-[13px] leading-relaxed mb-1"><span className="font-semibold">{t("chinese_horoscope.quality")}</span> {el.quality}</p>
                                                <p className="text-[13px] leading-relaxed mb-1"><span className="font-semibold">{t("chinese_horoscope.animals")}</span> {el.animals}</p>
                                                <p className="text-[12px] leading-relaxed opacity-80">{el.years}</p>
                                            </div>
                  )}
                                    </div>
                                </section>

                                {/* How to Read Your Chinese Horoscope */}
                                <section className="border-t border-[#d6c89a]/50 pt-10">
                                    <h2 className="text-3xl font-semibold text-gray-900 mb-4">{t("chinese_horoscope.how_to_read_your_chinese_horos")}</h2>
                                    <div className="space-y-4 text-gray-850 leading-relaxed text-base mb-6">
                                        <p>
{t("chinese_horoscope.a_chinese_horoscope_reading_dr")}
                  </p>
                                    </div>
                                    <div className="space-y-3">
                                        {[
                  {
                    title: 'Know your animal and element',
                    desc: 'Your birth year determines your animal sign, but the specific element of that year adds nuance. A 1988 Dragon is an Earth Dragon, while a 2000 Dragon is a Metal Dragon — same animal, different energy.'
                  },
                  {
                    title: 'Follow the lunar calendar',
                    desc: 'Chinese New Year falls between January and February each year. If you were born before the Chinese New Year in your birth year, your sign belongs to the previous year.'
                  },
                  {
                    title: 'Note compatible signs',
                    desc: 'Some animals are naturally harmonious while others create tension. Knowing your compatibility with the signs of the people around you can offer practical guidance in relationships and work.'
                  },
                  {
                    title: 'Use your reading as a guide, not a script',
                    desc: 'Your daily Chinese horoscope reflects the energy of the day as filtered through your sign. Use it to set your intentions, approach challenges thoughtfully, and recognise opportunities as they arise.'
                  }].
                  map((tip, i) =>
                  <div key={i} className="flex gap-4 p-4 rounded-2xl border border-[#d6c89a]/40">
                                                <div className="w-7 h-7 rounded-full border border-[#b8962e] text-[#b8962e] text-[13px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-850 text-[14px] mb-1">{tip.title}</p>
                                                    <p className="text-[13px] text-gray-850 leading-relaxed">{tip.desc}</p>
                                                </div>
                                            </div>
                  )}
                                    </div>
                                </section>

                                {/* Frequently Asked Questions */}
                                <section className="border-t border-[#d6c89a]/50 pt-10">
                                    <h2 className="text-3xl font-semibold text-gray-900 mb-8">Frequently Asked Questions</h2>
                                    <div className="space-y-4">
                                        {CHINESE_HOROSCOPE_FAQS.map((faq, idx) => (
                                            <details key={idx} className="group bg-white/40 border border-[#d6c89a]/50 rounded-2xl overflow-hidden shadow-sm [&_summary::-webkit-details-marker]:hidden">
                                                <summary className="flex items-center justify-between cursor-pointer p-6 font-semibold text-gray-900 text-[16px] hover:bg-white/50 transition-colors">
                                                    {faq.question}
                                                    <span className="transition duration-300 group-open:rotate-180 text-[#b8962e]">
                                                        <svg fill="none" height="20" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="20"><path d="M6 9l6 6 6-6"></path></svg>
                                                    </span>
                                                </summary>
                                                <div className="text-gray-850 px-6 pb-6 text-[15px] leading-relaxed">
                                                    <p>{faq.answer}</p>
                                                </div>
                                            </details>
                                        ))}
                                    </div>
                                </section>

                            </div>
                        </motion.div>
          }

                    {/* 2. SIGN READING VIEW */}
                    {viewMode === 'grid' && readingResult &&
          <motion.div
            key="reading"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}>
            
                            <ChineseZodiacReading
              data={{
                ...readingResult,
                profile: profiles.find((p) => p.name?.toLowerCase() === readingResult.sign?.toLowerCase())
              }}
              onBack={() => {
                setReadingResult(null);
                setSelectedSign(null);
                chineseZodiacStorage.setLastViewed(null);
              }}
              onPeriodChange={(p) => fetchSignReading(selectedSign!, p)} />
            
                        </motion.div>
          }

                    {/* 3. PERSONAL FORM VIEW */}
                    {viewMode === 'personal' && !personalResult &&
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}>
            
                            <ChineseZodiacForm onSubmit={handlePersonalReveal} loading={loading} />
                        </motion.div>
          }

                    {/* 4. PERSONAL RESULT VIEW */}
                    {viewMode === 'personal' && personalResult &&
          <motion.div
            key="personal-result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}>
            
                            <ChineseZodiacResult
              data={personalResult}
              userName={personalResult.userName}
              onReset={() => {
                setPersonalResult(null);
                chineseZodiacStorage.setLastViewed(null);
              }} />
            
                        </motion.div>
          }

                </AnimatePresence>
            </div>
        </div>);

}

export default function ChineseHoroscopePage() {
  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#fdf6e3' }}>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b8962e]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[#b8962e]/20 border-t-[#b8962e] rounded-full animate-spin" />
                </div>
      }>
                <ChineseHoroscopeContent />
            </Suspense>
        </div>);

}