'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Baby,
  BookOpen,
  Bot,
  Calendar,
  Calculator,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Globe2,
  GraduationCap,
  Grid2X2,
  HandHeart,
  Heart,
  HeartHandshake,
  Hourglass,
  Languages,
  Menu,
  Moon,
  MoreHorizontal,
  Search,
  Sparkles,
  Star,
  Telescope,
  UserRound,
  Users,
  X,
  Zap,
} from 'lucide-react';

import { useTranslation } from '@/context/LanguageContext';

type Category =
  | 'All Tools'
  | 'Calculators'
  | 'Kundli & Reports'
  | 'Horoscope'
  | 'Muhurat & Panchang'
  | 'Love & Marriage'
  | 'Spiritual';

type Tool = {
  title: string;
  description: string;
  category: Category;
  href: string;
  icon: React.ElementType;
  premium?: boolean;
};

const tools: Tool[] = [
  {
    title: 'Numerology Calculator',
    description: 'Sacred Chaldean and Vedic vibration analysis.',
    category: 'Calculators',
    href: '/numerology',
    icon: Calculator,
  },
  {
    title: 'Moon Sign Calculator',
    description: 'Discover deep subconscious traits.',
    category: 'Calculators',
    href: '/moon-signs?new=true',
    icon: Moon,
  },
  {
    title: 'Rashi Calculator',
    description: 'Identifies your Janma Rashi using birth data.',
    category: 'Calculators',
    href: '/rashi-calculator?new=true',
    icon: Telescope,
  },
  {
    title: 'Love Calculator',
    description: 'Vibrational and zodiac matching engine.',
    category: 'Love & Marriage',
    href: '/compatibility?mode=love&new=true',
    icon: Heart,
  },
  {
    title: 'Kundli Generation',
    description: 'Detailed birth chart with planetary positions.',
    category: 'Kundli & Reports',
    href: '/kundli',
    icon: BookOpen,
  },
  {
    title: 'Horoscope Matching',
    description: '36-point Guna Milan for marriage compatibility.',
    category: 'Love & Marriage',
    href: '/horoscope-matching',
    icon: HeartHandshake,
  },
  {
    title: 'Lal Kitab Reading',
    description: 'Remedial insights and planetary analysis.',
    category: 'Spiritual',
    href: '/lal-kitab',
    icon: BookOpen,
  },
  {
    title: 'Muhurat Finder',
    description: 'Find auspicious timing for important events.',
    category: 'Muhurat & Panchang',
    href: '/muhurat',
    icon: Hourglass,
  },
  {
    title: 'Chinese Horoscope',
    description: 'Eastern zodiac sign and destiny projections.',
    category: 'Horoscope',
    href: '/chinese-horoscope',
    icon: Star,
  },
  {
    title: 'Panchang & Daily Timings',
    description: 'Daily Tithi, Nakshatra and Rahu Kaal timings.',
    category: 'Muhurat & Panchang',
    href: '/panchang',
    icon: Calendar,
  },
  {
    title: 'Baby Names',
    description: 'Auspicious Nakshatra-based names for newborns.',
    category: 'Love & Marriage',
    href: '/baby-names',
    icon: Baby,
  },
  {
    title: 'Rahu Kaal Calculator',
    description: 'Calculate inauspicious timings to avoid.',
    category: 'Muhurat & Panchang',
    href: '/rahu-kaal',
    icon: Hourglass,
  },
  {
    title: 'Hindu Calendar',
    description: 'Monthly calendar with Vedic tithis and festivals.',
    category: 'Muhurat & Panchang',
    href: '/calendar',
    icon: CalendarDays,
  },
  {
    title: 'Festivals',
    description: 'Track Hindu festivals, fasts and observances.',
    category: 'Muhurat & Panchang',
    href: '/festivals',
    icon: Sparkles,
  },
  {
    title: 'Love Horoscope',
    description: 'Predictions for your romantic life.',
    category: 'Love & Marriage',
    href: '/love-horoscope',
    icon: Heart,
  },
  {
    title: 'Celebrity Horoscopes',
    description: 'Explore birth charts of famous personalities.',
    category: 'Horoscope',
    href: '/celebrity-horoscopes',
    icon: Star,
  },
  {
    title: 'Occult Directory',
    description: 'Explore spiritual and esoteric sciences.',
    category: 'Spiritual',
    href: '/occult-directory',
    icon: Sparkles,
  },
  {
    title: 'Atlas / Location Finder',
    description: 'Precise coordinates and time zones.',
    category: 'Calculators',
    href: '/atlas',
    icon: Globe2,
  },
  {
    title: 'Premium Personalised Kundli',
    description: 'Comprehensive premium birth chart report.',
    category: 'Kundli & Reports',
    href: '/reports',
    icon: BookOpen,
    premium: true,
  },
  {
    title: 'Handwritten Kundali',
    description: 'Authentic handwritten Kundali by Vedic scholars.',
    category: 'Kundli & Reports',
    href: '/reports',
    icon: BookOpen,
  },
  {
    title: 'Kaal Sarp Dosh Check',
    description: 'Check the presence and impact of Kaal Sarp Dosh.',
    category: 'Calculators',
    href: '/free-reports',
    icon: Zap,
  },
  {
    title: 'Gemstone Suggestion',
    description: 'Personalized lucky gemstone recommendations.',
    category: 'Spiritual',
    href: '/free-reports',
    icon: Sparkles,
  },
  {
    title: 'Sade Sati Check',
    description: 'Check your Shani Sade Sati phase.',
    category: 'Calculators',
    href: '/free-reports',
    icon: Star,
  },
  {
    title: 'Healings',
    description: 'Spiritual healing modalities and remedies.',
    category: 'Spiritual',
    href: '/healing',
    icon: HandHeart,
  },
  {
    title: 'Vedic Matrimony',
    description: 'Find your spiritually aligned life partner.',
    category: 'Love & Marriage',
    href: '/matrimony',
    icon: Users,
  },
  {
    title: 'Learn Astrology',
    description: 'Resources and courses to master Vedic Astrology.',
    category: 'Spiritual',
    href: '/learn-astrology',
    icon: GraduationCap,
  }];

const categoryList: Category[] = [
  'All Tools',
  'Calculators',
  'Kundli & Reports',
  'Horoscope',
  'Muhurat & Panchang',
  'Love & Marriage',
  'Spiritual'];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Kundli', href: '/kundli' },
  { label: 'Horoscope', href: '/horoscope' },
  { label: 'Calculators', href: '/astrology-calculators' },
  { label: 'Reports', href: '/reports' },
  { label: 'Panchang', href: '/panchang' },
  { label: 'Learn', href: '/learn-astrology' }];

export default function AstrologyCalculatorsClient() {
  const { t } = useTranslation();

  const [activeCategory, setActiveCategory] =
    useState<Category>('All Tools');

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoryCounts = useMemo(() => {
    const counts: Record<Category, number> = {
      'All Tools': tools.length,
      Calculators: 0,
      'Kundli & Reports': 0,
      Horoscope: 0,
      'Muhurat & Panchang': 0,
      'Love & Marriage': 0,
      Spiritual: 0,
    };

    tools.forEach((tool) => {
      counts[tool.category] += 1;
    });

    return counts;
  }, []);

  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === 'All Tools' ||
        tool.category === activeCategory;

      const matchesSearch =
        !query ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategory = (category: Category) => {
    setActiveCategory(category);
  };

  return (
    <main className="min-h-screen bg-[#fffaf3] text-[#2b211b]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap');

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        .vaidik-page {
          font-family: 'DM Sans', sans-serif;
        }

        .vaidik-serif {
          font-family: 'Playfair Display', Georgia, serif;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="vaidik-page">

        {/* =========================================================
            HEADER (REMOVED)
        ========================================================= */}

        {/* =========================================================
            HERO
        ========================================================= */}

        <section className="relative overflow-hidden border-b border-[#eadfce] bg-[#fffaf1]">

          {/* Decorative Mandala */}

          <div className="pointer-events-none absolute right-[5%] top-[-170px] hidden h-[650px] w-[650px] rounded-full border border-[#d5ad68]/20 lg:block" />

          <div className="pointer-events-none absolute right-[9%] top-[-125px] hidden h-[560px] w-[560px] rounded-full border border-[#d5ad68]/15 lg:block" />

          <div className="pointer-events-none absolute right-[14%] top-[-70px] hidden h-[450px] w-[450px] rounded-full border border-[#d5ad68]/10 lg:block" />

          <div className="pointer-events-none absolute right-[25%] top-[45px] hidden opacity-[0.06] lg:block">
            <Sparkles size={260} strokeWidth={0.6} />
          </div>

          <div className="mx-auto max-w-[1536px] px-6 lg:px-10">

            <div className="grid items-center gap-8 py-4 lg:grid-cols-[1fr_480px] lg:gap-12 lg:py-4">

              {/* HERO COPY */}

              <div className="relative z-10 max-w-[650px]">

                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#b37b2c]" />

                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#985e1d]">
                    AstroSolution ASTROLOGY
                  </span>

                  <span className="text-[#bd8435]">✦</span>

                  <span className="h-px w-7 bg-[#b37b2c]" />
                </div>

                <h1 className="vaidik-serif text-[38px] font-semibold leading-[1.05] tracking-[-0.035em] text-[#681c09] sm:text-[46px] lg:text-[54px]">
                  Explore the
                  <br />
                  <span className="italic font-medium text-[#b47c2c]">
                    wisdom within.
                  </span>
                </h1>

                <p className="mt-4 max-w-[570px] text-[15px] font-medium leading-6 text-[#52443a] lg:text-[16px] lg:leading-7">
                  Discover a curated collection of Vedic astrology calculators,
                  reports and spiritual tools designed to help you explore the
                  deeper patterns of your life.
                </p>

              </div>

              {/* COLLECTION CARD */}

              <div className="relative z-10">

                <div className="relative overflow-hidden rounded-[20px] bg-[#7b210b] px-6 py-5 shadow-[0_18px_45px_rgba(102,30,8,0.17)] lg:px-8 lg:py-6">

                  <div className="pointer-events-none absolute -right-28 -top-32 h-[360px] w-[360px] rounded-full border border-[#e3b866]/20" />

                  <div className="pointer-events-none absolute -right-16 -top-20 h-[260px] w-[260px] rounded-full border border-[#e3b866]/15" />

                  <div className="relative">

                    <div className="flex items-center justify-between">

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#e2b75e]/45 text-[#e5bd6b]">
                        <Sparkles size={16} strokeWidth={1.5} />
                      </div>

                      <span className="text-[9px] font-bold uppercase tracking-[0.23em] text-[#e4c27d]">
                        VEDIC COLLECTION
                      </span>

                    </div>

                    <h2 className="vaidik-serif mt-5 text-[26px] font-semibold leading-[1.12] text-white lg:text-[28px]">
                      One place.
                      <br />
                      <span className="text-[#e4b95f]">
                        Endless insights.
                      </span>
                    </h2>

                    <div className="my-5 h-px bg-[#e7bc64]/20" />

                    <div className="flex items-end justify-between">

                      <div>
                        <div className="text-[26px] font-semibold leading-none text-white">
                          All-in-One
                        </div>

                        <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#e6c681]">
                          TOOLS & REPORTS
                        </div>
                      </div>

                      <Sparkles
                        size={48}
                        strokeWidth={1.25}
                        className="text-[#e6bc60]"
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================
            FILTER BAR
        ========================================================= */}

        <section className="border-b border-[#eee3d4] bg-[#fffdf9]">

          <div className="mx-auto max-w-[1536px] px-6 lg:px-10">

            <div className="hide-scrollbar flex items-center gap-3 overflow-x-auto py-4">

              {/* ALL */}

              <button
                type="button"
                onClick={() => handleCategory('All Tools')}
                className={`flex h-[46px] shrink-0 items-center gap-3 rounded-full px-6 text-[12px] font-semibold transition-all ${
                  activeCategory === 'All Tools'
                    ? 'bg-[#7b210b] text-white shadow-[0_7px_18px_rgba(123,33,11,0.14)]'
                    : 'border border-[#eee3d4] bg-[#fffdf9] text-[#45372e] hover:border-[#d5b98e] hover:bg-[#fff8ee]'
                }`}
              >
                <Grid2X2 size={15} strokeWidth={1.7} />
                All Tools
              </button>

              {categoryList.slice(1).map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategory(category)}
                  className={`flex h-[46px] shrink-0 items-center gap-2 rounded-full border px-6 text-[12px] font-medium transition-all ${
                    activeCategory === category
                      ? 'border-[#7b210b] bg-[#7b210b] text-white'
                      : 'border-[#eee3d4] bg-[#fffdf9] text-[#45372e] hover:border-[#d5b98e] hover:bg-[#fff8ee]'
                  }`}
                >
                  {category === 'Calculators' && (
                    <Calculator size={15} strokeWidth={1.6} />
                  )}

                  {category === 'Kundli & Reports' && (
                    <BookOpen size={15} strokeWidth={1.6} />
                  )}

                  {category === 'Horoscope' && (
                    <Star size={15} strokeWidth={1.6} />
                  )}

                  {category === 'Muhurat & Panchang' && (
                    <CalendarDays size={15} strokeWidth={1.6} />
                  )}

                  {category === 'Love & Marriage' && (
                    <Heart size={15} strokeWidth={1.6} />
                  )}

                  {category === 'Spiritual' && (
                    <Sparkles size={15} strokeWidth={1.6} />
                  )}

                  {category}
                </button>
              ))}

              {/* SEARCH */}

              <div className="relative ml-auto hidden shrink-0 xl:block">

                <Search
                  size={17}
                  strokeWidth={1.7}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c7868]"
                />

                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search tools..."
                  className="h-[46px] w-[245px] rounded-full border border-[#dccbb5] bg-white pl-11 pr-5 text-[12px] text-[#332720] outline-none placeholder:text-[#9a897a] focus:border-[#ad7932]"
                />

              </div>

            </div>

            {/* MOBILE SEARCH */}

            <div className="pb-4 xl:hidden">
              <div className="relative">

                <Search
                  size={17}
                  strokeWidth={1.7}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8c7868]"
                />

                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search astrology tools..."
                  className="h-[46px] w-full rounded-full border border-[#dccbb5] bg-white pl-11 pr-5 text-[12px] text-[#332720] outline-none placeholder:text-[#9a897a] focus:border-[#ad7932]"
                />

              </div>
            </div>

          </div>
        </section>

        {/* =========================================================
            MAIN CONTENT
        ========================================================= */}

        <section className="bg-[#fffdf9]">

          <div className="mx-auto max-w-[1536px] px-6 py-7 lg:px-10 lg:py-8">

            <div className="grid gap-8 lg:grid-cols-[330px_1fr]">

              {/* ===================================================
                  SIDEBAR
              =================================================== */}

              <aside className="hidden lg:block">

                <div className="rounded-[14px] border border-[#eee4d7] bg-white p-6">

                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-[#a86c20]">
                      <MoreHorizontal size={18} />
                    </span>

                    <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#9a5f1e]">
                      FILTER BY CATEGORY
                    </span>
                  </div>

                  <div className="space-y-1">

                    {categoryList.map((category) => {
                      const active = activeCategory === category;

                      return (
                        <button
                          key={category}
                          type="button"
                          onClick={() => handleCategory(category)}
                          className={`flex w-full items-center gap-3 rounded-lg px-1 py-2.5 text-left transition-colors ${
                            active
                              ? 'text-[#711e09]'
                              : 'text-[#4e433b] hover:bg-[#fff8ef]'
                          }`}
                        >

                          <span
                            className={`flex h-[15px] w-[15px] items-center justify-center rounded-full border ${
                              active
                                ? 'border-[#8b2b11]'
                                : 'border-[#cfc4b8]'
                            }`}
                          >
                            {active && (
                              <span className="h-[7px] w-[7px] rounded-full bg-[#8b2b11]" />
                            )}
                          </span>

                          <span className="flex-1 text-[12px] font-medium">
                            {category}
                          </span>

                          <span
                            className={`min-w-[38px] rounded-full px-2 py-1 text-center text-[10px] font-semibold ${
                              active
                                ? 'bg-[#f8ead8] text-[#8a4c16]'
                                : 'bg-[#f8f0e5] text-[#9a7045]'
                            }`}
                          >
                            {categoryCounts[category]}
                          </span>

                        </button>
                      );
                    })}

                  </div>

                  <div className="my-6 h-px bg-[#eee5da]" />

                  {/* QUICK LINKS */}

                  <div className="mb-4 flex items-center gap-3">
                    <Zap
                      size={16}
                      strokeWidth={1.7}
                      className="text-[#a86c20]"
                    />

                    <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#9a5f1e]">
                      QUICK LINKS
                    </span>
                  </div>

                  <div className="space-y-3">

                    <Link
                      href="/free-reports"
                      className="group flex items-center gap-3 rounded-xl border border-[#f0e6d9] bg-[#fffaf3] p-4 transition-all hover:border-[#dfc9a9] hover:shadow-sm"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e3] text-[#8c220b]">
                        <Sparkles size={19} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-semibold text-[#302721]">
                          Free Reports
                        </div>

                        <div className="mt-1 text-[10px] text-[#806f62]">
                          Explore free astrology reports
                        </div>
                      </div>

                      <ArrowRight
                        size={15}
                        className="text-[#5b4030] transition-transform group-hover:translate-x-1"
                      />

                    </Link>

                    <Link
                      href="#"
                      className="group flex items-center gap-3 rounded-xl border border-[#f0e6d9] bg-[#fffaf3] p-4 transition-all hover:border-[#dfc9a9] hover:shadow-sm"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e3] text-[#8c220b]">
                        <UserRound size={19} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-semibold text-[#302721]">
                          WhatsApp Us
                        </div>

                        <div className="mt-1 text-[10px] text-[#806f62]">
                          Get guidance from expert
                        </div>
                      </div>

                      <ArrowRight
                        size={15}
                        className="text-[#5b4030] transition-transform group-hover:translate-x-1"
                      />

                    </Link>

                    <Link
                      href="/ai-astrologer"
                      className="group flex items-center gap-3 rounded-xl border border-[#f0e6d9] bg-[#fffaf3] p-4 transition-all hover:border-[#dfc9a9] hover:shadow-sm"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e3] text-[#8c220b]">
                        <Bot size={19} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-semibold text-[#302721]">
                          Talk to AI Astrologer
                        </div>

                        <div className="mt-1 text-[10px] text-[#806f62]">
                          Instant AI guidance 24/7
                        </div>
                      </div>

                      <ArrowRight
                        size={15}
                        className="text-[#5b4030] transition-transform group-hover:translate-x-1"
                      />

                    </Link>

                    <Link
                      href="/reports"
                      className="group flex items-center gap-3 rounded-xl border border-[#f0e6d9] bg-[#fffaf3] p-4 transition-all hover:border-[#dfc9a9] hover:shadow-sm"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e3] text-[#8c220b]">
                        <BookOpen size={19} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-semibold text-[#302721]">
                          Premium Kundli
                        </div>

                        <div className="mt-1 text-[10px] text-[#806f62]">
                          Detailed astrology reports
                        </div>
                      </div>

                      <ArrowRight
                        size={15}
                        className="text-[#5b4030] transition-transform group-hover:translate-x-1"
                      />

                    </Link>

                    <Link
                      href="/horoscope-matching"
                      className="group flex items-center gap-3 rounded-xl border border-[#f0e6d9] bg-[#fffaf3] p-4 transition-all hover:border-[#dfc9a9] hover:shadow-sm"
                    >

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff0e3] text-[#8c220b]">
                        <HeartHandshake size={19} strokeWidth={1.7} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="text-[12px] font-semibold text-[#302721]">
                          Premium Kundali Matching
                        </div>

                        <div className="mt-1 text-[10px] text-[#806f62]">
                          36-point Guna Milan
                        </div>
                      </div>

                      <ArrowRight
                        size={15}
                        className="text-[#5b4030] transition-transform group-hover:translate-x-1"
                      />

                    </Link>

                  </div>

                </div>

              </aside>

              {/* ===================================================
                  TOOL GRID
              =================================================== */}

              <div>

                <div className="mb-5 flex items-end justify-between">

                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#a76b20]">
                      Astrology tools
                    </div>

                    <h2 className="vaidik-serif mt-1 text-[26px] font-semibold text-[#661c09]">
                      Explore all tools
                    </h2>
                  </div>

                  <div className="text-[11px] text-[#8b7868]">
                    {filteredTools.length} tools
                  </div>

                </div>

                {/* RESULTS */}

                {filteredTools.length > 0 ? (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

                    {filteredTools.map((tool) => {
                      const Icon = tool.icon;

                      return (
                        <Link
                          key={tool.title}
                          href={tool.href}
                          className="group relative flex min-h-[100px] items-center gap-4 rounded-[14px] border border-[#eee6dc] bg-white px-4 py-4 shadow-[0_4px_15px_rgba(104,75,43,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-[#e2cfb5] hover:shadow-[0_12px_30px_rgba(104,75,43,0.09)]"
                        >

                          {/* ICON */}

                          <div className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-[15px] border border-[#f0e3d2] bg-[#fffaf2] text-[#9a5b18] transition-all duration-300 group-hover:border-[#e0c59d] group-hover:bg-[#fff4e4]">

                            <Icon
                              size={27}
                              strokeWidth={1.6}
                            />

                          </div>

                          {/* CONTENT */}

                          <div className="min-w-0 flex-1">

                            <div className="flex items-center gap-2">

                              <h3 className="truncate text-[15px] font-semibold text-[#27221e]">
                                {tool.title}
                              </h3>

                              {tool.premium && (
                                <span className="shrink-0 rounded-full bg-[#f8ecd9] px-2 py-1 text-[7px] font-bold uppercase tracking-[0.12em] text-[#a36a1d]">
                                  Premium
                                </span>
                              )}

                            </div>

                            <p className="mt-1 line-clamp-2 text-[12px] leading-[1.55] text-[#74675d]">
                              {tool.description}
                            </p>

                          </div>

                          {/* ARROW */}

                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#eadbc9] text-[#9c6325] transition-all duration-300 group-hover:border-[#9c6325] group-hover:bg-[#fff7ec]">

                            <ArrowRight
                              size={14}
                              strokeWidth={1.6}
                              className="transition-transform duration-300 group-hover:translate-x-0.5"
                            />

                          </div>

                        </Link>
                      );
                    })}

                  </div>
                ) : (
                  <div className="rounded-[18px] border border-dashed border-[#dfcdb5] bg-[#fffaf3] px-6 py-20 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f6eadb] text-[#9a6227]">
                      <Search size={21} />
                    </div>

                    <h3 className="vaidik-serif mt-5 text-[24px] font-semibold text-[#681c09]">
                      No tools found
                    </h3>

                    <p className="mt-2 text-[12px] text-[#857367]">
                      Try another search or select a different category.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategory('All Tools');
                      }}
                      className="mt-5 rounded-full bg-[#7b210b] px-5 py-2.5 text-[11px] font-semibold text-white"
                    >
                      View All Tools
                    </button>

                  </div>
                )}

              </div>

            </div>

          </div>
        </section>

        {/* =========================================================
            BOTTOM CTA
        ========================================================= */}

        <section className="bg-[#fffdf9] px-6 pb-16 pt-8 lg:px-10">

          <div className="mx-auto max-w-[1536px]">

            <div className="relative overflow-hidden rounded-[20px] bg-[#7b210b] px-7 py-9 lg:px-12">

              <div className="pointer-events-none absolute -right-20 -top-24 h-[300px] w-[300px] rounded-full border border-[#e3b866]/15" />

              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                <div>

                  <div className="mb-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#e2bb6b]">
                    <CheckCircle2 size={14} />
                    Personalised Guidance
                  </div>

                  <h2 className="vaidik-serif text-[28px] font-semibold text-white lg:text-[34px]">
                    Need a deeper understanding?
                  </h2>

                  <p className="mt-2 max-w-[600px] text-[12px] leading-5 text-white/60">
                    Connect with an experienced Vedic astrologer for
                    personalised guidance based on your birth chart.
                  </p>

                </div>

                <Link
                  href="#"
                  className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#e8c276] px-7 text-[12px] font-bold text-[#641a07] transition-all hover:bg-white"
                >
                  {t('astrology_calculators.chat_with_an_astrologer')}
                  <ArrowRight size={15} />
                </Link>

              </div>

            </div>

          </div>
        </section>

      </div>
    </main>
  );
}