'use client';
import { useTranslation } from '@/context/LanguageContext';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Sparkles,
  Wind,
  Flower2,
  Gem,
  AlertCircle,
  Clock,
  Zap,
  Circle
} from 'lucide-react';
import { motion } from 'framer-motion';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export default function HealingGuideDetail() {
  const { t } = useTranslation();
  const params = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchItem(params.slug as string);
    }
  }, [params.slug]);

  const fetchItem = async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/healing/item/${slug}`);
      const data = await res.json();
      if (data.success) {
        setItem(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch item:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-2 border-[#b8962e] border-t-transparent animate-spin" />
          <p className="text-[11px] font-bold uppercase text-[#b8962e] tracking-[0.3em]">Loading Guide</p>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#fafaf8] flex flex-col items-center justify-center p-6 text-center">
        <AlertCircle className="w-14 h-14 text-red-500 mb-5 opacity-70" />
        <h1 className="text-2xl font-bold text-[#3a1216] mb-2">Guide Not Found</h1>
        <p className="text-gray-600 mb-8 max-w-sm text-sm">This guide may have been archived or moved.</p>
        <Link href="/healing" className="inline-flex items-center gap-2 bg-[#b8962e] text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#967a26] transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to Healing Hub
        </Link>
      </div>
    );
  }

  const m = item.metadata || {};
  const typeLabel = item.type === 'meditation' ? 'Meditation' : item.type === 'yoga' ? 'Yoga' : 'Crystal Healing';
  const TypeIcon = item.type === 'meditation' ? Wind : item.type === 'yoga' ? Flower2 : Gem;

  const typeColors: Record<string, string> = {
    meditation: '#6366f1',
    yoga: '#10b981',
    crystal: '#b8962e',
  };
  const accentColor = typeColors[item.type] || '#b8962e';

  return (
    <div className="min-h-screen bg-[#fafaf8] selection:bg-[#b8962e]/20">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#fdf8ed] via-[#fdfaf3] to-[#fdf3e3] border-b border-[#e8dbb8]/60 overflow-hidden">
        {/* SVG dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#b8962e" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dots)" />
        </svg>

        {/* Mandala left */}
        <div className="absolute -left-16 top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.08] pointer-events-none">
          <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            {[140,105,70,40].map((r,i) => <circle key={i} cx="150" cy="150" r={r} stroke="#b8962e" strokeWidth="1"/>)}
            {[0,45,90,135,180,225,270,315].map((a,i) => (
              <line key={i} x1="150" y1="150"
                x2={150+145*Math.cos(a*Math.PI/180)} y2={150+145*Math.sin(a*Math.PI/180)}
                stroke="#b8962e" strokeWidth="0.5"/>
            ))}
          </svg>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-0 left-[20%] w-48 h-48 bg-[#b8962e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-[35%] w-32 h-32 bg-[#7A1F01]/8 rounded-full blur-2xl pointer-events-none" />

        {/* Floating symbols */}
        <div className="absolute top-8 left-[5%] text-[#b8962e]/15 text-5xl select-none pointer-events-none">☯</div>
        <div className="absolute bottom-6 left-[32%] text-[#b8962e]/10 text-3xl select-none pointer-events-none">✦</div>
        <div className="absolute top-12 right-[42%] text-[#b8962e]/10 text-2xl select-none pointer-events-none">❋</div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center">
            {/* Left text */}
            <div>
              <Link href="/healing" className="inline-flex items-center gap-2 text-[#3a1216] hover:text-[#b8962e] transition-colors text-sm font-medium mb-7 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Healing Hub
              </Link>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border"
                  style={{ borderColor: `${accentColor}50`, color: accentColor, backgroundColor: `${accentColor}12` }}>
                  <TypeIcon className="w-3 h-3" />
                  {typeLabel}
                </div>
                {m.sanskritName && (
                  <span className="text-[#3a1216] text-[11px] font-medium italic">· {m.sanskritName}</span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-[#3a1216] leading-tight mb-4 max-w-2xl">
                {item.title}
              </h1>

              {item.shortDescription && (
                <p className="text-[#3a1216] text-base leading-relaxed max-w-xl mb-6">
                  {item.shortDescription}
                </p>
              )}

              <div className="flex flex-wrap gap-2">
                {m.duration && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-600 uppercase tracking-wider shadow-sm">
                    <Clock className="w-3 h-3" /> {m.duration}
                  </span>
                )}
                {m.difficulty && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-600 uppercase tracking-wider shadow-sm">
                    <Zap className="w-3 h-3" /> {m.difficulty}
                  </span>
                )}
                {m.chakra && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-600 uppercase tracking-wider shadow-sm">
                    <Circle className="w-3 h-3" /> {m.chakra} Chakra
                  </span>
                )}
                {m.focus && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-[11px] font-semibold text-gray-600 uppercase tracking-wider shadow-sm">
                    Focus: {m.focus}
                  </span>
                )}
              </div>
            </div>

            {/* Right: Featured Image — fully visible */}
            {item.featuredImage && (
              <div className="hidden md:block w-[280px] shrink-0">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#e8dbb8]/60 h-[220px]">
                  <img
                    src={item.featuredImage}
                    alt={item.title}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10 items-start">

          {/* Main Article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="healing-content"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 space-y-5">

            {/* Benefits */}
            {m.benefits && m.benefits.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-[#3a1216] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#b8962e]" />
                  Key Benefits
                </h3>
                <ul className="space-y-2.5">
                  {m.benefits.map((benefit: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#3a1216]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8962e] mt-1.5 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Extra metadata */}
            {(m.element || m.color) && (
              <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                <h3 className="text-sm font-bold text-[#3a1216] uppercase tracking-wider mb-4">Details</h3>
                <div className="space-y-2">
                  {m.element && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#3a1216] font-medium">Element</span>
                      <span className="font-semibold text-[#3a1216]">{m.element}</span>
                    </div>
                  )}
                  {m.color && !m.color.startsWith('bg-') && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#3a1216] font-medium">Color</span>
                      <span className="font-semibold text-[#3a1216]">{m.color}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Back CTA */}
            <Link href="/healing" className="flex items-center gap-3 bg-[#0f0f0f] hover:bg-[#1a1a1a] transition-colors rounded-2xl px-5 py-4 text-white group">
              <BookOpen className="w-5 h-5 text-[#b8962e] shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Browse All</p>
                <p className="text-sm font-semibold">Return to Healing Hub</p>
              </div>
              <ArrowLeft className="w-4 h-4 ml-auto text-gray-500 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </aside>
        </div>
      </div>

      <style jsx global>{`
        .healing-content { word-break: break-word; overflow-wrap: break-word; font-size: 17px; line-height: 1.85; color: #3a1216; }
        .healing-content h1 { font-size: 1.75rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #3a1216; line-height: 1.2; }
        .healing-content h2 { font-size: 1.4rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; color: #3a1216; border-bottom: 2px solid #e8dbb8; padding-bottom: 0.6rem; line-height: 1.3; }
        .healing-content h3 { font-size: 1.15rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; color: #3a1216; line-height: 1.4; }
        .healing-content p { margin-bottom: 1.5rem; }
        .healing-content ul, .healing-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .healing-content li { margin-bottom: 0.6rem; }
        .healing-content blockquote { border-left: 3px solid #b8962e; padding: 1rem 1.5rem; margin: 2rem 0; background: #fdf6e3; border-radius: 0 12px 12px 0; color: #3a1216; font-style: italic; }
        .healing-content a { color: #b8962e; font-weight: 600; text-decoration: none; border-bottom: 1px solid #b8962e40; }
        .healing-content a:hover { color: #967a26; border-color: #967a26; }
        .healing-content strong { font-weight: 700; color: #3a1216; }
        .healing-content table { width: 100%; border-collapse: collapse; margin: 2rem 0; border-radius: 12px; border: 1px solid #e8dbb8; display: block; overflow-x: auto; }
        .healing-content th { background: #fdf6e3; padding: 12px 16px; font-weight: 700; font-size: 13px; color: #3a1216; border: 1px solid #e8dbb8; text-align: left; }
        .healing-content td { padding: 11px 16px; border: 1px solid #e8dbb8; font-size: 14px; color: #3a1216; }
        .healing-content tr:nth-child(even) td { background: #fdf9f0; }
        .healing-content img { max-width: 100% !important; height: auto !important; border-radius: 12px; margin: 2rem 0; border: 1px solid #e8dbb8; }
      `}</style>
    </div>
  );
}