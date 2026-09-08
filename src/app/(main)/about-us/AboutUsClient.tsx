'use client';

import React from 'react';
import Link from 'next/link';
import {
  Factory,
  Flower2,
  BookOpen,
  Lightbulb,
  Star,
  Leaf,
  Target,
  BookOpenText,
  Key,
  Shield,
  HeartHandshake,
  BrainCircuit,
  UserCheck,
  Compass,
  Sparkles,
  Lock,
  Award
} from 'lucide-react';

const timelineItems = [
  {
    icon: <Factory size={22} className="text-[#5c1420]" />,
    title: "From Global Industry To Human Insight",
    desc: "Years of experience in manufacturing, global trade & building trusted relationships across industries."
  },
  {
    icon: <Flower2 size={22} className="text-[#5c1420]" />,
    title: "A Deeper Realization",
    desc: "Beyond success and achievements, people seek answers to life's deeper questions."
  },
  {
    icon: <BookOpen size={22} className="text-[#5c1420]" />,
    title: "The Power Of Vedic Wisdom",
    desc: "Ancient knowledge holds the answers, but access to authentic guidance is often a challenge."
  },
  {
    icon: <Lightbulb size={22} className="text-[#5c1420]" />,
    title: "The Vision",
    desc: "To make Vedic wisdom accessible, trustworthy & available to everyone through modern technology."
  },
  {
    icon: <Star fill="currentColor" size={22} className="text-[#5c1420]" />,
    title: "AstroSolution Is Born",
    desc: "A trusted ecosystem connecting you with expert astrologers, numerologists, Tarot consultants & spiritual guides."
  }
];

const purposeItems = [
  { icon: <Key size={18} className="text-[#8a1c2a]" />, text: "At AstroSolution, our purpose is to bridge the gap between ancient astrological wisdom and the modern seeker's need for clarity and simplicity." },
  { icon: <Compass size={18} className="text-[#8a1c2a]" />, text: "We provide meaningful insights and practical solutions that help you navigate life's challenges with confidence and ease." },
  { icon: <BrainCircuit size={18} className="text-[#8a1c2a]" />, text: "We blend trusted astrological principles with easy-to-understand guidance to help you make informed decisions and live a balanced, fulfilling life." },
  { icon: <UserCheck size={18} className="text-[#8a1c2a]" />, text: "Our experienced astrologers ensure every reading and remedy is authentic, personalized, and rooted in time-tested wisdom." },
  { icon: <Flower2 size={18} className="text-[#8a1c2a]" />, text: "We offer tools and content that encourage self-awareness, introspection, and personal growth." },
  { icon: <HeartHandshake size={18} className="text-[#8a1c2a]" />, text: "Our mission is to be your spiritual companion, helping you align with cosmic energies to unlock a path of harmony and growth." }];

const storyItems = [
  { icon: <Sparkles size={18} className="text-[#d97706]" />, text: "AstroSolution was born to make astrology accessible and understandable for everyone." },
  { icon: <Shield size={18} className="text-[#d97706]" />, text: "We simplify complex kundalis and remedies into clear, practical guidance that anyone can follow." },
  { icon: <Target size={18} className="text-[#d97706]" />, text: "Our personalized approach is tailored to your birth chart, life stage, and goals." },
  { icon: <Star size={18} className="text-[#d97706]" />, text: "From gemstones to planetary doshas to home rituals—our guidance fits seamlessly into your lifestyle." },
  { icon: <BookOpen size={18} className="text-[#d97706]" />, text: "We educate as well as guide through resources, blogs & videos that help you grow with confidence." },
  { icon: <Leaf size={18} className="text-[#d97706]" />, text: "AstroSolution is a movement to reconnect with timeless wisdom in a modern world." },
  { icon: <HeartHandshake size={18} className="text-[#d97706]" />, text: "We help you feel seen, supported, and spiritually aligned every step of the way." }
];

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col overflow-hidden text-[#2f1718]">

      {/* 1. Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-[#fffaf4] via-[#fcf3e6] to-[#f4dfc4] overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-14 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: Text */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 text-[#b8860b] font-semibold text-sm uppercase tracking-widest mb-4">
              <Leaf size={16} />
              The Founder Behind the Vision
            </div>

            <h1 className="font-serif font-bold text-[#5c1420] text-[40px] md:text-[52px] lg:text-[60px] leading-[1.1] mb-2 tracking-tight">
              Shri Arvind<br />R Sharma
            </h1>

            <h2 className="font-serif font-bold text-[#8a1c2a] text-[18px] md:text-[22px] mb-6">
              Co-Founder, AstroSolution
            </h2>

            {/* Decorative Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d97706]/40"></div>
              <div className="w-2 h-2 rotate-45 bg-[#d97706]"></div>
              <div className="h-[1px] w-64 bg-gradient-to-r from-[#d97706]/40 to-transparent"></div>
            </div>

            <h3 className="font-serif font-bold text-[#5c1420] text-[20px] md:text-[24px] leading-[1.3] mb-4">
              From Sacred Traditions to Digital Guidance
            </h3>

            <p className="text-[15px] md:text-[16px] text-[#412a1e] font-medium leading-[1.7]">
              AstroSolution was co-founded by Shri Arvind R Sharma, a visionary whose journey spans the ancient science of Jyotish and the modern world of technology-driven wellness.
            </p>
          </div>

          {/* Right: Image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-full max-w-[420px] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(92,20,32,0.15)] border border-[#f0ddc0]">
              <img
                src="/founder.webp"
                alt="Shri Arvind R Sharma"
                className="w-full h-[420px] md:h-[500px] object-cover object-[center_10%]"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-[#5c1420] text-center py-3 px-4">
                <div className="font-bold text-[15px] md:text-[16px] text-white">Shri Arvind R Sharma</div>
                <div className="text-[12px] md:text-[13px] text-[#fbe7d3]">Co-Founder, AstroSolution</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Timeline and Story Section */}
      <section className="py-16 md:py-24 px-6 md:px-10 max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Left Column: Timeline */}
          <div className="lg:col-span-5 relative">
            {/* Vertical Line */}
            <div className="absolute left-[24px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#d97706]/40 via-[#d97706]/40 to-transparent z-0 hidden md:block"></div>

            <div className="space-y-8 relative z-10">
              {timelineItems.map((item, idx) => (
                <div key={idx} className="flex gap-6 items-start">
                  <div className="w-[50px] h-[50px] rounded-full bg-[#f3e4c8] border-2 border-[#d97706]/30 flex-shrink-0 flex items-center justify-center shadow-sm relative z-10">
                    {item.icon}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-serif font-bold text-[#5c1420] text-lg mb-1">{item.title}</h4>
                    <p className="text-sm text-[#5e4339] leading-relaxed max-w-[280px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Story Text */}
          <div className="lg:col-span-7">
            <div className="font-serif text-[#d97706]/40 text-[80px] leading-[0.5] mb-6">
              “
            </div>

            <div className="space-y-6 text-[#412a1e] text-[17px] leading-[1.8]">
              <p>
                With over 15 years of dedicated study in Vedic astrology and spiritual sciences, Shri Arvind R Sharma has guided thousands of families through life's most pivotal decisions—from marriage and career to health and prosperity. His deep-rooted knowledge of Jyotish, combined with a compassionate approach, earned him the trust of seekers across India.
              </p>

              {/* Small dot divider */}
              <div className="flex justify-center w-8 mx-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]/50"></div>
              </div>

              <p>
                Yet, throughout this journey, he observed a common reality: regardless of profession, background, or financial success, people often searched for answers beyond business and material achievements. Questions about relationships, health, career decisions, family challenges, and personal growth remained universal.
              </p>

              <div className="flex justify-center w-8 mx-auto">
                <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]/50"></div>
              </div>

              <p>
                Over the years, he noticed that many individuals wanted genuine astrological guidance but struggled to find trustworthy experts. The market was crowded with conflicting advice, inconsistent experiences, and limited transparency. Ancient Vedic wisdom had the power to provide clarity and direction, yet access to authentic guidance remained a challenge.
              </p>

              {/* Question Box */}
              <div className="bg-[#fff8ed] border border-[#eedcbd] rounded-xl p-5 md:p-6 flex items-start gap-4 shadow-sm my-8">
                <div className="w-10 h-10 bg-[#f6e2c8] rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-xl text-[#8a1c2a]">
                  ?
                </div>
                <p className="font-serif text-[17px] md:text-[18px] leading-relaxed italic text-[#5c1420] font-medium">
                  What if ancient Vedic knowledge could be made accessible, trustworthy, and available to anyone, anywhere through modern technology?
                </p>
              </div>

              <p>
                With this belief, AstroSolution was born.
              </p>

              <p>
                Today, AstroSolution combines timeless Vedic wisdom with the convenience of modern technology. Whether someone seeks guidance about career growth, marriage, relationships, finances, health, business decisions, or personal development, our experts provide meaningful insights rooted in authentic traditions and practical understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission Box */}
      <section className="px-6 md:px-10 max-w-[1200px] mx-auto w-full mb-16">
        <div className="bg-[#fff8ed] rounded-[2rem] p-8 md:p-12 border border-[#eedcbd] flex flex-col md:flex-row gap-8 items-center shadow-[0_10px_30px_rgba(217,119,6,0.05)]">
          <div className="w-24 h-24 rounded-full bg-[#f6e2c8] border-4 border-white flex items-center justify-center flex-shrink-0 shadow-md text-[#8a1c2a]">
            <Award size={40} />
          </div>
          <div className="text-center md:text-left">
            <p className="text-[#412a1e] text-[16px] leading-[1.8] mb-3">
              For Shri Arvind R Sharma, AstroSolution represents the culmination of a lifelong commitment to making authentic Vedic wisdom accessible to every Indian household. His mission is simple: to help individuals find clarity, confidence, and direction through the timeless science of astrology.
            </p>
            <p className="font-serif font-bold text-[#5c1420] text-[18px]">
              This is more than a business. It is a mission to build trust in an industry where trust matters most.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Pull Quote */}
      <section className="px-6 md:px-10 max-w-[900px] mx-auto w-full mb-20 text-center relative">
        <div className="text-[#d97706] text-4xl absolute -top-4 -left-2 md:-left-8 font-serif opacity-50">“</div>
        <p className="font-serif text-[#8a1c2a] text-[20px] md:text-[24px] leading-relaxed italic font-semibold px-4 md:px-8">
          What began as one entrepreneur's vision has grown into a platform trusted by thousands—a place where ancient wisdom meets modern convenience, and where every question is met with guidance, integrity, and care.
        </p>
        <div className="text-[#d97706] text-4xl absolute -bottom-8 -right-2 md:-right-8 font-serif opacity-50">”</div>
      </section>

      {/* 5. Purpose & Story Cards */}
      <section className="px-6 md:px-10 max-w-[1200px] mx-auto w-full mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* Our Purpose */}
          <div className="bg-[#fdfaf5] border border-[#e8d1b3] rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <Target size={32} className="text-[#5c1420]" />
              <h3 className="font-serif font-bold text-[#5c1420] text-[28px]">Our Purpose</h3>
            </div>
            <div className="space-y-6">
              {purposeItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#f3e4c8] flex-shrink-0 flex items-center justify-center mt-0.5">
                    {item.icon}
                  </div>
                  <p className="text-[14px] md:text-[15px] text-[#5e4339] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Our Story */}
          <div className="bg-[#fdfaf5] border border-[#e8d1b3] rounded-[2rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4 mb-8">
              <BookOpenText size={32} className="text-[#d97706]" />
              <h3 className="font-serif font-bold text-[#5c1420] text-[28px]">Our Story</h3>
            </div>
            <div className="space-y-6">
              {storyItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-[#f3e4c8] flex-shrink-0 flex items-center justify-center mt-0.5">
                    {item.icon}
                  </div>
                  <p className="text-[14px] md:text-[15px] text-[#5e4339] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 6. Why Choose Us (Footer-ish section) */}
      <section className="bg-gradient-to-b from-[#fffaf4] to-[#f4dfc4] py-16 px-6 md:px-10 text-center">
        <h2 className="font-serif font-bold text-[#5c1420] text-[32px] md:text-[40px] mb-2">
          Why Choose Us
        </h2>

        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d97706]/40"></div>
          <div className="w-2 h-2 rotate-45 bg-[#d97706]"></div>
          <div className="h-[1px] w-12 bg-gradient-to-r from-[#d97706]/40 to-transparent"></div>
        </div>

        <p className="text-[#412a1e] font-medium text-[16px] mb-12">
          Trusted Experts Delivering Personalized and Proven Astrological Solutions.
        </p>

        <div className="max-w-[900px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#fffcf8] border-2 border-[#e8d1b3] shadow-md flex items-center justify-center mb-4 text-[#8a1c2a]">
              <UserCheck size={36} />
            </div>
            <h4 className="font-serif font-bold text-[#5c1420] text-[18px] mb-2">Expert Astrologers</h4>
            <p className="text-[14px] text-[#5e4339] max-w-[200px]">Guidance from experienced professionals</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#fffcf8] border-2 border-[#e8d1b3] shadow-md flex items-center justify-center mb-4 text-[#8a1c2a]">
              <Target size={36} />
            </div>
            <h4 className="font-serif font-bold text-[#5c1420] text-[18px] mb-2">Accurate Predictions</h4>
            <p className="text-[14px] text-[#5e4339] max-w-[200px]">Providing reliable and insightful readings</p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-[#5c1420] border-2 border-[#5c1420] shadow-md flex items-center justify-center mb-4 text-white">
              <Lock size={36} />
            </div>
            <h4 className="font-serif font-bold text-[#5c1420] text-[18px] mb-2">Privacy Guaranteed</h4>
            <p className="text-[14px] text-[#5e4339] max-w-[200px]">Your data and consultations are 100% secure</p>
          </div>

        </div>

        {/* CTA Button */}
        <div className="mt-14 flex justify-center">
          <Link href="#" className="inline-flex justify-center items-center gap-2 bg-[#d97706] text-white font-semibold text-[17px] px-8 py-4 rounded-xl shadow-[0_10px_20px_rgba(217,119,6,0.3)] hover:bg-[#c26a05] hover:-translate-y-1 transition-all duration-300">
            Talk to our Experts
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

    </div>
  );
}
