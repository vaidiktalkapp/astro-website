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

const getNavIcon = (title: string) => {
  const t = title.toLowerCase();
  
  if(t.includes('chat') && t.includes('ai')) return <svg width="18" height="18" viewBox="0 0 24 24" fill="#cffafe" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>;
  if(t.includes('talk') && t.includes('ai')) return <svg width="18" height="18" viewBox="0 0 24 24" fill="#f3e8ff" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>;
  if(t.includes('chat')) return <svg width="18" height="18" viewBox="0 0 24 24" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
  if(t.includes('talk') || t.includes('call')) return <svg width="18" height="18" viewBox="0 0 24 24" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  
  if(t.includes('celebrity')) return '👑';
  if(t.includes('daily') || t.includes('today')) return <svg width="18" height="18" viewBox="0 0 24 24" fill="#fef08a" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
  if(t.includes('tomorrow')) return '🔭';
  if(t.includes('weekly')) return <svg width="18" height="18" viewBox="0 0 24 24" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>;
  if(t.includes('monthly')) return '🌕';
  if(t.includes('yearly')) return '🪐';
  if(t.includes('blog') || t.includes('insight')) return '📰';
  if(t.includes('faq')) return '💬';
  if(t.includes('matrimony')) return '💞';
  // Specific Pujas and Reports
  if(t.includes('rudrabhishek') || t.includes('shiv') || t.includes('mahamrityunjay')) return '🕉️';
  if(t.includes('mangal')) return '🔴';
  if(t.includes('hanuman')) return '🚩';
  if(t.includes('job') || t.includes('career') || t.includes('business')) return '💼';
  if(t.includes('money') || t.includes('dhan')) return '💰';
  if(t.includes('ganesh') || t.includes('ganapati')) return '🐘';
  if(t.includes('vishnu') || t.includes('satyanarayan')) return '🐚';
  if(t.includes('shani')) return '🪐';
  if(t.includes('rahu') || t.includes('ketu')) return '🌑';
  if(t.includes('attract your love')) return '🧲';
  if(t.includes('commitment')) return '💍';
  if(t.includes('love') || t.includes('marriage') || t.includes('spell')) return '💖';

  // Fallbacks
  if(t.includes('heal')) return '🌿';
  if(t.includes('learn') || t.includes('course')) return '📚';
  if(t.includes('puja') || t.includes('pooja')) return '🪔';
  
  if(t.includes('kundali matching') || t.includes('kundli matching')) return '💑';
  if(t.includes('smart kundali') || t.includes('smart kundli')) return '🔮';
  if(t.includes('kundli') || t.includes('kundali')) return '🕉️';
  if(t.includes('flame')) return '❤️‍🔥';
  if(t.includes('love') || t.includes('match') || t.includes('compatibility')) return '💖';
  if(t.includes('numerology') || t.includes('destiny')) return '🔢';
  if(t.includes('nakshatra')) return '🌟';
  if(t.includes('sade sati')) return '🪐';
  if(t.includes('rudraksha')) return '📿';
  if(t.includes('gemstone')) return '💎';
  if(t.includes('muhurat')) return '🔔';
  if(t.includes('date')) return '📆';
  if(t.includes('color')) return '🎨';
  if(t.includes('lal kitab')) return '📕';
  if(t.includes('baby')) return '👶';
  if(t.includes('moon')) return '🌙';
  if(t.includes('rashi')) return '🧿';
  if(t.includes('chinese')) return '🐉';
  if(t.includes('festival')) return '🎉';
  if(t.includes('panchang')) return '📜';
  if(t.includes('rahu')) return '🌑';
  if(t.includes('atlas') || t.includes('location')) return '🗺️';
  if(t.includes('horoscope') || t.includes('report')) return '📜';
  if(t.includes('kaal sarp')) return '🐍';
  if(t.includes('occult')) return '👁️';
  return '⭐';
};

const getNavLineColor = (title: string) => {
  const t = title.toLowerCase();
  
  if(t.includes('chat') && t.includes('ai')) return 'bg-cyan-500';
  if(t.includes('talk') && t.includes('ai')) return 'bg-purple-500';
  if(t.includes('chat')) return 'bg-green-500';
  if(t.includes('talk') || t.includes('call')) return 'bg-blue-500';

  if(t.includes('daily') || t.includes('tomorrow')) return 'bg-sky-400';
  if(t.includes('weekly') || t.includes('monthly')) return 'bg-indigo-400';
  if(t.includes('yearly')) return 'bg-fuchsia-400';
  if(t.includes('celebrity')) return 'bg-yellow-400';

  if(t.includes('rudrabhishek') || t.includes('shiv') || t.includes('mahamrityunjay')) return 'bg-slate-400';
  if(t.includes('mangal') || t.includes('hanuman')) return 'bg-red-500';
  if(t.includes('job') || t.includes('career') || t.includes('business')) return 'bg-blue-500';
  if(t.includes('money') || t.includes('dhan')) return 'bg-green-500';
  if(t.includes('ganesh') || t.includes('vishnu')) return 'bg-yellow-500';
  if(t.includes('shani') || t.includes('rahu') || t.includes('ketu')) return 'bg-gray-600';
  if(t.includes('love') || t.includes('marriage') || t.includes('spell') || t.includes('heal')) return 'bg-pink-500';
  if(t.includes('puja') || t.includes('pooja')) return 'bg-orange-400';
  
  if(t.includes('destiny') || t.includes('numerology') || t.includes('kundli') || t.includes('kundali')) return 'bg-amber-400';
  if(t.includes('rudraksha') || t.includes('gemstone') || t.includes('baby')) return 'bg-teal-400';
  if(t.includes('date') || t.includes('muhurat') || t.includes('panchang')) return 'bg-emerald-400';
  if(t.includes('love') || t.includes('flame') || t.includes('lal kitab') || t.includes('match') || t.includes('matrimony')) return 'bg-rose-400';
  if(t.includes('chinese') || t.includes('festival')) return 'bg-red-400';
  if(t.includes('moon') || t.includes('atlas') || t.includes('rashi')) return 'bg-blue-400';
  if(t.includes('rahu') || t.includes('sade') || t.includes('kaal')) return 'bg-stone-500';
  return 'bg-violet-400';
};

const renderIcon = (iconVal: any, title: string) => {
  const finalIcon = iconVal || getNavIcon(title);
  if (typeof finalIcon === 'string' && finalIcon.trim().startsWith('<svg')) {
    return <span dangerouslySetInnerHTML={{ __html: finalIcon }} className="inline-flex items-center justify-center" />;
  }
  return finalIcon;
};

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
  const [navMenus, setNavMenus] = useState<any[]>([]);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  const topLevelMenus = navMenus.filter(m => m.isTopLevel).sort((a,b) => (a.order || 0) - (b.order || 0));
  const subMenus = navMenus.filter(m => !m.isTopLevel);

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const [pujasRes, menusRes] = await Promise.all([
          axios.get(`${apiUrl}/pujas?status=active&limit=12`).catch(() => ({ data: { data: [] } })),
          axios.get(`${apiUrl}/menus`).catch(() => ({ data: [] }))
        ]);
        setNavPujas(pujasRes.data.data || []);
        
        // Filter out inactive menus for the frontend
        const activeMenus = (menusRes.data || []).filter((m: any) => m.isActive);
        setNavMenus(activeMenus);
      } catch (error) {
        console.error('Failed to load nav data', error);
      }
    };
    fetchNavData();
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
            {topLevelMenus.map(topMenu => {
  const mySubMenus = subMenus.filter(m => m.category === topMenu.category);
  
  // 1. Direct Links (No Submenus & Not Special)
  if (mySubMenus.length === 0 && topMenu.category !== 'pujas' && topMenu.category !== 'shop') {
    return (
      <Link key={topMenu._id} href={topMenu.url || '/'} className={topMenu.category === 'consult' ? 'bg-[#8a1c2a] text-white px-3 py-[7px] rounded-md hover:bg-[#721522] transition-colors font-semibold' : 'hover:text-[#ee6c1e] transition-colors py-4'}>
        {topMenu.title}
      </Link>
    );
  }

  // 2. Special Case: Pujas Dropdown
  if (topMenu.category === 'pujas') {
    return (
      <div key={topMenu._id} className="relative group cursor-pointer">
        <Link href={topMenu.url || '/book-a-puja'} className="hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4">
          {topMenu.title}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </Link>
        <div className="absolute top-full right-[-50px] xl:right-[-100px] 2xl:right-[-150px] bg-white/95 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-2xl min-w-[640px] p-5 border border-[#e5b975]/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 translate-y-3 group-hover:translate-y-0 z-50 whitespace-normal before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <div className="col-span-2 mb-3 pb-3 border-b-2 border-dashed border-[#f0ddc0]/50 text-center">
              <span className="text-[12px] font-extrabold text-[#8a1c2a] uppercase tracking-wider">Top Verified Pujas</span>
            </div>
            <div className="flex flex-col space-y-1">
              {navPujas.slice(0, Math.ceil(navPujas.length / 2)).map(puja => (
                <Link key={puja._id} href={`/book-a-puja/${puja.slug}`} className="group/calc flex items-center justify-between px-3.5 py-2.5 bg-white border border-[#f0ddc0]/80 rounded-2xl hover:border-[#d97706]/40 hover:shadow-[0_4px_15px_rgba(217,119,6,0.08)] transition-all duration-300 mb-1" title={puja.title}>
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                    <div className={`w-[3px] h-6 ${getNavLineColor(puja.title)} rounded-full shrink-0`} />
                    <div className="text-[18px] shrink-0 leading-none flex items-center justify-center">{renderIcon(puja.icon, puja.title)}</div>
                    <span className="text-[13.5px] font-bold text-[#3a1216] group-hover/calc:text-[#ee6c1e] transition-colors truncate">{puja.title}</span>
                  </div>
                  <div className="flex items-center shrink-0">
                    <span className="text-[#a0a0a0] font-light text-[18px] group-hover/calc:text-[#ee6c1e] group-hover/calc:translate-x-1 transition-all">→</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-1">
              {navPujas.slice(Math.ceil(navPujas.length / 2)).map(puja => (
                <Link key={puja._id} href={`/book-a-puja/${puja.slug}`} className="group/calc flex items-center justify-between px-3.5 py-2.5 bg-white border border-[#f0ddc0]/80 rounded-2xl hover:border-[#d97706]/40 hover:shadow-[0_4px_15px_rgba(217,119,6,0.08)] transition-all duration-300 mb-1" title={puja.title}>
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                    <div className={`w-[3px] h-6 ${getNavLineColor(puja.title)} rounded-full shrink-0`} />
                    <div className="text-[18px] shrink-0 leading-none flex items-center justify-center">{renderIcon(puja.icon, puja.title)}</div>
                    <span className="text-[13.5px] font-bold text-[#3a1216] group-hover/calc:text-[#ee6c1e] transition-colors truncate">{puja.title}</span>
                  </div>
                  <div className="flex items-center shrink-0">
                    <span className="text-[#a0a0a0] font-light text-[18px] group-hover/calc:text-[#ee6c1e] group-hover/calc:translate-x-1 transition-all">→</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="col-span-2 mt-4 pt-4 border-t-2 border-dashed border-[#f0ddc0]/50">
              <Link href="/book-a-puja" className="flex items-center justify-center gap-1.5 w-full py-3 text-[14px] text-white bg-gradient-to-r from-[#d97706] to-[#b45309] font-bold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 shadow-md group/btn">
                View All Pujas 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Special Case: Shop
  if (topMenu.category === 'shop') {
    return (
      <a key={topMenu._id} href={topMenu.url || 'https://vaidiktalk.store/'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-[#ee6c1e] text-white px-3.5 py-2 rounded-md font-bold hover:bg-[#d65f17] transition-colors shadow-sm ml-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
        {topMenu.title}
      </a>
    );
  }

  // 3.5 Special Case: Free Calculators Mega Menu
  if (topMenu.title === 'Free Astrology Tools' || (topMenu.url || '').includes('calculator')) {
    return (
      <div key={topMenu._id} className="relative group cursor-pointer">
        <Link href={topMenu.url || '/astrology-calculators'} className="hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4">
          {topMenu.title}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </Link>
        <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-3xl min-w-[750px] max-h-[85vh] overflow-y-auto p-5 lg:p-6 border border-[#e5b975]/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 translate-y-3 group-hover:translate-y-0 z-50 whitespace-normal before:absolute before:-top-4 before:left-0 before:w-full before:h-4 custom-scrollbar">
          <h2 className="text-[20px] font-extrabold text-[#1a1208] mb-4 tracking-tight">Free Calculator</h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {mySubMenus.map(menu => {
              return (
                <Link key={menu._id} href={menu.url} className="group/calc flex items-center justify-between px-3.5 py-2.5 bg-white border border-[#f0ddc0]/80 rounded-2xl hover:border-[#d97706]/40 hover:shadow-[0_4px_15px_rgba(217,119,6,0.08)] transition-all duration-300">
                  <div className="flex items-center gap-3 w-full">
                    <div className={`w-[3px] h-6 ${getNavLineColor(menu.title)} rounded-full shrink-0`} />
                    <div className="text-[18px] shrink-0 leading-none flex items-center justify-center">{renderIcon(menu.icon, menu.title)}</div>
                    <span className="text-[13.5px] font-bold text-[#3a1216] group-hover/calc:text-[#ee6c1e] transition-colors truncate">{menu.title}</span>
                  </div>
                  <span className="text-[#a0a0a0] font-light text-[18px] group-hover/calc:text-[#ee6c1e] group-hover/calc:translate-x-1 transition-all shrink-0 ml-2">→</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-5 text-center pb-2">
            <Link href="/astrology-calculators" className="text-[#b45309] font-bold text-[14.5px] hover:text-[#d97706] transition-colors inline-flex items-center gap-1.5 group/btn">
              View all Calculators <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Standard Dropdowns (Generic or Kundli etc.)
  const uniqueGroups = Array.from(new Set(mySubMenus.map(m => m.group || 'General')));
  const isMultiColumn = uniqueGroups.length > 1 || mySubMenus.length > 7;

  return (
    <div key={topMenu._id} className={`relative group cursor-pointer ${topMenu.category === 'consult' ? 'flex items-center py-4' : ''}`}>
      <Link href={topMenu.url || '#'} className={topMenu.category === 'consult' ? "bg-gradient-to-r from-[#8a1c2a] to-[#721522] text-white px-4 py-[8px] rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-1.5 border border-[#8a1c2a]" : "hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4"}>
        {topMenu.title}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </Link>
      
      <div className={`absolute ${
        topMenu.category === 'consult' 
          ? 'top-[calc(100%-8px)] right-0 min-w-[260px]' 
          : topMenu.category === 'knowledge'
            ? `top-full right-[-20px] xl:right-[-50px] ${isMultiColumn ? 'min-w-[650px]' : 'min-w-[250px]'}`
            : isMultiColumn
              ? 'top-full left-[-20px] xl:left-[-50px] min-w-[650px]'
              : 'top-full left-0 min-w-[250px]'
      } bg-white/95 backdrop-blur-md shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-2xl p-4 md:p-5 border border-[#e5b975]/40 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-400 translate-y-3 group-hover:translate-y-0 z-50 whitespace-normal before:absolute before:-top-4 before:left-0 before:w-full before:h-4`}>
        <div className={isMultiColumn ? "columns-2 gap-x-8" : "flex flex-col space-y-1"}>
          {uniqueGroups.map((grp, idx) => {
            const groupLinks = mySubMenus.filter(m => (m.group || 'General') === grp);

            if (grp === 'General') {
              return (
                <React.Fragment key={grp}>
                  {groupLinks.map(menu => (
                    <Link key={menu._id} href={menu.url} className="group/calc flex items-center justify-between px-3.5 py-2.5 bg-white border border-[#f0ddc0]/80 rounded-2xl hover:border-[#d97706]/40 hover:shadow-[0_4px_15px_rgba(217,119,6,0.08)] transition-all duration-300 mb-1">
                      <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                        <div className={`w-[3px] h-6 ${getNavLineColor(menu.title)} rounded-full shrink-0`} />
                        <div className="text-[18px] shrink-0 leading-none flex items-center justify-center">{renderIcon(menu.icon, menu.title)}</div>
                        <span className="text-[13.5px] font-bold text-[#3a1216] group-hover/calc:text-[#ee6c1e] transition-colors truncate">{menu.title}</span>
                        {menu.badge && <span className="bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ml-1">{menu.badge}</span>}
                      </div>
                      <div className="flex items-center shrink-0">
                        <span className="text-[#a0a0a0] font-light text-[18px] group-hover/calc:text-[#ee6c1e] group-hover/calc:translate-x-1 transition-all">→</span>
                      </div>
                    </Link>
                  ))}
                </React.Fragment>
              );
            }

            return (
              <div key={grp} className={`flex flex-col space-y-1 break-inside-avoid ${idx !== uniqueGroups.length - 1 ? 'mb-4' : ''}`}>
                <div className="px-3.5 py-1.5 text-[11px] font-extrabold text-[#d97706] uppercase tracking-wider mb-2 mt-1 border-b-2 border-dashed border-[#f0ddc0]/50 pb-2 flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  {grp}
                </div>
                {groupLinks.map(menu => (
                  <Link key={menu._id} href={menu.url} className="group/calc flex items-center justify-between px-3.5 py-2.5 bg-white border border-[#f0ddc0]/80 rounded-2xl hover:border-[#d97706]/40 hover:shadow-[0_4px_15px_rgba(217,119,6,0.08)] transition-all duration-300 mb-2">
                    <div className="flex items-center gap-3 flex-1 min-w-0 pr-2">
                      <div className={`w-[3px] h-6 ${getNavLineColor(menu.title)} rounded-full shrink-0`} />
                      <div className="text-[18px] shrink-0 leading-none flex items-center justify-center">{renderIcon(menu.icon, menu.title)}</div>
                      <span className="text-[13.5px] font-bold text-[#3a1216] group-hover/calc:text-[#ee6c1e] transition-colors truncate">{menu.title}</span>
                      {menu.badge && <span className="bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ml-1">{menu.badge}</span>}
                    </div>
                    <div className="flex items-center shrink-0">
                      <span className="text-[#a0a0a0] font-light text-[18px] group-hover/calc:text-[#ee6c1e] group-hover/calc:translate-x-1 transition-all">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>

        {/* View All Free Calculators Button is handled in the Special Case above */}
      </div>
    </div>
  );
})}
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
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
          {topLevelMenus.map(topMenu => {
            const mySubMenus = subMenus.filter(m => m.category === topMenu.category);

            // Direct Links
            if (mySubMenus.length === 0 && topMenu.category !== 'pujas' && topMenu.category !== 'shop') {
              return (
                <div key={topMenu._id}>
                  <Link href={topMenu.url || '/'} onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
                    {topMenu.title}
                  </Link>
                </div>
              );
            }

            // Shop Link
            if (topMenu.category === 'shop') {
              return (
                <a key={topMenu._id} href={topMenu.url || 'https://vaidiktalk.store/'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mx-3 mt-4 mb-4 p-3 rounded-lg bg-[#ee6c1e] text-white font-bold hover:bg-[#d65f17] shadow-sm transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                  {topMenu.title}
                </a>
              );
            }

            // Pujas Special Case
            if (topMenu.category === 'pujas') {
              return (
                <div key={topMenu._id}>
                  <button onClick={() => toggleAccordion('pujas')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
                    {topMenu.title}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${expandedMenu === 'pujas' ? 'rotate-180 text-[#ee6c1e]' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
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
              );
            }

            // Consult Special Case (Red Button Text)
            if (topMenu.category === 'consult') {
              return (
                <div key={topMenu._id}>
                  <button onClick={() => toggleAccordion('consult')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 text-[#8a1c2a] font-bold">
                    <span className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      {topMenu.title}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${expandedMenu === 'consult' ? 'rotate-180 text-[#ee6c1e]' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  {expandedMenu === 'consult' && (
                    <div className="pl-9 py-2 space-y-2 border-l-2 border-orange-100 ml-5">
                      {mySubMenus.map(menu => (
                        <Link key={menu._id} href={menu.url} onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">{menu.title}</Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Generic Dropdowns
            const uniqueGroups = Array.from(new Set(mySubMenus.map(m => m.group || 'General')));

            return (
              <div key={topMenu._id}>
                <button onClick={() => toggleAccordion(topMenu.category)} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
                  {topMenu.title}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transform transition-transform ${expandedMenu === topMenu.category ? 'rotate-180 text-[#ee6c1e]' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {expandedMenu === topMenu.category && (
                  <div className="pl-6 py-2 space-y-2 border-l-2 border-orange-100 ml-4">
                    {uniqueGroups.map((grp, idx) => (
                      <div key={grp}>
                        {grp !== 'General' && (
                          <p className={`text-[10px] font-semibold text-[#ee6c1e] uppercase tracking-wider ${idx > 0 ? 'mt-4' : ''}`}>{grp}</p>
                        )}
                        {mySubMenus.filter(m => (m.group || 'General') === grp).map(menu => (
                          <Link key={menu._id} href={menu.url} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">
                            {menu.title} {menu.badge && <span className="ml-2 bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">{menu.badge}</span>}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
      />
    </>
  );
}