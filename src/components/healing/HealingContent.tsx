'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wind, Sparkles, ArrowRight, Flower2, Gem, BookOpen, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface CategorySection {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ReactNode;
    items: any[];
}

export default function HealingContent() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/healing/items`);
            const data = await res.json();
            if (data.success) {
                setItems(data.data);
            }
        } catch (err) {
            console.error('Failed to fetch healing items:', err);
        } finally {
            setLoading(false);
        }
    };

    const categories: CategorySection[] = [
        {
            id: 'meditation',
            title: 'Meditation Guidance',
            subtitle: 'Silent journeys & breathing rituals for mental clarity',
            icon: <Wind className="w-6 h-6 text-[#b8962e]" />,
            items: items.filter(i => i.type === 'meditation'),
        },
        {
            id: 'yoga',
            title: 'Yoga Information',
            subtitle: 'Sacred body alignments from the Vedic tradition',
            icon: <Flower2 className="w-6 h-6 text-[#b8962e]" />,
            items: items.filter(i => i.type === 'yoga'),
        },
        {
            id: 'crystal',
            title: 'Crystal Healing Content',
            subtitle: 'Vibrational energy of sacred gems & stones',
            icon: <Gem className="w-6 h-6 text-[#b8962e]" />,
            items: items.filter(i => i.type === 'crystal'),
        },
    ];

    return (
        <div className="min-h-screen bg-[#fdfaf3] pb-24 font-['Inter']">
            <div className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] opacity-30 pointer-events-none" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#b8962e]/10 to-transparent blur-3xl rounded-full pointer-events-none opacity-50" />
                
                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-6 mb-20 relative"
                    >
                        <div className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#b8962e]/10 to-[#8a6e1d]/5 border border-[#b8962e]/30 shadow-sm">
                            <Sparkles className="w-4 h-4 text-[#b8962e]" />
                            <span className="text-[#8a6e1d] text-xs font-bold uppercase tracking-widest">Spiritual Wellness Journey</span>
                            <Sparkles className="w-4 h-4 text-[#b8962e]" />
                        </div>
                        <h1 className="relative text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Healing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8962e] to-[#7A1F01]">Wellness</span>
                        </h1>
                        <p className="relative text-lg md:text-xl text-gray-850 max-w-2xl mx-auto font-medium leading-relaxed">
                            Embark on a sacred journey of self-discovery through ancient Vedic practices, meditation, yoga, and crystal healing.
                        </p>
                    </motion.div>

                    {/* Loading */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="animate-pulse flex flex-col items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-[#b8962e]/10 flex items-center justify-center border border-[#b8962e]/20">
                                    <BookOpen className="w-8 h-8 text-[#b8962e]" />
                                </div>
                                <span className="text-sm text-[#b8962e] uppercase tracking-widest font-bold">Unlocking Sacred Knowledge...</span>
                            </div>
                        </div>
                    )}

                    {/* Category Sections */}
                    {!loading && categories.map((cat, catIdx) => (
                        <motion.div
                            key={cat.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIdx * 0.15 }}
                            className="mb-16"
                        >
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-[#e8dbb8]/50 flex items-center justify-center">
                                        {cat.icon}
                                    </div>
                                    {cat.title}
                                </h2>
                                <p className="text-gray-850 font-medium text-base">{cat.subtitle}</p>
                            </div>

                            {cat.items.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {cat.items.map((item, idx) => (
                                        <Link 
                                            key={item._id} 
                                            href={`/healing/guides/${item.slug}`}
                                            className="group relative bg-white rounded-2xl p-6 border border-[#e8dbb8]/50 hover:border-[#b8962e]/40 transition-all duration-300 flex flex-col h-full overflow-hidden"
                                        >
                                            {/* Decorative Background Element */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#b8962e]/5 to-transparent rounded-bl-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500" />
                                            
                                            <div className="flex items-start gap-4 mb-5 relative z-10">
                                                <div className="w-10 h-10 rounded-full bg-[#fdfaf3] border border-[#e8dbb8] text-[#b8962e] flex items-center justify-center font-bold text-sm shrink-0">
                                                    {idx + 1}
                                                </div>
                                                <div className="pt-0.5">
                                                    <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-[#b8962e] transition-colors">{item.title}</h3>
                                                    {item.metadata?.sanskritName && (
                                                        <p className="text-xs font-semibold text-[#b8962e] uppercase tracking-wider mt-1">{item.metadata.sanskritName}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-850 font-medium leading-relaxed line-clamp-3 mb-6 flex-grow relative z-10">
                                                {item.description || `Explore the ancient and divine practice of ${item.title}. Cultivate profound spiritual wellness and inner harmony.`}
                                            </p>

                                            <div className="mt-auto pt-5 border-t border-gray-100 flex flex-wrap gap-2 items-center justify-between relative z-10">
                                                <div className="flex flex-wrap gap-2">
                                                    {item.metadata?.duration && (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 text-[10px] font-semibold uppercase tracking-wider">
                                                            <Clock className="w-3 h-3 text-[#b8962e]" /> {item.metadata.duration}
                                                        </span>
                                                    )}
                                                    {item.metadata?.chakra && (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 text-gray-700 text-[10px] font-semibold uppercase tracking-wider">
                                                            <Sparkles className="w-3 h-3 text-[#b8962e]" /> {item.metadata.chakra}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#fdfaf3] transition-colors shrink-0">
                                                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#b8962e] transition-colors" />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="border border-[#e8dbb8] border-dashed rounded-2xl bg-white/40 py-12 text-center backdrop-blur-sm">
                                    <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 mb-4">
                                        <BookOpen className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <p className="text-base text-gray-900 font-semibold mb-1">More Wisdom Unfolding</p>
                                    <p className="text-[12px] text-gray-850 font-medium max-w-md mx-auto">{cat.subtitle}. New guides will be available here soon.</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
