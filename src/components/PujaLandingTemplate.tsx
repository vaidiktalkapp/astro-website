'use client';
import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Droplet, Flame, Heart, Sparkles, Star, CheckCircle2, Clock, MapPin, Calendar, ChevronDown, UserCheck, Leaf, Lock, User, Users, Home, ArrowRight, Video, Camera
} from 'lucide-react';
import Link from 'next/link';

export interface PujaLandingTemplateProps {
  slug: string;
  title: string;
  subtitle?: string;
  basePrice: number;
  image: string;
  aboutText: React.ReactNode;
  benefits: string[];
  typesOfOfferings?: { title: string; desc: string; icon: React.ReactNode }[];
  packages?: { id: string; title: string; desc: string; price: number; oldPrice: number; features: string[] }[];
  processSteps?: string[];
  faqs?: { q: string; a: string }[];
}

export function PujaLandingTemplate({
  slug,
  title,
  subtitle = 'Premium Vedic Ritual',
  basePrice,
  image,
  aboutText,
  benefits,
  typesOfOfferings,
  packages,
  processSteps,
  faqs
}: PujaLandingTemplateProps) {
  const [dynamicData, setDynamicData] = useState<any>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>(packages && packages.length > 0 ? packages[0].id : '');
  const [timeLeft, setTimeLeft] = useState<string>('...');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    import('axios').then(axios => {
      const url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1') + '/pujas/' + slug;
      axios.default.get(url)
        .then(res => setDynamicData(res.data))
        .catch(err => console.log('Dynamic data not found yet'));
    });
  }, [slug]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);
      
      return `${h.toString().padStart(2, '0')}h : ${m.toString().padStart(2, '0')}m : ${s.toString().padStart(2, '0')}s`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const displayPrice = dynamicData?.discountedPrice || dynamicData?.price || basePrice;

  return (
    <div className="w-full bg-[#fff] font-sans text-[#3a1216]">
      <div className="max-w-[1140px] mx-auto px-5 py-6">
        
        {/* BREADCRUMB */}
        <p className="text-[14px] text-[#3a1216]/70 mb-4 font-medium">
          <Link href="/book-a-puja" className="hover:text-[#d97706] transition-colors">Home</Link> &gt; <span className="text-[#3a1216]">{title}</span>
        </p>

        {/* HERO SECTION */}
        <div className="flex flex-col md:flex-row gap-8 py-5">
          <div className="w-full md:w-[45%] lg:w-[526px] shrink-0 relative overflow-hidden rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] aspect-[4/3]">
            <img 
               src={dynamicData?.gallery?.length > 0 ? dynamicData.gallery[0] : image} 
               alt={title}
               className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 bg-[#faf6ee] text-[#d97706] px-3.5 py-1.5 rounded-full text-[13px] font-bold uppercase tracking-wide border border-[#f0ebe1] w-max mb-5">
              <Sparkles className="w-4 h-4" /> {subtitle}
            </div>
            
            <h1 className="text-[32px] md:text-[42px] font-black text-[#3a1216] leading-[1.15] tracking-tight mb-4">
              {title}
            </h1>
            
            <p className="text-[#3a1216]/70 text-[16px] md:text-[18px] font-medium leading-relaxed mb-6">
              Book authentic {title} performed by experienced Vedic pandits. Experience the divine blessings from the comfort of your home.
            </p>

            <div className="bg-[#faf6ee]/50 p-4 rounded-[16px] border border-[#f0ebe1] mb-6 flex flex-wrap gap-4 md:gap-8">
              <div>
                <p className="text-[#3a1216]/60 text-[12.5px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> Next Muhurat</p>
                <p className="text-[17px] font-extrabold text-[#3a1216]">In {timeLeft}</p>
              </div>
              <div>
                <p className="text-[#3a1216]/60 text-[12.5px] font-semibold uppercase tracking-wider mb-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> Location</p>
                <p className="text-[17px] font-extrabold text-[#3a1216]">Astro Solution</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-5 items-center my-3 text-[14px] font-semibold text-[#3a1216]/80">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#d97706]" /> 15K+ already booked
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-[#d97706] fill-[#d97706]" /> 4.9 (5.2K Reviews)
              </span>
            </div>
            
            <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#e5e0d8]">
              <div>
                <div className="text-[#3a1216]/70 text-[13px] font-medium mb-0.5">Starting at</div>
                <div className="text-[28px] font-extrabold text-[#3a1216] leading-none">₹{displayPrice}</div>
              </div>
              <Link 
                href={packages && packages.length > 0 ? '#packages-section' : `/book-a-puja/${slug}/checkout`}
                className="bg-[#d97706] hover:bg-[#b56003] text-white px-8 py-3.5 rounded-xl font-bold text-[16px] transition-all shadow-[0_4px_14px_rgba(217,119,6,0.3)] hover:-translate-y-0.5"
              >
                Book Pooja
              </Link>
            </div>
          </div>
        </div>

        {/* BENEFITS */}
        {benefits && benefits.length > 0 && (
          <div className="py-8 border-t border-[#e5e0d8] mt-6">
            <h2 className="text-[24px] font-bold mb-5 text-[#3a1216]">Benefits of Pooja</h2>
            <ul className="flex flex-wrap gap-3.5">
              {benefits.map((benefit, i) => (
                <li key={i} className="bg-[#faf6ee] px-4.5 py-3 rounded-[14px] text-[14.5px] font-semibold flex items-center gap-2.5 text-[#3a1216]/90 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-transparent">
                  <CheckCircle2 className="w-5 h-5 text-[#d97706] shrink-0" /> {benefit}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ABOUT THIS POOJA */}
        <div className="py-10 border-t border-[#e5e0d8]">
          <h2 className="text-[24px] font-bold mb-6 text-[#3a1216]">About this Pooja</h2>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-[451px] shrink-0">
               <img src={image} alt="About Puja" className="w-full rounded-[20px] object-cover aspect-[4/3] shadow-[0_8px_24px_rgba(0,0,0,0.06)]" />
            </div>
            <div className="flex-1 text-[#3a1216]/80 text-[15.5px] leading-[1.7]">
              {aboutText}
            </div>
          </div>
        </div>

        {/* TYPES OF OFFERINGS */}
        {typesOfOfferings && typesOfOfferings.length > 0 && (
          <div className="py-10 border-t border-[#e5e0d8]">
            <h2 className="text-[24px] font-bold mb-2 text-[#3a1216]">Types of Offerings</h2>
            <p className="text-[#3a1216]/70 mb-8 font-medium text-[15px]">Different offerings yield specific spiritual results based on your Sankalp.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {typesOfOfferings.map((offering, idx) => (
                <div key={idx} className="bg-[#faf6ee]/60 p-6 rounded-[20px] hover:bg-[#faf6ee] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.05)] flex gap-4 items-start border border-transparent">
                  <div className="w-12 h-12 bg-white text-[#d97706] rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    {offering.icon}
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#3a1216] mb-1">{offering.title}</h3>
                    <p className="text-[#3a1216]/70 text-[13.5px] font-medium leading-snug">{offering.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PACKAGES */}
        {packages && packages.length > 0 && (
          <div id="packages-section" className="py-10 border-t border-[#e5e0d8]">
            <h2 className="text-[24px] font-bold mb-6 text-[#3a1216]">Choose Your Pooja Package</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {packages.map(pkg => (
                <div 
                  key={pkg.id} 
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`relative rounded-[24px] p-6 cursor-pointer transition-all duration-300 overflow-hidden ${selectedPackage === pkg.id ? 'bg-white shadow-[0_8px_30px_rgba(217,119,6,0.12)] ring-1 ring-[#d97706]/20 scale-[1.02]' : 'bg-[#faf6ee]/60 hover:bg-[#faf6ee] shadow-[0_4px_20px_rgba(0,0,0,0.02)]'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center ${selectedPackage === pkg.id ? 'bg-[#d97706]/10 text-[#d97706]' : 'bg-white text-[#d97706] shadow-sm'}`}>
                         {pkg.id === 'single' ? <User className="w-5 h-5"/> : pkg.id === 'couple' ? <Users className="w-5 h-5"/> : <Home className="w-5 h-5"/>}
                      </div>
                      <div>
                        <h3 className="font-bold text-[20px] text-[#3a1216] leading-none mb-1">{pkg.title}</h3>
                        <p className="text-[13px] text-[#3a1216]/70 font-medium">{pkg.desc}</p>
                      </div>
                    </div>
                    {selectedPackage === pkg.id && <div className="w-[24px] h-[24px] bg-[#d97706] rounded-full flex items-center justify-center shadow-md"><CheckCircle2 className="w-3.5 h-3.5 text-white" /></div>}
                  </div>
                  
                  <ul className="space-y-3.5 mb-6 text-[14.5px] text-[#3a1216]/90 font-medium min-h-[100px] mt-2">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-[#d97706]/10 flex items-center justify-center shrink-0 mt-[-2px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#d97706]" />
                        </span> 
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-5 border-t border-gray-100 flex items-baseline gap-2.5">
                    <span className="text-[28px] font-extrabold text-[#3a1216]">₹{pkg.price}</span>
                    <span className="text-[14.5px] text-[#3a1216]/60 line-through font-medium">₹{pkg.oldPrice}</span>
                  </div>

                  <Link
                     href={`/book-a-puja/${slug}/checkout?package=${pkg.id}`}
                     onClick={(e) => e.stopPropagation()}
                     className={`w-full py-3.5 mt-5 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center gap-2 ${selectedPackage === pkg.id ? 'bg-[#d97706] hover:bg-[#b56003] text-white shadow-[0_4px_14px_rgba(217,119,6,0.3)]' : 'bg-white text-[#d97706] hover:bg-[#d97706]/5 shadow-sm'}`}
                  >
                     Book {pkg.title} Puja <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HOW IT WORKS */}
        <div className="py-10 border-t border-[#e5e0d8]">
          <h2 className="text-[24px] font-bold mb-1.5 text-[#3a1216]">How it works?</h2>
          <p className="text-[#3a1216]/70 mb-8 font-medium text-[15px]">Simple, transparent, and performed with care.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { icon: <UserCheck className="w-6 h-6" />, title: "1. Book & Share Details", desc: "Select a package and provide your name, gotra, and intentions." },
              { icon: <Clock className="w-6 h-6" />, title: "2. Muhurat & Pandit", desc: "We assign a verified Vedic pandit and confirm the auspicious time." },
              { icon: <Video className="w-6 h-6" />, title: "3. Puja with Sankalp", desc: "Panditji takes your Sankalp. You can watch live via WhatsApp link." },
              { icon: <ShieldCheck className="w-6 h-6" />, title: "4. Prasad Delivered", desc: "Sacred prasad, photos & video recording are sent to your home." }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-[20px] p-6 border border-[#f0ebe1] shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden group hover:border-[#d97706]/40 transition-colors">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#faf6ee] rounded-full group-hover:bg-[#d97706]/10 transition-colors"></div>
                <div className="w-12 h-12 bg-[#faf6ee] text-[#d97706] rounded-2xl flex items-center justify-center mb-5 relative z-10">
                  {step.icon}
                </div>
                <h3 className="font-bold text-[16px] text-[#3a1216] mb-2">{step.title}</h3>
                <p className="text-[14px] text-[#3a1216]/70 leading-relaxed font-medium">
                  {(processSteps && processSteps[idx]) ? processSteps[idx] : step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {(faqs && faqs.length > 0) && (
          <div className="py-10 border-t border-[#e5e0d8]">
            <h2 className="text-[24px] font-bold mb-6 text-[#3a1216]">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-3xl">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`border rounded-[16px] transition-all duration-300 overflow-hidden ${openFaq === i ? 'border-[#d97706]/30 bg-white shadow-[0_4px_20px_rgba(217,119,6,0.05)]' : 'border-[#e5e0d8] bg-[#faf6ee]/30 hover:bg-[#faf6ee]'}`}
                >
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-bold text-[15px] text-[#3a1216]">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#d97706] transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`px-5 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-[#3a1216]/70 text-[14.5px] leading-relaxed font-medium">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
