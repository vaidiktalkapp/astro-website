'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wind, Sparkles, ArrowRight, Flower2, Gem, BookOpen, Clock, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

interface CategorySection {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  accentColor: string;
  bgColor: string;
  items: any[];
}

export default function HealingContent() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

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
      title: 'Meditation',
      subtitle: 'Breathing rituals & silent practices for mental clarity',
      icon: <Wind className="w-5 h-5" />,
      accentColor: '#6366f1',
      bgColor: '#eef2ff',
      items: items.filter(i => i.type === 'meditation'),
    },
    {
      id: 'yoga',
      title: 'Yoga',
      subtitle: 'Sacred body alignments from the Vedic tradition',
      icon: <Flower2 className="w-5 h-5" />,
      accentColor: '#10b981',
      bgColor: '#ecfdf5',
      items: items.filter(i => i.type === 'yoga'),
    },
    {
      id: 'crystal',
      title: 'Crystal Healing',
      subtitle: 'Vibrational energy of sacred gems & stones',
      icon: <Gem className="w-5 h-5" />,
      accentColor: '#b8962e',
      bgColor: '#fefce8',
      items: items.filter(i => i.type === 'crystal'),
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Guides' },
    { id: 'meditation', label: 'Meditation' },
    { id: 'yoga', label: 'Yoga' },
    { id: 'crystal', label: 'Crystal' },
  ];

  const visibleCategories = activeTab === 'all'
    ? categories
    : categories.filter(c => c.id === activeTab);

  return (
    <div className="min-h-screen bg-[#f8f8f6] font-['Inter']">

      {/* Hero */}
      <div className="relative bg-gradient-to-br from-[#fdf8ed] via-[#fdfaf3] to-[#fdf3e3] border-b border-[#e8dbb8]/60 overflow-hidden min-h-[260px] flex items-center">
        {/* Decorative Background SVG Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="healing-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1" fill="#b8962e" />
              <path d="M30 5 L30 55 M5 30 L55 30" stroke="#b8962e" strokeWidth="0.5" />
              <circle cx="30" cy="30" r="20" fill="none" stroke="#b8962e" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#healing-grid)" />
        </svg>

        {/* Large faint mandala - left */}
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.07] pointer-events-none">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="190" stroke="#b8962e" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" stroke="#b8962e" strokeWidth="1" />
            <circle cx="200" cy="200" r="110" stroke="#b8962e" strokeWidth="1" />
            <circle cx="200" cy="200" r="70" stroke="#b8962e" strokeWidth="1" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
              <line key={i} x1="200" y1="200"
                x2={200 + 190 * Math.cos(a * Math.PI / 180)}
                y2={200 + 190 * Math.sin(a * Math.PI / 180)}
                stroke="#b8962e" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        {/* Large faint mandala - right */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.07] pointer-events-none">
          <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="200" r="190" stroke="#b8962e" strokeWidth="1" />
            <circle cx="200" cy="200" r="150" stroke="#b8962e" strokeWidth="1" />
            <circle cx="200" cy="200" r="110" stroke="#b8962e" strokeWidth="1" />
            <circle cx="200" cy="200" r="70" stroke="#b8962e" strokeWidth="1" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
              <line key={i} x1="200" y1="200"
                x2={200 + 190 * Math.cos(a * Math.PI / 180)}
                y2={200 + 190 * Math.sin(a * Math.PI / 180)}
                stroke="#b8962e" strokeWidth="0.5" />
            ))}
          </svg>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-8 left-[15%] w-32 h-32 bg-[#b8962e]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-8 right-[15%] w-44 h-44 bg-[#7A1F01]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-[#b8962e]/8 rounded-full blur-3xl pointer-events-none" />

        {/* Floating spiritual symbols */}
        <div className="absolute top-6 left-[8%] text-[#b8962e]/20 text-5xl font-serif select-none pointer-events-none">☯</div>
        <div className="absolute bottom-6 right-[8%] text-[#b8962e]/20 text-4xl font-serif select-none pointer-events-none">✦</div>
        <div className="absolute top-10 right-[22%] text-[#b8962e]/15 text-3xl font-serif select-none pointer-events-none">❋</div>
        <div className="absolute bottom-10 left-[22%] text-[#b8962e]/15 text-3xl font-serif select-none pointer-events-none">✿</div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#b8962e]/10 border border-[#b8962e]/30 text-[#8a6e1d] text-[11px] font-bold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              Spiritual Wellness Journey
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#3a1216] tracking-tight leading-tight">
              Healing &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b8962e] to-[#7A1F01]">
                Wellness
              </span>
            </h1>
            <p className="text-[#3a1216] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Ancient Vedic practices for modern life — explore meditation, yoga, and crystal healing to restore balance.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto scrollbar-hide py-0.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-3 text-sm font-semibold border-b-2 transition-all ${activeTab === tab.id
                    ? 'border-[#b8962e] text-[#b8962e]'
                    : 'border-transparent text-[#3a1216] hover:text-[#b8962e]'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-14">

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#b8962e] border-t-transparent animate-spin" />
              <span className="text-[11px] text-[#b8962e] font-bold uppercase tracking-[0.3em]">Loading...</span>
            </div>
          </div>
        )}

        {!loading && visibleCategories.map((cat, catIdx) => (
          <motion.section
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: catIdx * 0.1 }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: cat.bgColor, color: cat.accentColor }}
                >
                  {cat.icon}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#3a1216]">{cat.title}</h2>
                  <p className="text-sm text-[#3a1216] mt-0.5">{cat.subtitle}</p>
                </div>
              </div>
              <div
                className="hidden sm:flex items-center gap-1 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg"
                style={{ color: cat.accentColor, backgroundColor: cat.bgColor }}
              >
                {cat.items.length} Guides
              </div>
            </div>

            {/* Cards Grid */}
            {cat.items.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.items.map((item, idx) => (
                  <Link
                    key={item._id}
                    href={`/healing/guides/${item.slug}`}
                    className="group bg-white rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Card Image */}
                    {item.featuredImage ? (
                      <div className="w-full h-44 overflow-hidden">
                        <img
                          src={item.featuredImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-full h-44 flex items-center justify-center"
                        style={{ backgroundColor: cat.bgColor }}
                      >
                        <div style={{ color: cat.accentColor, opacity: 0.4 }}>
                          {React.cloneElement(cat.icon as React.ReactElement<any>, { className: 'w-12 h-12' })}
                        </div>
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Type tag */}
                      <div
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider mb-3 w-fit px-2 py-1 rounded-md"
                        style={{ color: cat.accentColor, backgroundColor: cat.bgColor }}
                      >
                        {cat.icon}
                        {cat.title}
                      </div>

                      <h3 className="text-base font-bold text-[#3a1216] leading-snug group-hover:text-[#b8962e] transition-colors mb-2">
                        {item.title}
                      </h3>

                      {item.shortDescription && (
                        <p className="text-sm text-[#3a1216] leading-relaxed line-clamp-2 flex-1">
                          {item.shortDescription}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {item.metadata?.duration && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#3a1216] uppercase tracking-wider">
                              <Clock className="w-3 h-3" /> {item.metadata.duration}
                            </span>
                          )}
                          {item.metadata?.difficulty && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#3a1216] uppercase tracking-wider">
                              <Zap className="w-3 h-3" /> {item.metadata.difficulty}
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#3a1216] group-hover:text-[#b8962e] group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-14 text-center">
                <BookOpen className="w-8 h-8 text-[#3a1216]/20 mx-auto mb-3" />
                <p className="text-sm font-semibold text-[#3a1216]">Coming Soon</p>
                <p className="text-xs text-[#3a1216]/50 mt-1">New {cat.title} guides will appear here.</p>
              </div>
            )}
          </motion.section>
        ))}
      </div>
    </div>
  );
}
