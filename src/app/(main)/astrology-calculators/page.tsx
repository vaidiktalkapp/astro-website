'use client';
import { useTranslation } from '@/context/LanguageContext';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText, Heart, Book, Star, Clock, Calendar,
  Sparkles, Compass, ChevronRight, Moon, Type,
  Baby, Sun, CalendarDays, Globe
} from 'lucide-react';

const CALCULATORS = [
{
  title: 'Numerology Calculator',
  desc: 'Sacred Chaldean and Vedic vibration analysis for your name and birth date.',
  icon: Type,
  href: '/numerology',
  iconColor: 'text-violet-600',
  iconBg: 'bg-violet-50'
},
{
  title: 'Moon Sign Calculator',
  desc: 'Discover deep subconscious traits using authentic astronomical positioning data.',
  icon: Moon,
  href: '/moon-signs?new=true',
  iconColor: 'text-indigo-600',
  iconBg: 'bg-indigo-50'
},
{
  title: 'Rashi Calculator',
  desc: 'Identifies your Janma Rashi using precise birth time and location data.',
  icon: Compass,
  href: '/rashi-calculator?new=true',
  iconColor: 'text-blue-600',
  iconBg: 'bg-blue-50'
},
{
  title: 'Love Calculator',
  desc: 'Vibrational and zodiac matching engine for deep insight into romantic compatibility.',
  icon: Heart,
  href: '/compatibility?mode=love&new=true',
  iconColor: 'text-rose-600',
  iconBg: 'bg-rose-50'
},
{
  title: 'Kundli Generation',
  desc: 'Detailed birth chart with complete planetary positions and house analysis.',
  icon: FileText,
  href: '/kundli',
  iconColor: 'text-orange-600',
  iconBg: 'bg-orange-50'
},
{
  title: 'Horoscope Matching',
  desc: 'Detailed 36-point Guna Milan compatibility check for marriage and partnership.',
  icon: Heart,
  href: '/horoscope-matching',
  iconColor: 'text-red-600',
  iconBg: 'bg-red-50'
},
{
  title: 'Lal Kitab Reading',
  desc: 'Remedial insights and planetary analysis from the legendary Red Book tradition.',
  icon: Book,
  href: '/lal-kitab',
  iconColor: 'text-pink-700',
  iconBg: 'bg-pink-50'
},
{
  title: 'Muhurat Finder',
  desc: 'Discover the most auspicious Shubh Muhurat timings for important life events.',
  icon: Clock,
  href: '/muhurat',
  iconColor: 'text-amber-600',
  iconBg: 'bg-amber-50'
},
{
  title: 'Chinese Horoscope',
  desc: 'Discover your Eastern zodiac sign and explore yearly destiny projections.',
  icon: Star,
  href: '/chinese-horoscope',
  iconColor: 'text-red-700',
  iconBg: 'bg-red-50'
},
{
  title: 'Panchang & Daily Timings',
  desc: 'Daily Tithi, Nakshatra, and essential inauspicious Rahu Kaal timings.',
  icon: Calendar,
  href: '/panchang',
  iconColor: 'text-stone-600',
  iconBg: 'bg-stone-100'
},
{
  title: 'Baby Names',
  desc: 'Find the most auspicious Nakshatra-based names for your newborn.',
  icon: Baby,
  href: '/baby-names',
  iconColor: 'text-teal-600',
  iconBg: 'bg-teal-50'
},
{
  title: 'Rahu Kaal Calculator',
  desc: 'Calculate daily inauspicious timings to avoid starting new ventures.',
  icon: Sun,
  href: '/rahu-kaal',
  iconColor: 'text-orange-700',
  iconBg: 'bg-orange-100'
},
{
  title: 'Hindu Calendar',
  desc: 'Detailed monthly calendar with all Vedic tithis and planetary shifts.',
  icon: CalendarDays,
  href: '/calendar',
  iconColor: 'text-emerald-700',
  iconBg: 'bg-emerald-50'
},
{
  title: 'Festivals',
  desc: 'Track upcoming Hindu festivals, fasts, and auspicious observances.',
  icon: Sparkles,
  href: '/festivals',
  iconColor: 'text-fuchsia-600',
  iconBg: 'bg-fuchsia-50'
},
{
  title: 'Love Horoscope',
  desc: 'Daily, weekly, and monthly predictions for your romantic life.',
  icon: Heart,
  href: '/love-horoscope',
  iconColor: 'text-pink-600',
  iconBg: 'bg-pink-100'
},
{
  title: 'Celebrity Horoscopes',
  desc: 'Explore the birth charts and planetary alignments of famous personalities.',
  icon: Star,
  href: '/celebrity-horoscopes',
  iconColor: 'text-yellow-600',
  iconBg: 'bg-yellow-100'
},
{
  title: 'Occult Directory',
  desc: 'Learn about various esoteric sciences, healing modalities, and occult practices.',
  icon: Globe,
  href: '/occult-directory',
  iconColor: 'text-purple-700',
  iconBg: 'bg-purple-100'
},
{
  title: 'Atlas / Location Finder',
  desc: 'Precise geographical coordinates and time zones for accurate astrology calculations.',
  icon: Globe,
  href: '/atlas',
  iconColor: 'text-indigo-600',
  iconBg: 'bg-indigo-50'
},
{
  title: 'Vaidik Smart Kundali',
  desc: 'Our most comprehensive premium birth chart report with deep life predictions.',
  icon: FileText,
  href: '/reports',
  iconColor: 'text-orange-700',
  iconBg: 'bg-orange-100'
},
{
  title: 'Handwritten Kundali',
  desc: 'Authentic physical Kundali handwritten by expert Vedic scholars and mailed to you.',
  icon: Book,
  href: '/reports',
  iconColor: 'text-amber-800',
  iconBg: 'bg-amber-100'
},
{
  title: 'Kaal Sarp Dosh Check',
  desc: 'Free analysis to check the presence and impact of Kaal Sarp Dosh in your chart.',
  icon: Sparkles,
  href: '/free-reports',
  iconColor: 'text-stone-700',
  iconBg: 'bg-stone-200'
},
{
  title: 'Gemstone Suggestion',
  desc: 'Free personalized lucky gemstone recommendations based on your planetary alignments.',
  icon: Sparkles,
  href: '/free-reports',
  iconColor: 'text-emerald-600',
  iconBg: 'bg-emerald-50'
},
{
  title: 'Sade Sati Check',
  desc: 'Free tool to check if you are undergoing the challenging phase of Shani Sade Sati.',
  icon: Sparkles,
  href: '/free-reports',
  iconColor: 'text-stone-800',
  iconBg: 'bg-stone-200'
},
{
  title: 'Healings',
  desc: 'Explore spiritual healing modalities and remedies for balancing your chakras and aura.',
  icon: Heart,
  href: '/healing',
  iconColor: 'text-rose-500',
  iconBg: 'bg-rose-50'
},
{
  title: 'Vedic Matrimony',
  desc: 'Find your spiritually aligned life partner through our trusted Vedic matchmaking.',
  icon: Heart,
  href: '/matrimony',
  iconColor: 'text-red-700',
  iconBg: 'bg-red-50'
},
{
  title: 'Learn Astrology',
  desc: 'Step-by-step courses and resources to master the divine science of Vedic Astrology.',
  icon: Book,
  href: '/learn-astrology',
  iconColor: 'text-blue-700',
  iconBg: 'bg-blue-50'
}
];


export default function AstrologyCalculatorsPage() {
    const { t } = useTranslation();

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#fdf8f0' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Inter:wght@400;500;600&display=swap');
        .calc-hub { font-family: 'Inter', sans-serif; }
        .calc-hub .serif { font-family: 'Playfair Display', Georgia, serif; }
      `}</style>

      <div className="max-w-5xl mx-auto pt-12 md:pt-20 calc-hub">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 text-[#9a7b2f] text-[11px] font-semibold tracking-widest uppercase mb-4">
            
            <span className="w-1.5 h-1.5 rounded-full bg-[#9a7b2f]" />
            Vedic Astrology Hub
            <span className="w-1.5 h-1.5 rounded-full bg-[#9a7b2f]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="serif text-4xl md:text-5xl font-semibold text-[#1a1208] mb-4 leading-tight">
            All Reports <span className="text-[#9a7b2f]">&amp; Tools</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="text-[#5a4a2a] text-[15px] leading-relaxed max-w-xl mx-auto">
            A complete suite of premium astrology reports, smart calculators, and spiritual tools to decode your destiny with deep Vedic insights.
          </motion.p>
        </div>

        {/* Grid — Spaced Floating Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mb-16">
          
          {CALCULATORS.map((calc, i) =>
          <motion.div
            key={calc.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: Math.min(i * 0.05, 0.5) }}>
            
              <Link
              href={calc.href}
              className="group flex flex-col gap-3 p-6 md:p-7 h-full bg-white border border-[#e8dfc7] rounded-2xl transition-all duration-300 hover:shadow-[0_8px_24px_rgba(154,123,47,0.12)] hover:-translate-y-1"
              >
              
                <div className={`w-11 h-11 ${calc.iconBg} ${calc.iconColor} rounded-xl flex items-center justify-center mb-1`}>
                  <calc.icon size={22} strokeWidth={1.75} />
                </div>

                <h3 className="text-[16px] font-semibold text-[#1a1208] leading-snug group-hover:text-[#9a7b2f] transition-colors">
                  {calc.title}
                </h3>

                <p className="text-[13px] text-[#6b5635] leading-relaxed flex-1">
                  {calc.desc}
                </p>

                <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-[#9a7b2f] tracking-wider uppercase">
                  {t("astrology_calculators.explore")}
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          )}

        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-dashed border-[#d6c48a] bg-white/50 p-10 text-center">
          
          <Sparkles className="w-6 h-6 text-[#9a7b2f] mx-auto mb-3" />
          <h2 className="serif text-[22px] font-semibold text-[#1a1208] mb-2">
            {t("astrology_calculators.need_a_personalized_reading")}
          </h2>
          <p className="text-[14px] text-[#6b5635] mb-6 max-w-md mx-auto">
            {t("astrology_calculators._while_calculators_provide_pre")}
          </p>
          <Link
            href="/astrologers-chat"
            className="inline-flex items-center gap-2 bg-[#7A1F01] hover:bg-[#922501] text-white px-6 py-3 rounded-xl text-[14px] font-semibold transition-colors">
            {t("astrology_calculators.chat_with_an_astrologer")}
            <ChevronRight size={16} />
          </Link>
        </motion.div>

      </div>
    </div>
  );
}