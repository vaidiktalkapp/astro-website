'use client';
import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { usePujaBooking } from '@/hooks/usePujaBooking';
import { Check, ChevronRight, Lock, ArrowLeft, Info } from 'lucide-react';

interface PujaCheckoutFlowProps {
  pujaTitle: string;
  pujaSlug: string;
  defaultPrice: number;
  offeringsList?: Array<{ id: string; title: string; desc: string; price: number; img: string }>;
}

export function PujaCheckoutFlow({ pujaTitle, pujaSlug, defaultPrice, offeringsList = [] }: PujaCheckoutFlowProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pkg = searchParams.get('package');
  
  // Package logic is only used if prices were passed in URL or if we are rudrabhishek. Since we only want fixed price, we use defaultPrice.
  // Wait, if it's Rudrabhishek, we still need package logic!
  const basePrice = pkg && pkg === 'single' ? 1599 : (pkg === 'couple' ? 2599 : (pkg === 'family' ? 3599 : defaultPrice));

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '', name: '', gotra: '', message: '', date: '',
    address: '', city: '', state: '', pincode: ''
  });
  const [dontKnowGotra, setDontKnowGotra] = useState(false);
  const [selectedOfferings, setSelectedOfferings] = useState<Record<string, boolean>>({});

  const offeringsTotal = Object.keys(selectedOfferings).reduce((sum, key) => {
    if (selectedOfferings[key]) {
      const off = offeringsList.find(o => o.id === key);
      return sum + (off ? off.price : 0);
    }
    return sum;
  }, 0);

  const finalTotal = basePrice + offeringsTotal;

  const { setFormData: setApiFormData, handleSubmit, isProcessing } = usePujaBooking({
    title: pujaTitle + (pkg ? ` (${pkg.toUpperCase()})` : ''),
    slug: pujaSlug,
    amount: finalTotal,
    onSuccess: () => {
      setStep(5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  const handleNext = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(step + 1);
  };

  const handlePayment = async (e: any) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const checkoutData = {
      name: formData.name,
      gotra: dontKnowGotra ? 'Unknown' : formData.gotra,
      phone: formData.phone,
      email: 'customer@vaidiktalk.com',
      location: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
      date: formData.date || new Date().toISOString().split('T')[0],
      message: formData.message + (offeringsTotal > 0 ? ` [Offerings: ${Object.keys(selectedOfferings).filter(k => selectedOfferings[k]).join(', ')}]` : '')
    };
    
    await handleSubmit(e, checkoutData);
  };

  const steps = [
    { num: 1, label: 'Sankalp' },
    { num: 2, label: 'Offerings' },
    { num: 3, label: 'Address' },
    { num: 4, label: 'Payment' },
    { num: 5, label: 'Complete' }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] pb-[120px]">

      {/* Top Header */}
      <div className="bg-white sticky top-0 z-40 border-b border-[#e5e0d8] shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-center relative">
          <button onClick={() => { if (step > 1) setStep(step - 1); else router.back(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#333]" />
          </button>
          <h1 className="font-bold text-[18px] text-[#3a1216]">
            {step === 1 && 'Sankalp Details'}
            {step === 2 && 'Add Offerings'}
            {step === 3 && 'Delivery Address'}
            {step === 4 && 'Payment Details'}
            {step === 5 && 'Order Complete'}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pt-8">

        {/* STEPPER */}
        <div className="flex items-center justify-between relative mb-8 px-0">
          <div className="absolute left-[14px] right-[14px] top-[14px] h-[2px] bg-[#e5e0d8] z-0">
            <div
              className="absolute left-0 top-0 h-full bg-[#166534] transition-all duration-500"
              style={{ width: `${Math.min(step * 25, 100)}%` }}
            />
          </div>

          {steps.map((s, i) => {
            const isPast = step > s.num;
            const isCurrent = step === s.num;
            const isNext = step === s.num - 1;

            let circleClass = 'bg-white text-[#999] border-2 border-[#e5e0d8] ring-[6px] ring-[#faf8f5]';
            if (isPast || isCurrent) {
              circleClass = 'bg-[#166534] text-white border-2 border-[#166534] ring-[6px] ring-[#faf8f5]';
            } else if (isNext) {
              circleClass = 'bg-white text-[#166534] border-2 border-[#166534] ring-[6px] ring-[#faf8f5]';
            }

            return (
              <div key={i} className="flex flex-col items-center gap-1.5 bg-[#faf8f5] relative z-10 px-1">
                <div className={`w-[28px] h-[28px] rounded-full flex items-center justify-center font-bold text-[12px] transition-colors ${circleClass}`}>
                  {isPast ? <Check className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`text-[12px] font-bold mt-1 ${isPast || isCurrent ? 'text-[#111]' : (isNext ? 'text-[#166534]' : 'text-[#888]')}`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* PACKAGE SUMMARY CARD */}
        <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-[16px]">{pujaTitle}</h3>
            {pkg && (
              <div className="inline-block mt-1 bg-[#fff7ed] text-[#d97706] px-2 py-0.5 rounded text-[12px] font-medium border border-[#ffedd5]">
                Dedicated ({pkg.charAt(0).toUpperCase() + pkg.slice(1)})
              </div>
            )}
          </div>
          <div className="font-bold text-gray-900 text-[16px] flex items-center gap-3">
             <span className="text-gray-400 font-medium opacity-0"><ChevronRight className="w-5 h-5"/></span>
             ₹{basePrice.toLocaleString('en-IN')}
          </div>
        </div>

        {/* STEP 1: SANKALP */}
        {step === 1 && (
          <div className="bg-white rounded-[16px] p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0ebe1] mb-6">
            <div className="mb-6">
              <h2 className="text-[20px] font-bold text-[#3a1216] mb-1">Sankalp Details</h2>
              <p className="text-[14px] text-[#666]">Required for personalized blessings during the ritual.</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-bold text-[#333] mb-2 uppercase tracking-wider">WhatsApp Number <span className="text-red-500">*</span></label>
                <div className="flex rounded-lg border border-[#e5e0d8] overflow-hidden focus-within:ring-2 focus-within:ring-[#d97706]/20 focus-within:border-[#d97706] transition-all">
                  <div className="px-4 py-3 bg-[#faf8f5] border-r border-[#e5e0d8] flex items-center justify-center shrink-0">
                    <span className="text-[15px] text-[#3a1216] font-medium flex items-center gap-2">
                      <img src="https://flagcdn.com/w20/in.png" srcSet="https://flagcdn.com/w40/in.png 2x" width="20" alt="India" className="rounded-sm shadow-sm" /> 
                      +91 <ChevronRight className="w-3 h-3 text-gray-400 rotate-90" />
                    </span>
                  </div>
                  <input required type="tel" maxLength={10} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })} className="w-full py-3 px-4 outline-none text-[15px]" placeholder="98745 89698" />
                </div>
                <p className="text-[12px] text-[#888] mt-1.5 flex items-center gap-1"><Info className="w-3.5 h-3.5" /> Puja updates, photos, videos will be sent on this number.</p>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#333] mb-2 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border border-[#e5e0d8] rounded-lg py-3 px-4 outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-[15px] transition-all" placeholder="Devotee Name" />
                <p className="text-[12px] text-[#888] mt-1.5 flex items-center gap-1"><Info className="w-3.5 h-3.5" /> Panditji will recite this name along with Gotra during the puja.</p>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#333] mb-2 uppercase tracking-wider">Gotra <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input required={!dontKnowGotra} disabled={dontKnowGotra} type="text" value={dontKnowGotra ? 'Kashyap' : formData.gotra} onChange={(e) => setFormData({ ...formData, gotra: e.target.value })} className={`w-full border border-[#e5e0d8] rounded-lg py-3 px-4 pr-10 outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-[15px] transition-all ${dontKnowGotra ? 'bg-gray-50 text-[#d97706] font-medium' : ''}`} placeholder="Enter your Gotra" />
                  
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 group">
                    <Info className="w-4 h-4 text-gray-400 cursor-pointer hover:text-[#d97706] transition-colors" />
                    <div className="absolute right-0 bottom-full mb-2 w-64 p-3 bg-white border border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 text-[12px] leading-relaxed text-gray-700 font-normal">
                      <strong className="block text-[#d97706] mb-1">Unknown Gotra?</strong>
                      In Vedic traditions, if one is unaware of their ancestral Gotra, 'Kashyap' is widely accepted for the Sankalp. Sage Kashyap is considered a foundational rishi of humanity, making this a spiritually valid alternative.
                    </div>
                  </div>
                </div>
                <label className="flex items-center gap-2 mt-3 cursor-pointer w-max group">
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${dontKnowGotra ? 'bg-[#d97706] border-[#d97706]' : 'border-gray-300 group-hover:border-[#d97706]'}`}>
                    {dontKnowGotra && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <input type="checkbox" className="hidden" checked={dontKnowGotra} onChange={(e) => setDontKnowGotra(e.target.checked)} />
                  <span className="text-[14px] text-[#555] font-medium select-none">I don't know my Gotra</span>
                </label>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#333] mb-2 uppercase tracking-wider">Preferred Date <span className="text-red-500">*</span></label>
                <input required type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full border border-[#e5e0d8] rounded-lg py-3 px-4 outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-[15px] transition-all" />
              </div>

              <div className="pt-2">
                <label className="block text-[12px] font-bold text-[#333] mb-2 uppercase tracking-wider">Special Wishes (Manokamana)</label>
                <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full border border-[#e5e0d8] rounded-lg py-3 px-4 outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-[15px] transition-all resize-none" placeholder="Example: For career growth, health, peace, family harmony.."></textarea>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: OFFERINGS */}
        {step === 2 && (
          <div className="bg-white rounded-[16px] p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0ebe1] mb-6">
            <div className="mb-6">
              <h2 className="text-[20px] font-bold text-[#3a1216] mb-1">Add Offerings to Your Puja</h2>
              <p className="text-[14px] text-[#666]">Select any additional offerings you would like to include with your puja.</p>
            </div>

            <div className="space-y-4">
              {offeringsList && offeringsList.length > 0 ? offeringsList.map(off => (
                <div key={off.id} className="bg-white rounded-[16px] p-4 md:p-5 border border-[#f0ebe1] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between gap-4 transition-all hover:border-[#d97706]/30">
                  <div className="flex-1">
                    <h3 className="font-bold text-[16px] text-[#3a1216] mb-1">{off.title}</h3>
                    <p className="text-[13px] text-[#666] mb-2.5 leading-snug">{off.desc}</p>
                    <p className="font-extrabold text-[#d97706] text-[15px]">₹{off.price}</p>
                  </div>
                  <div className="shrink-0 relative mt-1 mb-3">
                    <div className="w-[108px] h-[80px] bg-gray-100 rounded-[10px] overflow-hidden border border-[#e5e0d8] shadow-sm">
                      <img src={off.img} alt={off.title} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/pooja/Rudraabhishek.webp')} />
                    </div>
                    <button
                      onClick={() => setSelectedOfferings(prev => ({ ...prev, [off.id]: !prev[off.id] }))}
                      className={`absolute -bottom-3.5 left-1/2 -translate-x-1/2 px-1 py-1 rounded-md text-[11px] font-extrabold uppercase border shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all w-[64px] flex items-center justify-center gap-1 ${selectedOfferings[off.id] ? 'bg-[#d97706] text-white border-[#d97706]' : 'bg-white text-[#d97706] border-[#fde68a] hover:bg-gray-50'}`}
                    >
                      {selectedOfferings[off.id] ? 'Added' : 'Add'}
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-gray-500 py-4 text-center text-sm bg-gray-50 rounded-lg">No additional offerings available for this puja.</div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: ADDRESS */}
        {step === 3 && (
          <div className="bg-white rounded-[16px] p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0ebe1] mb-6">
            <div className="mb-6">
              <h2 className="text-[20px] font-bold text-[#3a1216] mb-1">Delivery Address</h2>
              <p className="text-[14px] text-[#666]">Where should we deliver the divine Prasad?</p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#333] mb-2 uppercase tracking-wider">Complete Address <span className="text-red-500">*</span></label>
                <textarea required rows={3} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full border border-[#e5e0d8] rounded-lg py-3 px-4 outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-[15px] transition-all resize-none" placeholder="House/Flat No., Building, Street"></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#333] mb-2 uppercase tracking-wider">City <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full border border-[#e5e0d8] rounded-lg py-3 px-4 outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-[15px] transition-all" />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#333] mb-2 uppercase tracking-wider">State <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="w-full border border-[#e5e0d8] rounded-lg py-3 px-4 outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-[15px] transition-all" />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#333] mb-2 uppercase tracking-wider">Pincode <span className="text-red-500">*</span></label>
                <input required type="text" maxLength={6} value={formData.pincode} onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, '') })} className="w-full border border-[#e5e0d8] rounded-lg py-3 px-4 outline-none focus:border-[#d97706] focus:ring-2 focus:ring-[#d97706]/20 text-[15px] transition-all" />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: PAYMENT */}
        {step === 4 && (
          <div className="bg-white rounded-[16px] p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0ebe1] mb-6">
            <h2 className="text-[20px] font-bold text-[#3a1216] mb-6">Payment Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center text-[15px] text-[#444] pb-4 border-b border-gray-100">
                <h3 className="font-bold text-[#3a1216] text-[15px]">{pujaTitle} {pkg ? `(${pkg.charAt(0).toUpperCase() + pkg.slice(1)})` : ''}</h3>
                <span className="font-bold text-[#3a1216]">₹{basePrice}</span>
              </div>

              {Object.keys(selectedOfferings).filter(k => selectedOfferings[k]).map(key => {
                const off = offeringsList.find(o => o.id === key);
                if (!off) return null;
                return (
                  <div key={key} className="flex justify-between items-center text-[14px] text-[#666] pb-3 border-b border-gray-100 last:border-0">
                    <span>+ {off.title}</span>
                    <span className="font-semibold text-[#333]">₹{off.price}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#faf8f5] p-4 rounded-xl flex justify-between items-center border border-[#e5e0d8]">
              <span className="text-[15px] font-bold text-[#3a1216]">Total Amount</span>
              <span className="text-[24px] font-black text-[#d97706]">₹{finalTotal}</span>
            </div>

            <p className="text-center text-[12px] text-[#888] mt-6 flex items-center justify-center gap-1.5"><Lock className="w-3.5 h-3.5" /> 100% Secure Payment powered by Razorpay</p>
          </div>
        )}

        {/* STEP 5: COMPLETE */}
        {step === 5 && (
          <div className="bg-white rounded-[16px] p-8 md:p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#f0ebe1] mb-6 animate-fade-in-up">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-green-100">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-[28px] font-black text-[#3a1216] mb-3">Booking Confirmed!</h2>
            <p className="text-[#666] mb-8 text-[15px] leading-relaxed max-w-md mx-auto">
              Thank you for booking the {pujaTitle}. Panditji will contact you soon on your WhatsApp number with further details.
            </p>
            <button onClick={() => router.push('/')} className="px-8 py-3.5 bg-[#d97706] text-white rounded-xl font-bold hover:bg-[#c26a05] transition-colors shadow-lg">
              Return to Home
            </button>
          </div>
        )}

      </div>

      {/* FIXED BOTTOM ACTION BAR */}
      {step < 5 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e5e0d8] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-4 md:px-6 md:py-4 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider mb-0.5">Payable Amount</span>
            <div className="flex items-baseline gap-2">
              <span className="text-[22px] md:text-[24px] font-black text-[#3a1216] leading-none">₹{finalTotal}</span>
              <span className="text-[13px] text-gray-400 line-through font-medium leading-none">₹{finalTotal + 800}</span>
            </div>
          </div>

          {step < 4 ? (
            <button
              onClick={handleNext}
              disabled={
                (step === 1 && (!formData.phone || !formData.name || (!dontKnowGotra && !formData.gotra) || !formData.date)) ||
                (step === 3 && (!formData.address || !formData.city || !formData.state || !formData.pincode))
              }
              className="bg-[#d97706] hover:bg-[#c26a05] text-white px-8 py-3.5 rounded-xl font-bold text-[16px] transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(217,119,6,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="bg-[#d97706] hover:bg-[#c26a05] text-white px-8 py-3.5 rounded-xl font-bold text-[16px] transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(217,119,6,0.25)] disabled:opacity-70"
            >
              {isProcessing ? 'Processing...' : 'Pay Securely'} <Lock className="w-4 h-4 ml-1" />
            </button>
          )}
        </div>
      </div>
      )}

    </div>
  );
}
