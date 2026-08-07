'use client';
import { useTranslation } from '@/context/LanguageContext';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Globe, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export default function PlanetLibrary() {
    const { t } = useTranslation();

    const [planets, setPlanets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlanets();
    }, []);

    const fetchPlanets = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/astrology/learning/planets`);
            const data = await res.json();
            if (data.success) {
                // Sort by order field
                const sorted = data.data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
                setPlanets(sorted);
            }
        } catch (err) {
            console.error('Failed to fetch planets:', err);
        } finally {
            setLoading(false);
        }
    };

    // Split planets into columns for the table layout
    const col1 = planets.filter((_, i) => i < Math.ceil(planets.length / 2));
    const col2 = planets.filter((_, i) => i >= Math.ceil(planets.length / 2));

    return (
        <div className="min-h-screen bg-[#fdfaf3] pb-24">
            {/* Hero Header */}
            <div className="relative pt-12 pb-16 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] opacity-40 pointer-events-none" />
                
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-5 mb-14"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b8962e]/10 text-[#b8962e] text-[10px] font-bold uppercase tracking-widest">
                            <Sparkles className="w-3.5 h-3.5" />
                            {t("planets.graha_knowledge_center")}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] serif leading-tight">
                            {t("planets.the_celestial_library")}
                        </h1>
                        <p className="text-[15px] text-gray-600 max-w-2xl mx-auto font-medium opacity-90">
                            {t("planets._the_nine_planets_are_the_admi")}
                        </p>
                    </motion.div>

                    {/* Introduction Paragraph */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mb-14 px-2 sm:px-8"
                    >
                        <p className="text-[16px] md:text-[17px] text-[#3a1216] leading-relaxed tracking-wide serif text-justify">
                            {t("planets.in_vedic_astrology_the_nine_pl")} <strong>{t("planets._navagrahas")}</strong> {t("planets.are_not_just_celestial_bodies")}
                        </p>
                        <p className="text-[16px] md:text-[17px] text-[#3a1216] leading-relaxed tracking-wide serif mt-6 text-justify">
                            {t("planets.understanding_these_planets_is")}
                        </p>
                    </motion.div>

                    {/* Planets Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <h2 className="text-center text-xl font-bold text-gray-800 serif mb-8">
                            {t("planets._nine_pillars_of").replace('"', '').trim()} <span className="text-[#b8962e]">{t("planets.vedic_astrology")}</span>
                        </h2>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="animate-pulse flex flex-col items-center gap-3">
                                    <Globe className="w-10 h-10 text-[#b8962e] opacity-30" />
                                    <span className="text-xs text-[#b8962e] uppercase tracking-widest font-semibold">{t("planets.summoning_cosmic_data")}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#e8dbb8]/80 rounded-xl overflow-hidden bg-white shadow-sm">
                                {/* Column 1 */}
                                <div className="md:border-r border-b md:border-b-0 border-[#e8dbb8]/50">
                                    {col1.map((planet, idx) => (
                                        <Link
                                            key={planet._id}
                                            href={`/learn/planets/${planet.slug}`}
                                            className={`flex items-center gap-4 px-6 py-4 hover:bg-[#fdfaf3] transition-colors group ${idx < col1.length - 1 ? 'border-b border-[#e8dbb8]/40' : ''}`}
                                        >
                                            <span className="w-8 h-8 rounded-md bg-[#fdfaf3] border border-[#e8dbb8]/60 text-[#b8962e] font-bold text-[13px] flex items-center justify-center shrink-0 group-hover:bg-[#b8962e] group-hover:text-white transition-colors">
                                                {planet.order || idx + 1}
                                            </span>
                                            <span className="text-[14.5px] font-semibold text-gray-800 group-hover:text-[#b8962e] transition-colors serif flex-1">
                                                {planet.name}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#b8962e] group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                                {/* Column 2 */}
                                <div>
                                    {col2.map((planet, idx) => (
                                        <Link
                                            key={planet._id}
                                            href={`/learn/planets/${planet.slug}`}
                                            className={`flex items-center gap-4 px-6 py-4 hover:bg-[#fdfaf3] transition-colors group ${idx < col2.length - 1 ? 'border-b border-[#e8dbb8]/40' : ''}`}
                                        >
                                            <span className="w-8 h-8 rounded-md bg-[#fdfaf3] border border-[#e8dbb8]/60 text-[#b8962e] font-bold text-[13px] flex items-center justify-center shrink-0 group-hover:bg-[#b8962e] group-hover:text-white transition-colors">
                                                {planet.order || col1.length + idx + 1}
                                            </span>
                                            <span className="text-[14.5px] font-semibold text-gray-800 group-hover:text-[#b8962e] transition-colors serif flex-1">
                                                {planet.name}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#b8962e] group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Bottom Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-14 px-2 sm:px-8"
                    >
                        <p className="text-[16px] md:text-[17px] text-[#3a1216] leading-relaxed tracking-wide serif text-justify">
                            {t("planets.in_vedic_astrology_the_nine_pl")} <strong>{t("planets._navagrahas")}</strong> {t("planets.are_not_just_celestial_bodies")}
                        </p>
                        <p className="text-[16px] md:text-[17px] text-[#3a1216] leading-relaxed tracking-wide serif mt-6 text-justify">
                            {t("planets.understanding_the_planets_is_t")}
                        </p>
                    </motion.div>

                    {/* Back to Lessons Teaser */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            href="/learn"
                            className="group flex items-center justify-between bg-[#1a1a1a] rounded-xl p-6 md:p-8 text-white hover:bg-[#222] transition-colors border border-transparent hover:border-[#b8962e]/30"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-lg bg-[#b8962e]/10 border border-[#b8962e]/20 flex items-center justify-center group-hover:bg-[#b8962e]/20 transition-colors">
                                    <BookOpen className="w-6 h-6 text-[#b8962e]" />
                                </div>
                                <div className="text-left">
                                    <h3 className="text-xl font-bold serif text-[#e8dbb8]">{t("planets.back_to_astrology_lessons")}</h3>
                                    <p className="text-[13px] text-gray-400 font-medium mt-1">{t("planets.continue_your_sequential_learn")}</p>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-[#b8962e] group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}