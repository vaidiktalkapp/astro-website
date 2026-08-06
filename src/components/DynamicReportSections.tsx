'use client';
import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { FileText } from 'lucide-react';

interface DynamicReportSectionsProps {
  reportSlug: string;
}

export default function DynamicReportSections({ reportSlug }: DynamicReportSectionsProps) {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get(`/smart-kundali-settings/${reportSlug}`);
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    fetchSettings();
  }, [reportSlug]);

  // Fallback default values
  const defaultTestimonials = [
    {
      name: "Rahul Verma",
      city: "Delhi",
      date: "October 2025",
      review: "The report gave me exactly what I needed—clarity. The predictions regarding my career switch and timing were incredibly accurate. Highly recommend it to anyone feeling stuck.",
      initial: "R",
      color: "#5c1a1f"
    },
    {
      name: "Sneha Patel",
      city: "Ahmedabad",
      date: "September 2025",
      review: "I was looking for something more than just basic astrology. The report provided a year-by-year breakdown of my finance and health. It’s beautifully designed and very easy to understand.",
      initial: "S",
      color: "#d97706"
    },
    {
      name: "Ankit Sharma",
      city: "Pune",
      date: "August 2025",
      review: "The dosha analysis and personalized remedies were an eye-opener. I downloaded the PDF and read it on my phone. The report is detailed and authentic.",
      initial: "A",
      color: "#1a0a0b"
    }
  ];

  const testimonials = settings?.testimonials?.length ? settings.testimonials : defaultTestimonials;
  const screenshots = settings?.screenshots?.length ? settings.screenshots : [
    { url: '/images/kundali-page-1.jpg' },
    { url: '/images/kundali-page-2.jpg' },
    { url: '/images/kundali-page-3.jpg' },
    { url: '/images/kundali-page-4.jpg' },
    { url: '/images/kundali-page-5.jpg' }
  ];
  const video = settings?.video || { url: '', thumbnail: '/images/kundali-video-thumb.jpg' };

  const Kicker = ({ text }: { text: string }) => (
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="w-2 h-2 bg-[#d4af37] rotate-45"></div>
      <span className="text-[11.5px] tracking-[2.5px] uppercase text-[#761e27] font-bold">{text}</span>
      <div className="w-2 h-2 bg-[#d4af37] rotate-45"></div>
    </div>
  );

  const SectionHeading = ({ title, sub }: { title: string, sub?: string }) => (
    <div className="text-center mb-8 md:mb-10 px-2">
      <h2 className="premium-serif text-[26px] md:text-[36px] font-bold text-[#5c1a1f] mb-3 md:mb-4 leading-tight">{title}</h2>
      {sub && <p className="text-gray-850 text-[15px] md:text-[17px] max-w-[560px] mx-auto leading-relaxed">{sub}</p>}
    </div>
  );

  return (
    <>
      {/* ============ SAMPLE REPORT PREVIEW & MOCKUPS ============ */}
      <section className="py-16 md:py-24 bg-white">
        <Kicker text="Report Preview" />
        <SectionHeading title="See what you're getting" sub="Explore a sample of the report before you purchase. Available beautifully on all your devices." />
        
        <div className="max-w-[1140px] mx-auto px-6 mt-8 md:mt-12">
          
          {/* Mockups Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            <div className="bg-[#fffdf8] border border-[#ebdcc7] rounded-xl p-6 text-center shadow-sm flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-[#5c1a1f]/5 flex items-center justify-center mb-4">
                 <FileText className="w-8 h-8 text-[#5c1a1f]" />
               </div>
               <h3 className="font-bold text-[#5c1a1f] text-lg mb-2">PDF Format</h3>
               <p className="text-sm text-gray-850 mb-6">Download a high-quality PDF ready for print.</p>
               <img src="/images/kundali-pdf-mockup.webp" alt="PDF Preview" className="w-full max-w-[200px] h-auto mx-auto rounded drop-shadow-md bg-gray-100 min-h-[150px] object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x500/f8f9fa/333333?text=PDF+Preview' }} />
            </div>
            
            <div className="bg-[#fffdf8] border border-[#ebdcc7] rounded-xl p-6 text-center shadow-sm flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-[#5c1a1f]/5 flex items-center justify-center mb-4">
                 <svg className="w-8 h-8 text-[#5c1a1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
               </div>
               <h3 className="font-bold text-[#5c1a1f] text-lg mb-2">Mobile View</h3>
               <p className="text-sm text-gray-850 mb-6">Read your report seamlessly on any smartphone.</p>
               <img src="/images/kundali-mobile-mockup.webp" alt="Mobile Preview" className="w-full max-w-[150px] h-auto mx-auto rounded-3xl drop-shadow-lg border-[4px] border-gray-800 bg-gray-100 min-h-[250px] object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/300x600/f8f9fa/333333?text=Mobile+View' }} />
            </div>

            <div className="bg-[#fffdf8] border border-[#ebdcc7] rounded-xl p-6 text-center shadow-sm flex flex-col items-center">
               <div className="w-16 h-16 rounded-full bg-[#5c1a1f]/5 flex items-center justify-center mb-4">
                 <svg className="w-8 h-8 text-[#5c1a1f]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               </div>
               <h3 className="font-bold text-[#5c1a1f] text-lg mb-2">Desktop View</h3>
               <p className="text-sm text-gray-850 mb-6">Explore interactive charts on the web portal.</p>
               <img src="/images/kundali-desktop-mockup.webp" alt="Desktop Preview" className="w-full max-w-[280px] h-auto mx-auto rounded-lg drop-shadow-md border-2 border-gray-200 bg-gray-100 min-h-[160px] object-cover" onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x400/f8f9fa/333333?text=Desktop+View' }} />
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-[#5c1a1f] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center mb-16">
             <div className="p-8 md:p-12 lg:w-1/2">
                <h3 className="premium-serif text-3xl font-bold text-[#d4af37] mb-4">Watch Sample Report</h3>
                <p className="text-white/80 text-[15px] mb-8 leading-relaxed">Take a quick 30-second tour of what exactly you will receive. See the level of detail, the planetary charts, and the year-by-year predictive breakdowns.</p>
                {video.url ? (
                  <a href={video.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#d4af37] text-[#3a1216] px-6 py-3 rounded-full font-bold hover:bg-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Play Video
                  </a>
                ) : (
                  <button className="flex items-center gap-3 bg-[#d4af37] text-[#3a1216] px-6 py-3 rounded-full font-bold hover:bg-white transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg> Play Video
                  </button>
                )}
             </div>
             <div className="lg:w-1/2 w-full aspect-video bg-black relative group cursor-pointer" onClick={() => video.url && window.open(video.url, '_blank')}>
                <img src={video.thumbnail} alt="Video Thumbnail" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x450/1a1a1a/ffffff?text=Video+Thumbnail' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-[#3a1216] ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                   </div>
                </div>
             </div>
          </div>

          {/* Screenshot Gallery */}
          <div className="text-center mb-8">
             <h3 className="text-xl font-bold text-[#5c1a1f] mb-2">A Glimpse Inside</h3>
             <p className="text-sm text-gray-850">Swipe to view actual pages from the report.</p>
          </div>
          <div className="flex overflow-x-auto gap-4 pb-8 snap-x scrollbar-hide justify-start md:justify-center">
             {screenshots.map((shot: any, idx: number) => (
                <div key={idx} className="w-[180px] md:w-[220px] flex-shrink-0 snap-center rounded-xl overflow-hidden border border-[#ebdcc7] shadow-sm">
                   <img src={shot.url} alt={`Sample Page ${idx + 1}`} className="w-full h-auto object-cover" onError={(e) => { e.currentTarget.src = `https://placehold.co/400x550/f8f9fa/5c1a1f?text=Page+${idx + 1}` }} />
                </div>
             ))}
          </div>

        </div>
      </section>

      {/* ============ TESTIMONIALS & TRUST ============ */}
      <section className="py-16 md:py-24 bg-[#fffdf8] border-b border-[#ebdcc7]">
        <div className="max-w-[1140px] mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-[#d97706] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Trusted by 68,000+ Users</p>
            <h2 className="premium-serif text-3xl md:text-4xl font-bold text-[#1a0a0b] mb-4">Life-Changing Insights</h2>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <div className="flex">{[1,2,3,4,5].map(s => <span key={s} className="text-[#f59e0b] text-lg">★</span>)}</div>
              <span className="text-[#111827] font-bold text-sm">4.8 out of 5</span>
              <span className="text-[#D1D5DB] mx-1">|</span>
              <span className="text-[#374151] text-sm">68,000+ Reports Delivered</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl p-7 border border-[#ebdcc7] flex flex-col hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-5">
                  <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <span key={s} className="text-[#f59e0b] text-[15px]">★</span>)}</div>
                </div>
                <p className="text-[#374151] text-[13.5px] leading-[1.85] flex-grow mb-6">"{t.review}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-[#ebdcc7]">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-black shrink-0" style={{backgroundColor: t.color}}>{t.initial}</div>
                  <div className="flex-1">
                    <p className="font-bold text-[#111827] text-[13px] leading-none mb-1">{t.name}</p>
                    <p className="text-[#9CA3AF] text-[11px]">{t.city} · {t.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
