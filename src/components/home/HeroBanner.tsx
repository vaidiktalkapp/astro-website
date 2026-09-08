'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CountUp from '@/components/ui/CountUp';

const DEFAULT_BANNER = [
  {
    _id: 'banner1',
    title: 'Vedic Wisdom',
    desktopImageUrl: '/Astrology image.webp',
    mobileImageUrl: '/Astrology image.webp',
    position: 'hero',
    isActive: true,
    badgeText: "India's Most Trusted Vedic Platform",
    headingPrefix: 'Discover Ancient',
    headingHighlight: 'Vedic Wisdom',
    headingSuffix: 'for Modern Life',
    subheading: "Explore profound astrological insights, daily panchang, and spiritual guidance to bring harmony to your life.",
    button1Text: "Daily Horoscope",
    button1Link: "/daily-horoscope",
    button2Text: "Book a Puja",
    button2Link: "/book-a-puja",
    button3Text: "WhatsApp Us",
    button3Link: "https://wa.me/919810467823?text=Hello%2C%20I%20need%20astrology%20guidance"
  },
  {
    _id: 'banner2',
    title: 'Spiritual Solutions',
    desktopImageUrl: '/spiritual-banner-light.webp',
    mobileImageUrl: '/spiritual-banner-light.webp',
    position: 'hero',
    isActive: true,
    badgeText: "Authentic Spiritual Guidance",
    headingPrefix: 'Find Peace with',
    headingHighlight: 'Sacred Rituals',
    headingSuffix: "and Pujas",
    subheading: "Connect with the divine through our sacred puja services and personalized rituals for your family's prosperity.",
    button1Text: "Explore Pujas",
    button1Link: "/book-a-puja",
    button2Text: "Today's Panchang",
    button2Link: "/panchang",
    button3Text: "WhatsApp Us",
    button3Link: "https://wa.me/919810467823?text=Hello%2C%20I%20need%20guidance"
  }
];

const DEFAULT_HERO = {
  badgeText: "India's Most Trusted Vedic Platform",
  headingPrefix: 'Discover Ancient',
  headingHighlight: 'Vedic Wisdom',
  headingSuffix: 'for Modern Life',
  subheading: "Explore profound astrological insights, daily panchang, and spiritual guidance to bring harmony to your life.",
};

// ✅ Now accepts initialBanners from SSR — no client wait needed
const HeroBanner = ({ initialSettings, initialBanners = [] }: { initialSettings?: any; initialBanners?: any[] }) => {
  // ✅ Use SSR banners immediately (or default if empty)
  const [heroBanners, setHeroBanners] = useState<any[]>(
    initialBanners.length > 0 ? initialBanners : DEFAULT_BANNER
  );

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const [heroText, setHeroText] = useState({
    badgeText: initialSettings?.badgeText || DEFAULT_HERO.badgeText,
    headingPrefix: initialSettings?.headingPrefix || DEFAULT_HERO.headingPrefix,
    headingHighlight: initialSettings?.headingHighlight || DEFAULT_HERO.headingHighlight,
    headingSuffix: initialSettings?.headingSuffix || DEFAULT_HERO.headingSuffix,
    subheading: initialSettings?.subheading || DEFAULT_HERO.subheading,
  });

  useEffect(() => {
    const fetchHeroBanner = async () => {
      // ✅ Agar SSR se banners pehle se aa gaye hain toh client fetch skip karo
      // Sirf tab fetch karo jab SSR fail hua ho (initialBanners empty)
      if (initialBanners.length > 0) return;

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await fetch(`${apiUrl}/banners/active`);
        if (response.ok) {
          const banners = await response.json();
          const heroes = banners
            .filter((b: any) => b.position === 'hero')
            .sort((a: any, b: any) => {
              const orderA = a.order ?? 999;
              const orderB = b.order ?? 999;
              if (orderA !== orderB) return orderA - orderB;
              return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
            });
          if (heroes.length > 0) setHeroBanners(heroes);
        }
      } catch (error) {
        console.error('Failed to fetch API data', error);
      }
    };

    const fetchHeroText = async () => {
      if (initialSettings) return;
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

  const currentBanner = heroBanners[currentBannerIndex] || {};
  const displayBadgeText = currentBanner.badgeText || heroText.badgeText;
  const displayHeadingPrefix = currentBanner.headingPrefix || heroText.headingPrefix;
  const displayHeadingHighlight = currentBanner.headingHighlight || heroText.headingHighlight;
  const displayHeadingSuffix = currentBanner.headingSuffix || heroText.headingSuffix;
  const displaySubheading = currentBanner.subheading || heroText.subheading;

  const btn1Text = currentBanner.button1Text || "WhatsApp Us";
  const btn1Link = currentBanner.button1Link || "https://wa.me/919810467823?text=Hello%2C%20I%20need%20astrology%20guidance";
  const btn2Text = currentBanner.button2Text || "Book a Puja";
  const btn2Link = currentBanner.button2Link || "/book-a-puja";
  const btn3Text = currentBanner.button3Text || "Call Us Now";
  const btn3Link = currentBanner.button3Link || "tel:+919810467823";

  // Only animate the text if the text actually changes
  const textKey = `${displayBadgeText}|${displayHeadingPrefix}|${displayHeadingHighlight}|${displayHeadingSuffix}|${displaySubheading}|${btn1Text}|${btn1Link}|${btn2Text}|${btn2Link}|${btn3Text}|${btn3Link}`;

  return (
    <div className="relative w-full min-h-[500px] lg:min-h-[550px] flex flex-col lg:flex-row lg:items-center overflow-hidden pt-4 lg:pt-6 lg:pb-6 z-10">

      {/* Desktop-only absolute background image (Crossfade sliding) */}
      <div className="absolute inset-0 z-0 hidden lg:flex justify-end pointer-events-none">
        {heroBanners.map((banner, index) => {
          const isActive = index === currentBannerIndex;
          return (
            <img
              key={banner._id || index}
              src={banner.desktopImageUrl || "/Astrology image.webp"}
              alt={banner.title || "Vaidik Astrology Consultation"}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
              className={`absolute h-full lg:w-[70%] object-cover object-center lg:object-[20%_35%] transition-opacity duration-500 ease-in-out right-0 lg:translate-x-12
                    ${isActive ? 'opacity-95 z-10' : 'opacity-0 z-0'}`}
              style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 25%, black 100%)' }}
            />
          );
        })}
      </div>

      {/* Text Content */}
      <div className="relative z-20 w-full px-6 md:px-10 mx-auto max-w-[1600px] flex-shrink-0 lg:-mt-10">
        <div className="max-w-[650px] lg:max-w-[700px] xl:max-w-[800px]">

          {/* Animated Text & Buttons */}
          <div key={textKey} className="animate-fade-in-up">
            <div className="inline-block bg-[#f6e2c8] text-[#8a4410] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4.5 shadow-sm">
              {displayBadgeText}
            </div>

            <h1 className="premium-serif font-bold text-[#5c1420] text-[37px] sm:text-[43px] lg:text-[47px] xl:text-[49px] leading-[1.25] mb-6 relative z-10 whitespace-normal">
              {displayHeadingPrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] to-[#ee6c1e] whitespace-nowrap">{displayHeadingHighlight}</span><br className="hidden md:block" /> {displayHeadingSuffix}
            </h1>

            <p className="text-[18px] md:text-[19px] text-[#6E2F37] font-medium leading-[1.6] mb-8 max-w-[600px] text-justify sm:text-left">
              {displaySubheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 flex-wrap">
              <a href={btn1Link} target="_blank" rel="noopener noreferrer" className="inline-flex justify-center w-full sm:w-auto items-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-6 py-4 rounded-xl shadow-md hover:bg-[#1ebe5d] transition-transform hover:scale-105 duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.057 23.882l6.224-1.633A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.213-3.695.969.987-3.607-.234-.371A9.818 9.818 0 1 1 12 21.818z" />
                </svg>
                {btn1Text}
              </a>
              <a href={btn2Link} className="inline-flex justify-center w-full sm:w-auto items-center gap-2 bg-[#ee6c1e] text-white font-semibold text-sm px-6 py-4 rounded-xl shadow-md hover:bg-[#d95a12] transition-transform hover:scale-105 duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                {btn2Text}
              </a>
              <a href={btn3Link} className="inline-flex justify-center w-full sm:w-auto items-center gap-2 bg-white/90 backdrop-blur-sm text-[#8a1c2a] border-[1.5px] border-[#8a1c2a] font-semibold text-sm px-6 py-4 rounded-xl shadow-sm hover:bg-white transition-transform hover:scale-105 duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.62 3.38 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {btn3Text}
              </a>
            </div>
          </div>

          {/* Static Stats (do not remount) */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-10 gap-y-6">
            <div>
              <div className="font-bold text-[18px] text-[#5c1420]"><CountUp to={68000} suffix="+" /></div>
              <div className="text-[13px] font-medium text-[#5e4339]">Happy Customers</div>
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#5c1420]"><CountUp to={4.8} isDecimal={true} suffix="/5" /></div>
              <div className="text-[13px] font-medium text-[#5e4339]">Google Rating</div>
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#5c1420]"><CountUp to={100} suffix="%" /></div>
              <div className="text-[13px] font-medium text-[#5e4339]">Privacy Protected</div>
            </div>
            <div>
              <div className="font-bold text-[18px] text-[#5c1420]"><CountUp to={24} suffix="x7" /></div>
              <div className="text-[13px] font-medium text-[#5e4339]">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet image rendered below the text in the document flow */}
      <div className="w-full relative mt-10 lg:hidden flex justify-center pb-0 pointer-events-none h-[280px] sm:h-[350px]">
        {heroBanners.map((banner, index) => {
          const isActive = index === currentBannerIndex;
          return (
            <img
              key={banner._id || index}
              src={banner.mobileImageUrl || banner.desktopImageUrl || "/Astrology image.webp"}
              alt={banner.title || "Vaidik Astrology Consultation"}
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
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
