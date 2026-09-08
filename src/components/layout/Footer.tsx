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
            <img src="/astrosolution-logo.png" alt="AstroSolution" className="h-24 lg:h-[90px] w-[250px] lg:w-[320px] object-contain object-left -ml-1" />
            <div className="text-[#ee6c1e] text-[15px] lg:text-[16px] font-bold flex items-center gap-1.5 ml-1 mt-1">
              <span className="text-[17px] leading-none mb-0.5">🙏</span> 68k+ Happy Customers
            </div>
          </div>
          <p className="text-[16px] lg:text-[17px] text-[#412a1e] leading-[1.8] font-medium text-left">
            Astro Solution is your trusted destination for Vedic astrology guidance. Get accurate predictions about marriage, love life, career, health, and more through personalised Kundli analysis, detailed reports, and expert astrological tools. Explore authentic Vedic wisdom through daily horoscopes, panchang, muhurat, and comprehensive astrological calculators — all in one place.
          </p>
        </div>

        {/* Top Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 mb-4">
          {/* Horoscope */}
          <FooterSection title="Horoscope">
            <ul className="space-y-3.5 pb-2 lg:pb-0">
              <li><Link href="/daily-horoscope" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Daily Horoscope</Link></li>
              <li><Link href="/tomorrow-horoscope" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Tomorrow&apos;s Horoscope</Link></li>
              <li><Link href="/weekly-horoscope" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Weekly Horoscope</Link></li>
              <li><Link href="/love-horoscope" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Love Horoscope</Link></li>
              <li><Link href="/chinese-horoscope" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Chinese Horoscope</Link></li>
            </ul>
          </FooterSection>

          {/* Free Tools */}
          <FooterSection title="Free Tools">
            <ul className="space-y-3.5 pb-2 lg:pb-0">
              <li><Link href="/kundli" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Generate Free Kundli</Link></li>
              <li><Link href="/kundli-matching" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Kundli Matching</Link></li>
              <li><Link href="/astrology-calculators" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Astrology Calculators</Link></li>
              <li><Link href="/love-astrology" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Love Compatibility</Link></li>
              <li><Link href="/moon-sign-calculator" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Moon Sign Calculator</Link></li>
            </ul>
          </FooterSection>

          {/* Explore */}
          <FooterSection title="Explore">
            <ul className="space-y-3.5 pb-2 lg:pb-0">
              <li><Link href="/book-a-puja" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Book a Remedy Puja</Link></li>
              <li><Link href="/rahu-kaal" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Rahu Kaal Today</Link></li>
              <li><Link href="#!" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Astro Blogs</Link></li>
              <li><Link href="/panchang" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Today&apos;s Panchang</Link></li>
              <li><Link href="/about-us" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">About us</Link></li>
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
        </div>

        {/* Separator */}
        <hr className="border-t border-dashed border-[#e6d5bd] my-8" />

        {/* Middle Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 mb-8">

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
            {/* Astrologer registration removed - static website */}
            <FooterSection title="Contact Us">
              <ul className="space-y-3.5 pb-2 lg:pb-0">
                <li><Link href="/contact-us" className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium hover:text-[#ee6c1e] transition-colors">Contact Support Team</Link></li>
                <li className="text-[14.5px] lg:text-[15.5px] text-[#412a1e] font-medium">Email: <a href="mailto:contact@AstroSolution.com" className="hover:text-[#ee6c1e] transition-colors underline">contact@AstroSolution.com</a></li>
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

          {/* Download App section removed - static website */}
          <div className="pt-4 lg:pt-0">
            {/* Social Icons */}
            <h4 className="font-serif font-bold text-[15px] lg:text-[16px] text-[#5c1420] mb-5 tracking-wide uppercase">Follow Us</h4>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-sm transition-all transform hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" /></svg>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm transition-all transform hover:scale-105" style={{ background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-sm transition-all transform hover:scale-105">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

          <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
            {/* Logo */}
            <img src="/astrosolution-logo.png" alt="AstroSolution Logo" className="h-16 w-auto object-contain" />
            <div className="text-[13px] text-[#412a1e] font-medium">
              © 2026 Astro Solution Powered By ASTRO SOLUTION TECHNOLOGIES PRIVATE LIMITED All rights reserved.            </div>
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
