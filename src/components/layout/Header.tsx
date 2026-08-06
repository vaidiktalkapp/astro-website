'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from '../../context/LanguageContext';
import axios from 'axios';
import LoginModal from './LoginModal';

const LANGUAGES = [
  { code: 'en', name: 'English', short: 'EN' },
  { code: 'hi', name: 'हिन्दी', short: 'HI' },
];

export default function Header() {
  const {
    user,
    isAuthenticated,
    logout,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal
  } = useAuth();
  const { t, locale, setLocale } = useTranslation();

  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [navPujas, setNavPujas] = useState<any[]>([]);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNavPujas = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await axios.get(`${apiUrl}/pujas?status=active&limit=12`);
        setNavPujas(response.data.data || []);
      } catch (error) {
        console.error('Failed to load nav pujas', error);
      }
    };
    fetchNavPujas();
  }, []);

  const toggleAccordion = (menu: string) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    // Close mobile menu on desktop resize
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <header className="w-full sticky top-0 z-50 flex flex-col shadow-sm">
        {/* Top Tier */}
        <div className="flex justify-between items-center bg-[#5c1420] text-[#f4d9c0] px-4 md:px-10 py-1.5 md:py-2 text-[11px] md:text-[12px] font-medium">
          <div className="flex gap-4 md:gap-7 items-center whitespace-nowrap overflow-x-auto no-scrollbar flex-1 pr-4">
            <span className="flex items-center gap-1.5 text-[#ffcf9c]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
                <path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8z" />
              </svg>
              Talk to India&apos;s Verified Astrologers
            </span>
            <span className="hidden sm:inline">68,00,000+ Happy &amp; Secure</span>
            <span className="hidden md:inline">100% Safe &amp; Support</span>
          </div>
          {/* 
          <div className="flex gap-5 items-center relative shrink-0" ref={languageMenuRef}>
            <button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              {LANGUAGES.find(l => l.code === locale)?.name || 'English'} ▾
            </button>
            {isLanguageMenuOpen && (
              <div className="absolute top-6 right-0 bg-white text-gray-850 rounded-md shadow-lg border border-gray-100 py-1 z-50 min-w-[100px]">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setLocale(lang.code as any); setIsLanguageMenuOpen(false); }}
                    className="w-full text-left px-3 py-1.5 hover:bg-gray-100 text-[13px]"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          */}
        </div>

        {/* Main Tier */}
        <div className="flex items-center justify-between gap-2 xl:gap-4 px-3 md:px-5 lg:px-6 py-[12px] bg-white border-b border-[#f0ddc0] w-full max-w-full">
          {/* Logo (Reverted to old logo image) */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/Vaidik-talk1.webp"
              alt="VaidikTalk Logo"
              className="h-8 sm:h-10 w-[120px] lg:w-[140px] xl:w-[150px] 2xl:w-[170px] object-contain object-left -translate-y-1"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex gap-2 xl:gap-[12px] 2xl:gap-[20px] items-center text-[12px] 2xl:text-[14px] font-medium text-[#3a1216] whitespace-nowrap flex-1 justify-center shrink">
            <Link href="/" className="hover:text-[#ee6c1e] transition-colors py-4">Home</Link>

            {/* Kundli & Reports Dropdown */}
            <div className="relative group cursor-pointer">
              <Link href="/kundli" className="hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4">
                Kundli &amp; Reports
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </Link>
              <div className="absolute top-full left-0 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-lg min-w-[480px] p-3 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                <div className="grid grid-cols-2 gap-x-2">
                  <div className="flex flex-col border-r border-gray-100 pr-2">
                    <div className="px-4 py-1.5 text-[11px] font-bold text-[#ee6c1e] uppercase tracking-wider mb-1">Premium Reports</div>
                    <Link href="/report/kundali/vaidik-smart-kundali-10-years" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Vaidik Smart Kundali</Link>
                    <Link href="/report/kundali/kundali-matching" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Kundali Matching</Link>
                    <Link href="/report/kundali/personalized-lal-kitab" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Personalized Lal Kitab</Link>
                    <Link href="/report/kundali/hastlikhit-kundali" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Hastlikhit Kundali</Link>
                    <div className="px-4 py-1.5 text-[11px] font-bold text-[#ee6c1e] uppercase tracking-wider mt-2 mb-1">Premium Numerology</div>
                    <Link href="/report/numerology/fortune-numerology" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Fortune Numerology</Link>
                    <Link href="/report/numerology/name-mobile-number-numerology" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Name & Mobile Numerology</Link>
                  </div>
                  <div className="flex flex-col pl-2">
                    <div className="px-4 py-1.5 text-[11px] font-bold text-[#ee6c1e] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      Free Reports
                    </div>
                    <Link href="/free-reports/kaal-sarp" className="flex items-center justify-between px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">
                      Kaal Sarp Dosh <span className="bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ml-2">Free</span>
                    </Link>
                    <Link href="/free-reports/gemstone" className="flex items-center justify-between px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">
                      Gemstone Suggestion <span className="bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ml-2">Free</span>
                    </Link>
                    <Link href="/free-reports/sade-sati" className="flex items-center justify-between px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">
                      Sade Sati Check <span className="bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ml-2">Free</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Free Astrology Tools Dropdown */}
            <div className="relative group cursor-pointer">
              <Link href="/astrology-calculators" className="hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4">
                Free Astrology Tools
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </Link>
              <div className="absolute top-full left-0 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-lg min-w-[400px] p-3 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                <div className="grid grid-cols-2 gap-x-2">
                  <div className="flex flex-col">
                    <Link href="/kundli" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Kundli Generation</Link>
                    <Link href="/horoscope-matching" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Horoscope Matching</Link>
                    <Link href="/moon-signs" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Moon Signs</Link>
                    <Link href="/rashi-calculator" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Rashi Calculator</Link>
                    <Link href="/numerology" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Numerology</Link>
                    <Link href="/compatibility" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Love Compatibility</Link>
                    <Link href="/lal-kitab" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Lal Kitab Reading</Link>
                    <Link href="/atlas" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Atlas / Location Finder</Link>
                  </div>
                  <div className="flex flex-col">
                    <Link href="/panchang" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Panchang Today</Link>
                    <Link href="/rahu-kaal" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Rahu Kaal Today</Link>
                    <Link href="/muhurat" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Muhurat Finder</Link>
                    <Link href="/baby-names" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Baby Names</Link>
                    <Link href="/chinese-horoscope" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Chinese Horoscope</Link>
                    <Link href="/festivals" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Festivals Calendar</Link>
                    <Link href="/calendar" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Astrology Calendar</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Horoscope Dropdown */}
            <div className="relative group cursor-pointer">
              <Link href="/horoscope" className="hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4">
                Horoscope
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </Link>
              <div className="absolute top-full left-0 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-lg min-w-[460px] p-3 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                <div className="grid grid-cols-2 gap-x-2">
                  <div className="flex flex-col border-r border-gray-100 pr-2">
                    <div className="px-4 py-1.5 text-[11px] font-bold text-[#ee6c1e] uppercase tracking-wider mb-1">Time-Based Forecasts</div>
                    <Link href="/daily-horoscope" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Daily Horoscope</Link>
                    <Link href="/horoscope/tomorrow" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Tomorrow&apos;s Horoscope</Link>
                    <Link href="/horoscope/weekly" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Weekly Horoscope</Link>
                    <Link href="/horoscope/monthly" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Monthly Horoscope</Link>
                    <Link href="/horoscope/yearly" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Yearly Horoscope</Link>
                  </div>
                  <div className="flex flex-col pl-2">
                    <div className="px-4 py-1.5 text-[11px] font-bold text-[#ee6c1e] uppercase tracking-wider mb-1">Specialty Horoscopes</div>
                    <Link href="/horoscope-matching" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Horoscope Matching</Link>
                    <Link href="/love-horoscope" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Love Horoscope</Link>
                    <Link href="/chinese-horoscope" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Chinese Horoscope</Link>
                    <Link href="/celebrity-horoscopes" className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">Celebrity Horoscope</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Consult Astrologer Dropdown */}
            <div className="relative group cursor-pointer flex items-center py-4">
              <Link href="/astrologers-chat" className="bg-[#8a1c2a] text-white px-3 2xl:px-4 py-[7px] 2xl:py-[8px] rounded-md hover:bg-[#721522] transition-colors font-semibold flex items-center gap-1.5">
                Consult an Astrologer
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </Link>
              <div className="absolute top-[calc(100%-8px)] right-0 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-lg min-w-[220px] py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                <Link href="/astrologers-chat" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Chat with Astrologer</Link>
                <Link href="/astrologers-call" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Talk with Astrologer</Link>
                <Link href="/ai-astrologer-chat" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Chat with AI Astrologer</Link>
                <Link href="/ai-astrologer-chat" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Talk with AI Astrologer</Link>
              </div>
            </div>

            {/* Pujas Dropdown */}
            <div className="relative group cursor-pointer">
              <Link href="/book-a-puja" className="hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4">
                Book a Remedy Puja
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </Link>
              <div className="absolute top-full left-0 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-lg min-w-[480px] p-3 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                <div className="grid grid-cols-2 gap-x-2">
                  <div className="flex flex-col">
                    <Link href="/book-a-puja" className="block px-4 py-2 text-sm text-[#8a1c2a] font-bold hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">View All Pujas →</Link>
                    {navPujas.slice(0, Math.ceil(navPujas.length / 2)).map(puja => (
                      <Link key={puja._id} href={`/book-a-puja/${puja.slug}`} className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md truncate" title={puja.title}>
                        {puja.title}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col mt-9">
                    {navPujas.slice(Math.ceil(navPujas.length / 2)).map(puja => (
                      <Link key={puja._id} href={`/book-a-puja/${puja.slug}`} className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md truncate" title={puja.title}>
                        {puja.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Knowledge Center Dropdown */}
            <div className="relative group cursor-pointer">
              <Link href="/learn" className="hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4">
                Knowledge Center
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              </Link>
              <div className="absolute top-full right-0 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-lg min-w-[240px] py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                <Link href="/blog" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Blogs / Insights</Link>
                <Link href="/faq" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">FAQ</Link>
                <Link href="/muhurat/directory" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Muhurat Directory 2026</Link>
                <Link href="/festivals" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Festivals Calendar</Link>
                <Link href="/celebrity-horoscopes" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Celebrity Horoscope</Link>
                <Link href="/healing" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Healings</Link>
                <Link href="/matrimony" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Matrimony</Link>
                <Link href="/learn" className="block px-5 py-2.5 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e]">Learn Astrology</Link>
              </div>
            </div>
            <Link href="/about-us" className="hover:text-[#ee6c1e] transition-colors">About Us</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2 xl:gap-5 text-[12px] 2xl:text-[13px] font-medium text-[#3a1216] whitespace-nowrap shrink-0 ml-auto">
            {!isAuthenticated ? (
              <button onClick={openLoginModal} className="hidden lg:flex items-center gap-1.5 bg-[#8a1c2a] text-white px-5 py-2.5 rounded-lg hover:bg-[#721522] transition-colors font-semibold shadow-sm cursor-pointer">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21a8 8 0 0 1 16 0" />
                </svg>
                Login / Sign Up
              </button>
            ) : (
              <div className="hidden lg:flex relative group cursor-pointer items-center py-2">
                <div className="flex items-center gap-2 bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 px-2 py-1.5 rounded-full transition-all duration-200 group-hover:bg-orange-50 group-hover:border-orange-200">
                  <div className="w-7 h-7 rounded-full bg-[#8a1c2a] text-[#ffcf9c] flex items-center justify-center font-bold text-[13px] shadow-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="font-bold text-[#8a1c2a] text-[13px] pr-1">
                    {user?.name ? user.name.split(' ')[0] : 'My Account'}
                  </span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#8a1c2a] mr-1 group-hover:rotate-180 transition-transform duration-200"><path d="M6 9l6 6 6-6" /></svg>
                </div>
                <div className="absolute top-full right-0 mt-1 bg-white text-gray-850 shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-lg min-w-[220px] py-2 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="px-5 py-3 border-b border-gray-100 mb-1 bg-gray-50/50 rounded-t-lg">
                    <p className="font-bold text-[#8a1c2a] text-sm truncate">{user?.name || 'Vaidik User'}</p>
                    <p className="text-[11px] text-gray-850 font-medium truncate mt-0.5">{user?.phoneNumber || ''}</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium hover:bg-orange-50 hover:text-[#ee6c1e]">
                    My Profile
                  </Link>
                  <Link href="/wallet" className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium hover:bg-orange-50 hover:text-[#ee6c1e]">
                    Wallet Balance
                  </Link>
                  <Link href="/orders" className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium hover:bg-orange-50 hover:text-[#ee6c1e]">
                    Order History
                  </Link>
                  <Link href="/ai-chat-history" className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium hover:bg-orange-50 hover:text-[#ee6c1e]">
                    AI Chat History
                  </Link>
                  <div className="h-px bg-gray-100 my-1 mx-2"></div>
                  <button onClick={logout} className="w-full text-left px-5 py-2.5 text-[13px] text-red-600 hover:bg-red-50 font-bold">
                    Logout
                  </button>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden text-[#8a1c2a] font-bold cursor-pointer hover:text-[#ee6c1e] border border-[#8a1c2a] px-3 py-1.5 rounded-md flex items-center gap-1 bg-red-50/50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-[90] xl:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar Drawer */}
      <div className={`fixed top-0 right-0 w-[85%] max-w-[340px] h-full bg-white z-[100] transform transition-transform duration-300 ease-in-out xl:hidden flex flex-col overflow-y-auto ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
        {/* Drawer Header */}
        <div className="bg-[#8a1c2a] p-5 flex items-center justify-between sticky top-0 z-10">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg">
             <img src="/Vaidik-talk1.webp" alt="VaidikTalk" className="h-6 object-contain" />
          </Link>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-[#ffcf9c] transition-colors bg-black/20 p-2 rounded-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Auth Section in Mobile */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          {!isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-gray-850">Login to access your profile</p>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); openLoginModal(); }}
                className="w-full bg-[#8a1c2a] text-white py-3 rounded-lg font-bold shadow-md hover:bg-[#721522] transition-colors flex justify-center items-center gap-2 cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
                Login / Sign Up
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#8a1c2a] flex items-center justify-center text-[#ffcf9c] text-xl font-bold border-2 border-white shadow-md">
                   {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div>
                  <h3 className="font-bold text-[#8a1c2a] text-lg leading-tight">{user?.name || 'Vaidik User'}</h3>
                  <p className="text-sm text-gray-850 font-medium">{user?.phoneNumber || ''}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                 <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-2 px-3 bg-white border border-gray-200 rounded-md text-sm font-semibold hover:bg-orange-50 hover:text-[#ee6c1e]">My Profile</Link>
                 <Link href="/wallet" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-2 px-3 bg-white border border-gray-200 rounded-md text-sm font-semibold hover:bg-orange-50 hover:text-[#ee6c1e]">Wallet</Link>
                 <Link href="/orders" onClick={() => setIsMobileMenuOpen(false)} className="text-center py-2 px-3 bg-white border border-gray-200 rounded-md text-sm font-semibold hover:bg-orange-50 hover:text-[#ee6c1e]">Orders</Link>
                 <button onClick={() => { setIsMobileMenuOpen(false); logout(); }} className="text-center py-2 px-3 bg-white border border-red-200 text-red-600 rounded-md text-sm font-semibold hover:bg-red-50">Logout</button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {/* Consult Accordion */}
          <div>
            <button onClick={() => toggleAccordion('consult')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 text-[#8a1c2a] font-bold">
              <span className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Consult an Astrologer
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${expandedMenu === 'consult' ? 'rotate-180 text-[#ee6c1e]' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {expandedMenu === 'consult' && (
              <div className="pl-9 py-2 space-y-2 border-l-2 border-orange-100 ml-5">
                <Link href="/astrologers-chat" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Chat with Astrologer</Link>
                <Link href="/astrologers-call" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Talk with Astrologer</Link>
                <Link href="/ai-astrologer-chat" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Chat with AI Astrologer</Link>
                <Link href="/ai-astrologer-chat" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Talk with AI Astrologer</Link>
              </div>
            )}
          </div>
          
          <div className="h-px bg-gray-100 my-2 mx-3"></div>

          {/* Kundli Accordion */}
          <div>
            <button onClick={() => toggleAccordion('kundli')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
              Kundli &amp; Reports
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${expandedMenu === 'kundli' ? 'rotate-180 text-[#ee6c1e]' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {expandedMenu === 'kundli' && (
              <div className="pl-6 py-2 space-y-2 border-l-2 border-orange-100 ml-4">
                <p className="text-[10px] font-semibold text-[#ee6c1e] uppercase tracking-wider">Premium Reports</p>
                <Link href="/report/kundali/vaidik-smart-kundali-10-years" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Vaidik Smart Kundali</Link>
                <Link href="/report/kundali/kundali-matching" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Kundali Matching</Link>
                <Link href="/report/kundali/personalized-lal-kitab" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Personalized Lal Kitab</Link>
                <Link href="/report/kundali/hastlikhit-kundali" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Hastlikhit Kundali</Link>
                <p className="text-[10px] font-semibold text-[#ee6c1e] uppercase tracking-wider mt-4">Premium Numerology</p>
                <Link href="/report/numerology/fortune-numerology" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Fortune Numerology</Link>
                <Link href="/report/numerology/name-mobile-number-numerology" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Name & Mobile Numerology</Link>
                <p className="text-[10px] font-semibold text-[#ee6c1e] uppercase tracking-wider mt-4">Free Reports</p>
                <Link href="/free-reports/kaal-sarp" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Kaal Sarp Dosh</Link>
                <Link href="/free-reports/gemstone" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Gemstone Suggestion</Link>
                <Link href="/free-reports/sade-sati" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Sade Sati Check</Link>
              </div>
            )}
          </div>

          {/* Tools Accordion */}
          <div>
            <button onClick={() => toggleAccordion('tools')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
              Free Astrology Tools
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${expandedMenu === 'tools' ? 'rotate-180 text-[#ee6c1e]' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {expandedMenu === 'tools' && (
              <div className="pl-6 py-2 space-y-2 border-l-2 border-orange-100 ml-4">
                <Link href="/kundli" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Kundli Generation</Link>
                <Link href="/horoscope-matching" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Horoscope Matching</Link>
                <Link href="/moon-signs" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Moon Signs</Link>
                <Link href="/rashi-calculator" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Rashi Calculator</Link>
                <Link href="/numerology" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Numerology</Link>
                <Link href="/compatibility" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Love Compatibility</Link>
                <Link href="/lal-kitab" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Lal Kitab Reading</Link>
                <Link href="/atlas" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Atlas / Location Finder</Link>
                <Link href="/panchang" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Panchang Today</Link>
                <Link href="/rahu-kaal" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Rahu Kaal Today</Link>
                <Link href="/muhurat" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Muhurat Finder</Link>
                <Link href="/baby-names" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Baby Names</Link>
                <Link href="/chinese-horoscope" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Chinese Horoscope</Link>
                <Link href="/festivals" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Festivals Calendar</Link>
                <Link href="/calendar" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Astrology Calendar</Link>
              </div>
            )}
          </div>

          {/* Horoscope Accordion */}
          <div>
            <button onClick={() => toggleAccordion('horoscope')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
              Horoscope
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${expandedMenu === 'horoscope' ? 'rotate-180 text-[#ee6c1e]' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {expandedMenu === 'horoscope' && (
              <div className="pl-6 py-2 space-y-2 border-l-2 border-orange-100 ml-4">
                <p className="text-[10px] font-semibold text-[#ee6c1e] uppercase tracking-wider">Time-Based</p>
                <Link href="/daily-horoscope" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Daily Horoscope</Link>
                <Link href="/horoscope/tomorrow" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Tomorrow&apos;s Horoscope</Link>
                <Link href="/horoscope/weekly" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Weekly Horoscope</Link>
                <Link href="/horoscope/monthly" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Monthly Horoscope</Link>
                <Link href="/horoscope/yearly" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Yearly Horoscope</Link>
                <p className="text-[10px] font-semibold text-[#ee6c1e] uppercase tracking-wider mt-4">Specialty</p>
                <Link href="/horoscope-matching" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Horoscope Matching</Link>
                <Link href="/love-horoscope" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Love Horoscope</Link>
                <Link href="/chinese-horoscope" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Chinese Horoscope</Link>
                <Link href="/celebrity-horoscopes" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Celebrity Horoscope</Link>
              </div>
            )}
          </div>

          {/* Pujas Accordion */}
          <div>
            <button onClick={() => toggleAccordion('pujas')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
              Book a Remedy Puja
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${expandedMenu === 'pujas' ? 'rotate-180 text-[#ee6c1e]' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {expandedMenu === 'pujas' && (
              <div className="pl-6 py-2 space-y-2 border-l-2 border-orange-100 ml-4 max-h-[300px] overflow-y-auto">
                <Link href="/book-a-puja" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-bold text-[#8a1c2a] py-1.5 hover:text-[#ee6c1e]">View All Pujas →</Link>
                {navPujas.map(puja => (
                  <Link key={puja._id} href={`/book-a-puja/${puja.slug}`} onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e] truncate">
                    {puja.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Knowledge Accordion */}
          <div>
            <button onClick={() => toggleAccordion('knowledge')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
              Knowledge Center
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${expandedMenu === 'knowledge' ? 'rotate-180 text-[#ee6c1e]' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
            </button>
            {expandedMenu === 'knowledge' && (
              <div className="pl-6 py-2 space-y-2 border-l-2 border-orange-100 ml-4">
                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Blogs / Insights</Link>
                <Link href="/faq" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">FAQ</Link>
                <Link href="/muhurat/directory" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Muhurat Directory 2026</Link>
                <Link href="/festivals" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Festivals Calendar</Link>
                <Link href="/celebrity-horoscopes" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Celebrity Horoscope</Link>
                <Link href="/healing" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Healings</Link>
                <Link href="/matrimony" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Matrimony</Link>
                <Link href="/learn" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">Learn Astrology</Link>
              </div>
            )}
          </div>

          <Link href="/about-us" onClick={() => setIsMobileMenuOpen(false)} className="block p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">About Us</Link>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
      />
    </>
  );
}