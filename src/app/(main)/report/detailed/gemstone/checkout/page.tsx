'use client';

import React, { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import { useReportBooking } from '@/hooks/useReportBooking';
import { Clock, Plus, X, Users, ShieldCheck, ChevronDown, CheckSquare, Square, MapPin, Loader2, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GemstoneCheckoutPage() {
  const [settings, setSettings] = useState<any>(null);
  const [addConsultation, setAddConsultation] = useState(false);
  const [addExpressDelivery, setAddExpressDelivery] = useState(false);
  const router = useRouter();

  // User Details
  const [userData, setUserData] = useState({ name: '', gender: '', dob: '', tob: '', pob: '', country: '', state: '', email: '', phone: '' });
  const [unknownTime, setUnknownTime] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [language, setLanguage] = useState('');

  const basePrice = settings?.discountedPrice || 549;
  const consultationPrice = settings?.astrologerConsultationPrice > 0 ? settings.astrologerConsultationPrice : 1100;
  const expressPrice = settings?.expressDeliveryPrice > 0 ? settings.expressDeliveryPrice : 149;

  const consultationOriginalPrice = 4999;
  const consultationDiscountPercent = Math.round(((consultationOriginalPrice - consultationPrice) / consultationOriginalPrice) * 100);

  const totalAmount = basePrice + (addConsultation ? consultationPrice : 0) + (addExpressDelivery ? expressPrice : 0);

  const [consultationDate, setConsultationDate] = useState('');
  const [consultationTime, setConsultationTime] = useState('');

  const finalReportName = 'Gemstone Report' 
    + (addConsultation ? ` + Consultation${consultationDate && consultationTime ? ` (${consultationDate} ${consultationTime})` : ''}` : '') 
    + (addExpressDelivery ? ' (Express)' : '');

  const { handleSubmit, isProcessing } = useReportBooking({
    name: finalReportName,
    slug: 'gemstone-report',
    amount: totalAmount,
    onSuccess: () => {
      router.push('/report/detailed/gemstone');
    }
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get('/smart-kundali-settings/gemstone');
        if (res.data) setSettings(res.data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      }
    };
    fetchSettings();
  }, []);

  // Debounce Location Search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (userData.pob && userData.pob.length > 2 && showSuggestions) {
        setIsSearchingLocation(true);
        try {
          const res = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(userData.pob)}&limit=5`);
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
  }, [userData.pob, showSuggestions]);


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const overrideData = {
      name: userData.name,
      gender: userData.gender || 'male',
      dob: userData.dob,
      tob: unknownTime ? 'Unknown' : userData.tob,
      pob: userData.pob,
      country: userData.country || 'India',
      state: userData.state,
      email: userData.email || 'customer@vaidiktalk.com',
      phone: userData.phone,
      language: language || 'English',
    };

    handleSubmit(e, overrideData);
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] pb-32">
      <style>{`footer { display: none !important; }`}</style>
            <div className="bg-white border-b border-[#ebdcc7] sticky top-0 z-50 mb-4">
        <div className="max-w-[900px] mx-auto px-4 py-3 flex items-center">
          <button onClick={() => router.back()} type="button" className="flex items-center gap-2 text-[#5c1a1f] font-bold text-[14px] hover:text-[#d68636] transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-4 pt-2 pb-8 md:pt-4 md:pb-12 space-y-6">

        {/* Addon 1: Consultation */}
        <div className="bg-white rounded-xl border border-[#ebdcc7] p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-[#22c55e] text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg tracking-wider">
            HIGHLY RECOMMENDED
          </div>
          <div className="mt-3 flex justify-between items-start gap-4">
            <div>
              <h3 className="text-[18px] font-bold text-[#5c1a1f] mb-1">Astrologer Consultation</h3>
              <div className="flex items-start gap-2 mb-1">
                <span className="text-[#c57636] text-[16px] shrink-0 mt-0.5">✦</span>
                <p className="text-[13px] text-[#3a1216]">Speak directly with our expert astrologer about your report and what it means.</p>
              </div>
              <div className="flex items-center gap-1.5 text-[#3a1216] mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[13px]">30 mins session</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#1a1a1a] text-[18px]">₹{consultationPrice}</span>
                <span className="line-through text-[#3a1216]/60 text-[13px]">₹{consultationOriginalPrice}</span>
                <span className="bg-[#e8ffd6] text-[#2e7d32] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#a5d6a7]">Save {consultationDiscountPercent}%</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAddConsultation(!addConsultation)}
              className={`shrink-0 font-bold text-[14px] px-5 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${addConsultation ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100' : 'bg-[#d68636] text-white hover:bg-[#b06126]'}`}
            >
              {addConsultation ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {addConsultation ? 'Remove' : 'Add'}
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl border-[1.5px] border-[#c57636] p-5 md:p-8 shadow-md">
          <h2 className="text-[20px] md:text-[22px] font-bold text-[#5c1a1f] mb-8">Details Required for Gemstone Report</h2>

          <form id="checkout-form" onSubmit={handleFormSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" placeholder="Enter full name" />
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Gender <span className="text-red-500">*</span></label>
                <div className="flex items-center gap-4 h-[42px] border border-[#ebdcc7] rounded-md px-3 bg-[#fdfaf6]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="male" onChange={(e) => setUserData({ ...userData, gender: e.target.value })} required className="w-4 h-4 accent-[#d68636]" />
                    <span className="text-[14px] text-[#5c1a1f]">Male</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="female" onChange={(e) => setUserData({ ...userData, gender: e.target.value })} required className="w-4 h-4 accent-[#d68636]" />
                    <span className="text-[14px] text-[#5c1a1f]">Female</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="other" onChange={(e) => setUserData({ ...userData, gender: e.target.value })} required className="w-4 h-4 accent-[#d68636]" />
                    <span className="text-[14px] text-[#5c1a1f]">Other</span>
                  </label>
                </div>
              </div>

              {/* Place of Birth */}
              <div className="flex flex-col gap-1.5 md:col-span-2 relative">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Place of Birth <span className="text-red-500">*</span></label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3a1216]/60" />
                  <input 
                    required 
                    type="text" 
                    value={userData.pob} 
                    onChange={(e) => {
                      setUserData({ ...userData, pob: e.target.value });
                      setShowSuggestions(true);
                    }} 
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="w-full border border-[#ebdcc7] rounded-md py-2.5 pl-9 pr-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" 
                    placeholder="Enter place of birth (City)" 
                    autoComplete="off"
                  />
                  {isSearchingLocation && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-[#c57636]" />}
                </div>

                {showSuggestions && locationSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#ebdcc7] rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                    {locationSuggestions.map((suggestion, idx) => {
                      const { name, state, country } = suggestion.properties;
                      const displayName = [name, state, country].filter(Boolean).join(', ');
                      return (
                        <div 
                          key={idx}
                          className="px-4 py-2.5 hover:bg-[#fdfaf6] cursor-pointer border-b border-gray-50 last:border-0 text-[13px] text-[#5c1a1f] flex items-start gap-2"
                          onClick={() => {
                            setUserData({ ...userData, pob: displayName, state: state || '', country: country || '' });
                            setShowSuggestions(false);
                          }}
                        >
                          <MapPin className="w-4 h-4 text-[#c57636] shrink-0 mt-0.5" />
                          <span>{displayName}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Email ID</label>
                <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" placeholder="Enter email id" />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Date of Birth <span className="text-red-500">*</span></label>
                <input required type="date" value={userData.dob} onChange={(e) => setUserData({ ...userData, dob: e.target.value })} onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) {} }} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" />
              </div>

              {/* Time of Birth */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Time of Birth <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input required={!unknownTime} disabled={unknownTime} type="time" value={userData.tob} onChange={(e) => setUserData({ ...userData, tob: e.target.value })} onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) {} }} className={`w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px] ${unknownTime ? 'opacity-50' : ''}`} />
                </div>
                <label className="flex items-center gap-2 mt-1 cursor-pointer w-max" onClick={(e) => { e.preventDefault(); setUnknownTime(!unknownTime); }}>
                  {unknownTime ? <CheckSquare className="w-4 h-4 text-[#c57636]" /> : <Square className="w-4 h-4 text-[#3a1216]/80" />}
                  <span className="text-[12px] text-[#3a1216]">I don't know accurate time</span>
                </label>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">WhatsApp Number <span className="text-red-500">*</span></label>
                <div className="flex">
                  <div className="border border-r-0 border-[#ebdcc7] rounded-l-md px-2 py-2.5 bg-white flex items-center justify-center shrink-0">
                    <span className="text-[13px] text-[#5c1a1f]">+91</span>
                  </div>
                  <input required type="tel" maxLength={10} pattern="[0-9]{10}" onKeyPress={(e) => { if (!/[0-9]/.test(e.key)) e.preventDefault(); }} value={userData.phone} onChange={(e) => setUserData({ ...userData, phone: e.target.value })} className="w-full border border-[#ebdcc7] rounded-r-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" placeholder="9874589698" />
                </div>
                <p className="text-[11px] text-[#3a1216]/80 italic mt-0.5">Your report will be sent on this number</p>
              </div>

              {/* Report Language */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Report Language <span className="text-red-500">*</span></label>
                <input required type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" placeholder="Enter language (e.g., English, Hindi)" />
              </div>

              {/* Consultation Time Option (Conditionally Rendered) */}
              {addConsultation && (
                <div className="flex flex-col gap-3 md:col-span-2 pt-2 pb-1">
                  <label className="text-[15px] font-bold text-[#5c1a1f] mb-1">Consultation Time <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-[#5c1a1f]">Date</label>
                      <input 
                        required={addConsultation}
                        type="date" 
                        value={consultationDate} 
                        onChange={(e) => setConsultationDate(e.target.value)} 
                        onClick={(e) => { try { (e.target as HTMLInputElement).showPicker(); } catch (err) {} }}
                        className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-white outline-none focus:border-[#c57636] text-[14px] uppercase" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[13px] font-bold text-[#5c1a1f]">Time</label>
                      <select 
                        required={addConsultation}
                        value={consultationTime} 
                        onChange={(e) => setConsultationTime(e.target.value)} 
                        className={`w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-white outline-none focus:border-[#c57636] text-[14px] ${!consultationTime ? 'text-[#5c1a1f]' : 'text-[#1a1a1a]'}`} 
                      >
                        <option value="" disabled hidden>HH:MM AM/PM</option>
                        <option value="10:00 AM - 10:30 AM" className="text-[#1a1a1a]">10:00 AM - 10:30 AM</option>
                        <option value="10:30 AM - 11:00 AM" className="text-[#1a1a1a]">10:30 AM - 11:00 AM</option>
                        <option value="11:00 AM - 11:30 AM" className="text-[#1a1a1a]">11:00 AM - 11:30 AM</option>
                        <option value="11:30 AM - 12:00 PM" className="text-[#1a1a1a]">11:30 AM - 12:00 PM</option>
                        <option value="12:00 PM - 12:30 PM" className="text-[#1a1a1a]">12:00 PM - 12:30 PM</option>
                        <option value="12:30 PM - 1:00 PM" className="text-[#1a1a1a]">12:30 PM - 1:00 PM</option>
                        <option value="1:00 PM - 1:30 PM" className="text-[#1a1a1a]">1:00 PM - 1:30 PM</option>
                        <option value="1:30 PM - 2:00 PM" className="text-[#1a1a1a]">1:30 PM - 2:00 PM</option>
                        <option value="2:00 PM - 2:30 PM" className="text-[#1a1a1a]">2:00 PM - 2:30 PM</option>
                        <option value="2:30 PM - 3:00 PM" className="text-[#1a1a1a]">2:30 PM - 3:00 PM</option>
                        <option value="3:00 PM - 3:30 PM" className="text-[#1a1a1a]">3:00 PM - 3:30 PM</option>
                        <option value="3:30 PM - 4:00 PM" className="text-[#1a1a1a]">3:30 PM - 4:00 PM</option>
                        <option value="4:00 PM - 4:30 PM" className="text-[#1a1a1a]">4:00 PM - 4:30 PM</option>
                        <option value="4:30 PM - 5:00 PM" className="text-[#1a1a1a]">4:30 PM - 5:00 PM</option>
                        <option value="5:00 PM - 5:30 PM" className="text-[#1a1a1a]">5:00 PM - 5:30 PM</option>
                        <option value="5:30 PM - 6:00 PM" className="text-[#1a1a1a]">5:30 PM - 6:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </form>
        </div>

        {/* Addon 2: Express Delivery */}
        <div className="bg-white rounded-xl border border-[#ebdcc7] p-5 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-[#22c55e] text-white text-[10px] font-bold px-2 py-0.5 rounded-br-lg tracking-wider">
            TOP PICK
          </div>
          <div className="mt-3 flex items-center gap-3">
            <label className="cursor-pointer shrink-0">
              <input type="checkbox" checked={addExpressDelivery} onChange={() => setAddExpressDelivery(!addExpressDelivery)} className="w-5 h-5 accent-[#d68636] rounded" />
            </label>
            <p className="text-[17px] text-[#5c1a1f]">
              Express Delivery (delivered in just <span className="line-through text-[#3a1216]/80">5 days</span> <strong>24 -48 hours</strong>) at <strong>₹{expressPrice} only</strong>
            </p>
          </div>
        </div>

      </div>

      {/* Trust Badges */}
      <div className="flex justify-center items-center gap-4 md:gap-8 mt-8 mb-4">
        <div className="flex flex-col md:flex-row items-center gap-1.5">
          <Users className="w-5 h-5 md:w-4 md:h-4 text-[#c57636]" />
          <span className="text-[14px] font-bold text-[#c57636]">4.9/5 Rated</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-1.5">
          <ShieldCheck className="w-5 h-5 md:w-4 md:h-4 text-[#c57636]" />
          <span className="text-[14px] font-bold text-[#c57636]">10 Lakh+</span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-1.5">
          <Clock className="w-5 h-5 md:w-4 md:h-4 text-[#c57636]" />
          <span className="text-[14px] font-bold text-[#c57636]">24/7 Guidance</span>
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
