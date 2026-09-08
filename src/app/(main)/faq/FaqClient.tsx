'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FaqPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const res = await fetch(`${apiUrl}/faqs?status=active`);
        if (res.ok) {
          const data = await res.json();
          setFaqs(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const categories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];
  
  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const formatCategory = (cat: string) => {
    if (cat === 'All') return cat;
    return cat.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // Generate JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        // Strip HTML for schema
        text: faq.answer.replace(/<[^>]*>?/gm, '')
      }
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <div className="bg-[#fdf8f0] min-h-screen py-12 md:py-20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-50 bg-[url('/pattern.png')] bg-repeat" />
        
        <div className="max-w-[1000px] mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#5c1420] mb-4">
              Frequently Asked <span className="text-[#d97706]">Questions</span>
            </h1>
            <p className="text-[#412a1e] text-lg max-w-2xl mx-auto">
              Find answers to common questions about our services, consultations, online pujas, and your privacy.
            </p>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="animate-pulse bg-white p-6 rounded-2xl border border-[#f0ddc0]/80 h-20" />
              ))}
            </div>
          ) : faqs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#f0ddc0]/80">
              <h3 className="text-xl font-bold text-[#5c1420]">Check back later!</h3>
              <p className="text-gray-850 mt-2">We are updating our frequently asked questions.</p>
            </div>
          ) : (
            <>
              {/* Category Filter */}
              {categories.length > 2 && (
                <div className="flex flex-wrap gap-2 md:gap-3 mb-10 justify-center">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setTimeout(() => {
                          const element = document.getElementById('faq-accordion-list');
                          if (element) {
                            // Adjust scroll position to account for fixed header
                            const y = element.getBoundingClientRect().top + window.scrollY - 180;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }, 100);
                      }}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
                        activeCategory === cat 
                          ? 'bg-[#5c1420] text-white' 
                          : 'bg-white text-[#412a1e] border border-[#f0ddc0] hover:border-[#d97706] hover:text-[#d97706]'
                      }`}
                    >
                      {formatCategory(cat)}
                    </button>
                  ))}
                </div>
              )}

              {/* FAQ Accordion */}
              <div id="faq-accordion-list" className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div 
                    key={faq._id} 
                    className="bg-white rounded-2xl border border-[#f0ddc0]/80 overflow-hidden shadow-sm transition-all duration-300"
                  >
                    <button 
                      onClick={() => toggleExpand(faq._id)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 focus:outline-none"
                    >
                      <h3 className={`text-lg md:text-xl font-bold pr-8 transition-colors ${expandedId === faq._id ? 'text-[#d97706]' : 'text-[#3a1216] hover:text-[#5c1420]'}`}>
                        {faq.question}
                      </h3>
                      <div className={`shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${expandedId === faq._id ? 'border-[#d97706] text-[#d97706]' : 'border-gray-200 text-[#3a1216]'}`}>
                        <svg 
                          width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                          className={`transition-transform duration-300 ${expandedId === faq._id ? 'rotate-180' : ''}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </button>
                    
                    <div 
                      className={`transition-all duration-300 ease-in-out ${expandedId === faq._id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-gray-50 mx-6">
                        <div 
                          className="prose prose-lg prose-slate text-[#2d1b13] max-w-none 
                            [&_a]:!text-[#ee6c1e] [&_a]:underline [&_a]:decoration-[#ee6c1e]/50 hover:[&_a]:decoration-[#ee6c1e] hover:[&_a]:!text-[#c2410c] [&_a]:font-bold [&_a]:transition-colors"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="mt-16 text-center bg-white p-8 md:p-12 rounded-3xl border border-[#f0ddc0] shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-[#5c1420] mb-4">Still have questions?</h3>
            <p className="text-[#412a1e] mb-8 max-w-lg mx-auto">If you couldn't find the answer to your question, feel free to reach out to our customer support team.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact-us" className="bg-[#d97706] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#b46004] transition-colors shadow-md">
                Contact Support
              </Link>
              <Link href="https://wa.me/919810467823?text=Hello%2C%20I%20need%20astrology%20guidance" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-[#5c1420] text-[#5c1420] px-8 py-3.5 rounded-xl font-bold hover:bg-[#5c1420] hover:text-white transition-colors">WhatsApp Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
