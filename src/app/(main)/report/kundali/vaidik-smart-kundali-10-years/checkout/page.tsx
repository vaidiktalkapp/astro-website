'use client';

import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { useReportBooking } from '../../../../../../hooks/useReportBooking';
import { Check, Clock, Plus, X, Users, ShieldCheck, ChevronDown, CheckSquare, Square, MapPin, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const [settings, setSettings] = useState<any>(null);
  const [unknownTime, setUnknownTime] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const basePrice = settings?.discountedPrice || 649;
  const totalAmount = basePrice;
  const finalReportName = 'Premium Personalised Kundli 10 Years';

  const { formData, setFormData, handleChange, handleSubmit, isProcessing } = useReportBooking({
    name: finalReportName,
    slug: 'vaidik-smart-kundali-10-years',
    amount: totalAmount,
    onSuccess: (bookingId) => {
      router.push(`/report/kundali/vaidik-smart-kundali-10-years/success?bookingId=${bookingId}`);
    }
  });

  useEffect(() => {
    if (!formData.email) {
      setFormData((prev: any) => ({ ...prev, email: 'customer@AstroSolution.com' }));
    }
  }, [formData.email, setFormData]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get('/smart-kundali-settings/vaidik-smart-kundali-10-years');
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (formData.pob && formData.pob.length > 2 && showSuggestions) {
        setIsSearchingLocation(true);
        try {
          const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(formData.pob)}&limit=5`);
          const data = await res.json();
          setLocationSuggestions(data.features || []);
        } catch (err) {
          console.error(err);
        } finally {
          setIsSearchingLocation(false);
        }
      } else {
        setLocationSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [formData.pob, showSuggestions]);

  return (
    <div className="min-h-screen bg-[#fdfaf6] pb-32">
      <style>{`footer { display: none !important; }`}</style>
            <div className="bg-white border-b border-[#ebdcc7] mb-4">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center">
          <button onClick={() => router.back()} type="button" className="flex items-center gap-2 text-[#5c1a1f] font-bold text-[14px] hover:text-[#d68636] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 pt-2 pb-8 md:pt-4 md:pb-12 space-y-6">
        {/* Form Container */}
        <div className="bg-white rounded-xl border-[1.5px] border-[#c57636] p-5 md:p-8 shadow-md">
          <h2 className="text-[20px] md:text-[22px] font-bold text-[#5c1a1f] mb-6">Details Required for your Premium Personalized Kundli</h2>

          <form id="checkout-form" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[15px] font-bold text-[#5c1a1f] mb-1">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-white outline-none focus:border-[#d68636] text-[14px]" placeholder="Enter full name" />
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[15px] font-bold text-[#5c1a1f] mb-1">Gender <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-4 h-[42px] border border-[#ebdcc7] rounded-md px-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="male" onChange={handleChange} required className="w-4 h-4 accent-[#996033]" />
                    <span className="text-[14px] text-[#3a1216]">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="female" onChange={handleChange} required className="w-4 h-4 accent-[#996033]" />
                    <span className="text-[14px] text-[#3a1216]">Female</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="other" onChange={handleChange} required className="w-4 h-4 accent-[#996033]" />
                    <span className="text-[14px] text-[#3a1216]">Other</span>
                  </label>
                </div>
              </div>

              {/* Place of Birth */}
              <div className="flex flex-col gap-1.5 md:col-span-2 relative">
                <label className="text-[15px] font-bold text-[#5c1a1f] mb-1">Place of Birth <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3a1216]/40" />
                  <input 
                    required 
                    type="text" 
                    name="pob" 
                    value={formData.pob} 
                    onChange={(e) => {
                      handleChange(e);
                      setShowSuggestions(true);
                    }} 
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full border border-[#ebdcc7] rounded-md py-2.5 pl-9 pr-3 bg-white outline-none focus:border-[#d68636] text-[14px]" 
                    placeholder="Enter place of birth (City, State)" 
                    autoComplete="off"
                  />
                  {isSearchingLocation && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#d68636]" />
                  )}
                </div>

                {/* Autocomplete Dropdown */}
                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ebdcc7] rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {locationSuggestions.map((suggestion, idx) => {
                      const { name, state, country } = suggestion.properties;
                      const displayName = [name, state, country].filter(Boolean).join(', ');
                      return (
                        <div 
                          key={idx}
                          className="px-4 py-2.5 hover:bg-[#fdfaf6] cursor-pointer border-b border-gray-50 last:border-0 text-[13px] text-[#3a1216] flex items-start gap-2"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setFormData(prev => ({ ...prev, pob: displayName }));
                            setShowSuggestions(false);
                          }}
                        >
                          <MapPin className="w-4 h-4 text-[#d68636] shrink-0 mt-0.5" />
                          <span>{displayName}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* WhatsApp Number (Assuming we map it to phone) */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[15px] font-bold text-[#5c1a1f] mb-1">WhatsApp Number <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="border border-r-0 border-[#ebdcc7] rounded-l-md px-2 py-2.5 bg-[#fdfaf6] flex items-center justify-center shrink-0">
                    <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-5 h-auto mr-1" />
                    <span className="text-[13px] text-[#3a1216]">+91</span>
                    <ChevronDown className="w-3 h-3 ml-1 text-[#3a1216]/60" />
                  </div>
                  <input required type="tel" maxLength={10} pattern="[0-9]{10}" onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }} name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-[#ebdcc7] rounded-r-md py-2.5 px-3 bg-white outline-none focus:border-[#d68636] text-[14px]" placeholder="9874589698" />
                </div>
                <p className="text-[11px] text-[#3a1216]/80 italic mt-0.5"></p>
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[15px] font-bold text-[#5c1a1f] mb-1">Date of Birth <span className="text-red-500">*</span></label>
                <input required type="date" name="dob" value={formData.dob} onChange={handleChange} onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) {} }} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-white outline-none focus:border-[#d68636] text-[14px]" />
              </div>

              {/* Time of Birth */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[15px] font-bold text-[#5c1a1f] mb-1">Time of Birth <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input required={!unknownTime} disabled={unknownTime} type="time" name="tob" value={formData.tob} onChange={handleChange} onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) {} }} className={`w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-white outline-none focus:border-[#d68636] text-[14px] ${unknownTime ? 'opacity-50 bg-gray-50' : ''}`} />
                </div>
                <label className="flex items-center gap-2 mt-1 cursor-pointer w-max" onClick={(e) => { e.preventDefault(); setUnknownTime(!unknownTime); }}>
                  {unknownTime ? <CheckSquare className="w-4 h-4 text-[#c57636]" /> : <Square className="w-4 h-4 text-[#3a1216]/60" />}
                  <span className="text-[12px] text-[#2b7b8e]">I don't know accurate time</span>
                </label>
                <p className="text-[13px] text-[#c57636] font-medium mt-1">80% accuracy even without an exact birth time.</p>
              </div>

              {/* Report Language */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[15px] font-bold text-[#5c1a1f] mb-1">Report Language <span className="text-red-500">*</span></label>
                <select required name="language" value={formData.language || 'en'} onChange={handleChange} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-white outline-none focus:border-[#d68636] text-[14px]">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>

              {/* Chart Style */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[15px] font-bold text-[#5c1a1f] mb-1">Chart Style <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-4 h-[42px] border border-[#ebdcc7] rounded-md px-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="chartStyle" value="NORTH_INDIAN" checked={!formData.chartStyle || formData.chartStyle === 'NORTH_INDIAN'} onChange={handleChange} required className="w-4 h-4 accent-[#996033]" />
                    <span className="text-[14px] text-[#3a1216]">North Indian</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="chartStyle" value="SOUTH_INDIAN" checked={formData.chartStyle === 'SOUTH_INDIAN'} onChange={handleChange} required className="w-4 h-4 accent-[#996033]" />
                    <span className="text-[14px] text-[#3a1216]">South Indian</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="chartStyle" value="EAST_INDIAN" checked={formData.chartStyle === 'EAST_INDIAN'} onChange={handleChange} required className="w-4 h-4 accent-[#996033]" />
                    <span className="text-[14px] text-[#3a1216]">East Indian</span>
                  </label>
                </div>
              </div>


            </div>
          </form>
        </div>


      </div>

      {/* Trust Badges */}
      <div className="flex justify-center items-center gap-4 md:gap-8 mt-8 mb-4">
        <div className="flex flex-col md:flex-row items-center gap-1.5">
          <Users className="w-5 h-5 md:w-4 md:h-4 text-[#996033]" />
          <span className="text-[14px] font-bold text-[#996033]">4.9/5 Rated</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-1.5">
          <ShieldCheck className="w-5 h-5 md:w-4 md:h-4 text-[#996033]" />
          <span className="text-[14px] font-bold text-[#996033]">10 Lakh+</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-1.5">
          <Clock className="w-5 h-5 md:w-4 md:h-4 text-[#996033]" />
          <span className="text-[14px] font-bold text-[#996033]">24/7 Guidance</span>
        </div>
      </div>

      {/* Bottom Sticky Payment Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#fdfaf6] border-t border-[#ebdcc7] p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-50">
        <div className="max-w-[900px] mx-auto">
          <button
            type="submit"
            form="checkout-form"
            disabled={isProcessing}
            className="w-full bg-[#d68636] text-white font-bold text-[20px] py-4 rounded-xl shadow-lg hover:bg-[#b06126] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? 'Processing...' : `Pay now - ₹${totalAmount}`}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

    </div>
  );
}

