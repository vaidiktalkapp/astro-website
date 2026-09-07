'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const FooterSection = ({ title, children }: { title: string, children: React.ReactNode }) => {
  return (
    <div className="py-2 lg:py-0"  >
      <h4 className="font-serif font-bold text-[16px] lg:text-[16px] text-[#5c1420] tracking-wide uppercase mb-4 lg:mb-5">{title}</h4>
      <div>
        {children}
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <footer className="bg-[#fdfaf7] border-t-2 border-[#d4af37]/50 pt-12 lg:pt-16 pb-8 px-6 lg:px-10 mt-auto w-full font-sans relative">
      <div className="max-w-[1400px] mx-auto">
        {/* Intro Section */}
        <div className="mb-12 lg:mb-16 w-full max-w-[1200px]">
          <div className="flex flex-col items-start gap-2 mb-6">
            <img src="/Vaidik-talk1.webp" alt="VaidikTalk" className="h-14 lg:h-[64px] w-[200px] lg:w-[240px] object-contain object-left -ml-1" />
            <div className="text-[#ee6c1e] text-[15px] lg:text-[16px] font-bold flex items-center gap-1.5 ml-1 mt-1">
              <span className="text-[17px] leading-none mb-0.5">🙏</span> 68k+ Happy Customers
            </div>
          </div>
          <p className="text-[16px] lg:text-[17px] text-[#412a1e] leading-[1.8] font-medium text-left">
            Vaidik talk is the ultimate destination for online astrology predictions. Connect with expert astrologers via call or chat and gain insights into your future through personalized Kundli analysis. Get accurate predictions about marriage, love life, career, health, and more from top Indian astrologers. Whether you seek answers through detailed reports, instant queries, or live consultations, Vaidik talk brings clarity and guidance to your life&apos;s most important questions. Start your journey toward a better future today!
          </p>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 lg:gap-y-12 mb-8 lg:mb-10">
          {/* Reports */}
          <FooterSection title="Reports">
            <ul className="space-y-3.5 pb-2 lg:pb-0">
              <li><Link href="/report/kundali/vaidik-smart-kundali-10-years" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Premium Personalised Kundli</Link></li>
              <li><Link href="/report/kundali/kundali-matching" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Premium Kundli Matching</Link></li>
              <li><Link href="/report/detailed/gemstone" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Premium Gemstone Report</Link></li>
              <li><Link href="/report/numerology/fortune-numerology" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Premium Numerology Report</Link></li>
            </ul>
          </FooterSection>

          {/* Explore */}
          <FooterSection title="Explore">
            <ul className="space-y-3.5 pb-2 lg:pb-0">
              <li><Link href="/astrology-calculators" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Free Astrology Tools</Link></li>
              <li><Link href="/daily-horoscope" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Daily Horoscope</Link></li>
              <li><Link href="/book-a-puja" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Book a Remedy Puja</Link></li>
              <li><Link href="/rahu-kaal" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Rahu Kaal Today</Link></li>
              <li><Link href="/panchang" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Today&apos;s Panchang</Link></li>
            </ul>
          </FooterSection>

          {/* Shubh Muhurat */}
          <FooterSection title="Shubh Muhurat">
            <ul className="space-y-3.5 pb-2 lg:pb-0">
              <li><Link href="/muhurat" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Marriage Muhurat 2026</Link></li>
              <li><Link href="/muhurat" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Griha Pravesh Muhurat 2026</Link></li>
              <li><Link href="/muhurat" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Mundan Muhurat 2026</Link></li>
              <li><Link href="/muhurat" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Namkaran Muhurat 2026</Link></li>
              <li><Link href="/muhurat" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Business Muhurat 2026</Link></li>
            </ul>
          </FooterSection>

          {/* Consultations */}
          <FooterSection title="Consultations">
            <ul className="space-y-3.5 pb-2 lg:pb-0">
              <li><Link href="/astrologers-chat" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Chat with Astrologer</Link></li>
              <li><Link href="/astrologers-call" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Talk to Astrologer</Link></li>
              <li><Link href="/ai-astrologer-chat" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">AI Astrologer Chat</Link></li>
            </ul>
          </FooterSection>
        </div>

        {/* Shop Our Products - Full Width */}
        <div className="mb-8 lg:mb-12">
          <FooterSection title="Shop Our Products">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5 pb-2 lg:pb-0">
              <a href="https://vaidiktalk.store/collections/rudraksha" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Rudraksha</a>
              <a href="https://vaidiktalk.store/collections/siddh-rudraksha" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Siddh Rudraksha</a>
              <a href="https://vaidiktalk.store/collections/siddh-yantra" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Yantras</a>
              <a href="https://vaidiktalk.store/collections/frames" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Frames</a>
              <a href="https://vaidiktalk.store/collections/karungali" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Karungali</a>
              <a href="https://vaidiktalk.store/collections/our-combos" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Our Combos</a>
              <a href="https://vaidiktalk.store/collections/pyrite" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Pyrite</a>
              <a href="https://vaidiktalk.store/collections/kavach" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Kavach</a>
              <a href="https://vaidiktalk.store/collections/siddh-range" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Siddh Range</a>
              <a href="https://vaidiktalk.store/collections/pyramid" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Pyramid</a>
              <a href="https://vaidiktalk.store/collections/tower-tumbles" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Tower & Tumbles</a>
              <a href="https://vaidiktalk.store/collections/premium-rudraksha" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Premium Rudraksha</a>
              <a href="https://vaidiktalk.store/collections/evil-eye" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Evil Eye</a>
              <a href="https://vaidiktalk.store/collections/gifting" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Gifting</a>
              <a href="https://vaidiktalk.store/collections/crystal-tree" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Crystal Trees</a>
              <a href="https://vaidiktalk.store/collections/mala" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Mala</a>
              <a href="https://vaidiktalk.store/collections/pendants" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Pendants</a>
              <a href="https://vaidiktalk.store/collections/parad" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Parad</a>
              <a href="https://vaidiktalk.store/collections/bracelets-1" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Bracelets</a>
              <a href="https://vaidiktalk.store/collections/woman-anklet" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Woman Anklet</a>
              <a href="https://vaidiktalk.store/collections/women-bracelet-1" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-white border border-[#e6d5bd]/60 rounded-full text-[13px] text-[#412a1e] font-medium hover:bg-[#8a1c2a] hover:text-white hover:border-[#8a1c2a] transition-all shadow-sm">Women Bracelet</a>
            </div>
            
            {/* Amazon Banner */}
            <div className="flex justify-center lg:justify-start mt-6 mb-2">
              <a href="https://www.amazon.in/stores/VaidikTalk/page/C1CF9D76-C989-47CB-A829-2B753F4561AF?lp_asin=B0HDTM71DC&ref_=ast_bln" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-xl border border-[#e6d5bd] shadow-sm hover:shadow-md transition-all hover:scale-[1.02]">
                 <span className="text-[14px] lg:text-[15px] text-[#412a1e] font-bold">Our brand store is also available on</span>
                 <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-[18px] lg:h-[20px] object-contain mt-1" />
              </a>
            </div>
          </FooterSection>
        </div>

        {/* Separator */}
        <hr className="border-t border-dashed border-[#e6d5bd] my-6 lg:my-10" />

        {/* Middle Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 lg:gap-y-12 mb-10">

          {/* Column 1 */}
          <FooterSection title="Corporate Info">
            <ul className="space-y-3.5 pb-2 lg:pb-0">
              <li><Link href="/refund-policy" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Refund &amp; Cancellation Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Disclaimer</Link></li>
              <li><Link href="/about-us" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">About Us</Link></li>
            </ul>
          </FooterSection>

          {/* Column 2 */}
          <div className="flex flex-col gap-6 lg:gap-10">
            <FooterSection title="Astrologer">
              <ul className="space-y-3.5 pb-2 lg:pb-0">
                <li><Link href="/register-astrologer" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Astrologer Registration</Link></li>
              </ul>
            </FooterSection>
            <FooterSection title="Contact Us">
              <ul className="space-y-3.5 pb-2 lg:pb-0">
                <li><Link href="/contact-us" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Contact Support Team</Link></li>
                <li className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium">Available 24x7 on chat support</li>
                <li className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium">Email: <a href="mailto:contact@vaidiktalk.com" className="hover:text-[#ee6c1e] transition-colors underline">contact@vaidiktalk.com</a></li>
              </ul>
            </FooterSection>
          </div>

          {/* Column 3 */}
          <FooterSection title="Secure">
            <ul className="space-y-4 pb-2 lg:pb-0">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#f0ddc0] flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5c1420" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[13.5px] text-[#412a1e] font-medium">Private &amp; Confidential</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#f0ddc0] flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5c1420" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[13.5px] text-[#412a1e] font-medium">Verified Astrologers</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#f0ddc0] flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5c1420" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <span className="text-[13.5px] text-[#412a1e] font-medium">Secure Payments</span>
              </li>
            </ul>
          </FooterSection>

          {/* Column 4 */}
          <div className="pt-4 lg:pt-0">
            <h4 className="font-serif font-bold text-[15px] lg:text-[16px] text-[#5c1420] mb-5 tracking-wide uppercase">Download The App</h4>
            <div className="flex flex-col gap-3 mb-8">
              {/* Google Play Button */}
              <a href="https://play.google.com/store/apps/details?id=com.vaidiktalk&hl=en_IN" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity inline-block w-[140px]">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="w-full h-auto" />
              </a>
              {/* App Store Button */}
              <a href="https://apps.apple.com/in/app/vaidik-talk/id6759283230" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity inline-block w-[140px]">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="w-full h-auto" />
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://www.facebook.com/vaidiktalk/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:opacity-90 shadow-sm transition-all transform hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" /></svg>
              </a>
              <a href="https://www.instagram.com/vaidiktalk/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 shadow-sm transition-all transform hover:scale-105" style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.youtube.com/channel/UC9R0W5yvEFM7BavR85woAFQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:opacity-90 shadow-sm transition-all transform hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
            {/* Logo */}
            <img src="/Vaidik-talk1.webp" alt="VaidikTalk Logo" className="h-10 w-auto object-contain" />
            <div className="text-[13px] text-[#412a1e] font-medium">
              © 2026 At Vaidik Talk Powered By CATALYST SOURCING PRIVATE LIMITED All rights reserved.            </div>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-[#412a1e] font-medium">
            Payments powered &amp; secured by
            <img src="https://badges.razorpay.com/badge-light.png" alt="Razorpay" className="h-8 object-contain ml-1" />
          </div>

        </div>
      </div>
    </footer>
  );
}
