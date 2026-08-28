'use client';

import { useTranslation } from '@/context/LanguageContext';



import React, { useState, useEffect, Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { motion, AnimatePresence } from 'framer-motion';

import {

  ArrowLeft, Sparkles, Calendar, Clock, Sun, Moon,

  Star, ChevronDown, ChevronUp, Heart, Briefcase, Home, Loader2 } from
'lucide-react';

import { toast } from 'react-hot-toast';

import { muhuratStorage } from '@/lib/muhuratStorage';



export const dynamic = 'force-dynamic';



const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';



const CATEGORY_META: Record<string, {label: string;icon: any;color: string;}> = {

  marriage: { label: 'Marriage Muhurat', icon: Heart, color: 'text-rose-500' },

  business: { label: 'Business Muhurat', icon: Briefcase, color: 'text-amber-600' },

  housewarming: { label: 'Housewarming Muhurat', icon: Home, color: 'text-emerald-600' }

};



function MuhuratCard({ date, index }: {date: any;index: number;}) {

    const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);



  const formattedDate = new Date(date.date).toLocaleDateString('en-IN', {

    year: 'numeric', month: 'long', day: 'numeric'

  });



  const dayName = new Date(date.date).toLocaleDateString('en-IN', { weekday: 'long' });

  const dayNum = new Date(date.date).getDate();

  const monthYear = new Date(date.date).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });



  return (

    <motion.div

      initial={{ opacity: 0, x: -20 }}

      animate={{ opacity: 1, x: 0 }}

      transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}

      className="group relative">

      <div className="flex flex-col md:flex-row">

        {/* Left: Giant Date Block */}

        <div className="relative flex-shrink-0 md:w-52 lg:w-60 flex flex-col items-center justify-center py-7 md:py-9 px-5 border-b md:border-b-0 md:border-r border-[#e8dbb8]/50 bg-[#fdfaf2]/60">

          <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-[#b8962e] mb-2">{dayName}</span>

          

          <span className="text-[5rem] md:text-[5.5rem] font-medium text-[#3a1216] leading-[0.85] tracking-tighter" style={{fontFamily: "'Outfit', sans-serif"}}>

            {String(dayNum).padStart(2, '0')}

          </span>

          

          <span className="text-[13px] font-medium text-[#3a1216]/80 tracking-widest uppercase mt-1">{monthYear}</span>



          {date.isFullDay && (

            <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />

          )}

        </div>



        {/* Right: All Details */}

        <div className="flex-1 min-w-0 p-5 md:p-7 lg:p-9 bg-white">

          {/* Panchang Pills Strip */}

          <div className="flex flex-wrap gap-2 mb-6">

            {[
              { label: 'Tithi', val: date.tithi },
              { label: 'Nakshatra', val: date.nakshatra },
              { label: 'Yoga', val: date.yoga },
              { label: 'Karana', val: date.karana }
            ].map((item, i) => (

              <div key={i} className="px-4 py-2.5 rounded-xl bg-[#fdfaf2] border border-[#f0e6d2] hover:border-[#b8962e]/30 hover:bg-[#fdfaf2] transition-all duration-300">

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8962e] block mb-1">{item.label}</span>

                <span className="text-[15px] font-semibold text-[#3a1216] capitalize leading-tight block max-w-[170px] truncate">{item.val.split('(')[0].trim()}</span>

              </div>

            ))}

            {date.paksha && (

              <div className="px-4 py-2.5 rounded-xl bg-[#fdfaf2] border border-[#f0e6d2] hover:border-[#b8962e]/30 hover:bg-[#fdfaf2] transition-all duration-300">

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8962e] block mb-1">Paksha</span>

                <span className="text-[15px] font-semibold text-[#3a1216] capitalize leading-tight block">{date.paksha}</span>

              </div>

            )}

          </div>



          {/* Timing Line */}

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] mb-6">

            <span className="flex items-center gap-2 text-[#3a1216] font-medium">

              <Sun className="w-3.5 h-3.5 text-amber-500/90" />

              {t("result.sunrise")} <span className="text-[#3a1216] font-semibold">{date.sun_rise}</span>

            </span>

            <span className="text-[#d6c89a] hidden sm:inline">·</span>

            <span className="flex items-center gap-2 text-[#3a1216] font-medium">

              <Moon className="w-3.5 h-3.5 text-indigo-500/90" />

              {t("result.sunset")} <span className="text-[#3a1216] font-semibold">{date.sun_set}</span>

            </span>

            {date.abhijit_muhurat && !['None', 'N/A'].includes(date.abhijit_muhurat) && (

              <>

                <span className="text-[#d6c89a] hidden sm:inline">·</span>

                <span className="flex items-center gap-2 text-[#b8962e] font-medium">

                  <Sparkles className="w-3.5 h-3.5 text-[#b8962e]" />

                  {t("result.abhijit_window")} <span className="text-[#b8962e] font-semibold">{date.abhijit_muhurat}</span>

                </span>

              </>

            )}

          </div>



          {/* AI Verdict — Blockquote */}

          {date.aiVerdict && (

            <div className="relative pl-5 mb-6 border-l-2 border-[#b8962e]/40">

              <span className="absolute -left-[6px] -top-0.5 text-4xl font-medium text-[#b8962e]/30 leading-none" style={{fontFamily: "'Outfit', sans-serif"}}>"</span>

              

              <p className="text-[10px] font-bold uppercase text-indigo-700 mb-1.5">{t("result.refined_astrological_pulse")}</p>

              <p className="text-[#3a1216] text-[15px] font-medium italic leading-relaxed" style={{fontFamily: "'Outfit', sans-serif"}}>

                {date.aiVerdict}

              </p>

            </div>

          )}



          {/* Bottom Bar */}

          <div className="flex items-center justify-between pt-4 border-t border-[#f0e6d2]">

            <button

              type="button"

              onClick={() => setExpanded(!expanded)}

              className="flex items-center gap-2 text-[12px] font-bold text-[#3a1216] hover:text-[#b8962e] transition-colors duration-300">

              {expanded ? 'Hide Rationale' : 'View Rationale'}

              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />

            </button>

            

            {date.isFullDay && (

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100">

                <Sun className="w-3 h-3 text-emerald-600" />

                <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-emerald-700">{t("result.full_day_auspiciousness")}</span>

              </div>

            )}

          </div>



          {/* Expandable */}

          <AnimatePresence>

            {expanded && (

              <motion.div

                initial={{ height: 0, opacity: 0 }}

                animate={{ height: 'auto', opacity: 1 }}

                exit={{ height: 0, opacity: 0 }}

                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}

                className="overflow-hidden">

                

                <div className="mt-5 pt-5 border-t border-[#f0e6d2] grid grid-cols-1 md:grid-cols-2 gap-7">

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-700 mb-3">{t("result.positive_yoga")}</p>

                    <div className="space-y-2.5">

                      {date.reasons_good?.map((r: string, i: number) => (

                        <div key={i} className="flex items-start gap-2.5">

                          <span className="text-emerald-500 text-[11px] mt-0.5">→</span>

                          <span className="text-[#3a1216] text-[13px] font-medium leading-relaxed">{r}</span>

                        </div>

                      ))}

                    </div>

                  </div>

                  <div>

                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-700 mb-3">{t("result.cautions")}</p>

                    <div className="space-y-2.5">

                      {date.rahu_kaal && date.rahu_kaal !== 'N/A' && (

                        <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">

                          <span className="text-amber-600 text-[11px] mt-0.5">!</span>

                          <div>

                            <p className="text-amber-800 text-[11px] font-bold">{t("result.rahu_kaal_window")}</p>

                            <p className="text-amber-800 text-[13px] font-medium">{date.rahu_kaal}</p>

                          </div>

                        </div>

                      )}

                      {(!date.reasons_bad || date.reasons_bad.length === 0) && (

                        <p className="text-[#3a1216] text-[12px] font-medium">{t("result.no_severe_afflictions")}</p>

                      )}

                    </div>

                  </div>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>

    </motion.div>

  );

}



function MuhuratMonthGrid({

  monthKey,

  allDates,

  location}: {monthKey: string;allDates: any[];location: {lat: number;lon: number;tzone: number;};}) {

  const [monthData, setMonthData] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);



  const [year, month] = monthKey.split('-').map(Number);

  const firstDayOfMonth = new Date(year, month - 1, 1);

  const lastDayOfMonth = new Date(year, month, 0).getDate();

  const startDay = firstDayOfMonth.getDay();

  const monthLabel = firstDayOfMonth.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });



  const prevMonthLastDate = new Date(year, month - 1, 0).getDate();

  const prevMonthDays = Array.from({ length: startDay }, (_, i) => prevMonthLastDate - startDay + i + 1);



  const nextMonthBlanks = (7 - (startDay + lastDayOfMonth) % 7) % 7;

  const nextMonthDays = Array.from({ length: nextMonthBlanks }, (_, i) => i + 1);



  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];



  useEffect(() => {

    const fetchMonthPanchang = async () => {

      setLoading(true);

      try {

        const response = await fetch(`${API_BASE}/astrology/calendar`, {

          method: 'POST',

          headers: { 'Content-Type': 'application/json' },

          body: JSON.stringify({

            year,

            month,

            lat: location.lat,

            lon: location.lon,

            tzone: location.tzone

          })

        });

        const result = await response.json();

        if (result.success) setMonthData(result.data);

      } catch (error) {

        console.error('Failed to fetch background panchang:', error);

      } finally {

        setLoading(false);

      }

    };



    fetchMonthPanchang();

  }, [monthKey, location.lat, location.lon, location.tzone, month, year]);



  return (

    <div className="overflow-hidden">

      <div className="flex items-center justify-between px-1 mb-3">

        <h3 className="text-[13px] font-bold text-[#3a1216]/90 tracking-wide" style={{fontFamily: "'Outfit', sans-serif"}}>{monthLabel}</h3>

        {loading ? <Loader2 className="w-3 h-3 animate-spin text-[#b8962e]" /> : null}

      </div>



      <div className="grid grid-cols-7 mb-1">

        {WEEKDAYS.map((wd) =>

          <div key={wd} className="py-2 text-center text-[9px] font-bold text-[#b8962e] uppercase tracking-[0.2em]">

            {wd}

          </div>

        )}

      </div>



      <div className="grid grid-cols-7 gap-1">

        {prevMonthDays.map((d) =>

          <div key={`prev-${d}`} className="aspect-square flex items-start justify-end p-2 opacity-40">

            <span className="text-[12px] md:text-[14px] text-[#3a1216]/80 font-medium">{d}</span>

          </div>

        )}



        {Array.from({ length: lastDayOfMonth }).map((_, i) => {

          const day = i + 1;

          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

          const searchInfo = allDates.find((d) => d.date.startsWith(dateStr));

          const baseInfo = monthData.find((d) => d.date === dateStr);

          const isAuspicious = !!searchInfo?.is_auspicious;



          return (

            <div

              key={dateStr}

              className={`aspect-square relative flex flex-col items-center justify-between p-2 rounded-xl transition-all duration-200 border ${

                isAuspicious 

                  ? 'bg-emerald-50/60 border-transparent' 

                  : 'border-transparent hover:border-[#e8dbb8]/60 hover:bg-[#fdfaf2]'

              }`}>

              

              <span className={`text-[12px] md:text-[14px] self-end ${isAuspicious ? 'text-emerald-700 font-bold' : 'text-[#3a1216] font-medium'}`}>

                {day}

              </span>



              <div className="text-center leading-tight w-full mt-auto">

                <div 

                  className="text-[8px] md:text-[10px] font-medium truncate text-[#3a1216]/70 cursor-help"

                  title={(searchInfo?.tithi || baseInfo?.tithi || '').split('(')[0]}

                >

                  {(searchInfo?.tithi || baseInfo?.tithi || '').split('(')[0]}

                </div>

              </div>



              {isAuspicious && (

                <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-500" />

              )}

            </div>);

        })}



        {nextMonthDays.map((d) =>

          <div key={`next-${d}`} className="aspect-square flex items-start justify-end p-2 opacity-40">

            <span className="text-[12px] md:text-[14px] text-[#3a1216]/80 font-medium">{d}</span>

          </div>

        )}

      </div>

    </div>);

}



function MuhuratCalendar({ allDates, metadata }: {allDates: any[];metadata?: any;}) {

    const { t } = useTranslation();

  if (!allDates || allDates.length === 0) return null;



  const monthsSet = new Set<string>();

  allDates.forEach((d) => monthsSet.add(d.date.substring(0, 7)));

  const sortedMonths = Array.from(monthsSet).sort();



  const location = {

    lat: metadata?.location?.lat || 28.6139,

    lon: metadata?.location?.lon || 77.2090,

    tzone: metadata?.tzone || 5.5

  };



  return (

    <div className="space-y-12">

      <div className="flex flex-wrap items-center gap-6 pb-5 border-b border-[#e8dbb8]/40">

        <div className="flex items-center gap-2">

          <div className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />

          <span className="text-[10px] font-bold tracking-[0.2em] text-[#3a1216]/80 uppercase">{t("result.perfect_alignment")}</span>

        </div>

        <div className="flex items-center gap-2">

          <div className="w-2 h-2 rounded-full bg-[#e8dbb8]/60" />

          <span className="text-[10px] font-bold tracking-[0.2em] text-[#3a1216]/80 uppercase">{t("result.regular_day")}</span>

        </div>

        <div className="flex items-center gap-2">

          <Sparkles className="w-3 h-3 text-indigo-400/50" />

          <span className="text-[10px] font-bold tracking-[0.2em] text-[#3a1216]/80 uppercase">{t("result.divine_insight_available")}</span>

        </div>

      </div>



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

        {sortedMonths.map((monthKey) =>

          <MuhuratMonthGrid

            key={monthKey}

            monthKey={monthKey}

            allDates={allDates}

            location={location} />

        )}

      </div>

    </div>);

}



export default function MuhuratResultPage() {

  return (

    <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#fdf6e3' }} />}>

      <MuhuratResultContent />

    </Suspense>);

}



function MuhuratResultContent() {

    const { t } = useTranslation();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [result, setResult] = useState<any>(null);

  const [input, setInput] = useState<any>(null);

  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const [mounted, setMounted] = useState(false);



  useEffect(() => {

    setMounted(true);

    const stored = localStorage.getItem('muhurat_input');

    if (!stored) {

      router.push('/muhurat');

      return;

    }

    const parsed = JSON.parse(stored);

    setInput(parsed);



    fetch(`${API_BASE}/astrology/muhurat`, {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({

        category: parsed.category,

        startDate: parsed.startDate,

        endDate: parsed.endDate,

        lat: parsed.lat,

        lon: parsed.lon,

        tzone: parsed.tzone

      })

    }).

    then((res) => res.json()).

    then((data) => {

      if (data.success) {

        setResult(data.data);

        muhuratStorage.saveHistory({

          category: parsed.category,

          startDate: parsed.startDate,

          endDate: parsed.endDate,

          lat: parsed.lat,

          lon: parsed.lon,

          tzone: parsed.tzone,

          place: parsed.place

        });

      } else {

        setError(data.message || 'Calculation failed');

        toast.error('Failed to calculate muhurat');

      }

    }).

    catch((err) => {

      setError(err.message || 'Network error');

      toast.error('Could not connect to server');

    }).

    finally(() => setLoading(false));

  }, [router]);



  const categoryMeta = CATEGORY_META[input?.category || 'marriage'];

  const CatIcon = categoryMeta?.icon || Sparkles;



  if (!mounted) return <div className="min-h-screen pt-8 pb-16 px-4 sm:px-6" style={{ backgroundColor: '#fdf6e3' }} />;



  return (

    <div className="min-h-screen relative" style={{ backgroundColor: '#fdf6e3' }}>

      <style dangerouslySetInnerHTML={{ __html: `

        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700&family=Inter:wght@300;400;500&display=swap');

        .mr-wrap * { font-family: 'Inter', sans-serif; }

        .mr-wrap h1, .mr-wrap h2, .mr-wrap h3, .mr-wrap .serif { font-family: 'Outfit', sans-serif; }

        .anim-pulse { animation: pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }

        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }

      ` }} />



      <div className="max-w-6xl mx-auto mr-wrap relative z-10 pt-3 pb-20 px-5 sm:px-8">



        {/* Top Bar */}

        <div className="flex items-center justify-between mb-6 md:mb-8">

          <button

            onClick={() => router.push('/muhurat')}

            className="flex items-center gap-2 text-[#b8962e] hover:text-[#b8962e] text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300">

            <ArrowLeft className="w-3 h-3" />

            {t("result.modify_search_criteria")}

          </button>



          <div className="flex items-center gap-2 text-[#3a1216]/80 text-[10px] font-bold uppercase tracking-[0.25em]">

            <CatIcon className={`w-3 h-3 ${categoryMeta?.color}`} />

            {categoryMeta?.label || 'Muhurat'} · 2026

          </div>

        </div>



        <div className="text-center mb-4 md:mb-6">

          <h1 className="text-3xl md:text-6xl font-medium text-[#3a1216] tracking-tight inline-block" style={{fontFamily: "'Outfit', sans-serif"}}>

            {t("result.auspicious_dates_found")}

          </h1>

          

          {input?.place && (

            <p className="text-[#3a1216]/80 text-[13px] font-normal mt-2">

              {t("result.calculated_for_celestial_align")} <span className="text-[#3a1216]/80 font-medium">{input.place}</span>

            </p>

          )}

        </div>



        {/* Loading */}

        {loading && (

          <div className="flex flex-col items-center justify-center py-36">

            <Loader2 className="w-7 h-7 text-[#b8962e] animate-spin mb-5" />

            <p className="text-[#3a1216]/80 text-sm font-medium" style={{fontFamily: "'Outfit', sans-serif"}}>{t("result.scanning_panchang_data")}</p>

            <p className="text-[#b8962e] font-bold anim-pulse uppercase tracking-[0.3em] text-[9px] mt-2.5">{t("result.identifying_auspicious_moments")}</p>

          </div>

        )}



        {/* Error */}

        {error && !loading && (

          <div className="max-w-lg mx-auto text-center py-20">

            <div className="w-11 h-11 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-7">

              <Star className="w-5 h-5 text-rose-400/60" />

            </div>

            <h2 className="text-xl font-semibold text-[#3a1216] mb-3 tracking-tight" style={{fontFamily: "'Outfit', sans-serif"}}>{t("result.calculation_notice")}</h2>

            <p className="text-[#3a1216]/80 text-sm font-normal mb-9 leading-relaxed">{error}</p>

            <button

              onClick={() => router.push('/muhurat')}

              className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b8962e] hover:text-[#b8962e] border-b border-[#b8962e]/15 hover:border-[#b8962e]/40 pb-0.5 transition-all duration-300">

              {t("result.try_different_parameters")} →

            </button>

          </div>

        )}



        {/* Results */}

        {result && !loading && (

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>

            

            {/* Stats + Toggle — Centered Stats */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-5 pb-5 border-b border-[#e8dbb8]/40">

              <div className="hidden md:block"></div>

              <div className="flex items-center justify-center gap-12 md:gap-20 w-full">

                <div className="flex flex-col items-center justify-center">

                  <span className="text-4xl md:text-5xl font-bold text-[#3a1216] tracking-tight leading-none mb-1.5" style={{fontFamily: "'Outfit', sans-serif"}}>{result.summary?.total_scanned || 0}</span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#3a1216]/80 text-center whitespace-nowrap leading-tight">{t("result.days_analyzed")}</span>

                </div>

                <div className="w-px h-10 bg-[#e8dbb8]/60" />

                <div className="flex flex-col items-center justify-center">

                  <span className="text-4xl md:text-5xl font-bold text-emerald-700 tracking-tight leading-none mb-1.5" style={{fontFamily: "'Outfit', sans-serif"}}>{result.summary?.total_auspicious || 0}</span>

                  <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-600/90 text-center whitespace-nowrap leading-tight">{t("result.auspicious_dates")}</span>

                </div>

              </div>



              <div className="flex justify-center md:justify-end">

                <div className="flex items-center bg-[#fdfaf2] rounded-lg p-0.5 border border-[#f0e6d2]">

                  <button

                    type="button"

                    onClick={() => setViewMode('list')}

                    className={`px-5 py-2 rounded-md text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${

                      viewMode === 'list' 

                        ? 'bg-white text-[#3a1216] shadow-sm' 

                        : 'text-[#3a1216]/80 hover:text-[#3a1216]/80'}`}>

                    {t("result.list_view")}

                  </button>

                  <button

                    type="button"

                    onClick={() => setViewMode('calendar')}

                    className={`px-5 py-2 rounded-md text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-200 ${

                      viewMode === 'calendar' 

                        ? 'bg-white text-[#3a1216] shadow-sm' 

                        : 'text-[#3a1216]/80 hover:text-[#3a1216]/80'}`}>

                    {t("result.grid_view")}

                  </button>

                </div>

              </div>

            </div>



            {/* List View */}

            {viewMode === 'list' ?

              <div className="flex flex-col gap-6">

                {result.auspicious_dates?.length > 0 ?

                  result.auspicious_dates.map((d: any, i: number) => (

                    <div key={d.date} className="rounded-3xl overflow-hidden border border-[#e8dbb8]/60 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)] bg-white/60">

                      <MuhuratCard date={d} index={i} />

                    </div>

                  )) :



                  <div className="text-center py-24 px-6 bg-white">

                    <Sparkles className="w-7 h-7 text-[#b8962e] mx-auto mb-7" />

                    <h3 className="text-xl font-semibold text-[#3a1216]/90 mb-2.5 tracking-tight" style={{fontFamily: "'Outfit', sans-serif"}}>{t("result.celestial_silence")}</h3>

                    <p className="text-[#3a1216]/80 text-sm font-normal mb-9 max-w-xs mx-auto leading-relaxed">

                      {t("result.no_ideal_celestial_alignments")}

                    </p>

                    <button

                      onClick={() => router.push('/muhurat')}

                      className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b8962e] hover:text-[#b8962e] border-b border-[#b8962e]/15 hover:border-[#b8962e]/40 pb-0.5 transition-all duration-300">

                      {t("result.adjust_search_parameters")} →

                    </button>

                  </div>

                }

              </div> :



              /* Calendar View */

              <div className="rounded-2xl border border-[#e8dbb8]/50 bg-white/60 p-8 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.04)]">

                <MuhuratCalendar allDates={result.all_dates || []} metadata={result.metadata} />

              </div>

            }

          </motion.div>

        )}

      </div>

    </div>);

}