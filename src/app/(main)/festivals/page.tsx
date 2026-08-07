'use client';
import { useTranslation } from '@/context/LanguageContext';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar as CalendarIcon, LayoutList, Loader2, TableProperties, Download } from 'lucide-react';
import { downloadAsPDF } from '@/lib/pdfGenerator';
import { festivalService } from '@/lib/festivalService';
import { Festival } from '@/lib/mockFestivals';
import FestivalCalendar from '@/components/festivals/FestivalCalendar';
import FestivalList from '@/components/festivals/FestivalList';
import FestivalMonthView from '@/components/festivals/FestivalMonthView';

export default function FestivalsHubPage() {
    const { t } = useTranslation();

  const [view, setView] = useState<'calendar' | 'list' | 'month'>('list');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  const MONTHS = ["All", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const filteredFestivals = selectedMonth === 'All' 
    ? festivals 
    : festivals.filter(f => f.month === selectedMonth);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const loadFestivals = async () => {
      try {
        const data = await festivalService.getAllFestivals();
        setFestivals(data);
      } catch (err) {
        console.error("Failed to fetch festivals", err);
      } finally {
        setLoading(false);
      }
    };
    loadFestivals();
  }, []);

  // Get the next major festival
  const today = new Date().toISOString().split('T')[0];
  const upcomingFestival = [...festivals].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).find((f) => f.date >= today);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fdfaf3' }}>
                <Loader2 className="w-10 h-10 animate-spin text-[#b8962e]" />
            </div>);

  }

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#fdfaf3' }}>
            <style jsx global>{`
                .festivals-wrap { font-family: 'Inter', sans-serif !important; }
            `}</style>

            <div className="max-w-6xl mx-auto pt-6 md:pt-10 festivals-wrap">
                {/* Header Sub-Nav & Titles */}
                <div className="text-center mb-10">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-center gap-2 text-[#b8962e] text-sm font-semibold mb-3 tracking-widest uppercase">
                        <Sparkles className="w-4 h-4" />
                        <span>{t("festivals.hindu_panchang_tithi")}</span>
                        <Sparkles className="w-4 h-4" />
                    </motion.div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("festivals.auspicious_festivals")}</h1>
                    <p className="text-gray-850 text-base max-w-2xl mx-auto font-medium leading-relaxed">
{t("festivals.discover_exact_dates_shubh_muh")}
          </p>
                </div>

                {/* Next Upcoming Festival Banner */}
                {upcomingFestival &&
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-12 border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 justify-between shadow-sm relative overflow-hidden"
          style={{ backgroundColor: `${upcomingFestival.color}08`, borderColor: `${upcomingFestival.color}30` }}>
          
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            {/* Abstract decorative element (lotus or mandala placeholder) */}
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke={upcomingFestival.color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>

                        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
                            <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: upcomingFestival.color }}>{t("festivals.upcoming_next")}</span>
                            <h2 className="text-3xl font-bold text-gray-900 mb-1">{upcomingFestival.name}</h2>
                            <p className="text-sm font-semibold text-gray-850">{new Date(upcomingFestival.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} • {upcomingFestival.tithi}</p>
                        </div>
                        <div className="relative z-10">
                            <a href={`/festivals/${upcomingFestival.slug}`} className="px-6 py-3 rounded-xl text-sm font-bold text-white transition-transform hover:scale-105 shadow-md flex items-center gap-2" style={{ backgroundColor: upcomingFestival.color }}>
{t("festivals.view_rituals_muhurat")}
            </a>
                        </div>
                    </motion.div>
        }

                {/* View Toggles & Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[#d6c89a]/50">
                    <h3 className="text-2xl font-bold text-gray-900">{t("festivals.2026_calendar")}</h3>
                    
                    <div className="inline-flex p-1 rounded-xl border border-[#d6c89a]/50 bg-white shadow-sm w-full sm:w-auto overflow-x-auto hide-scrollbar">
                        <button
              onClick={() => setView('month')}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'month' ? 'bg-[#b8962e] text-white shadow-sm' : 'text-gray-850 hover:text-gray-850 hover:bg-gray-50'}`}>
              
                            <TableProperties className="w-4 h-4" />{t("festivals.month")}
            </button>
                        <button
              onClick={() => setView('list')}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'list' ? 'bg-[#b8962e] text-white shadow-sm' : 'text-gray-850 hover:text-gray-850 hover:bg-gray-50'}`}>
              
                            <LayoutList className="w-4 h-4" />{t("festivals.cards")}
            </button>
                        <button
              onClick={() => setView('calendar')}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${view === 'calendar' ? 'bg-[#b8962e] text-white shadow-sm' : 'text-gray-850 hover:text-gray-850 hover:bg-gray-50'}`}>
              
                            <CalendarIcon className="w-4 h-4" />{t("festivals.calendar")}
            </button>
                    </div>
                </div>

                {/* Month Filter */}
                <div className="flex overflow-x-auto gap-2 pb-6 mb-2 hide-scrollbar w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {MONTHS.map(m => (
                        <button
                            key={m}
                            onClick={() => setSelectedMonth(m)}
                            className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                                selectedMonth === m 
                                ? 'bg-[#b8962e] text-white shadow-sm border border-[#b8962e]' 
                                : 'bg-white border border-[#d6c89a]/50 text-gray-850 hover:bg-[#fdfaf3]'
                            }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>

                {/* Active View Container */}
                <div className="min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {view === 'month' &&
            <motion.div
              key="month"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}>
              
                                <FestivalMonthView festivals={filteredFestivals} />
                            </motion.div>
            }
                        {view === 'list' &&
            <motion.div
              key="list"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}>
              
                                <FestivalList festivals={filteredFestivals} />
                            </motion.div>
            }
                        {view === 'calendar' &&
            <motion.div
              key="calendar"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}>
              
                                <FestivalCalendar 
                                    festivals={festivals} 
                                    selectedMonth={selectedMonth} 
                                    onMonthChange={setSelectedMonth} 
                                />
                            </motion.div>
            }
                    </AnimatePresence>
                </div>

            </div>
        </div>);

}