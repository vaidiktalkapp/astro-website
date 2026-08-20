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
        <div className="absolute top-full left-0 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.1)] rounded-xl min-w-[600px] p-4 border border-[#f0ddc0]/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 whitespace-normal before:absolute before:-top-4 before:left-0 before:w-full before:h-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            <div className="col-span-2 mb-2 pb-2 border-b border-[#f0ddc0]/40">
              <Link href="/book-a-puja" className="inline-block px-3 py-2 text-[14px] text-[#8a1c2a] font-bold hover:bg-[#fdf8f0] hover:text-[#ee6c1e] rounded-lg transition-colors">View All Pujas →</Link>
            </div>
            <div className="flex flex-col space-y-1">
              {navPujas.slice(0, Math.ceil(navPujas.length / 2)).map(puja => (
                <Link key={puja._id} href={`/book-a-puja/${puja.slug}`} className="block px-3 py-2.5 text-[14px] font-medium text-[#3a1216] hover:bg-[#fdf8f0] hover:text-[#ee6c1e] rounded-lg truncate transition-colors" title={puja.title}>
                  {puja.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col space-y-1">
              {navPujas.slice(Math.ceil(navPujas.length / 2)).map(puja => (
                <Link key={puja._id} href={`/book-a-puja/${puja.slug}`} className="block px-3 py-2.5 text-[14px] font-medium text-[#3a1216] hover:bg-[#fdf8f0] hover:text-[#ee6c1e] rounded-lg truncate transition-colors" title={puja.title}>
                  {puja.title}
                </Link>
              ))}
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

  // 4. Standard Dropdowns (Generic or Kundli etc.)
  const uniqueGroups = Array.from(new Set(mySubMenus.map(m => m.group || 'General')));
  const isMultiColumn = uniqueGroups.length > 1 || mySubMenus.length > 7;

  return (
    <div key={topMenu._id} className={`relative group cursor-pointer ${topMenu.category === 'consult' ? 'flex items-center py-4' : ''}`}>
      <Link href={topMenu.url || '#'} className={topMenu.category === 'consult' ? "bg-[#8a1c2a] text-white px-3 2xl:px-4 py-[7px] 2xl:py-[8px] rounded-md hover:bg-[#721522] transition-colors font-semibold flex items-center gap-1.5" : "hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4"}>
        {topMenu.title}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </Link>
      
      <div className={`absolute ${
        topMenu.category === 'consult' 
          ? 'top-[calc(100%-8px)] right-0 min-w-[240px]' 
          : topMenu.category === 'knowledge' 
            ? `top-full right-[-50px] xl:right-[-100px] 2xl:right-[-150px] ${isMultiColumn ? 'min-w-[560px]' : 'min-w-[280px]'}`
            : `top-full left-0 ${isMultiColumn ? 'min-w-[560px]' : 'min-w-[280px]'}`
      } bg-white shadow-[0_15px_50px_rgba(0,0,0,0.1)] rounded-xl p-3 md:p-4 border border-[#f0ddc0]/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 whitespace-normal before:absolute before:-top-4 before:left-0 before:w-full before:h-4`}>
        <div className={isMultiColumn ? "columns-2 gap-x-6" : "flex flex-col space-y-1"}>
          {uniqueGroups.map((grp, idx) => {
            const groupLinks = mySubMenus.filter(m => (m.group || 'General') === grp);

            if (grp === 'General') {
              return (
                <React.Fragment key={grp}>
                  {groupLinks.map(menu => (
                    <Link key={menu._id} href={menu.url} className="flex items-center justify-between px-3 py-2 text-[14px] font-medium text-[#3a1216] hover:bg-[#fdf8f0] hover:text-[#ee6c1e] rounded-lg transition-colors break-inside-avoid mb-1">
                      {menu.title}
                      {menu.badge && <span className="bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ml-2">{menu.badge}</span>}
                    </Link>
                  ))}
                </React.Fragment>
              );
            }

            return (
              <div key={grp} className={`flex flex-col space-y-1 break-inside-avoid ${idx !== uniqueGroups.length - 1 ? 'mb-3' : ''}`}>
                <div className="px-3 py-1.5 text-[11px] font-bold text-[#d97706] uppercase tracking-wider mb-1 mt-1 border-b border-[#f0ddc0]/30">{grp}</div>
                {groupLinks.map(menu => (
                  <Link key={menu._id} href={menu.url} className="flex items-center justify-between px-3 py-2 text-[14px] font-medium text-[#3a1216] hover:bg-[#fdf8f0] hover:text-[#ee6c1e] rounded-lg transition-colors">
                    {menu.title}
                    {menu.badge && <span className="bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ml-2">{menu.badge}</span>}
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
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