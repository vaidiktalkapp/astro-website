'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const DEFAULT_HERO = {
  badgeText: "India's Most Trusted Vedic Guidance Platform",
  headingPrefix: 'Get Trusted',
  headingHighlight: 'Vedic Guidance',
  headingSuffix: 'for Every Step of Your Life',
  subheading: "Chat, call, or consult with India's best astrologers and get accurate solutions to your life's challenges.",
};

const HeroBanner = () => {
  const [heroBanners, setHeroBanners] = useState<any[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [heroText, setHeroText] = useState(DEFAULT_HERO);

  useEffect(() => {
    const fetchHeroBanner = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await fetch(`${apiUrl}/banners/active`);
        if (response.ok) {
          const banners = await response.json();
          const heroes = banners.filter((b: any) => b.position === 'hero').sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
          if (heroes.length > 0) setHeroBanners(heroes);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };

    const fetchHeroText = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await fetch(`${apiUrl}/hero-settings`);
        if (response.ok) {
          const data = await response.json();
          setHeroText({
            badgeText: data.badgeText || DEFAULT_HERO.badgeText,
            headingPrefix: data.headingPrefix || DEFAULT_HERO.headingPrefix,
            headingHighlight: data.headingHighlight || DEFAULT_HERO.headingHighlight,
            headingSuffix: data.headingSuffix || DEFAULT_HERO.headingSuffix,
            subheading: data.subheading || DEFAULT_HERO.subheading,
          });
        }
      } catch (error) {
        // silently fallback to defaults
      }
    };

    fetchHeroBanner();
    fetchHeroText();
  }, []);

  useEffect(() => {
    if (heroBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroBanners]);

  return (
    <div className="relative w-full min-h-[550px] lg:min-h-[650px] flex flex-col lg:flex-row lg:items-center overflow-hidden pt-12 lg:py-20 z-10">

      {/* Desktop-only absolute background image (Crossfade sliding) */}
      <div className="absolute inset-0 z-0 hidden lg:flex justify-end pointer-events-none">
        {/* Permanent Fallback Image to prevent white flash while loading */}
        <img
          src="/Astrology image.webp"
          alt="Vaidik Astrology Consultation"
          className="absolute h-full lg:w-[70%] object-cover object-center lg:object-right opacity-95 lg:translate-x-12 z-0"
          style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)' }}
        />
        {heroBanners.map((banner, index) => {
          const isActive = index === currentBannerIndex;
          return (
            <img
              key={banner._id || index}
              src={banner.desktopImageUrl || "/Astrology image.webp"}
              alt={banner.title || "Vaidik Astrology Consultation"}
              className={`absolute h-full lg:w-[70%] object-cover object-center lg:object-right transition-opacity duration-500 ease-in-out right-0 lg:translate-x-12
                  ${isActive ? 'opacity-95 z-10' : 'opacity-0 z-0'}`}
              style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)' }}
            />
          );
        })}
      </div>

      {/* Text Content */}
      <div className="relative z-20 w-full px-6 md:px-10 mx-auto max-w-[1600px] flex-shrink-0 lg:-mt-16">
        <div className="max-w-[650px] lg:max-w-[1000px]">
          <div className="inline-block bg-[#f6e2c8] text-[#8a4410] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4.5 shadow-sm">
            {heroText.badgeText}
          </div>

          <h1 className="font- font-bold text-[#5c1420] text-[37px] sm:text-[43px] lg:text-[47px] xl:text-[49px] leading-[1.25] mb-6 relative z-10 whitespace-normal">
            {heroText.headingPrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] to-[#ee6c1e] whitespace-nowrap">{heroText.headingHighlight}</span><br className="hidden md:block" /> {heroText.headingSuffix}
          </h1>

          <p className="text-[18px] md:text-[19px] text-[#6E2F37] font-medium leading-[1.6] mb-8 max-w-[480px]">
            {heroText.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10 flex-wrap">
            <Link href="/astrologers-chat" className="inline-flex justify-center w-full sm:w-auto items-center gap-2 bg-[#8a1c2a] text-white font-semibold text-sm px-6 py-4 rounded-xl shadow-md hover:bg-[#721522] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L18 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 0-2z" />
              </svg>
              Talk to Astrologer
            </Link>
            <Link href="/kundli" className="inline-flex justify-center w-full sm:w-auto items-center gap-2 bg-[#ee6c1e] text-white font-semibold text-sm px-6 py-4 rounded-xl shadow-md hover:bg-[#d95a12] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="12" cy="12" r="1" fill="currentColor" />
              </svg>
              Get Free Kundli
            </Link>
            <Link href="/ai-astrologer-chat" className="inline-flex justify-center w-full sm:w-auto items-center gap-2 bg-white/90 backdrop-blur-sm text-[#8a1c2a] border-[1.5px] border-[#8a1c2a] font-semibold text-sm px-6 py-4 rounded-xl shadow-sm hover:bg-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z" />
              </svg>
              Ask AI Vaidik Guide
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-10 gap-y-6">
            <div>
              <div className="font-bold text-[18px] text-[#5c1420]">68,000+</div>
              <div className="text-[13px] font-medium text-[#5e4339]">Happy Customers</div>
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#5c1420]">4.8/5</div>
              <div className="text-[13px] font-medium text-[#5e4339]">Google Rating</div>
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#5c1420]">100%</div>
              <div className="text-[13px] font-medium text-[#5e4339]">Privacy Protected</div>
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#5c1420]">24x7</div>
              <div className="text-[13px] font-medium text-[#5e4339]">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet image rendered below the text in the document flow */}
      <div className="w-full relative mt-10 lg:hidden flex justify-center pb-0 pointer-events-none h-[280px] sm:h-[350px]">
        {/* Permanent Fallback Image to prevent white flash while loading */}
        <img
          src="/Astrology image.webp"
          alt="Vaidik Astrology Consultation"
          className="absolute w-full max-w-[500px] h-full object-cover object-center mix-blend-multiply opacity-95 z-0"
          style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' }}
        />
        {heroBanners.map((banner, index) => {
          const isActive = index === currentBannerIndex;
          return (
            <img
              key={banner._id || index}
              src={banner.mobileImageUrl || banner.desktopImageUrl || "/Astrology image.webp"}
              alt={banner.title || "Vaidik Astrology Consultation"}
              className={`absolute w-full max-w-[500px] h-full object-cover object-center mix-blend-multiply transition-opacity duration-500 ease-in-out
                  ${isActive ? 'opacity-95 z-10' : 'opacity-0 z-0'}`}
              style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)' }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeroBanner;
