'use client';
import { useTranslation } from '@/context/LanguageContext';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Sparkles, ArrowRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export default function LearnAstrologyHub() {
    const { t } = useTranslation();

    const [lessons, setLessons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLessons();
    }, []);

    const fetchLessons = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/astrology/learning/lessons`);
            const data = await res.json();
            if (data.success) {
                setLessons(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch lessons:', err);
        } finally {
            setLoading(false);
        }
    };

    // Split lessons into columns for the table layout
    const col1 = lessons.filter((_, i) => i < Math.ceil(lessons.length / 2));
    const col2 = lessons.filter((_, i) => i >= Math.ceil(lessons.length / 2));

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
                            {t("learn.free_learning_series")}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] serif leading-tight">
                            {t("learn.how_to_learn_astrology")}
                        </h1>
                        <p className="text-[15px] text-gray-600 max-w-2xl mx-auto font-medium">
                            {t("learn.available_in_hindi_english")}
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
                            {t("learn.welcome_to_the_world_of")} <strong>{t("learn._no_cost_tutorial")}</strong> {t("learn.to_learn_astrology_it_means_yo")}
                            {" "}<em>{t("learn._how_to_learn_astrology")}</em> {t("learn._is_a_question_in_minds_of_tho")}
                        </p>
                        <p className="text-[16px] md:text-[17px] text-[#3a1216] leading-relaxed tracking-wide serif mt-6 text-justify">
                            {t("learn.here_you_can_learn_astrology_i")}
                        </p>
                    </motion.div>

                    {/* Lessons Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mb-12"
                    >
                        <h2 className="text-center text-xl font-bold text-gray-800 serif mb-8">
                            {t("learn._astrology_tutorials_by").replace('"', '').replace('"', '').trim()} <span className="text-[#b8962e]">{t("learn.vaidiktalk")}</span>
                        </h2>

                        {loading ? (
                            <div className="flex items-center justify-center py-16">
                                <div className="animate-pulse flex flex-col items-center gap-3">
                                    <BookOpen className="w-10 h-10 text-[#b8962e] opacity-30" />
                                    <span className="text-xs text-[#b8962e] uppercase tracking-widest font-semibold">{t("learn.loading_lessons")}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#e8dbb8]/80 rounded-xl overflow-hidden bg-white shadow-sm">
                                {/* Column 1 */}
                                <div className="md:border-r border-b md:border-b-0 border-[#e8dbb8]/50">
                                    {col1.map((lesson, idx) => (
                                        <Link
                                            key={lesson._id}
                                            href={`/learn/guides/${lesson.slug}`}
                                            className={`flex items-center gap-4 px-6 py-4 hover:bg-[#fdfaf3] transition-colors group ${idx < col1.length - 1 ? 'border-b border-[#e8dbb8]/40' : ''}`}
                                        >
                                            <span className="w-8 h-8 rounded-md bg-[#fdfaf3] border border-[#e8dbb8]/60 text-[#b8962e] font-bold text-[13px] flex items-center justify-center shrink-0 group-hover:bg-[#b8962e] group-hover:text-white transition-colors">
                                                {lesson.partNumber}
                                            </span>
                                            <span className="text-[14.5px] font-semibold text-gray-800 group-hover:text-[#b8962e] transition-colors serif flex-1">
                                                {lesson.title}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#b8962e] group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                                {/* Column 2 */}
                                <div>
                                    {col2.map((lesson, idx) => (
                                        <Link
                                            key={lesson._id}
                                            href={`/learn/guides/${lesson.slug}`}
                                            className={`flex items-center gap-4 px-6 py-4 hover:bg-[#fdfaf3] transition-colors group ${idx < col2.length - 1 ? 'border-b border-[#e8dbb8]/40' : ''}`}
                                        >
                                            <span className="w-8 h-8 rounded-md bg-[#fdfaf3] border border-[#e8dbb8]/60 text-[#b8962e] font-bold text-[13px] flex items-center justify-center shrink-0 group-hover:bg-[#b8962e] group-hover:text-white transition-colors">
                                                {lesson.partNumber}
                                            </span>
                                            <span className="text-[14.5px] font-semibold text-gray-800 group-hover:text-[#b8962e] transition-colors serif flex-1">
                                                {lesson.title}
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
                            {t("learn.this_tutorial_is_only_for_the")}
                        </p>
                        <p className="text-[16px] md:text-[17px] text-[#3a1216] leading-relaxed tracking-wide serif mt-6 text-justify">
                            {t("learn.here_in_given_series_you_ll_kn")}
                            {" "}<Link href="/learn/planets" className="text-[#b8962e] font-bold hover:underline">{t("learn.zodiac_signs")}</Link>{" "}
                            {t("learn._houses_and_about_role_of_othe")}
                        </p>
                    </motion.div>

                    {/* Planet Library Teaser */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link
                            href="/learn/planets"
                            className="group flex items-center justify-between bg-white rounded-2xl p-6 md:p-8 text-[#3a1216] hover:shadow-lg transition-all border border-[#e8dbb8]/60 hover:border-[#b8962e]/40"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-[#fdfaf3] border border-[#e8dbb8]/80 flex items-center justify-center group-hover:bg-[#b8962e]/10 transition-colors">
                                    <Globe className="w-6 h-6 text-[#b8962e]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold serif text-[#3a1216] group-hover:text-[#b8962e] transition-colors">{t("learn.explore_the_9_grahas")}</h3>
                                    <p className="text-[14px] text-gray-600 font-medium mt-1">{t("learn.detailed_profiles_of_all_nine")}</p>
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