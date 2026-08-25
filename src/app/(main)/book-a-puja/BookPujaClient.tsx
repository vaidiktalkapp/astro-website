'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { ShieldCheck, UserCheck, Leaf, Lock, Sparkles, Star, ChevronDown, Clock, Search, Flame, SlidersHorizontal, X } from 'lucide-react';
import { getImageUrl } from '@/lib/imageUtils';

// Carousel pujas are now fetched dynamically from the admin panel

function PujaCarousel({ items = [] }: { items?: any[] }) {
  const [active, setActive] = React.useState(0);
  const total = items.length;

  if (total === 0) return null; // Safe guard for empty items

  const CARD_W = 520;
  const CARD_H = 410;
  const OFFSET = 480; // Adjusted for smaller scale

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
    const t = setInterval(() => setActive(p => (p + 1) % total), 4000);
    return () => clearInterval(t);
  }, [total]);

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: 460, width: '100%', userSelect: 'none', position: 'relative', overflow: 'visible', marginTop: '-70px' }}>
      <div style={{
        position: 'relative',
        width: '140%', // Makes container wider than the flex column so side cards aren't clipped
        height: CARD_H + 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0px, black 60px, black calc(100% - 60px), transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0px, black 60px, black calc(100% - 60px), transparent 100%)',
      }}>
        {items.map((puja, idx) => {
          const diff = ((idx - active) % total + total) % total;
          const isCenter = diff === 0;
          const isRight = diff === 1;
          const isLeft = diff === total - 1;
          const isFarRight = diff === 2;
          const isFarLeft = diff === total - 2;

          let zIndex = 5, opacity = 0, translateX = 0, scale = 0.72;

          if (isCenter) { zIndex = 30; opacity = 1; translateX = 0; scale = 1; }
          else if (isRight) { zIndex = 20; opacity = 0.85; translateX = OFFSET; }
          else if (isLeft) { zIndex = 20; opacity = 0.85; translateX = -OFFSET; }
          else if (isFarRight) { zIndex = 10; opacity = 0; translateX = OFFSET * 2; }
          else if (isFarLeft) { zIndex = 10; opacity = 0; translateX = -OFFSET * 2; }
          else {
            // completely invisible and out of bounds
            zIndex = 5; opacity = 0;
            // position it on the side it's about to come from to avoid flying across screen
            translateX = diff > total / 2 ? -OFFSET * 2.5 : OFFSET * 2.5;
          }

          // Disable transition on initial load or when moving completely offscreen
          const hasTransition = isMounted && (opacity > 0 || isFarRight || isFarLeft);

          return (
            <div
              key={idx}
              onClick={() => { if (!isCenter) setActive(idx); }}
              style={{
                position: 'absolute',
                borderRadius: 14,
                overflow: 'hidden',
                cursor: isCenter ? 'default' : 'pointer',
                transition: hasTransition ? 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.8s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                boxShadow: isCenter ? '0 10px 25px rgba(0,0,0,0.08)' : 'none',
                backgroundColor: '#341111ff', // Dark background to prevent white flash before image loads
                backgroundImage: 'url(/vaidiktalklogo.webp)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '150px',
                width: CARD_W,
                height: CARD_H,
                zIndex,
                opacity,
                transform: `translateX(${translateX}px) scale(${scale})`,
                pointerEvents: opacity === 0 ? 'none' : 'auto',
              }}
            >
              <img
                src={puja.img}
                alt={puja.title}
                loading={isCenter ? "eager" : "lazy"}
                fetchPriority={isCenter ? "high" : "auto"}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
              {/* Brand Logo Top Right */}
              <div className="absolute top-0 right-0 z-20 bg-white px-3 py-2 rounded-bl-[12px] flex items-center shadow-sm border-l border-b border-gray-100">
                <img src="/Vaidik-talk1.webp" alt="Vaidik Talk" className="h-[22px] object-contain" />
              </div>

              {/* Dark gradient for text visibility (only on center card) */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
                opacity: isCenter ? 1 : 0,
                transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                zIndex: 2
              }} />

              {/* Full card clickable link when centered */}
              {isCenter && (
                <Link
                  href={puja.link}
                  style={{ position: 'absolute', inset: 0, zIndex: 10 }}
                  onClick={(e) => e.stopPropagation()}
                />
              )}

              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px',
                opacity: isCenter ? 1 : 0,
                transition: 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1)',
                pointerEvents: 'none',
                zIndex: 3
              }}>
                <p style={{ color: '#fff', fontWeight: 800, fontSize: 22, lineHeight: 1.3, margin: 0, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{puja.title}</p>
                <p style={{ color: '#f5d08b', fontSize: 15, margin: '4px 0 0', fontWeight: 500, textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{puja.subtitle}</p>
                <div style={{ display: 'inline-block', marginTop: 14, background: '#d97706', color: '#fff', fontSize: 14, fontWeight: 700, padding: '10px 22px', borderRadius: 99, boxShadow: '0 4px 10px rgba(217, 119, 6, 0.3)' }}>
                  Book Now →
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 14, maxWidth: '80%' }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              borderRadius: 99, border: 'none', cursor: 'pointer',
              transition: 'all 0.3s', padding: 0,
              width: i === active ? 24 : 8,
              height: 8,
              background: i === active ? '#d97706' : 'rgba(212,175,55,0.4)',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function BookAPujaPage({ initialDynamicData = null, initialDynamicPujas = [] }: { initialDynamicData?: any, initialDynamicPujas?: any[] }) {
  const [dynamicData, setDynamicData] = useState<any>(initialDynamicData);
  const [dynamicPujas, setDynamicPujas] = useState<any[]>(initialDynamicPujas);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilterTab, setActiveFilterTab] = useState<'pujaFor' | 'benefits' | 'deity'>('pujaFor');
  const [filters, setFilters] = useState({
    pujaFor: [] as string[],
    benefits: [] as string[],
    deity: [] as string[]
  });


  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = prev[category];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };

  const clearFilters = () => {
    setFilters({ pujaFor: [], benefits: [], deity: [] });
  };

  // Format and sort dynamic pujas
  const allPujas = [...dynamicPujas]
    .filter(p => p.slug !== 'book-a-puja')
    .sort((a, b) => {
      // 1. Popular pujas always come first
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;

      // 2. New pujas come at the bottom (sort by createdAt ascending)
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();
      return dateA - dateB;
    })
    .map(puja => ({
      id: puja.slug,
      title: puja.title,
      desc: puja.shortDesc,
      image: puja.image ? (puja.image.startsWith('/pooja') ? puja.image : getImageUrl(puja.image, puja.title)) : '/pooja/Rudraabhishek.webp',
      link: `/book-a-puja/${puja.slug}`,
      popular: puja.popular || false,
      price: puja.price || 1599,
      discountedPrice: puja.discountedPrice,
      duration: puja.duration || '2-3 Hours',
      rating: puja.rating || '4.9',
      reviews: puja.reviews || '245',
      benefits: puja.benefits && puja.benefits.length ? puja.benefits : ['Health', 'Career', 'Remove Obstacles'],
      category: puja.category, // Automatically passed from Admin DB if exists
      deity: puja.deity // Automatically passed from Admin DB if exists
    }));

  const FILTER_OPTIONS = React.useMemo(() => {
    const benefitsSet = new Set<string>();
    const deitySet = new Set<string>();
    const pujaForSet = new Set<string>();

    allPujas.forEach(p => {
      if (p.benefits && Array.isArray(p.benefits)) {
        p.benefits.forEach((b: string) => benefitsSet.add(b.trim()));
      }
      if (p.category) pujaForSet.add(p.category);
      if (p.deity) deitySet.add(p.deity);
    });

    const dynamicBenefits = Array.from(benefitsSet);
    const dynamicPujaFor = Array.from(pujaForSet);
    const dynamicDeity = Array.from(deitySet);

    return {
      pujaFor: dynamicPujaFor.length > 0 ? dynamicPujaFor : ['Health & Protection', 'Wealth & Prosperity', 'Job & Career', 'Business Growth', 'Love & Marriage', 'Peace & Harmony', 'Dosh Nivaran'],
      benefits: dynamicBenefits.length > 0 ? dynamicBenefits : ['Health', 'Career', 'Remove Obstacles', 'Wealth', 'Success', 'Peace'],
      deity: dynamicDeity.length > 0 ? dynamicDeity : ['Shiva', 'Vishnu', 'Hanuman', 'Ganesha', 'Navagraha', 'Durga', 'Laxmi', 'Ram', 'Krishna']
    };
  }, [allPujas]);

  const filteredPujas = allPujas.filter(puja => {
    const matchesSearch = puja.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (puja.desc && puja.desc.toLowerCase().includes(searchQuery.toLowerCase()));

    const titleLower = puja.title.toLowerCase();
    const descLower = puja.desc ? puja.desc.toLowerCase() : '';
    const benefitsString = (puja.benefits || []).join(' ').toLowerCase();

    const checkMatch = (filterArr: string[]) => {
      if (filterArr.length === 0) return true;
      return filterArr.some(f => {
        const term = f.toLowerCase().replace(' & ', ' ');
        return titleLower.includes(term.split(' ')[0]) || descLower.includes(term.split(' ')[0]) || benefitsString.includes(term.split(' ')[0]);
      });
    };

    const matchesPujaFor = checkMatch(filters.pujaFor);
    const matchesBenefits = checkMatch(filters.benefits);
    const matchesDeity = checkMatch(filters.deity);

    return matchesSearch && matchesPujaFor && matchesBenefits && matchesDeity;
  });

  // Use only dynamic pujas from the admin panel
  const carouselItems = allPujas.map(p => ({
    title: p.title,
    subtitle: (p.benefits && p.benefits.length > 0) ? p.benefits.slice(0, 2).join(' & ') : 'Book Now',
    img: p.image,
    link: p.link
  }));

  return (
    <div className="w-full bg-transparent font-sans">

      {/* 1. HERO SECTION - Split Layout with Carousel */}
      <style>{`
        @keyframes carouselFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .carousel-card { transition: all 0.5s cubic-bezier(0.4,0,0.2,1); }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>

      <div className="relative w-full bg-[#fdfaf7] border-b border-[#f0ddc0] overflow-hidden">
        {/* Subtle bg pattern */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #f5e6c8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fce4d4 0%, transparent 40%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-4 md:py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-850 mb-6 md:mb-8">
            <Link href="/" className="hover:text-[#d97706] transition-colors">Home</Link>
            <span className="text-[#d4af37]">›</span>
            <span className="text-[#d97706] font-semibold">Puja</span>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-2">
            {/* LEFT - Text */}
            <div className="w-full lg:w-[45%] flex-shrink-0 pr-2 md:pr-4 lg:pr-12 xl:pr-16 -mt-12 relative z-20">
              <h1 className="premium-serif text-3xl md:text-[36px] lg:text-[42px] font-bold leading-[1.2] mb-5 break-words">
                <span className="text-[#d97706]">{dynamicData?.landingHeading1 || 'Book Vedic Pujas'}</span>
                <br />
                <span className="text-[#5c1a1f]">{dynamicData?.landingHeading2 || 'Performed in Your'}</span>
                <br />
                <span className="text-[#5c1a1f]">{dynamicData?.landingHeading3 || 'Name & Gotra'}</span>
              </h1>
              <div className="text-[#412a1e] text-sm md:text-base leading-relaxed mb-8 font-medium max-w-xl whitespace-pre-line">
                {dynamicData?.landingDesc || 'Authentic rituals by verified Pandits — \nsankalp recited aloud with your name, \nwherever you are in the world.'}
              </div>

              {/* Trust row */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex -space-x-2.5">
                  {[
                    'https://randomuser.me/api/portraits/women/44.jpg',
                    'https://randomuser.me/api/portraits/men/32.jpg',
                    'https://randomuser.me/api/portraits/women/68.jpg',
                    'https://randomuser.me/api/portraits/men/46.jpg'
                  ].map((src, i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-2 border-white overflow-hidden shadow-sm bg-gray-100">
                      <img src={src} alt="Devotee" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-[#5c1a1f] font-bold text-sm md:text-base">
                  Trusted by <span className="text-[#d97706]">50,000+</span> Devotees
                </p>
              </div>
            </div>

            {/* RIGHT - Carousel */}
            <PujaCarousel items={carouselItems} />
          </div>
        </div>
      </div>


      {/* 2. SERVICES SECTION */}
      <div className="relative w-full py-6 md:py-12 px-4 md:px-10 bg-transparent z-10">
        <div className="max-w-[1300px] mx-auto">

          {/* Section Heading */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-3">
              <div className="w-9 h-9 rounded-full border border-[#d4af37] flex items-center justify-center text-[#d4af37] bg-white">
                <Leaf className="w-4 h-4" />
              </div>
            </div>
            <h2 className="premium-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#5c1a1f] inline-flex items-center gap-4 justify-center whitespace-nowrap">
              <span className="h-[2px] w-8 md:w-16 bg-[#d4af37]/60 block" />
              Popular Puja Services
              <span className="h-[2px] w-8 md:w-16 bg-[#d4af37]/60 block" />
            </h2>
            <p className="text-[#6E2F37] text-base md:text-lg mt-2 font-medium">
              Every ritual performed in your name &amp; gotra — by verified Pandits, wherever you are.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="max-w-4xl mx-auto mb-10">
            <div className="relative w-full mb-4">
              <input
                type="text"
                placeholder="Search for Pujas, Temples or Benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 shadow-sm focus:outline-none focus:ring-1 focus:ring-[#ea580c] focus:border-[#ea580c] text-gray-850 bg-white"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3a1216] w-5 h-5" />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowFilterModal(true)}
                className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded bg-white hover:bg-gray-50 text-gray-850 shadow-sm"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
              <button
                onClick={() => { setActiveFilterTab('pujaFor'); setShowFilterModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-800 rounded shadow-sm text-gray-850 hover:bg-gray-50 text-sm font-medium"
              >
                Puja for <ChevronDown className="w-4 h-4 text-gray-850" />
              </button>
              <button
                onClick={() => { setActiveFilterTab('benefits'); setShowFilterModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-800 rounded shadow-sm text-gray-850 hover:bg-gray-50 text-sm font-medium"
              >
                Benefits <ChevronDown className="w-4 h-4 text-gray-850" />
              </button>
              <button
                onClick={() => { setActiveFilterTab('deity'); setShowFilterModal(true); }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-800 rounded shadow-sm text-gray-850 hover:bg-gray-50 text-sm font-medium"
              >
                Deity <ChevronDown className="w-4 h-4 text-gray-850" />
              </button>
            </div>
          </div>

          {/* Puja Grid */}
          <style>{`
            @keyframes tickerSlide {
              0%   { transform: translateY(0px); }
              40%  { transform: translateY(0px); }
              50%  { transform: translateY(-36px); }
              90%  { transform: translateY(-36px); }
              100% { transform: translateY(0px); }
            }
            .stat-ticker-inner {
              animation: tickerSlide 5s cubic-bezier(0.45, 0, 0.55, 1) infinite;
            }
          `}</style>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredPujas.length > 0 ? filteredPujas.map((puja, index) => (
              <Link
                href={puja.link}
                key={index}
                className="relative flex flex-col rounded-2xl overflow-hidden bg-white border border-gray-300 transition-all duration-300 hover:border-gray-500 hover:shadow-lg hover:-translate-y-1 group"
              >
                {/* Brand Logo Top Right */}
                <div className="absolute top-0 right-0 z-20 bg-white px-3 py-2 rounded-bl-[14px] flex items-center shadow-sm border-l border-b border-gray-100">
                  <img src="/Vaidik-talk1.webp" alt="Vaidik Talk" className="h-[20px] object-contain" />
                </div>
                {/* Popular Badge */}
                {puja.popular && (
                  <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-white" /> Most Popular
                  </div>
                )}

                {/* Image with title overlay */}
                <div className="relative w-full h-[250px] overflow-hidden shrink-0">
                  <img
                    src={puja.image}
                    alt={puja.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Title on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="premium-serif font-bold text-white text-[20px] leading-snug line-clamp-2 drop-shadow-md">
                      {puja.title}
                    </h3>
                  </div>
                </div>

                {/* Content below image */}
                <div className="px-4 pt-3 pb-0 flex flex-col">

                  {/* Dark tagline / shortDesc */}
                  <p className="text-gray-850 text-[13px] font-medium leading-relaxed line-clamp-2 mb-3 min-h-[40px]">
                    {puja.desc || `Book at just ₹${puja.discountedPrice || puja.price} — Limited slots available`}
                  </p>

                  {/* Location-style row: Price + Duration */}
                  <div className="flex items-center gap-3 mb-2 text-[13px] text-gray-850">
                    <span className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-[#ee6c1e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <span className="font-bold text-[#5c1a1f] text-[17.5px]">₹{puja.discountedPrice || puja.price}</span>
                      {puja.discountedPrice && <span className="text-gray-400 line-through text-[11px]">₹{puja.price}</span>}
                    </span>
                    {puja.duration && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 text-[#ee6c1e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        {puja.duration}
                      </span>
                    )}
                  </div>

                  {/* Stars Rating + Duration */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-3 h-3 fill-[#f59e0b] text-[#f59e0b]" />)}
                      <span className="text-[12px] text-gray-850 font-medium ml-1">({puja.reviews})</span>
                    </div>
                    {puja.duration && (
                      <div className="flex items-center gap-1 text-[11px] text-[#5c1a1f] font-semibold bg-orange-50 border border-orange-100 px-2.5 py-0.5 rounded-md">
                        <Clock className="w-3.5 h-3.5 text-[#ea580c]" />
                        {puja.duration}
                      </div>
                    )}
                  </div>

                  {/* Benefits row */}
                  <div className="mb-3">
                    <p className="text-[11px] font-bold text-gray-850 uppercase tracking-wide mb-1.5">Best For</p>
                    <div className="flex gap-1.5 overflow-hidden" style={{ height: '24px' }}>
                      {puja.benefits.slice(0, 3).map((benefit: string, bIndex: number) => (
                        <span
                          key={bIndex}
                          className="bg-orange-50 border border-orange-100 text-orange-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0 overflow-hidden"
                          style={{ maxWidth: '140px', textOverflow: 'ellipsis' }}
                        >
                          {benefit}
                        </span>
                      ))}
                      {puja.benefits.length > 3 && (
                        <span className="bg-orange-50 border border-orange-100 text-orange-700 text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">
                          +{puja.benefits.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Animated ticker + Book Now */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-3 pb-3">
                    {/* Vertical ticker */}
                    <div style={{ height: '38px', overflow: 'hidden' }}>
                      <div className="stat-ticker-inner" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ height: '38px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <span style={{ fontSize: '11px', color: '#4b5563', lineHeight: 1, fontWeight: 500 }}>Booked by</span>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1f2937', lineHeight: 1.3 }}>{puja.reviews}+ devotees</span>
                        </div>
                        <div style={{ height: '38px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <span style={{ fontSize: '11px', color: '#4b5563', lineHeight: 1, fontWeight: 500 }}>Rated</span>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#ea580c', lineHeight: 1.3 }}>★ {puja.rating || '4.9'} by devotees</span>
                        </div>
                      </div>
                    </div>

                    {/* Orange Book Now */}
                    {/* Orange Book Now */}
                    <div
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-[13px] font-bold bg-[#ea580c] group-hover:bg-[#c2410c] text-white transition-all shadow-sm"
                    >
                      Book Now
                    </div>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20">
                <p className="text-gray-850 text-lg">No pujas found matching your search.</p>
              </div>
            )}
          </div>
        </div >

      </div>

      {/* 3. BOTTOM BANNER */}
      <div className="w-full bg-white/60 backdrop-blur-sm border-y border-[#e8d8c0] py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <ShieldCheck className="w-7 h-7 text-[#5c1a1f]" />, title: 'Authentic Rituals', desc: 'Performed as per Vedic Scriptures' },
            { icon: <UserCheck className="w-7 h-7 text-[#5c1a1f]" />, title: 'Expert Purohits', desc: 'Experienced and Verified Pandits' },
            { icon: <Leaf className="w-7 h-7 text-[#5c1a1f]" />, title: 'Pure Samagri', desc: 'Sattvik and High Quality Ritual items' },
            { icon: <Lock className="w-7 h-7 text-[#5c1a1f]" />, title: 'Secure Booking', desc: '100% Safe and Hassle Free Booking' },
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#fcf5eb] border border-[#f0ddc0] flex items-center justify-center mb-4 shadow-sm">
                {feature.icon}
              </div>
              <h4 className="font-bold text-[#5c1a1f] text-[16px] mb-1">{feature.title}</h4>
              <p className="text-xs text-[#3a1216] max-w-[150px] leading-snug">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>


      {/* HOW IT WORKS SECTION */}
      <div className="w-full bg-white py-14 md:py-20 px-6 border-t border-[#f0ddc0] relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-[#d97706] font-bold text-sm uppercase tracking-widest mb-2">The Process</p>
            <h2 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f] mb-3">
              How it <span className="text-[#d97706]">works?</span>
            </h2>
            <p className="text-[#6E2F37] text-base md:text-lg">Simple, transparent, and performed with devotion.</p>
          </div>

          {/* Desktop Stepper */}
          <div className="hidden md:block relative">
            {/* Connector line - sits at center of circles */}
            <div className="absolute top-[22px] left-[8%] right-[8%] h-[3px] bg-gradient-to-r from-[#f0ddc0] via-[#d4af37] to-[#f0ddc0] rounded-full" />

            <div className="grid grid-cols-6 gap-4 relative z-10">
              {[
                { n: '1', title: 'Select your Puja', desc: 'Choose the puja that fits your need.' },
                { n: '2', title: 'Select Package', desc: 'Pick the package matching your intention.' },
                { n: '3', title: 'Enter Sankalp', desc: 'Add your Name & Gotra for the ritual.' },
                { n: '4', title: 'Complete Payment', desc: 'Pay via UPI, cards, or net banking.' },
                { n: '5', title: 'Puja Performed', desc: 'Verified Pandit performs with your sankalp.' },
                { n: '6', title: 'Receive Prasad', desc: 'Updates & prasad delivered to your door.' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-13 h-13 rounded-full bg-[#5c1a1f] text-white font-bold text-[15px] flex items-center justify-center shadow-lg border-[3px] border-white mb-5 relative z-10 ring-2 ring-[#d4af37]/50">
                    {item.n}
                  </div>
                  <h3 className="font-bold text-[#3a1216] text-[15px] leading-snug mb-2">{item.title}</h3>
                  <p className="text-gray-850 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: simple list */}
          <div className="md:hidden flex flex-col gap-4">
            {[
              { n: '1', title: 'Select your Puja', desc: 'Choose the puja that fits your need.' },
              { n: '2', title: 'Select your Package', desc: 'Pick the package that matches your intention.' },
              { n: '3', title: 'Enter Sankalp Details', desc: 'Add devotee Name & Gotra for the puja.' },
              { n: '4', title: 'Complete Payment', desc: 'Pay via UPI, cards, or net banking.' },
              { n: '5', title: 'Puja Performed', desc: 'Verified pandit performs with your sankalp.' },
              { n: '6', title: 'Receive Prasad', desc: 'Get updates & prasad delivered to your door.' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-[#fdfaf7] border border-[#f0ddc0] rounded-xl px-4 py-4 shadow-sm">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#5c1a1f] text-white font-bold text-xs flex items-center justify-center shadow-md ring-[1.5px] ring-[#d4af37]/40">
                  {item.n}
                </div>
                <div className="pt-0.5">
                  <p className="font-bold text-[#3a1216] text-[15px]">{item.title}</p>
                  <p className="text-gray-850 text-[13px] mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* WHY VAIDIKTALK SECTION */}
      <div className="w-full bg-[#fdfaf7] py-14 md:py-18 px-6 border-t border-[#f0ddc0] relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="premium-serif text-3xl md:text-5xl font-bold text-[#5c1a1f]">
              Why <span className="text-[#d97706]">VaidikTalk?</span>
            </h2>
          </div>

          {/* Brand Card */}
          <div className="bg-white border border-[#f0ddc0] rounded-2xl p-6 md:p-8 shadow-[0_4px_24px_rgba(92,26,31,0.06)]">
            {/* Brand Header */}
            <div className="flex items-center gap-3 mb-5">
              <img src="/vaidiktalklogo.webp" alt="VaidikTalk Logo" className="h-9 object-contain" />
              <div>
                <span className="font-extrabold text-[#5c1a1f] text-lg tracking-tight">Vaidik Talk</span>
                <p className="text-[11px] text-[#d97706] font-semibold uppercase tracking-wider">India's Trusted Puja Platform</p>
              </div>
            </div>

            {/* Description with logo */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-[#f0ddc0] shrink-0 shadow-sm bg-white flex items-center justify-center p-1">
                <img src="/vaidiktalklogo.webp" alt="VaidikTalk" className="w-full h-full object-contain" />
              </div>
              <p className="text-[#3a1216] text-[15px] md:text-[16px] leading-relaxed">
                VaidikTalk is a dedicated Vedic puja platform connecting devotees across India and the world with verified, experienced Pandits. Every puja is performed with your personal sankalp — your name and gotra recited aloud before the rituals begin — so you receive the blessings meant for you, no matter where you are.
              </p>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-[#5c1a1f] text-white text-[12px] font-bold px-4 py-2 rounded-full shadow-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
                Verified Pandits Only
              </div>
              <div className="flex items-center gap-2 bg-[#fcf5eb] border border-[#f0ddc0] text-[#5c1a1f] text-[12px] font-bold px-4 py-2 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                5,000+ Pujas Performed
              </div>
              <div className="flex items-center gap-2 bg-[#fcf5eb] border border-[#f0ddc0] text-[#5c1a1f] text-[12px] font-bold px-4 py-2 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                50,000+ Happy Devotees
              </div>
              <div className="flex items-center gap-2 bg-[#fcf5eb] border border-[#f0ddc0] text-[#5c1a1f] text-[12px] font-bold px-4 py-2 rounded-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                100% Safe & Secure
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS SECTION */}
      <div className="w-full bg-white py-14 md:py-20 px-6 border-t border-[#f0ddc0] relative z-10">
        <div className="w-full">
          <div className="text-center mb-10 max-w-5xl mx-auto px-6">
            <p className="text-[#d97706] font-bold text-sm uppercase tracking-widest mb-2">From Our Devotees</p>
            <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#5c1a1f]">
              What They&apos;re <span className="text-[#d97706]">Saying?</span>
            </h2>
          </div>
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes marqueeScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(calc(-50% - 10px)); }
            }
            .testimonial-marquee {
              display: flex;
              gap: 20px;
              width: max-content;
              animation: marqueeScroll 40s linear infinite;
            }
            .testimonial-marquee:hover {
              animation-play-state: paused;
            }
          `}} />
          <div className="overflow-hidden relative w-full max-w-7xl mx-auto" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
            <div className="testimonial-marquee py-4 px-4">
              {[...(dynamicData?.testimonials?.length > 0 ? dynamicData.testimonials : [
                { name: 'Anita Sharma', city: 'Mumbai', review: 'The booking was smooth and the Pandit recited our family names perfectly during the puja. Felt truly connected despite being far away.' },
                { name: 'Pradeep Mishra', city: 'Delhi', review: 'VaidikTalk made our Satyanarayan Puja so effortless. We got WhatsApp updates throughout and the prasad arrived on time.' },
                { name: 'Kavya Reddy', city: 'Bengaluru', review: 'We had complete peace of mind. The pandit was well-prepared, recited the sankalp correctly, and the whole experience felt sacred.' },
                { name: 'Ramesh Singh', city: 'Pune', review: 'Very authentic and professional service. The chanting was powerful and the video quality was excellent.' }
              ]), ...(dynamicData?.testimonials?.length > 0 ? dynamicData.testimonials : [
                { name: 'Anita Sharma', city: 'Mumbai', review: 'The booking was smooth and the Pandit recited our family names perfectly during the puja. Felt truly connected despite being far away.' },
                { name: 'Pradeep Mishra', city: 'Delhi', review: 'VaidikTalk made our Satyanarayan Puja so effortless. We got WhatsApp updates throughout and the prasad arrived on time.' },
                { name: 'Kavya Reddy', city: 'Bengaluru', review: 'We had complete peace of mind. The pandit was well-prepared, recited the sankalp correctly, and the whole experience felt sacred.' },
                { name: 'Ramesh Singh', city: 'Pune', review: 'Very authentic and professional service. The chanting was powerful and the video quality was excellent.' }
              ])].map((t: any, i: number) => (
                <div key={i} className="bg-[#fdfaf7] border border-[#f0ddc0] rounded-2xl p-5 shadow-sm flex flex-col justify-between w-[320px] md:w-[380px] shrink-0">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill="#d97706"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    ))}
                  </div>
                  <p className="text-[#3a1216] text-[14px] leading-relaxed mb-5 flex-1">&quot;{t.review}&quot;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#5c1a1f] text-white text-xs font-black flex items-center justify-center shrink-0">
                      {t.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-[#3a1216] text-[13px]">{t.name}</p>
                      <p className="text-[#3a1216] text-[11px]">{t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* WHATSAPP CTA SECTION */}
      <div className="w-full bg-[#fdfaf7] py-8 px-6 border-t border-[#f0ddc0] relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-[#f0ddc0] rounded-2xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            <div>
              <h3 className="font-bold text-[#3a1216] text-lg md:text-xl mb-1">Need help booking your Puja?</h3>
              <p className="text-gray-850 text-[13px] md:text-sm">Our team is here to guide you with any questions about your puja booking.</p>
            </div>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5c] transition-colors text-white font-bold px-6 py-3 rounded-full shadow-md text-[14px] shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* FAQ SECTION */}


      <div className="w-full bg-[#fdfaf7] py-16 md:py-24 px-6 relative z-10 border-t border-[#f0ddc0]/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#5c1a1f] mb-4">
              Frequently Asked <span className="text-[#d97706]">Questions</span>
            </h2>
            <p className="text-gray-850 text-sm md:text-base max-w-xl mx-auto">Everything you need to know about our authentic Vedic Puja services.</p>
          </div>

          <div className="space-y-3">
            {(dynamicData?.faqs?.length > 0 ? dynamicData.faqs : [
              { q: "How are the online pujas conducted?", a: "Our pujas are performed live by verified Vedic Pandits at sacred locations. You can join the puja via a secure video link and participate in the sankalp and rituals from the comfort of your home." },
              { q: "Will I receive the Prasad after the Puja?", a: "Yes, after the successful completion of the puja, the energized Prasad along with sacred items will be shipped to your registered address." },
              { q: "How do you ensure the authenticity of the process?", a: "All our Pandits are highly experienced and strictly follow the Vedic scriptures and timing (Muhurat). We use pure, Sattvik samagri for every ritual." },
              { q: "Can I book a puja for someone else in my family?", a: "Absolutely! You can provide their name, gotra, and birth details during the booking process so the Pandit can take the Sankalp in their name." }
            ]).map((faq: any, idx: number) => (
              <div key={idx} className="bg-white border border-[#f0ddc0]/80 rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-[#fcf5eb]/50 transition-colors"
                >
                  <h3 className="font-bold text-[#5c1a1f] text-[15px] md:text-[16px] pr-4">{faq.question || faq.q}</h3>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${openFaq === idx ? 'border-[#d97706] bg-[#d97706] text-white' : 'border-[#f0ddc0] text-[#8a1c2a]'}`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </div>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-gray-850 text-[14.5px] leading-relaxed border-t border-gray-100 pt-4">{faq.answer || faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Thin Dark Footer Ribbon */}
      <div className="w-full bg-[#4a1519] py-5 px-4 flex justify-center items-center gap-6 text-[#d4af37] text-sm md:text-base font-medium tracking-wide relative z-10">
        <span className="opacity-70">✦</span>
        <span>Divine Blessings | Positive Energy | Peace & Prosperity</span>
        <span className="opacity-70">✦</span>
      </div>

      {/* FILTER MODAL */}
      {showFilterModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowFilterModal(false)}
          />
          {/* Modal Content */}
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col h-[500px]">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-850">Filter</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-[#3a1216] hover:text-gray-850">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-1 overflow-hidden">
              {/* Sidebar */}
              <div className="w-1/3 bg-gray-50 border-r border-gray-100 overflow-y-auto">
                <button
                  onClick={() => setActiveFilterTab('pujaFor')}
                  className={`w-full text-left px-5 py-4 font-medium text-sm transition-colors ${activeFilterTab === 'pujaFor' ? 'bg-white text-[#ea580c] border-l-4 border-[#ea580c]' : 'text-gray-850 hover:bg-gray-100 border-l-4 border-transparent'}`}
                >
                  Puja for
                </button>
                <button
                  onClick={() => setActiveFilterTab('benefits')}
                  className={`w-full text-left px-5 py-4 font-medium text-sm transition-colors ${activeFilterTab === 'benefits' ? 'bg-white text-[#ea580c] border-l-4 border-[#ea580c]' : 'text-gray-850 hover:bg-gray-100 border-l-4 border-transparent'}`}
                >
                  Benefits
                </button>
                <button
                  onClick={() => setActiveFilterTab('deity')}
                  className={`w-full text-left px-5 py-4 font-medium text-sm transition-colors ${activeFilterTab === 'deity' ? 'bg-white text-[#ea580c] border-l-4 border-[#ea580c]' : 'text-gray-850 hover:bg-gray-100 border-l-4 border-transparent'}`}
                >
                  Deity
                </button>
              </div>

              {/* Options */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="flex flex-col gap-4">
                  {FILTER_OPTIONS[activeFilterTab].map((option, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center w-5 h-5 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-[#ea580c]">
                        <input
                          type="checkbox"
                          className="opacity-0 absolute w-full h-full cursor-pointer"
                          checked={filters[activeFilterTab].includes(option)}
                          onChange={() => handleFilterChange(activeFilterTab, option)}
                        />
                        {filters[activeFilterTab].includes(option) && (
                          <div className="w-3 h-3 bg-[#ea580c] rounded-sm" />
                        )}
                      </div>
                      <span className="text-gray-850 text-sm group-hover:text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white">
              <button
                onClick={clearFilters}
                className="text-sm font-semibold text-gray-850 hover:text-[#ea580c]"
              >
                Clear all
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="bg-[#ea580c] hover:bg-[#d94f06] text-white px-8 py-2.5 rounded-lg font-semibold text-sm shadow-sm transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

