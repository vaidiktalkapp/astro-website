'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import astrologerService from '@/lib/astrologerService';
import aiAstrologerService from '@/lib/aiAstrologerService';
import astrologyService from '@/lib/astrologyService';
import { getImageUrl } from '@/lib/imageUtils';
import { format } from 'date-fns';
import HeroBanner from '@/components/home/HeroBanner';
import DailyHoroscope from '@/components/home/DailyHoroscope';
import CountUp from '@/components/ui/CountUp';

interface HomePageClientProps {
  initialSettings?: any;
  initialFaqs?: any[];
  initialBlogs?: any[];
  initialTestimonials?: any[];
  initialTopAstrologers?: any[];
  initialAiAstrologers?: any[];
  initialDailyPanchang?: any;
  initialDailyHoroscopes?: any[];
}

export default function HomePage({ 
  initialSettings = null,
  initialFaqs = [], 
  initialBlogs = [], 
  initialTestimonials = [],
  initialTopAstrologers = [],
  initialAiAstrologers = [],
  initialDailyPanchang = null,
  initialDailyHoroscopes = []
}: HomePageClientProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  
  // Use SSR data
  const [topAstrologers, setTopAstrologers] = useState<any[]>(initialTopAstrologers);
  const [loadingAstros, setLoadingAstros] = useState(initialTopAstrologers.length === 0);
  
  const [aiAstrologers, setAiAstrologers] = useState<any[]>(initialAiAstrologers);
  const [loadingAiAstros, setLoadingAiAstros] = useState(initialAiAstrologers.length === 0);
  
  const [dailyPanchang, setDailyPanchang] = useState<any>(initialDailyPanchang);
  
  // Use SSR data to prevent empty initial render in source code
  const [testimonials, setTestimonials] = useState<any[]>(initialTestimonials);
  const [loadingTestimonials, setLoadingTestimonials] = useState(initialTestimonials.length === 0);
  
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const [recentBlogs, setRecentBlogs] = useState<any[]>(initialBlogs);
  const [loadingBlogs, setLoadingBlogs] = useState(initialBlogs.length === 0);
  
  const [faqs, setFaqs] = useState<any[]>(initialFaqs);
  const [loadingFaqs, setLoadingFaqs] = useState(initialFaqs.length === 0);

  // Refs for horizontal scrolling
  const astroRef = React.useRef<HTMLDivElement>(null);
  const aiAstroRef = React.useRef<HTMLDivElement>(null);
  const testiRef = React.useRef<HTMLDivElement>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchTopAstrologers = async () => {
      if (initialTopAstrologers.length > 0) return;
      try {
        const response = await astrologerService.searchAstrologers({ limit: 10, isOnline: true });
        setTopAstrologers(response.data || []);
      } catch (error) {
        console.error('Failed to fetch top astrologers:', error);
      } finally {
        setLoadingAstros(false);
      }
    };

    const fetchAiAstrologers = async () => {
      if (initialAiAstrologers.length > 0) return;
      try {
        const data = await aiAstrologerService.getAllAiAstrologers();
        setAiAstrologers(data || []);
      } catch (error) {
        console.error('Failed to fetch AI astrologers:', error);
      } finally {
        setLoadingAiAstros(false);
      }
    };

    const fetchDailyData = async () => {
      if (initialDailyPanchang) return;
      try {
        const response = await astrologyService.getTodayPanchang();
        if (response?.data) {
          setDailyPanchang(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch daily panchang:', error);
      }
    };


    const fetchTestimonials = async () => {
      if (initialTestimonials.length > 0) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await fetch(`${apiUrl}/testimonials`);
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data || []);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoadingTestimonials(false);
      }
    };

    const fetchRecentBlogs = async () => {
      if (initialBlogs.length > 0) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        let response = await fetch(`${apiUrl}/blogs?status=published&limit=8&isFeatured=true`);

        if (response.ok) {
          let data = await response.json();
          let blogs = data.data || [];

          if (blogs.length < 5) {
            const fallbackRes = await fetch(`${apiUrl}/blogs?status=published&limit=${8}`);
            const fallbackData = await fallbackRes.json();
            const fallbackBlogs = fallbackData.data || [];
            
            const existingIds = new Set(blogs.map((b: any) => b._id));
            const additionalBlogs = fallbackBlogs.filter((b: any) => !existingIds.has(b._id));
            
            blogs = [...blogs, ...additionalBlogs].slice(0, 8);
          }
          setRecentBlogs(blogs);
        }
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoadingBlogs(false);
      }
    };

    const fetchFeaturedFaqs = async () => {
      if (initialFaqs.length > 0) return;
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await fetch(`${apiUrl}/faqs?status=active&isFeatured=true&limit=6`);
        if (response.ok) {
          const data = await response.json();
          setFaqs(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoadingFaqs(false);
      }
    };

    fetchTopAstrologers();
    fetchAiAstrologers();
    fetchDailyData();
    fetchTestimonials();
    fetchRecentBlogs();
    fetchFeaturedFaqs();
  }, [
    initialBlogs.length, 
    initialFaqs.length, 
    initialTestimonials.length,
    initialTopAstrologers.length,
    initialAiAstrologers.length,
    initialDailyPanchang
  ]);


  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };


  return (
    <div className="relative w-full max-w-[1600px] min-w-[320px] mx-auto overflow-hidden">
      {/* Premium Ambient Background Elements */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#f8e2c9] rounded-full mix-blend-multiply filter blur-[120px] opacity-20 pointer-events-none z-0"></div>
      <div className="absolute top-[20%] right-[-10%] w-[700px] h-[700px] bg-[#f3d5b5] rounded-full mix-blend-multiply filter blur-[150px] opacity-15 pointer-events-none z-0"></div>
      <div className="absolute bottom-[30%] left-[-20%] w-[900px] h-[900px] bg-[#f8e2c9] rounded-full mix-blend-multiply filter blur-[150px] opacity-15 pointer-events-none z-0"></div>
      <div className="absolute top-[60%] right-[10%] w-[600px] h-[600px] bg-[#fdf0e0] rounded-full mix-blend-multiply filter blur-[100px] opacity-25 pointer-events-none z-0"></div>

      <HeroBanner initialSettings={initialSettings} />

      <div className="px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="text-left flex-1">
            <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] mb-3">
              What <span className="text-[#d97706]">brings you here</span> today?
            </h2>
            <p className="text-[#6E2F37] text-[18px] md:text-[19px] max-w-3xl leading-relaxed">
              Choose your life concern and get the right guidance from India's most trusted Vedic astrologers. Whether you seek clarity on marriage, career, or health, our experts are here to help you navigate life's challenges with confidence.
            </p>
          </div>
          {/* <Link href="/intent-hubs" className="shrink-0 hidden md:flex bg-[#5c1420] text-white font-bold text-[14px] md:text-[15px] px-7 py-3 rounded-full hover:bg-[#721522] shadow-sm transition-all items-center gap-2">
            View All Life Problems
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </Link> */}
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3.5">
          {[
            {
              name: 'Marriage & Relationship',
              slug: '/marriage-astrology',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12l4 6-10 13L2 9Z" />
                  <path d="M11.16 12.55 12 22l.84-9.45" />
                  <path d="M2 9h20" />
                  <path d="m6 3 5 6" />
                  <path d="m18 3-5 6" />
                </svg>
              ),
            },
            {
              name: 'Career & Job',
              slug: '/career-astrology',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              ),
            },
            {
              name: 'Business & Finance',
              slug: '/finance-astrology',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              ),
            },
            {
              name: 'Love & Compatibility',
              slug: '/love-astrology',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
            },
            {
              name: 'Health & Wellness',
              slug: '/health-astrology',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              ),
            },
            {
              name: 'Education & Study',
              slug: '/education-astrology',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10L12 5 2 10l10 5 10-5Z" />
                  <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
                </svg>
              ),
            },
            {
              name: 'Children & Family',
              slug: '/child-astrology',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="7" r="3" />
                  <circle cx="17" cy="7" r="2.5" />
                  <path d="M2 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1" />
                  <path d="M17 14.5a4 4 0 0 1 4 4V21" />
                </svg>
              ),
            },
            {
              name: 'Property & Vehicle',
              slug: '/property-astrology',
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l9-7 9 7" />
                  <path d="M5 10v10h14V10" />
                  <path d="M9 20v-6h6v6" />
                </svg>
              ),
            },
          ].map((intent, i) => (
            <Link
              href={intent.slug}
              key={i}
              className="border border-[#f0ddc0] rounded-xl p-4 flex flex-col items-center gap-2.5 bg-white hover:-translate-y-1 hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-[#fbe7d3] flex items-center justify-center text-[#ee6c1e]">
                {intent.icon}
              </div>
              <div className="text-[11.5px] font-semibold text-[#3a1216] text-center leading-tight">{intent.name}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Astrologers */}
      <div className="px-6 md:px-10 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="text-left">
            <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] mb-3">
              Connect with India's <span className="text-[#d97706]">Top Rated</span> Astrologers
            </h2>
            <p className="text-[#6E2F37] text-[18px] md:text-[19px] max-w-3xl leading-relaxed">
              Connect with India's top certified and verified astrologers for expert guidance on your life's journey. Get personalized insights for your career, love life, health, and future.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 shrink-0">
              <button onClick={() => scrollContainer(astroRef, 'left')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] hover:bg-[#5c1420] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={() => scrollContainer(astroRef, 'right')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] hover:bg-[#5c1420] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
            <Link href="/astrologers-chat" className="shrink-0 hidden md:flex bg-[#5c1420] text-white font-bold text-[14px] md:text-[15px] px-7 py-3 rounded-full hover:bg-[#721522] shadow-sm transition-all items-center gap-2">
              View All Astrologers
            </Link>
          </div>
        </div>
        <div ref={astroRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 hide-scrollbar w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {loadingAstros ? (
            [1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="shrink-0 w-[280px] lg:w-[320px] snap-center flex flex-col justify-between h-full border border-[#f0ddc0]/60 rounded-2xl p-5 bg-white text-center animate-pulse">
                <div>
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-4 mt-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mx-auto mb-1.5"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto mb-1.5"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto mb-4"></div>
                </div>
                <div className="flex gap-2.5 mt-auto pt-5">
                  <div className="flex-1 h-9 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 h-9 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))
          ) : topAstrologers.length > 0 ? (
            topAstrologers.slice(0, 10).map((astrologer: any, i: number) => (
              <Link href={`/astrologer/${astrologer._id}`} key={i} className="shrink-0 w-[280px] lg:w-[320px] snap-center group flex flex-col justify-between h-full border border-[#f0ddc0] hover:border-[#ee6c1e]/30 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(230,74,25,0.12)] hover:-translate-y-1.5 rounded-2xl p-3.5 md:p-4.5 bg-white text-left transition-all duration-300 relative overflow-hidden">

                <div>
                  {/* Header: Avatar + Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 md:gap-3.5">
                      <div className="relative w-[45px] h-[45px] md:w-[50px] md:h-[50px] shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden border-[1.5px] border-[#22c55e] p-0.5">
                          <img loading="lazy" src={getImageUrl(astrologer.profileImage || astrologer.profilePicture, astrologer.name)} alt={astrologer.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        {(astrologer.availability?.isOnline || astrologer.status === 'online' || astrologer.isOnline) && (
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#22c55e] rounded-full border-[1.5px] border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[14px] md:text-[15px] text-[#3a1216] flex items-center gap-1.5">
                          {astrologer.name || 'Astrologer'}
                          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#22c55e]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" /></svg>
                        </h3>
                        <p className="text-[11px] md:text-[11.5px] text-gray-850 mt-0.5 truncate max-w-[130px]">
                          {astrologer.experienceYears || 1} yrs exp • {astrologer.languages?.slice(0, 2).join(', ') || 'Hindi'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex gap-1.5 md:gap-2 mt-2.5 md:mt-3.5 flex-wrap">
                    {(astrologer.specializations?.length ? astrologer.specializations : ['Vedic', 'Tarot', 'Vastu']).slice(0, 3).map((skill: string, idx: number) => (
                      <span key={idx} className="text-[10px] md:text-[11px] font-medium text-[#5c1420] border border-[#f0ddc0]/60 rounded-full px-2.5 md:px-3 py-1 bg-[#fdf8f0]/50">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Detailed Info */}
                  <div className="mt-2.5 md:mt-3.5 text-[12px] md:text-[13px] text-[#6E2F37]/90 space-y-0.5 md:space-y-1">
                    <p className="truncate">{astrologer.languages?.join(' • ') || 'English • Hindi • Punjabi'}</p>
                    <p>{astrologer.experienceYears || 1} yrs exp</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-2.5 md:mt-3.5 text-[12px] md:text-[13px] font-bold text-[#2c0d12]">
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <span className="text-[#f59e0b] text-[14px] md:text-[15px]">★</span>
                      <span>{astrologer.ratings?.average ? Number(astrologer.ratings.average).toFixed(1) : '5.0'}</span>
                    </div>
                    <span className={(astrologer.availability?.isOnline || astrologer.status === 'online' || astrologer.isOnline) ? "text-[#22c55e] font-semibold text-[11px] md:text-[12px]" : "text-[#7ea4b5] font-semibold text-[11px] md:text-[12px]"}>
                      {(astrologer.availability?.isOnline || astrologer.status === 'online' || astrologer.isOnline) ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-auto pt-3 md:pt-4 flex gap-2 md:gap-2.5 w-full">
                  <div className="flex-1 flex items-center justify-between border-[1.5px] border-[#8a1c2a] text-[#8a1c2a] rounded-xl px-2.5 md:px-3 py-1.5 md:py-2 hover:bg-[#8a1c2a] hover:text-white transition-colors duration-300">
                    <div className="flex items-center gap-1 md:gap-1.5 text-[12px] md:text-[13.5px] font-bold">
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L18 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 0-2z" /></svg>
                      Call
                    </div>
                    <div className="text-[12px] md:text-[13px] font-bold">₹{astrologer.pricing?.call || 30}/m</div>
                  </div>
                  <div className="flex-1 flex items-center justify-between border-[1.5px] border-[#8a1c2a] text-[#8a1c2a] rounded-xl px-2.5 md:px-3 py-1.5 md:py-2 hover:bg-[#8a1c2a] hover:text-white transition-colors duration-300">
                    <div className="flex items-center gap-1 md:gap-1.5 text-[12px] md:text-[13.5px] font-bold">
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z" /></svg>
                      Chat
                    </div>
                    <div className="text-[12px] md:text-[13px] font-bold">₹{astrologer.pricing?.chat || 30}/m</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            [1, 2, 3, 4].map((_, i) => (
              <div key={i} className="border border-[#f0ddc0]/60 rounded-2xl p-4 bg-white text-center animate-pulse">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-4 mt-1"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mx-auto mb-1.5"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto mb-1.5"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto mb-4"></div>
                <div className="flex gap-2.5">
                  <div className="flex-1 h-9 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 h-9 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/astrologers-chat" className="bg-[#5c1420] text-white font-bold text-[14px] px-7 py-3 rounded-full hover:bg-[#721522] shadow-sm transition-all flex items-center gap-2 w-full justify-center">
            View All Astrologers
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
        </div>
      </div>

      {/* AI Astrologers */}
      <div className="px-6 md:px-10 py-12 bg-[#fdf0e0]/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="text-left">
            <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] mb-3">
              Ask Our <span className="text-[#d97706]">AI Astrologers</span>, Anytime
            </h2>
            <p className="text-[#6E2F37] text-[18px] md:text-[19px] max-w-3xl leading-relaxed">
              Get instant answers to your questions from our advanced AI astrologers. Experience the perfect blend of ancient Vedic wisdom and cutting-edge artificial intelligence for highly accurate, 24/7 personalized guidance.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 shrink-0">
              <button onClick={() => scrollContainer(aiAstroRef, 'left')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] border border-[#f0ddc0] hover:bg-[#5c1420] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={() => scrollContainer(aiAstroRef, 'right')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] border border-[#f0ddc0] hover:bg-[#5c1420] hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
            <Link href="/ai-astrologer-chat" className="shrink-0 hidden md:flex bg-[#5c1420] text-white font-bold text-[14px] md:text-[15px] px-7 py-3 rounded-full hover:bg-[#721522] shadow-sm transition-all items-center gap-2">
              View All AI Astrologers
            </Link>
          </div>
        </div>
        <div ref={aiAstroRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 hide-scrollbar w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {loadingAiAstros ? (
            [1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="shrink-0 w-[280px] lg:w-[320px] snap-center flex flex-col justify-between h-full border border-[#f0ddc0]/60 rounded-2xl p-5 bg-white text-center animate-pulse">
                <div>
                  <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 mb-4 mt-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mx-auto mb-1.5"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto mb-1.5"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded w-2/3 mx-auto mb-4"></div>
                </div>
                <div className="flex gap-2.5 mt-auto pt-5">
                  <div className="flex-1 h-9 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 h-9 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            ))
          ) : aiAstrologers.length > 0 ? (
            aiAstrologers.slice(0, 10).map((astro: any, i: number) => (
              <Link href={`/ai-astrologer/${astro._id}`} key={i} className="shrink-0 w-[280px] lg:w-[320px] snap-center group flex flex-col justify-between h-full border border-[#f0ddc0] hover:border-[#ee6c1e]/30 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(230,74,25,0.12)] hover:-translate-y-1.5 rounded-2xl p-3.5 md:p-4.5 bg-white text-left transition-all duration-300 relative overflow-hidden">

                <div>
                  {/* Header: Avatar + Info */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 md:gap-3.5">
                      <div className="relative w-[45px] h-[45px] md:w-[50px] md:h-[50px] shrink-0">
                        <div className="w-full h-full rounded-full overflow-hidden border-[1.5px] border-[#22c55e] p-0.5">
                          <img loading="lazy" src={getImageUrl(astro.profileImage, astro.name)} alt={astro.name} className="w-full h-full rounded-full object-cover" />
                        </div>
                        {astro.status === 'active' && (
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-[#22c55e] rounded-full border-[1.5px] border-white"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[14px] md:text-[15px] text-[#3a1216] flex items-center gap-1.5">
                          {astro.name || 'AI Astrologer'}
                          <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#22c55e]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z" /></svg>
                        </h3>
                        <p className="text-[11px] md:text-[11.5px] text-gray-850 mt-0.5 truncate max-w-[130px]">
                          {astro.experienceYears || 5} yrs exp • {astro.languages?.slice(0, 2).join(', ') || 'Hindi'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills Pills */}
                  <div className="flex gap-1.5 md:gap-2 mt-2.5 md:mt-3 flex-wrap">
                    {(astro.specialization?.length ? astro.specialization : ['Vedic', 'Tarot', 'Vastu']).slice(0, 3).map((skill: string, idx: number) => (
                      <span key={idx} className="text-[10px] md:text-[11px] font-medium text-[#5c1420] border border-[#f0ddc0]/60 rounded-full px-2.5 md:px-3 py-1 bg-[#fdf8f0]/50">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Detailed Info */}
                  <div className="mt-2.5 md:mt-3 text-[12px] md:text-[13px] text-[#6E2F37]/90 space-y-0.5 md:space-y-1">
                    <p className="truncate">{astro.languages?.join(' • ') || 'English • Hindi • Punjabi'}</p>
                    <p>{astro.experienceYears || 5} yrs exp</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mt-2.5 md:mt-3 text-[12px] md:text-[12.5px] font-bold text-[#6E2F37]">
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <span className="text-[#f59e0b] text-[14px] md:text-[15px]">★</span>
                      <span>{astro.rating ? Number(astro.rating).toFixed(1) : '5.0'}</span>
                    </div>
                    <span className={astro.status === 'active' ? "text-[#22c55e] font-semibold text-[11px] md:text-[11.5px]" : "text-[#7ea4b5] font-semibold text-[11px] md:text-[11.5px]"}>
                      {astro.status === 'active' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>

                {/* Pricing & CTA */}
                <div className="mt-auto pt-3 flex gap-2 md:gap-2.5 w-full">
                  <div className="flex-1 flex items-center justify-between border-[1.5px] border-[#8a1c2a] text-[#8a1c2a] rounded-xl px-2.5 md:px-3 py-1.5 md:py-2 hover:bg-[#8a1c2a] hover:text-white transition-colors duration-300">
                    <div className="flex items-center gap-1 md:gap-1.5 text-[12px] md:text-[13px] font-bold">
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L18 12l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 4 6a2 2 0 0 1 0-2z" /></svg>
                      Call
                    </div>
                    <div className="text-[12px] md:text-[12.5px] font-bold">₹{astro.voiceRate || 10}/m</div>
                  </div>
                  <div className="flex-1 flex items-center justify-between border-[1.5px] border-[#8a1c2a] text-[#8a1c2a] rounded-xl px-2.5 md:px-3 py-1.5 md:py-2 hover:bg-[#8a1c2a] hover:text-white transition-colors duration-300">
                    <div className="flex items-center gap-1 md:gap-1.5 text-[12px] md:text-[13px] font-bold">
                      <svg className="w-3 h-3 md:w-3.5 md:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z" /></svg>
                      Chat
                    </div>
                    <div className="text-[12px] md:text-[12.5px] font-bold">₹{astro.chatRate || 10}/m</div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-850 col-span-full">No AI Astrologers available.</p>
          )}
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/ai-astrologer-chat" className="bg-[#5c1420] text-white font-bold text-[14px] px-7 py-3 rounded-full hover:bg-[#721522] shadow-sm transition-all flex items-center gap-2 w-full justify-center">
            View All AI Astrologers
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
        </div>
      </div>

      {/* Reports & Tools */}
      <div className="mx-6 md:mx-10 mt-12 mb-2 px-6 md:px-10 py-10 bg-[#fdf0e0]/50 rounded-2xl relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="text-left">
            <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] mb-3">
              Reports &amp; Tools
            </h2>
            <p className="text-[#6E2F37] text-[18px] md:text-[19px] max-w-3xl leading-relaxed">
              Powerful astrological reports and smart tools to analyse your life, relationships, and future with deep Vedic insights
            </p>
          </div>
          <Link href="/astrology-calculators" className="shrink-0 hidden md:inline-flex bg-[#5c1420] text-white font-bold text-[14px] md:text-[15px] px-7 py-3 rounded-full hover:bg-[#721522] transition-all shadow-sm items-center gap-2">
            Explore All Reports & Tools
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {/* 1. Kundli Milan Report */}
          <Link href="/horoscope-matching" className="group text-center block bg-white border border-[#f0ddc0]/80 rounded-2xl p-4 md:p-5 hover:shadow-[0_4px_14px_rgba(92,20,32,0.1)] transition-all duration-300">
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <img loading="lazy" src="/images/reports/kundli-milan.webp" alt="Kundli Milan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="font-bold text-[14px] text-[#3a1216] mb-3">Kundli Milan Report</div>
            <div className="border border-[#8a1c2a] text-[#8a1c2a] text-[12px] font-semibold py-2.5 rounded-lg group-hover:bg-[#8a1c2a] group-hover:text-white transition-colors w-full">View Report</div>
          </Link>

          {/* 2. Free Janam Kundli */}
          <Link href="/kundli" className="group text-center block bg-white border border-[#f0ddc0]/80 rounded-2xl p-4 md:p-5 hover:shadow-[0_4px_14px_rgba(92,20,32,0.1)] transition-all duration-300">
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <img loading="lazy" src="/images/reports/janam-kundli.webp" alt="Janam Kundli" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="font-bold text-[14px] text-[#3a1216] mb-3">Free Janam Kundli</div>
            <div className="border border-[#8a1c2a] text-[#8a1c2a] text-[12px] font-semibold py-2.5 rounded-lg group-hover:bg-[#8a1c2a] group-hover:text-white transition-colors w-full">Get Free Kundli</div>
          </Link>

          {/* 3. Moon Sign Finder */}
          <Link href="/moon-signs" className="group text-center block bg-white border border-[#f0ddc0]/80 rounded-2xl p-4 md:p-5 hover:shadow-[0_4px_14px_rgba(92,20,32,0.1)] transition-all duration-300">
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <img loading="lazy" src="/images/reports/moon-sign.webp" alt="Moon Sign" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="font-bold text-[14px] text-[#3a1216] mb-3">Moon Sign Finder</div>
            <div className="border border-[#8a1c2a] text-[#8a1c2a] text-[12px] font-semibold py-2.5 rounded-lg group-hover:bg-[#8a1c2a] group-hover:text-white transition-colors w-full">Find Now</div>
          </Link>

          {/* 4. Lucky Number */}
          <Link href="/numerology" className="group text-center block bg-white border border-[#f0ddc0]/80 rounded-2xl p-4 md:p-5 hover:shadow-[0_4px_14px_rgba(92,20,32,0.1)] transition-all duration-300">
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <img loading="lazy" src="/images/reports/lucky-number.webp" alt="Lucky Number" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="font-bold text-[14px] text-[#3a1216] mb-3">Lucky Number</div>
            <div className="border border-[#8a1c2a] text-[#8a1c2a] text-[12px] font-semibold py-2.5 rounded-lg group-hover:bg-[#8a1c2a] group-hover:text-white transition-colors w-full">Find Now</div>
          </Link>

          {/* 5. Love Compatibility */}
          <Link href="/love-compatibility" className="group text-center block bg-white border border-[#f0ddc0]/80 rounded-2xl p-4 md:p-5 hover:shadow-[0_4px_14px_rgba(92,20,32,0.1)] transition-all duration-300">
            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-4">
              <img loading="lazy" src="/images/reports/love-compatibility.webp" alt="Love Compatibility" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="font-bold text-[14px] text-[#3a1216] mb-3">Love Compatibility</div>
            <div className="border border-[#8a1c2a] text-[#8a1c2a] text-[12px] font-semibold py-2.5 rounded-lg group-hover:bg-[#8a1c2a] group-hover:text-white transition-colors w-full">Check Match</div>
          </Link>
        </div>
        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/astrology-calculators" className="bg-[#5c1420] text-white font-bold text-[14px] px-7 py-3 rounded-full hover:bg-[#721522] transition-all shadow-sm flex items-center gap-2 w-full justify-center">
            Explore All Reports & Tools
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </Link>
        </div>
      </div>

      {/* Daily Astrology Section */}
      <div className="mx-6 md:mx-10 mt-16 mb-6">
        <div className="text-left mb-8">
          <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] mb-3">
            Your Daily Astrology
          </h2>
          <p className="text-[#6E2F37] text-[18px] md:text-[19px] max-w-3xl leading-relaxed">
            Start your day with personalised insights, planetary updates, and timely guidance for a better tomorrow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1fr] gap-4 md:gap-6 text-left">
          {/* Card 1: Today's Highlights */}
          <div className="border border-[#f0ddc0] rounded-2xl p-5 bg-white shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 font-bold text-[14px] text-[#5c1420] mb-5">
              <span className="text-[#ee6c1e]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
                </svg>
              </span>
              Today's Highlights
            </div>

            <div className="flex flex-col gap-4 flex-grow text-[14px] text-[#6E2F37]">
              <div className="flex justify-between border-b border-[#f0ddc0]/30 pb-3">
                <span>Shubh Muhurat</span><span className="font-semibold text-[#3a1216]">{dailyPanchang?.muhurats?.abhijit || '11:45 AM - 12:35 PM'}</span>
              </div>
              <div className="flex justify-between border-b border-[#f0ddc0]/30 pb-3">
                <span>Inauspicious (Rahu Kaal)</span><span className="font-semibold text-[#3a1216]">{dailyPanchang?.muhurats?.rahu_kaal || '01:30 PM - 03:00 PM'}</span>
              </div>
              <div className="flex justify-between border-b border-[#f0ddc0]/30 pb-3">
                <span>Sunrise</span><span className="font-semibold text-[#3a1216]">{dailyPanchang?.sun_rise || '06:05 AM'}</span>
              </div>
              <div className="flex justify-between border-b border-[#f0ddc0]/30 pb-3">
                <span>Sunset</span><span className="font-semibold text-[#3a1216]">{dailyPanchang?.sun_set || '06:30 PM'}</span>
              </div>
              <div className="flex justify-between">
                <span title="The zodiac sign where the Moon is transiting today">Today's Moon (Gochar)</span><span className="font-semibold text-[#3a1216]">{dailyPanchang?.moon_sign || 'Taurus'}</span>
              </div>
            </div>

            <Link href="/daily-horoscope" className="mt-5 block w-full border border-[#8a1c2a] text-[#8a1c2a] text-center text-[12px] font-semibold py-2.5 rounded-lg hover:bg-[#8a1c2a] hover:text-white transition-colors">
              Full Horoscope
            </Link>
          </div>

          {/* Card 2: Panchang Today */}
          <div className="border border-[#f0ddc0] rounded-2xl p-5 bg-white shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 font-bold text-[14px] text-[#5c1420] mb-5">
              <span className="text-[#ee6c1e]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              Panchang Today
            </div>

            <div className="flex flex-col flex-grow text-[14.5px] text-[#3a1216] leading-[1.6]">
              {/* Section 1 */}
              <div className="pb-4 border-b border-[#f0ddc0]/50 flex flex-col gap-3">
                <div>
                  <span className="font-bold text-[#64493a]">Paksha:</span> <span className="text-[#c23b22] font-medium">{dailyPanchang?.paksha || 'Shukla'}</span> Paksha
                </div>
                <div>
                  <span className="font-bold text-[#64493a]">Tithi:</span> <span className="text-[#c23b22] underline decoration-1 underline-offset-2 font-medium">{dailyPanchang?.tithi?.split(' ')[0] || 'Prathama'}</span> upto <span className="text-[#c23b22] underline decoration-1 underline-offset-2 font-medium">{dailyPanchang?.tithi_end || '--:--'}</span>
                </div>
                <div>
                  <span className="font-bold text-[#64493a]">Day:</span> {dailyPanchang?.vara || 'Monday'}
                </div>
              </div>

              {/* Section 2 */}
              <div className="pt-4 flex flex-col gap-3">
                <div>
                  <span className="font-bold text-[#64493a]">Nakshatra:</span> <span className="text-[#c23b22] underline decoration-1 underline-offset-2 font-medium">{dailyPanchang?.nakshatra?.split(' ')[0] || 'Ashwini'}</span> upto {dailyPanchang?.nakshatra_end || '--:--'}
                </div>
                <div>
                  <span className="font-bold text-[#64493a]">Yoga:</span> <span className="text-[#c23b22] underline decoration-1 underline-offset-2 font-medium">{dailyPanchang?.yoga?.split(' ')[0] || 'Vishkumbha'}</span> upto {dailyPanchang?.yoga_end || '--:--'}
                </div>
                <div>
                  <span className="font-bold text-[#64493a]">Karan:</span> {dailyPanchang?.karana_details ? (
                    <>
                      <span className="text-[#c23b22] underline decoration-1 underline-offset-2 font-medium">{dailyPanchang.karana_details[0].name}</span> upto {dailyPanchang.karana_details[0].end}, <span className="text-[#c23b22] underline decoration-1 underline-offset-2 font-medium">{dailyPanchang.karana_details[1].name}</span> upto {dailyPanchang.karana_details[1].end}
                    </>
                  ) : (
                    <span className="text-[#c23b22] underline decoration-1 underline-offset-2 font-medium">{dailyPanchang?.karana?.split(' ')[0] || 'Kintughna'}</span>
                  )}
                </div>
              </div>
            </div>

            <Link href="/panchang" className="mt-5 block w-full border border-[#8a1c2a] text-[#8a1c2a] text-center text-[12px] font-semibold py-2.5 rounded-lg hover:bg-[#8a1c2a] hover:text-white transition-colors">
              View Full Panchang
            </Link>
          </div>

          {/* Card 3: Current Planetary Transit */}
          <div className="border border-[#f0ddc0] rounded-2xl p-5 bg-white shadow-sm flex flex-col hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 font-bold text-[14px] text-[#5c1420] mb-5">
              <span className="text-[#ee6c1e]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="6" /><ellipse cx="12" cy="12" rx="11" ry="4" transform="rotate(-25 12 12)" />
                </svg>
              </span>
              Current Planetary Transit
            </div>

            <div className="flex flex-col justify-between flex-grow pb-1">
              <div className="flex items-center gap-3 p-3.5 bg-[#fdf0e0]/40 rounded-xl border border-[#f0ddc0]/60">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xl">♃</div>
                <div className="text-[14px] text-[#6E2F37]">
                  Jupiter in <span className="font-bold text-[#3a1216]">
                    {dailyPanchang?.planets?.Jupiter !== undefined
                      ? ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][Math.floor(dailyPanchang.planets.Jupiter / 30) % 12]
                      : 'Loading...'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/60 mt-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 font-bold text-xl">♄</div>
                <div className="text-[14px] text-[#6E2F37]">
                  Saturn in <span className="font-bold text-[#3a1216]">
                    {dailyPanchang?.planets?.Saturn !== undefined
                      ? ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][Math.floor(dailyPanchang.planets.Saturn / 30) % 12]
                      : 'Loading...'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 bg-blue-50/50 rounded-xl border border-blue-100/60">
                <div className="w-10 h-10 rounded-full bg-blue-100/70 flex items-center justify-center text-blue-700 font-bold text-xl">☊</div>
                <div className="text-[14px] text-[#6E2F37]">
                  Rahu in <span className="font-bold text-[#3a1216]">
                    {dailyPanchang?.planets?.Rahu !== undefined
                      ? ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"][Math.floor(dailyPanchang.planets.Rahu / 30) % 12]
                      : 'Loading...'}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/transits" className="mt-5 block w-full border border-[#8a1c2a] text-[#8a1c2a] text-center text-[12px] font-semibold py-2.5 rounded-lg hover:bg-[#8a1c2a] hover:text-white transition-colors">
              All Transits
            </Link>
          </div>
        </div>
      </div>

      <DailyHoroscope initialDailyHoroscopes={initialDailyHoroscopes} />

      {/* Founder Section */}
      <div className="mx-6 md:mx-10 mt-16 mb-2">
        <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] text-center mb-10">
          The <span className="text-[#d97706]">Visionary</span> Behind VaidikTalk
        </h2>

        {/* Banner */}
        <div className="rounded-t-xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.6fr] bg-[#fdfaf5] border border-[#f0ddc0]/80 border-b-0 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <div className="h-[250px] md:h-auto border-r border-[#f0ddc0]/50 flex flex-col bg-white relative">
            <img loading="lazy" src="/founder.webp" alt="Co-Founder Shri Jitendra K Mishra" className="w-full h-full md:flex-1 object-cover object-top" />
            <div className="bg-[#5c1420] text-center py-3 px-4 shrink-0 absolute bottom-0 w-full md:relative">
              <div className="font-bold text-[15px] md:text-[16px] text-white">Shri Jitendra K Mishra</div>
              <div className="text-[12px] md:text-[13px] text-[#fbe7d3]">Co-Founder, VaidikTalk</div>
            </div>
          </div>
          <div className="p-7 md:p-9 text-[#6E2F37] flex flex-col justify-center">
            <div className="font-serif font-bold text-xl md:text-[25px] leading-tight text-[#5c1420] mb-2">
              Founded on Trust, Guided by Wisdom, Built for every Life Journey
            </div>
            <div className="text-[14px] md:text-[14px] font-semibold text-[#d97706] mb-4">
              A journey from factory to faith . From Global Connections to Personal Transformation
            </div>

            <p className="text-[15px] md:text-[14.5px] leading-[1.6] mb-3 text-[#6E2F37]">
              <strong className="text-[#3a1216] block mb-1">From Factory Floors to Faith-Driven Guidance</strong>
              VaidikTalk was founded by Shri Jitendra K Mishra, an entrepreneur whose journey spans two seemingly different worlds—global manufacturing and spiritual wellness.
            </p>

            <p className="text-[15px] md:text-[14.5px] leading-[1.6] mb-6 text-[#6E2F37]">
              As the Founder of Catalyst Sourcing, Jitendra K Mishra has spent years working with manufacturers, exporters, and international customers across industries. His work took him inside factories, boardrooms, and supply chains, helping businesses build trust, solve problems, and create long-term partnerships across borders.
            </p>

            <Link href="/about-us" className="inline-block bg-[#5c1420] text-white text-[13px] font-bold px-7 py-3 rounded-lg w-fit hover:bg-[#721522] transition-colors shadow-sm">
              About Us
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-[#f7e6d6] flex flex-wrap py-4.5 rounded-b-xl border border-[#f0ddc0]/80">
          {[
            { to: 68000, suffix: '+', label: 'Happy Customers' },
            { to: 4.8, isDecimal: true, suffix: '/5', label: 'Google Rating' },
            { to: 15, suffix: '+ Years', label: 'Experience' },
            { to: 300, suffix: '+', label: 'Astrologers' }
          ].map((item, i) => (
            <div key={i} className={`flex-1 text-center text-[#5c1420] ${i > 0 ? 'border-l border-[#e8cba8]' : ''} min-w-[120px] py-2`}>
              <div className="font-extrabold text-base">
                <CountUp to={item.to} isDecimal={item.isDecimal} suffix={item.suffix} />
              </div>
              <div className="text-[11px] text-[#6E2F37]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="px-6 md:px-10 py-12 md:py-16">
        <div className="mb-12 text-left">
          <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] mb-3">
            Why <span className="text-[#d97706]">Choose</span> Us
          </h2>
          <p className="text-[#6E2F37] text-[18px] md:text-[19px] max-w-4xl leading-relaxed">
            Experience authentic Vedic guidance with India's most trusted platform. We are committed to bringing you accuracy, privacy, and unwavering support on your spiritual journey.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative">
          
          {/* Connecting Dashed Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-7 left-[10%] right-[15%] h-[2px] border-t-2 border-dashed border-[#ee6c1e]/20 z-0"></div>

          {/* Feature 1 */}
          <div className="group flex flex-col items-start text-left relative z-10 mt-2">
            <div className="absolute -top-10 -left-6 text-[100px] font-black text-[#5c1420]/[0.03] z-[-1] pointer-events-none select-none transition-transform duration-500 group-hover:-translate-y-2">01</div>
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#fbe7d3] to-[#f7e6d6] mb-5 flex items-center justify-center text-[#ee6c1e] shadow-[0_4px_16px_rgba(238,108,30,0.15)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative border border-[#ee6c1e]/20 z-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-[#3a1216] mb-2 group-hover:text-[#ee6c1e] transition-colors duration-300">Verified Astrologers</h3>
              <p className="text-[16px] text-[#6E2F37] leading-relaxed">Every astrologer undergoes a rigorous background check to ensure complete authenticity and trust.</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group flex flex-col items-start text-left relative z-10 mt-2">
            <div className="absolute -top-10 -left-6 text-[100px] font-black text-[#5c1420]/[0.03] z-[-1] pointer-events-none select-none transition-transform duration-500 group-hover:-translate-y-2">02</div>
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#fbe7d3] to-[#f7e6d6] mb-5 flex items-center justify-center text-[#ee6c1e] shadow-[0_4px_16px_rgba(238,108,30,0.15)] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 relative border border-[#ee6c1e]/20 z-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-[#3a1216] mb-2 group-hover:text-[#ee6c1e] transition-colors duration-300">Accurate Guidance</h3>
              <p className="text-[16px] text-[#6E2F37] leading-relaxed">Receive highly precise and personalized astrological solutions tailored specifically for your life's path.</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group flex flex-col items-start text-left relative z-10 mt-2">
            <div className="absolute -top-10 -left-6 text-[100px] font-black text-[#5c1420]/[0.03] z-[-1] pointer-events-none select-none transition-transform duration-500 group-hover:-translate-y-2">03</div>
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#fbe7d3] to-[#f7e6d6] mb-5 flex items-center justify-center text-[#ee6c1e] shadow-[0_4px_16px_rgba(238,108,30,0.15)] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 relative border border-[#ee6c1e]/20 z-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-[#3a1216] mb-2 group-hover:text-[#ee6c1e] transition-colors duration-300">100% Privacy</h3>
              <p className="text-[16px] text-[#6E2F37] leading-relaxed">Your privacy is our utmost priority. All consultations and personal details remain completely confidential.</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="group flex flex-col items-start text-left relative z-10 mt-2">
            <div className="absolute -top-10 -left-6 text-[100px] font-black text-[#5c1420]/[0.03] z-[-1] pointer-events-none select-none transition-transform duration-500 group-hover:-translate-y-2">04</div>
            <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#fbe7d3] to-[#f7e6d6] mb-5 flex items-center justify-center text-[#ee6c1e] shadow-[0_4px_16px_rgba(238,108,30,0.15)] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 relative border border-[#ee6c1e]/20 z-10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-2v-6h4M4 13h4v6H6a2 2 0 0 1-2-2z" /></svg>
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-[#3a1216] mb-2 group-hover:text-[#ee6c1e] transition-colors duration-300">Instant Support</h3>
              <p className="text-[16px] text-[#6E2F37] leading-relaxed">We are here for you 24x7. Connect with experts instantly anytime you need guidance or clarity.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Knowledge Center */}
      <div className="px-6 md:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="text-left">
            <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] mb-3">
              Knowledge <span className="text-[#d97706]">Center</span>
            </h2>
            <p className="text-[#6E2F37] text-[18px] md:text-[19px] max-w-4xl leading-relaxed">
              Expand your spiritual awareness and understanding of cosmic energies. Read our latest insights, daily panchang, and profound articles on ancient Vedic wisdom.
            </p>
          </div>
          <Link href="/blog" className="shrink-0 border-[1.5px] border-[#5c1420] text-[#5c1420] text-[13px] font-bold px-6 py-2.5 rounded-lg hover:bg-[#5c1420] hover:text-white transition-colors">
            View All Articles
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-4 md:gap-6 pb-6 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {loadingBlogs ? (
            [1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="animate-pulse w-[85vw] sm:w-[280px] md:w-[320px] lg:w-[340px] xl:w-[360px] shrink-0">
                <div className="w-full aspect-video rounded-xl bg-gray-200 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
              </div>
            ))
          ) : recentBlogs.map((article, i) => (
            <Link href={`/blog/${article.slug}`} key={i} className="w-[85vw] sm:w-[280px] md:w-[320px] lg:w-[340px] xl:w-[360px] shrink-0 snap-start group flex flex-col bg-white border border-[#f0ddc0]/80 rounded-2xl overflow-hidden hover:shadow-[0_8px_24px_rgba(238,108,30,0.1)] transition-all duration-300 hover:-translate-y-1 h-full">
              <div className="w-full aspect-video overflow-hidden relative border-b border-[#f0ddc0]/30">
                <img
                  src={article.bannerImage || 'https://images.unsplash.com/photo-1598090216740-eb040d8c3f82?q=72&w=480&h=360&fit=crop'}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#5c1420]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              </div>

              <div className="p-4 md:p-5 flex flex-col flex-grow">
                <div className="text-[11px] text-[#8a1c2a] font-semibold flex items-center gap-1.5 mb-2.5 opacity-80 uppercase tracking-wider">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                  {article.publishedAt ? format(new Date(article.publishedAt), 'MMM dd, yyyy') : 'Recently Added'}
                </div>

                <h3 className="font-bold text-[14px] md:text-[15px] text-[#3a1216] leading-[1.4] mb-3 group-hover:text-[#d97706] transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <div className="mt-auto pt-2 flex items-center text-[#d97706] text-[12px] font-bold gap-1 group-hover:gap-2 transition-all">
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="px-6 md:px-10 py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="text-left">
            <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] mb-3">
              Real <span className="text-[#d97706]">Success Stories</span>
            </h2>
            <p className="text-[#6E2F37] text-[18px] md:text-[19px] max-w-4xl leading-relaxed">
              See what our happy customers have to say about their experience
            </p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button onClick={() => scrollContainer(testiRef, 'left')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] border border-[#f0ddc0] hover:bg-[#5c1420] hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button onClick={() => scrollContainer(testiRef, 'right')} className="w-8 h-8 rounded-full bg-[#fdf0e0] flex items-center justify-center text-[#5c1420] border border-[#f0ddc0] hover:bg-[#5c1420] hover:text-white transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>

        <div ref={testiRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-6 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {loadingTestimonials ? (
            [1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="shrink-0 w-[260px] md:w-[280px] lg:w-[310px] snap-center aspect-[4/5] rounded-2xl bg-gray-200 animate-pulse"></div>
            ))
          ) : testimonials.length > 0 ? (
            testimonials.slice(0, 10).map((item, i) => {
              // Fallback extraction if videoId is missing from DB
              let vId = item.videoId;
              if (!vId && item.youtubeLink) {
                const match = item.youtubeLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))((\w|-){11})/);
                vId = (match && match[1]) ? match[1] : null;
              }

              return (
                <div onClick={() => { if (vId && selectedVideo !== vId) setSelectedVideo(vId); }} key={item._id || i} className="shrink-0 w-[260px] md:w-[280px] lg:w-[310px] snap-center group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 block bg-black">
                  {selectedVideo === vId ? (
                    <iframe
                      className="w-full h-full absolute inset-0"
                      src={`https://www.youtube.com/embed/${vId}?autoplay=1&rel=0`}
                      title={item.name}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <>
                      {/* Scaled image to crop out YouTube letterboxing on vertical videos */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer">
                        <img src={vId ? `https://img.youtube.com/vi/${vId}/hqdefault.jpg` : '/placeholder-video.jpg'} alt={item.name} loading="lazy" className="w-full h-full object-cover scale-[1.35] group-hover:scale-[1.45] transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                      </div>

                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-500 cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#ee6c1e] shadow-lg group-hover:scale-110 transition-transform duration-500">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>

                      {/* Bottom Info Gradient */}
                      <div className="absolute inset-x-0 bottom-0 pt-16 pb-5 px-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-left pointer-events-none">
                        <h4 className="font-bold text-[15px] text-white leading-tight mb-1">{item.name}</h4>
                        {item.city && <p className="text-[12px] text-[#f0ddc0]">{item.city}</p>}
                      </div>
                    </>
                  )}
                </div>
              )
            })
          ) : (
            <p className="text-gray-850 col-span-full">No testimonials available at the moment.</p>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="px-6 md:px-10 py-12 md:py-16 w-full">
        <div className="mb-10 text-left">
          <h2 className="font-sans font-bold tracking-tight text-[33px] md:text-[45px] leading-[1.2] text-[#5c1420] mb-3">
            Frequently Asked <span className="text-[#d97706]">Questions</span>
          </h2>
          <p className="text-[#6E2F37] text-[18px] md:text-[19px] max-w-2xl leading-relaxed">
            Find answers to the most common questions about VaidikTalk
          </p>
        </div>

        <div className="columns-1 md:columns-2 gap-4 md:gap-6 w-full">
          {loadingFaqs ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-2xl h-16 w-full break-inside-avoid mb-4 md:mb-6" />
            ))
          ) : faqs.length > 0 ? (
            faqs.map((faq, i) => (
              <div key={i} className={`break-inside-avoid mb-4 md:mb-6 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${openFaq === i ? 'bg-[#fdf6ec] border-[#ee6c1e] shadow-md' : 'bg-white border-[#f0ddc0] hover:border-[#ee6c1e]/50'}`} onClick={() => toggleFaq(i)}>
                <div className="flex justify-between items-center gap-4">
                  <h3 className="font-bold text-[15px] md:text-[16px] text-[#3a1216]">{faq.question}</h3>
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-lg transition-colors ${openFaq === i ? 'bg-[#ee6c1e] text-white' : 'bg-[#fdf0e0] text-[#ee6c1e]'}`}>
                    {openFaq === i ? '−' : '+'}
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div
                    className="prose prose-sm md:prose-base prose-slate text-[#6E2F37] w-full max-w-full overflow-wrap-anywhere [&_*]:!whitespace-pre-wrap [&_*]:!max-w-full [&_a]:!text-[#ee6c1e] [&_a]:underline hover:[&_a]:!text-[#c2410c] [&_a]:font-bold"
                    dangerouslySetInnerHTML={{ __html: faq.answer ? faq.answer.replace(/&nbsp;/g, ' ') : '' }}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-850 w-full text-center">No FAQs available.</p>
          )}
        </div>
      </div>

      {/* App Download Banner */}
      <div className="px-6 md:px-10 mt-6 mb-8 max-w-[1400px] mx-auto w-full">
        <div className="bg-[#fff1e3] rounded-2xl md:rounded-3xl p-6 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-[#f0ddc0]">

          {/* Spiritual Background */}
          <div className="absolute inset-0 z-0 opacity-10 bg-[url('/spiritual-banner-light.webp')] bg-cover bg-center pointer-events-none" />
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#fff1e3] via-transparent to-[#fff1e3] opacity-60 pointer-events-none" />

          {/* Left Column */}
          <div className="relative z-10 max-w-md text-center md:text-left flex-1">
            <h2 className="font-sans font-bold text-2xl md:text-3xl text-[#c62828] mb-2 tracking-tight">Download the VaidikTalk App</h2>
            <p className="text-[#5d4037] text-[14px] md:text-[15px] font-medium mb-6">
              Get instant astrology guidance on your smartphone.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {/* App Store Button */}
              <a href="https://apps.apple.com/in/app/vaidik-talk/id6759283230" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity inline-block w-[140px]">
                <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="w-full h-auto" />
              </a>
              {/* Google Play Button */}
              <a href="https://play.google.com/store/apps/details?id=com.vaidiktalk&hl=en_IN" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity inline-block w-[140px]">
                <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="w-full h-auto" />
              </a>
            </div>
          </div>

          {/* Middle Column - QR Code */}
          <div className="relative z-10 flex flex-col items-center shrink-0 hidden lg:flex">
            <div className="w-[100px] h-[100px] bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex items-center justify-center overflow-hidden">
              <img loading="lazy" src="/VaidikTalk_PlayStore_QR.webp" alt="Scan to Download" className="w-full h-full object-contain" />
            </div>
            <div className="text-[#c62828] font-bold text-[12px] mt-2">Scan to Download</div>
          </div>

          {/* Right Column - Phone Image Mockup */}
          <div className="relative z-10 shrink-0 hidden md:block mt-8 md:mt-0 w-[200px] lg:w-[250px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[50%] rotate-[15deg]">
              {/* Phone Frame */}
              <div className="w-[140px] lg:w-[160px] h-[280px] lg:h-[320px] bg-[#111] rounded-[24px] border-4 border-[#222] p-1 shadow-2xl relative overflow-hidden">
                <div className="w-full h-full bg-white rounded-[18px] overflow-hidden flex flex-col relative">
                  {/* Screen Content */}
                  <img loading="lazy" src="/app-mockup.webp" alt="App Screen" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="px-6 md:px-10 mb-16 max-w-[1400px] mx-auto w-full">
        <div className="bg-[#fff1e3] rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-[#f0ddc0] relative overflow-hidden">

          <div className="flex-1 z-10 text-center md:text-left">
            <h2 className="font-serif font-bold text-xl md:text-2xl text-[#c62828] mb-2 tracking-tight">Get Daily Astrology Updates, Offers &amp; Insights</h2>
            <p className="text-[#5d4037] text-[13px] md:text-[14px] leading-relaxed max-w-lg mx-auto md:mx-0">
              Join 90,000+ subscribers and receive daily Panchang, Horoscope updates, festival reminders, and exclusive offers.
            </p>
          </div>

          <div className="flex-1 w-full max-w-md z-10 relative">
            <form onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const emailInput = form.elements.namedItem('email') as HTMLInputElement;
              const email = emailInput.value;
              if (!email) return;
              
              const btn = form.querySelector('button');
              if (btn) btn.disabled = true;
              
              try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
                const res = await fetch(`${apiUrl}/subscribers`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email })
                });
                if (res.ok) {
                  alert('Thank you for subscribing!');
                  emailInput.value = '';
                } else {
                  alert('Failed to subscribe. Please try again.');
                }
              } catch (error) {
                alert('Something went wrong.');
              } finally {
                if (btn) btn.disabled = false;
              }
            }} className="flex items-center bg-white rounded-xl p-1.5 shadow-sm border border-gray-200 focus-within:border-[#ee6c1e] focus-within:ring-1 focus-within:ring-[#ee6c1e] transition-all">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email address"
                className="flex-1 bg-transparent px-4 py-2 text-[14px] text-gray-850 focus:outline-none"
              />
              <button type="submit" className="bg-[#e64a19] hover:bg-[#d84315] disabled:opacity-50 text-white font-semibold text-[14px] px-6 py-2.5 rounded-lg transition-colors shadow-sm">
                Subscribe
              </button>
            </form>
          </div>

          <div className="hidden lg:flex w-32 shrink-0 z-10 relative items-center justify-center">
            <span className="text-[80px] leading-normal text-[#d95a12] drop-shadow-sm font-sans flex items-center justify-center pt-2">ॐ</span>
          </div>

          {/* Subtle background pattern */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
            <svg width="300" height="300" viewBox="0 0 200 200" fill="currentColor" className="text-[#c62828]"><circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" fill="none" /></svg>
          </div>
        </div>
      </div>

    </div>
  );
}
