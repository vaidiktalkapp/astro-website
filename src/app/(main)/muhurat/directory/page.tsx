'use client';
import { useTranslation } from '@/context/LanguageContext';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowLeft, Calendar, Heart, Briefcase, Home,
  Sparkles, Clock, ChevronRight, ChevronLeft, Loader2, Star,
  Sun, ChevronDown, ChevronUp, Info, Globe, X,
  Baby, Car, Building2, Hammer, Scissors, GraduationCap, Utensils } from
'lucide-react';
import { toast } from 'react-hot-toast';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

// Standard baseline for general directory (New Delhi)
const BASE_LAT = 28.6139;
const BASE_LON = 77.2090;
const BASE_TZONE = 5.5;

// We will fetch these from the API, but keep these as a fallback for the UI state
const DEFAULT_CATEGORIES = [
{ id: 'marriage', label: 'Marriage', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100' },
{ id: 'business', label: 'Business', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
{ id: 'housewarming', label: 'Housewarming', icon: Home, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' }];


const MONTHS = [
'January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'November', 'December'];


const MUHURAT_TYPES = [
{ name: 'Rudra', nature: 'Inauspicious' },
{ name: 'Ahi', nature: 'Inauspicious' },
{ name: 'Mitra', nature: 'Auspicious' },
{ name: 'Pitra', nature: 'Inauspicious' },
{ name: 'Vasu', nature: 'Auspicious' },
{ name: 'Varaha', nature: 'Auspicious' },
{ name: 'Vishwadeva', nature: 'Auspicious' },
{ name: 'Vidhi', nature: 'Auspicious (Except Monday and Friday)' },
{ name: 'Sutamukhi', nature: 'Auspicious' },
{ name: 'Puruhut', nature: 'Inauspicious' },
{ name: 'Vahini', nature: 'Inauspicious' },
{ name: 'Naktanakara', nature: 'Inauspicious' },
{ name: 'Varun', nature: 'Auspicious' },
{ name: 'Aryaman', nature: 'Auspicious (Except Sunday)' },
{ name: 'Bhaga', nature: 'Inauspicious' },
{ name: 'Girish', nature: 'Inauspicious' },
{ name: 'Ajapada', nature: 'Inauspicious' },
{ name: 'Ahir Budhnya', nature: 'Auspicious' },
{ name: 'Pushya', nature: 'Auspicious' },
{ name: 'Ashwini', nature: 'Auspicious' },
{ name: 'Yam', nature: 'Inauspicious' },
{ name: 'Agni', nature: 'Auspicious' },
{ name: 'Vidhartha', nature: 'Auspicious' },
{ name: 'Kanda', nature: 'Auspicious' },
{ name: 'Aditi', nature: 'Auspicious' },
{ name: 'Jeev/Amrit', nature: 'Extremely Auspicious' },
{ name: 'Vishnu', nature: 'Auspicious' },
{ name: 'Dyumadgadyuti', nature: 'Auspicious' },
{ name: 'Brahma', nature: 'Extremely Auspicious' }];


const KRISHNA_PAKSHA_TITHIS = [
'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Amavasya'];


const SHUKLA_PAKSHA_TITHIS = [
'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
'Shashti', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'];


const NAKSHATRA_RULING_PLANETS = [
{ planet: 'Ketu', nakshatras: ['Ashwini', 'Magha', 'Moola'] },
{ planet: 'Venus', nakshatras: ['Bharani', 'Purva Phalguni', 'Purva Ashada'] },
{ planet: 'Sun', nakshatras: ['Krittika', 'Uttara Phalguni', 'Uttara Ashada'] },
{ planet: 'Moon', nakshatras: ['Rohini', 'Hasta', 'Shravana'] },
{ planet: 'Mars', nakshatras: ['Mrigashira', 'Chitra', 'Dhanistha'] },
{ planet: 'Rahu', nakshatras: ['Ardra', 'Swati', 'Shatabhisha'] },
{ planet: 'Jupiter', nakshatras: ['Punarvasu', 'Vishakha', 'Purva Bhadrapada'] },
{ planet: 'Saturn', nakshatras: ['Pushya', 'Anuradha', 'Uttara Bhadrapada'] },
{ planet: 'Mercury', nakshatras: ['Ashlesha', 'Jyeshtha', 'Revati'] }];


// --- Sub-components ---

function MonthTable({ monthIdx, category, location }: {monthIdx: number;category: string;location: any;}) {
    const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "200px 0px" });

  useEffect(() => {
    if (isInView && !results && !loading) {
      fetchData();
    }
  }, [isInView, category, location]);

  // Force re-fetch if category or location changes and we're already in view or had results
  useEffect(() => {
    if (results || error) {
      fetchData();
    }
  }, [category, location]);

  const fetchData = async () => {
    setLoading(true);
    setError(false);
    const year = 2026;
    const startDate = `${year}-${String(monthIdx + 1).padStart(2, '0')}-01`;
    const lastDay = new Date(year, monthIdx + 1, 0).getDate();
    const endDate = `${year}-${String(monthIdx + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

    try {
      const res = await fetch(`${API_BASE}/astrology/muhurat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          startDate,
          endDate,
          lat: location.lat,
          lon: location.lon,
          tzone: location.tzone,
          isDirectory: true
        })
      });
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={ref} className="mb-16 scroll-mt-20">
            <div className="flex items-center gap-4 mb-6">
                <h2 className="text-3xl font-bold text-[#3a1216] font-astrology">{MONTHS[monthIdx]} 2026</h2>
                <div className="h-px flex-1 bg-[#e8dbb8]/40" />
            </div>

            {loading ?
      <div className="py-20 flex flex-col items-center justify-center bg-white/40 rounded-3xl border border-dashed border-[#e8dbb8]">
                    <Loader2 className="w-8 h-8 animate-spin text-[#b8962e] mb-4" />
                    <p className="text-[#b8962e] font-bold text-sm uppercase tracking-widest font-astrology anim-pulse">{t("directory.calculating_divine_timings")}</p>
                </div> :
      results ?
      results.auspicious_dates?.length > 0 ?
      <>
        <div className="block md:hidden space-y-4">
          {results.auspicious_dates.map((date: any, i: number) => {
            const d = new Date(date.date);
            const dateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
            const dayStr = d.toLocaleDateString('en-IN', { weekday: 'long' });

            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                key={i} 
                className="bg-white rounded-xl border border-[#f0ddc0] p-4 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#d97706]" />
                
                <div className="flex justify-between items-start mb-3 border-b border-[#f0ddc0]/50 pb-3 pl-2">
                   <div>
                      <p className="font-bold text-[#412a1e] text-[16px]">{dateStr}</p>
                      <p className="text-[13px] text-[#d97706] font-semibold font-astrology">{dayStr}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[13px] text-[#412a1e] font-medium"><span className="text-[#8a1c2a] text-[11px] uppercase tracking-wider font-bold mr-1">Nakshatra:</span>{date.nakshatra}</p>
                      <p className="text-[13px] text-[#412a1e] font-medium"><span className="text-[#8a1c2a] text-[11px] uppercase tracking-wider font-bold mr-1">Tithi:</span>{date.tithi}</p>
                   </div>
                </div>

                <div className="bg-[#faf6ed] rounded-lg p-3 border border-[#e8dbb8] ml-2">
                    <div className="flex items-center gap-2 mb-1.5">
                        <Clock className="w-4 h-4 text-[#d97706]" />
                        <span className="text-[14px] font-bold text-[#412a1e]">
                            {date.muhurat_start ? `From ${date.muhurat_start} to ${date.muhurat_end}` : `Sunrise to Sunset`}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-[12px] text-[#3a1216] font-medium ml-6">
                        <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-amber-500" /> {date.sun_rise}</span>
                        <span className="flex items-center gap-1"><Sun className="w-3.5 h-3.5 text-orange-400" /> {date.sun_set}</span>
                    </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="hidden md:block overflow-x-auto rounded-2xl border-2 border-[#f0ddc0] bg-white shadow-md custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r from-[#5c1420] to-[#8a1c2a] text-white border-b-2 border-[#d97706]">
                                    <th className="p-4 text-[13px] font-black uppercase tracking-widest text-white">{t("directory.date_day")}</th>
                                    <th className="p-4 text-[13px] font-black uppercase tracking-widest text-white">{t("directory.nakshatra")}</th>
                                    <th className="p-4 text-[13px] font-black uppercase tracking-widest text-white">{t("directory.tithi")}</th>
                                    <th className="p-4 text-[13px] font-black uppercase tracking-widest text-white">{t("directory.muhurat_timing")}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#f0ddc0]/60">
                                {results.auspicious_dates.map((date: any, i: number) => {
              const d = new Date(date.date);
              const dateStr = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
              const dayStr = d.toLocaleDateString('en-IN', { weekday: 'long' });

              return (
                <React.Fragment key={i}>
                                            <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`transition-colors cursor-pointer hover:bg-[#fdf8f0] ${i % 2 === 0 ? 'bg-white' : 'bg-[#faf6ed]'}`}
                    onClick={() => setExpandedRow(expandedRow === i ? null : i)}>
                    
                                                <td className="p-4 whitespace-nowrap">
                                                    <p className="font-bold text-[#412a1e] text-[15px]">{dateStr}</p>
                                                    <p className="text-[12px] text-[#d97706] font-semibold font-astrology">({dayStr})</p>
                                                </td>
                                                <td className="p-4 text-[15px] text-[#412a1e] font-medium">{date.nakshatra}</td>
                                                <td className="p-4 text-[15px] text-[#412a1e] font-medium">{date.tithi}</td>
                                                <td className="p-4">
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="w-4 h-4 text-[#d97706]" />
                                                            <span className="text-[14px] font-bold text-[#412a1e]">
                                                                {date.muhurat_start ? `From ${date.muhurat_start} to ${date.muhurat_end}` : `Sunrise to Sunset`}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-[11px] text-[#3a1216] font-medium ml-5">
                                                            <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-500" /> {date.sun_rise}</span>
                                                            <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-orange-400" /> {date.sun_set}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        </React.Fragment>);

            })}
                            </tbody>
                        </table>
                    </div>
      </> :

      <div className="py-12 px-6 bg-amber-50 rounded-3xl border border-amber-100 text-center">
                        <Info className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-amber-900 font-astrology mb-1">{t("directory.no_ideal_muhurat")}</h3>
                        <p className="text-amber-700 text-sm">{t("directory.none_of_the_dates_in")}{MONTHS[monthIdx]}{t("directory.meet_the_strict_requirements_f")}{category}.</p>
                    </div> :

      error ?
      <div className="py-12 bg-rose-50 rounded-3xl border border-rose-100 text-center text-rose-800">
{t("directory.calculations_interrupted_pleas")}
      </div> :

      <div className="py-20 border border-dashed border-[#e8dbb8] rounded-3xl bg-white/20" />
      }
        </div>);

}

// --- Main Directory Page ---

export default function MuhuratDirectoryPage() {
    const { t } = useTranslation();

  const router = useRouter();
  const [categories, setCategories] = useState<any[]>(DEFAULT_CATEGORIES);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('marriage');
  const [viewMode, setViewMode] = useState<'overview' | 'category'>('overview');
  const [activeLocation, setActiveLocation] = useState({
    place: 'General Guide (IST)',
    lat: BASE_LAT,
    lon: BASE_LON,
    tzone: BASE_TZONE
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/astrology/muhurat/categories`);
      const data = await res.json();
      if (data.success && data.data.length > 0) {
        const mapped = data.data.map((c: any) => {
          let IconComp = Calendar;
          const slug = c.slug.toLowerCase();

          if (slug.includes('marriage')) IconComp = Heart;else
          if (slug.includes('business')) IconComp = Briefcase;else
          if (slug.includes('housewarming')) IconComp = Home;else
          if (slug.includes('naming') || slug.includes('namkaran')) IconComp = Baby;else
          if (slug.includes('vehicle')) IconComp = Car;else
          if (slug.includes('property')) IconComp = Building2;else
          if (slug.includes('engagement')) IconComp = Star;else
          if (slug.includes('foundation')) IconComp = Hammer;else
          if (slug.includes('tonsure') || slug.includes('mundan')) IconComp = Scissors;else
          if (slug.includes('education')) IconComp = GraduationCap;else
          if (slug.includes('food') || slug.includes('annaprashan')) IconComp = Utensils;

          return {
            id: c.slug,
            label: c.name,
            icon: IconComp,
            color: slug.includes('marriage') ? 'text-rose-500' : slug.includes('business') ? 'text-amber-600' : 'text-emerald-600',
            bg: slug.includes('marriage') ? 'bg-rose-50' : slug.includes('business') ? 'bg-amber-50' : 'bg-emerald-50',
            border: slug.includes('marriage') ? 'border-rose-100' : slug.includes('business') ? 'border-amber-100' : 'border-emerald-100'
          };
        });
        setCategories(mapped);
        if (!mapped.find((m: any) => m.id === selectedCategory)) {
          setSelectedCategory(mapped[0].id);
        }
      }
    } catch (e) {
      console.error('Failed to fetch categories:', e);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Yearly directory always uses the India-wide standard baseline (New Delhi / IST)
  // No geolocation or localStorage override — this is a general guide, not personalized

  const categoryMeta = categories.find((c) => c.id === selectedCategory) || categories[0];

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 relative" style={{ backgroundColor: '#fdf6e3' }}>
            <style dangerouslySetInnerHTML={{ __html: `
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600&display=swap');
                .md-wrap p, .md-wrap li { font-family: 'Source Sans 3', sans-serif; font-size: 17px; }
                .md-wrap h1, .font-astrology { font-family: 'Outfit', sans-serif !important; }
                .anim-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .5; } }
                .custom-scrollbar::-webkit-scrollbar { height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #fdf8f0; border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #d97706; border-radius: 4px; }
            ` }} />

            <div className="max-w-6xl mx-auto md-wrap">
                
                {viewMode === 'overview' ?
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}>
          
                        {/* Header */}
                        <div className="mb-12 text-center">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fdf6e3] border border-[#e8dbb8]/60 text-[11px] font-bold text-[#b8962e] uppercase tracking-widest mb-6">
                                <Sparkles className="w-3.5 h-3.5" />{t("directory.comprehensive_2026_muhurat_gui")}
            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#3a1216] mb-4 font-astrology">{t("directory.the_vaidik_muhurat_directory")}</h1>
                            <p className="text-[#3a1216] max-w-2xl mx-auto font-astrology mb-8">
{t("directory.expertly_calculated_auspicious")}
            </p>
                            <button
              onClick={() => router.push('/muhurat')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#b8962e] text-white font-bold text-[15px] hover:shadow-lg hover:shadow-[#b8962e]/20 transition-all active:scale-95 group mb-4">
              
                                <Sparkles className="w-4 h-4" />
{t("directory.calculate_your_custom_muhurat")}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        {/* SEO Content Top */}
                        <div className="mb-12 bg-white/40 p-8 rounded-[2rem] border border-[#e8dbb8]/40 shadow-sm">
                            <h2 className="text-3xl font-bold text-[#3a1216] mb-6 font-astrology">{t("directory.shubh_muhurat_in_2026")}</h2>
                            <div className="prose prose-stone max-w-none">
                                <p className="text-[#3a1216] leading-relaxed border-l-4 border-[#b8962e] pl-4 mb-6 font-astrology text-[19px]">
{t("directory._in_hinduism_referring_to_the")}
              </p>
                                <p className="text-[#3a1216] mb-6 font-medium text-[17px]">
{t("directory.firstly_know_about_some_shubh")}
              </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 mb-6">
                                    {(isExpanded ? categories : categories.slice(0, 9)).map((cat) =>
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setViewMode('category');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex items-center gap-3 text-rose-600 hover:text-rose-700 font-bold text-[15px] group text-left cursor-pointer transition-all">
                  
                                            <div className="w-1.5 h-1.5 rounded-full bg-rose-600 group-hover:scale-125 transition-transform" />
                                            <span className="border-b border-transparent group-hover:border-rose-600 transition-all">
                                                {cat.label} {t("directory.muhurat_2026")}
                  </span>
                                        </button>
                )}
                                </div>

                                {categories.length > 9 &&
              <div className="mb-8">
                                        <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2 text-[#b8962e] font-bold text-sm hover:underline">
                  
                                            {isExpanded ?
                   <>{t("directory.show_less_categories")}<ChevronUp className="w-4 h-4" /></> :

                  <>{t("directory.view_all")}{categories.length}{t("directory.categories")}<ChevronDown className="w-4 h-4" /></>
                  }
                                        </button>
                                    </div>
              }

                                <div className="space-y-10 mt-12 border-t border-[#e8dbb8]/40 pt-10">
                                    <section>
                                        <h3 className="text-2xl font-bold text-[#3a1216] mb-4 font-astrology">{t("directory.importance_of_auspicious_muhur")}</h3>
                                        <div className="space-y-4 text-[#3a1216] leading-relaxed text-[17px]">
                                            <p>
{t("directory.according_to_astrology_any_tas")}
                    </p>
                                            <p>
{t("directory.however_in_today_s_modern_time")}
                    </p>
                                        </div>
                                    </section>

                                    {/* Types and Nature of Shubh Muhurat */}
                                    <section className="border-t border-[#e8dbb8]/40 pt-10">
                                        <h3 className="text-2xl font-bold text-[#3a1216] mb-4 font-astrology">{t("directory.types_and_nature_of_shubh_muhu")}</h3>
                                        <div className="space-y-4 text-[#3a1216] leading-relaxed text-[17px] mb-6">
                                            <p>
{t("directory.before_going_ahead_with_shubh")}
                    </p>
                                        </div>
                                        <div className="flex md:hidden items-center justify-end mb-2 text-[11px] text-[#b8962e] font-bold uppercase tracking-wider animate-pulse opacity-80 max-w-3xl mx-auto">
                                            <span className="flex items-center gap-1">Swipe to view more <ChevronRight className="w-3 h-3" /></span>
                                        </div>
                                        <div className="max-w-3xl mx-auto overflow-x-auto rounded-2xl border-2 border-[#f0ddc0] shadow-md bg-white custom-scrollbar">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-gradient-to-r from-[#5c1420] to-[#8a1c2a] text-white border-b-2 border-[#d97706]">
                                                        <th className="p-4 text-[13px] font-black uppercase tracking-widest px-8 text-white">{t("directory.name_of_the_muhurat")}</th>
                                                        <th className="p-4 text-[13px] font-black uppercase tracking-widest px-8 text-right text-white">{t("directory.nature")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#f0ddc0]/60">
                                                    {MUHURAT_TYPES.map((m, i) =>
                        <tr key={i} className={`transition-colors hover:bg-[#fdf8f0] ${i % 2 === 0 ? 'bg-white' : 'bg-[#faf6ed]'}`}>
                                                            <td className="p-4 px-8 text-[15px] font-bold text-[#412a1e] font-astrology">{m.name}</td>
                                                            <td className="p-4 px-8 text-right">
                                                                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wide shadow-sm ${
                            m.nature === 'Extremely Auspicious' ?
                            'bg-emerald-600 text-white border border-emerald-700' :
                            m.nature.startsWith('Auspicious') ?
                            'bg-[#d97706] text-white border border-[#b46004]' :
                            'bg-[#8a1c2a] text-white border border-[#5c1420]'}`
                            }>
                                                                    {m.nature}
                                                                </span>
                                                            </td>
                                                        </tr>
                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                    {/* Tithi/Date Section */}
                                    <section className="border-t border-[#e8dbb8]/40 pt-10">
                                        <h3 className="text-2xl font-bold text-[#3a1216] mb-4 font-astrology">{t("directory.tithi_date")}</h3>
                                        <div className="space-y-4 text-[#3a1216] leading-relaxed text-[17px] mb-6">
                                            <p>
{t("directory.a_tithi_or_date_as_per_the_ved")}
                    </p>
                                        </div>
                                        <div className="flex md:hidden items-center justify-end mb-2 text-[11px] text-[#b8962e] font-bold uppercase tracking-wider animate-pulse opacity-80 max-w-4xl mx-auto">
                                            <span className="flex items-center gap-1">Swipe to view more <ChevronRight className="w-3 h-3" /></span>
                                        </div>
                                        <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border-2 border-[#f0ddc0] shadow-md bg-white">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-gradient-to-r from-[#5c1420] to-[#8a1c2a] text-white border-b-2 border-[#d97706]">
                                                        <th className="p-4 text-[13px] font-black uppercase tracking-widest px-8 w-1/2 border-r border-[#d97706]/30 text-white">{t("directory.dates_as_per_krishna_paksha")}</th>
                                                        <th className="p-4 text-[13px] font-black uppercase tracking-widest px-8 w-1/2 text-white">{t("directory.dates_as_per_shukla_paksha")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-[#faf6ed]">
                                                        <td className="p-6 align-top border-r border-[#f0ddc0]/60">
                                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                                                                {KRISHNA_PAKSHA_TITHIS.map((t, i) =>
                               <li key={i} className="flex items-center gap-3 text-[14px] font-bold text-[#412a1e] px-3 py-2 rounded-xl bg-white border border-[#f0ddc0] hover:border-[#d97706] hover:shadow-sm transition-all group cursor-default">
                                                                        <div className="w-2 h-2 rounded-full bg-[#8a1c2a] flex-shrink-0 group-hover:scale-125 transition-transform" />
                                                                        {t}
                                                                    </li>
                               )}
                                                            </ul>
                                                        </td>
                                                        <td className="p-6 align-top">
                                                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
                                                                {SHUKLA_PAKSHA_TITHIS.map((t, i) =>
                               <li key={i} className="flex items-center gap-3 text-[14px] font-bold text-[#412a1e] px-3 py-2 rounded-xl bg-white border border-[#f0ddc0] hover:border-[#d97706] hover:shadow-sm transition-all group cursor-default">
                                                                        <div className="w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 group-hover:scale-125 transition-transform" />
                                                                        {t}
                                                                    </li>
                               )}
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                    {/* Var/Day Section */}
                                    <section className="border-t border-[#e8dbb8]/40 pt-10">
                                        <h3 className="text-2xl font-bold text-[#3a1216] mb-4 font-astrology">{t("directory.var_day")}</h3>
                                        <div className="space-y-4 text-[#3a1216] leading-relaxed text-[17px] mb-4">
                                            <p>
{t("directory.according_to_the_panchang_ther")}
                    </p>
                                            <p>
{t("directory.each_of_these_days_has_its_own")}
                    </p>
                                            <p>
{t("directory.there_are_certain_days_of_the")}
                    </p>
                                        </div>
                                    </section>

                                    {/* Nakshatra Section */}
                                    <section className="border-t border-[#e8dbb8]/40 pt-10">
                                        <h3 className="text-2xl font-bold text-[#3a1216] mb-4 font-astrology">{t("directory.nakshatra")}</h3>
                                        <div className="space-y-4 text-[#3a1216] leading-relaxed text-[17px] mb-6">
                                            <p>
{t("directory.while_calculating_all_the_ausp")}
                    </p>
                                        </div>
                                        <h4 className="text-lg font-bold text-[#3a1216] mb-4">{t("directory.nakshatras_and_their_ruling_pl")}</h4>
                                        <div className="flex md:hidden items-center justify-end mb-2 text-[11px] text-[#b8962e] font-bold uppercase tracking-wider animate-pulse opacity-80 max-w-4xl mx-auto">
                                            <span className="flex items-center gap-1">Swipe to view more <ChevronRight className="w-3 h-3" /></span>
                                        </div>
                                        <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border-2 border-[#f0ddc0] shadow-md bg-white">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="bg-gradient-to-r from-[#5c1420] to-[#8a1c2a] text-white border-b-2 border-[#d97706]">
                                                        <th className="p-4 text-[13px] font-black uppercase tracking-widest px-6 border-r border-[#d97706]/30 text-white">{t("directory.ruling_planet")}</th>
                                                        <th className="p-4 text-[13px] font-black uppercase tracking-widest px-6 text-white">{t("directory.nakshatra_1")}</th>
                                                        <th className="p-4 text-[13px] font-black uppercase tracking-widest px-6 text-white">{t("directory.nakshatra_2")}</th>
                                                        <th className="p-4 text-[13px] font-black uppercase tracking-widest px-6 text-white">{t("directory.nakshatra_3")}</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-[#f0ddc0]/60">
                                                    {NAKSHATRA_RULING_PLANETS.map((row, i) =>
                        <tr key={i} className={`transition-colors hover:bg-[#fdf8f0] ${i % 2 === 0 ? 'bg-white' : 'bg-[#faf6ed]'}`}>
                                                            <td className="p-4 px-6 text-[15px] font-bold text-[#d97706] font-astrology border-r border-[#f0ddc0]/60">{row.planet}</td>
                                                            {row.nakshatras.map((n, j) =>
                          <td key={j} className="p-4 px-6 text-[15px] font-medium text-[#412a1e]">{n}</td>
                          )}
                                                        </tr>
                        )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </section>

                                </div>
                            </div>
                        </div>
                    </motion.div> :

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8">
          
                        {/* Navigation Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                            <button
              onClick={() => {
                setViewMode('overview');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group text-[#b8962e] font-bold text-sm hover:bg-[#b8962e]/5 px-4 py-2 rounded-full border border-[#b8962e]/20 transition-all active:scale-95">
              
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
{t("directory.back_to_2026_directory")}
            </button>

                            <button
              onClick={() => router.push(`/muhurat?cat=${selectedCategory}`)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#b8962e] text-white font-bold text-[13px] hover:shadow-md transition-all active:scale-95">
              
                                <Sparkles className="w-3.5 h-3.5" />
{t("directory.calculate_for_your_location")}
            </button>
                        </div>

                        {/* Category Header */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${categoryMeta.bg} ${categoryMeta.border} border shadow-sm`}>
                                    <categoryMeta.icon className={`w-6 h-6 ${categoryMeta.color}`} />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold text-[#3a1216] font-astrology">{categoryMeta.label} {t("directory.muhurat_2026")}</h1>
                                    <p className="text-[#3a1216] text-[15px] font-astrology">{t("directory.general_india_guide_ist_timing")}</p>
                                </div>
                            </div>
                            
                            <div className="bg-white/40 p-8 rounded-[2rem] border border-[#e8dbb8]/40 shadow-sm prose prose-stone max-w-none">
                                <h3 className="text-2xl font-bold text-[#3a1216] mb-4 font-astrology">{t("directory.importance_of")} {categoryMeta.label} {t("directory.muhurat")}</h3>
                                <div className="text-[#3a1216] leading-relaxed text-[17px]">
                                    <p>{t("directory.find_the_most_auspicious_dates")} {categoryMeta.label} {t("directory.in_2026_based_on_expert_vedic")}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tables List */}
                        <div className="space-y-4">
                            {MONTHS.map((month, idx) =>
            <MonthTable
              key={idx}
              monthIdx={idx}
              category={selectedCategory}
              location={activeLocation} />

            )}
                        </div>
                    </motion.div>
        }
            </div>
        </div>);

}

