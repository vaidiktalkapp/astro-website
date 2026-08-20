'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

/* ─── Image Carousel ─────────────────────────────────────── */
const ImageCarousel = ({ images }: { images: string[] }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!images || images.length <= 1) return;
    const t = setInterval(() => setIdx(p => (p + 1) % images.length), 4000);
    return () => clearInterval(t);
  }, [images]);
  if (!images?.length) return null;
  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.10)] group">
      <div className="flex h-full w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((src, i) => <img key={i} src={src} className="w-full h-full object-cover shrink-0" alt={`Slide ${i + 1}`} />)}
      </div>
      {images.length > 1 && <>
        <button onClick={() => setIdx(i => i === 0 ? images.length - 1 : i - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all shadow-md">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button onClick={() => setIdx(i => (i + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all shadow-md">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${idx === i ? 'bg-[#ea580c] w-5' : 'w-1.5 bg-white/80 hover:bg-white'}`} />)}
        </div>
      </>}
    </div>
  );
};

/* ─── 24-hour Countdown Timer ────────────────────────────── */
const CountdownTimer = () => {
  const getSecondsLeft = () => {
    const now = Date.now();
    const stored = typeof window !== 'undefined' ? localStorage.getItem('job_timer_start') : null;
    const start = stored ? parseInt(stored) : now;
    if (!stored && typeof window !== 'undefined') localStorage.setItem('job_timer_start', String(now));
    const elapsed = Math.floor((now - start) / 1000);
    const cycle = 6 * 3600;
    return cycle - (elapsed % cycle);
  };

  const [secs, setSecs] = useState(getSecondsLeft);

  useEffect(() => {
    const t = setInterval(() => setSecs(getSecondsLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="flex items-center gap-3 my-3 bg-[#fff4e0] border border-[#fcd9a0] rounded-[10px] px-4 py-[10px] w-fit">
      <span className="text-[15px] font-bold text-[#9c5c0f]">⏰ Offer ends in</span>
      <div className="flex items-center gap-[5px]">
        {[pad(h), pad(m), pad(s)].map((val, i) => (
          <React.Fragment key={i}>
            <span className="bg-[#d97706] text-white text-[16px] font-bold px-[10px] py-[5px] rounded-[7px] tabular-nums min-w-[36px] text-center shadow-sm">{val}</span>
            {i < 2 && <span className="text-[#9c5c0f] font-black text-[18px]">:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/* ─── FAQ Item ───────────────────────────────────────────── */
const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-[#e5e0d8] py-4">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between text-left gap-4 cursor-pointer bg-transparent border-none p-0">
        <span className="text-[15px] font-bold text-[#3a1216]">{q}</span>
        <span className={`text-[#9c5c0f] text-[20px] font-bold transition-transform duration-200 shrink-0 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <p className="mt-3 mb-0 text-[#3a1216] text-[15px] leading-relaxed">{a}</p>}
    </div>
  );
};

/* ─── Main Page ──────────────────────────────────────────── */
/* ─── Mobile Sticky Booking Bar ─────────────────────────── */
const MobileStickyBar = ({ price, slug, timerKey }: { price: number, slug: string, timerKey: string }) => {
  const getSecondsLeft = () => {
    const now = Date.now();
    const stored = typeof window !== 'undefined' ? localStorage.getItem(timerKey) : null;
    const start = stored ? parseInt(stored) : now;
    if (!stored && typeof window !== 'undefined') localStorage.setItem(timerKey, String(now));
    const elapsed = Math.floor((now - start) / 1000);
    const cycle = 6 * 3600;
    return cycle - (elapsed % cycle);
  };

  const [secs, setSecs] = useState(getSecondsLeft);

  useEffect(() => {
    const t = setInterval(() => setSecs(getSecondsLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_15px_rgba(0,0,0,0.06)] z-50 px-4 py-3 pb-4 border-t border-[#f3f4f6]">
      <div className="text-center text-[#ea580c] text-[13px] font-semibold mb-3">
        Booking closes in <span className="text-[#db2777] font-bold">{h}h {m}m {s}s</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0">
            <img src="/vaidiktalklogo.webp" alt="Vaidik Talk" className="w-full h-full object-contain" />
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-medium leading-tight">Guided by</div>
            <div className="text-[12px] font-bold text-[#374151] leading-tight">Vaidik Talk</div>
          </div>
        </div>
        <Link href={`/book-a-puja/${slug}/checkout`} className="bg-[#ea580c] text-white px-8 py-2.5 rounded-xl font-bold text-[15px] active:scale-95 transition-transform shrink-0">
          Book Puja
        </Link>
      </div>
    </div>
  );
};

export default function GaneshLaddooPage() {
  const [selectedPkg, setSelectedPkg] = useState(0);
  const [dynamicData, setDynamicData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPuja = async () => {
      try {
        const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1') + '/pujas/ganesh-ji-ko-laddoo-arpan';
        const res = await axios.get(apiUrl);
        setDynamicData(res.data);
      } catch { /* fallback to static */ } finally { setLoading(false); }
    };
    fetchPuja();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-[#3a1216]/50 font-semibold">Loading…</div>;

  const defaultImages = ["/pooja/Ganesh Ji Ko Laddoo Arpan.webp"];
  const galleryImages = dynamicData?.gallery?.length > 0 ? dynamicData.gallery : defaultImages;
  const price = dynamicData?.discountedPrice || dynamicData?.price || 599;
  const origPrice = Math.round(price * 1.28);

  const testimonials = [
    { name: "Priya Sharma", city: "New Delhi", review: "The puja was absolutely divine. The pandit was deeply knowledgeable and performed every ritual with precision. I joined via live video and felt immense spiritual energy.", initial: "P" },
    { name: "Rajesh Gupta", city: "Mumbai", review: "Skeptical at first, but this completely changed my view of online pujas. The sankalp was taken in my name and gotra. The whole process was seamless.", initial: "R" },
    { name: "Anita Verma", city: "Bengaluru", review: "Booked this arpan before starting my new business. The muhurat was perfectly auspicious. The difference was palpable. Highly recommended.", initial: "A" },
    { name: "Vikram Nair", city: "Chennai", review: "Our family experienced great peace and new positive opportunities after offering laddoos to Ganesh ji through this platform.", initial: "V" },
  ];

  const steps = [
    { title: "Select your Puja package", desc: "Choose the package that best matches your intention and purpose." },
    { title: "Enter your sankalp details", desc: "Add your Name, Gotra & intention. The pandit will personalize the Sankalp." },
    { title: "Complete secure payment", desc: "Pay via UPI, cards, net banking — all methods accepted." },
    { title: "Puja performed by verified Pandits", desc: "A verified pandit performs the puja with your sankalp on the chosen date." },
    { title: "Receive updates & prasad", desc: "Get photos, videos on WhatsApp and prasad delivered to your door." },
  ];

  const SingleIcon = () => <img src="/pooja/single-icon.png" alt="Single Devotee" className="w-full h-full object-cover rounded-lg" />;
  const CoupleIcon = () => <img src="/pooja/couple-icon.png" alt="Couple Devotees" className="w-full h-full object-cover rounded-lg" />;
  const FamilyIcon = () => <img src="/pooja/family-icon.png" alt="Family Devotees" className="w-full h-full object-cover rounded-lg" />;

  const packages = [
    {
      Icon: SingleIcon,
      name: "Single",
      sub: "For 1 Person",
      perks: ["Live updates on WhatsApp", "HD sankalp video + photos", "Prasad couriered to your door"],
      price: price,
      orig: origPrice,
    },
    {
      Icon: CoupleIcon,
      name: "Couple",
      sub: "For 1 + Spouse / Business Partner",
      perks: ["Live updates on WhatsApp", "HD sankalp video + photos", "Prasad couriered to your door"],
      price: Math.round(price * 1.8),
      orig: Math.round(price * 2.4),
    },
    {
      Icon: FamilyIcon,
      name: "Family",
      sub: "Family Blessing",
      perks: ["Live updates on WhatsApp", "HD sankalp video + photos", "Prasad couriered to your door"],
      price: Math.round(price * 2.8),
      orig: Math.round(price * 3.8),
    },
  ];

  const faqs = [
    { q: "Why offer Laddoo to Ganesh Ji?", a: "Laddoo (Modak) is the favorite offering of Lord Ganesha. Performing this arpan removes obstacles, brings success in new ventures, and invites divine blessings." },
    { q: "Can this puja be performed online?", a: "Yes, our pandits perform the ritual with full Sankalp in your name. You can witness it via a live video link from anywhere." },
    { q: "When is the best time for this arpan?", a: "Ganesh Chaturthi, Wednesdays, and any new beginning (new job, new home, new business) are considered the most auspicious times." },
    { q: "What do I receive after the puja?", a: "You receive HD photos, a video recording of the ritual, and the blessed prasad couriered to your home." }
  ];

  return (
    <div className="w-full bg-white text-[#3a1216]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>

      {/* Marquee CSS */}
      <style>{`
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marqueeScroll 30s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="max-w-[1140px] mx-auto px-5 pb-16">

        {/* Breadcrumb */}
        <p className="text-[18px] text-[#3a1216]/55 my-4 pt-4">
          <Link href="/book-a-puja" className="text-[#3a1216] hover:text-[#9c5c0f] transition-colors">Home</Link>
          {' '}&gt;{' '}Ganesh Ji Ko Laddoo Arpan
        </p>

        {/* ── HERO ── */}
        <div className="flex flex-col md:flex-row gap-8 py-2 pb-6">
          <div className="w-full md:w-[45%] lg:w-[526px] shrink-0">
            <ImageCarousel images={galleryImages} />
          </div>
          <div className="flex-1 min-w-[280px]">
            <h1 className="text-[30px] md:text-[34px] font-bold text-[#3a1216] m-0 mb-2 leading-tight">
              Ganesh Ji Ko Laddoo Arpan
            </h1>
            <p className="text-[#9c5c0f] font-semibold m-0 mb-4 text-[17px]">
              Remove Obstacles, Attract Good Luck, and Start New Beginnings with Lord Ganesha’s Blessings.
            </p>
            <div className="space-y-[8px] mb-4">
              <p className="flex items-center gap-2 text-[#3a1216] text-[14px] m-0 font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" /></svg>
                Book Online — from anywhere in India
              </p>
              <p className="flex items-center gap-2 text-[#3a1216] text-[14px] m-0 font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Auspicious offering on Shubh Muhurat
              </p>
              <p className="flex items-center gap-2 text-[#3a1216] text-[14px] m-0 font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                Sankalp with your Name, Gotra &amp; intention
              </p>
            </div>

            {/* 24-hr Countdown */}
            <CountdownTimer />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between my-3 gap-1 sm:gap-0 text-[15px] text-[#3a1216] font-medium">
              <span>9.5K+ devotees offered Laddoos</span>
              <span className="text-[#9c5c0f] font-bold text-[14px]">★ 4.9 (6.2K Reviews)</span>
            </div>
            <div className="flex items-end justify-between mt-5 pt-4 border-t border-[#e5e0d8]">
              <div>
                <div className="text-[#3a1216]/55 text-[13px] mb-[2px]">Starting at from</div>
                <div className="text-[28px] font-bold text-[#3a1216]">₹{price}</div>
              </div>
              <Link href="/book-a-puja/ganesh-ji-ko-laddoo-arpan/checkout" className="bg-[#d97706] hover:bg-[#b56003] text-white py-[13px] px-[30px] rounded-[10px] font-bold text-[16px] no-underline inline-block transition-colors mb-0">
                Book Puja
              </Link>
            </div>
          </div>
        </div>

        {/* ── BENEFITS ── */}
        <section className="py-12 border-t border-[#e5e0d8] mt-6">
          <h2 className="text-[28px] font-bold text-center text-[#222] mb-8">Benefits of Puja</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {["Removes obstacles from personal and professional life", "Brings success, wisdom, and good fortune", "Ensures a smooth beginning for new ventures"].map((b, i) => (
              <div key={i} className="bg-[#f4f7fc] rounded-[12px] py-4 px-5 flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#ea580c" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M12 2.5C12.5 4.5 14.5 6 16.5 6C16.5 6 16.5 6.5 19 6C18.5 8 18 9.5 20 11C20 11 20 11 21.5 12C20 13 18 14.5 19 16.5C16.5 16 16.5 16 16.5 16C14.5 16.5 12.5 18 12 20C11.5 18 9.5 16.5 7.5 16.5C7.5 16.5 7.5 16 5 16.5C5.5 14.5 6 13 4 11.5C4 11.5 4 11.5 2.5 10.5C4 9.5 6 8 5 6C7.5 6.5 7.5 6.5 7.5 6.5C9.5 6 11.5 4.5 12 2.5Z" />
                  <circle cx="12" cy="11.5" r="3" fill="#fff" />
                </svg>
                <span className="text-[#333] text-[14px] font-medium">{b}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── ABOUT THIS PUJA ── */}
        <section className="py-8 border-t border-[#e5e0d8]">
          <h2 className="text-[25px] font-bold text-[#3a1216] mb-4">About this Offering</h2>
          <div className="flex gap-6 flex-wrap items-start">
            <img src="/pooja/Ganesh Ji Ko Laddoo Arpan.webp" alt="Ganesh Laddoo Arpan" className="w-full max-w-[420px] rounded-[12px] object-cover aspect-[4/3]" />
            <div className="flex-1 min-w-[250px] space-y-4">
              <p className="m-0 text-[#3a1216] text-[16px] leading-[1.8]">
                The Laddoo Arpan Pooja is a sacred Ganesh Puja Ritual dedicated to Lord Ganesha, the remover of obstacles (Vighnaharta) and the harbinger of new beginnings. Ganesh Ji Laddoo Arpan is a traditional Lord Ganesha Offering, where Laddoos — his most cherished prasad — are offered as an act of devotion that helps dispel negativity, attract positive energy, and invite abundance into your personal and professional life.
              </p>
              <p className="m-0 text-[#3a1216] text-[16px] leading-[1.8]">
                As an Auspicious Ritual and Wisdom and Prosperity Puja, devotees can also participate through Online Puja services. Worshipping Ganesh Ji before starting any new venture, career, or journey ensures a smoother path and favorable outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="py-8 border-t border-[#e5e0d8]">
          <h2 className="text-[25px] font-bold text-[#3a1216] mb-4">Choose Your Puja Package</h2>
          <div className="flex gap-4 flex-wrap">
            {packages.map((pkg, i) => {
              const isActive = selectedPkg === i;
              return (
                <div
                  key={i}
                  onClick={() => setSelectedPkg(i)}
                  className={`rounded-[16px] p-5 flex-1 min-w-[240px] cursor-pointer transition-all ${isActive
                      ? 'border-2 border-[#d97706] bg-[rgba(217,119,6,0.05)] shadow-[0_4px_16px_rgba(217,119,6,0.18)]'
                      : 'border-2 border-[#e5e0d8] hover:border-[#d97706]/60 hover:bg-[#faf6ee]'
                    }`}
                >
                  <div className={`mb-3 w-[56px] h-[56px] rounded-[14px] flex items-center justify-center overflow-hidden border-2 ${isActive ? 'border-[#d97706]' : 'border-transparent'}`}>
                    <pkg.Icon />
                  </div>
                  <h3 className="m-0 mb-[2px] text-[18px] font-bold text-[#3a1216]">{pkg.name}</h3>
                  <p className="text-[14px] text-[#3a1216] m-0 mb-4 font-medium">{pkg.sub}</p>
                  <ul className="list-none p-0 m-0 space-y-[10px] mb-4">
                    {pkg.perks.map((p, j) => (
                      <li key={j} className="text-[15px] text-[#3a1216] flex items-start gap-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-[3px]"><polyline points="20 6 9 17 4 12" /></svg>
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-baseline gap-2 border-t border-[#e5e0d8] pt-3">
                    <span className="text-[22px] font-bold text-[#3a1216]">₹{pkg.price}</span>
                    <span className="line-through text-[#3a1216]/40 text-[14px]">₹{pkg.orig}</span>
                    {isActive && <span className="ml-auto text-[12px] font-bold text-[#d97706] bg-[#fff4e0] px-2 py-[2px] rounded-full">Selected</span>}
                  </div>
                  <Link
                    href={`/book-a-puja/ganesh-ji-ko-laddoo-arpan/checkout?package=${pkg.name.toLowerCase()}&price=${pkg.price}`}
                    className={`mt-3 block text-center py-[11px] rounded-[10px] font-bold text-[15px] no-underline transition-colors ${isActive
                        ? 'bg-[#d97706] hover:bg-[#b56003] text-white shadow-[0_4px_12px_rgba(217,119,6,0.25)]'
                        : 'bg-white border border-[#e5e0d8] hover:bg-[#d97706] hover:text-white hover:border-[#d97706] text-[#3a1216]'
                      }`}
                    onClick={e => e.stopPropagation()}
                  >
                    {isActive ? 'Book This Package' : 'Select Package'}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-8 border-t border-[#e5e0d8]">
          <h2 className="text-[25px] font-bold text-[#3a1216] mb-1">How it works?</h2>
          <p className="text-[#3a1216] mb-8 text-[16px]">Simple, transparent, and performed with care.</p>
          <div className="flex flex-col md:flex-row items-start md:items-stretch gap-0">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col md:flex-row items-start md:items-stretch flex-1 w-full">
                {/* Step block */}
                <div className="flex flex-row md:flex-col items-start md:items-center flex-1 gap-4 md:gap-0 mb-6 md:mb-0 relative">
                  {/* Mobile vertical line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-[15px] top-8 w-[2px] h-[calc(100%+8px)] bg-gradient-to-b from-[#d97706] to-[#d97706]/30 md:hidden z-0" />
                  )}
                  <div className="w-8 h-8 rounded-full bg-[#d97706] text-white flex items-center justify-center font-bold text-[14px] shrink-0 shadow-[0_2px_8px_rgba(217,119,6,0.3)] mt-0 md:mt-0 relative z-10">
                    {i + 1}
                  </div>
                  <div className="md:mt-3 text-left md:text-center md:px-2 flex-1">
                    <h3 className="text-[15px] font-bold text-[#3a1216] m-0 mb-1">{step.title}</h3>
                    <p className="text-[14px] text-[#3a1216] m-0 leading-[1.6]">{step.desc}</p>
                  </div>
                </div>
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-start pt-4 shrink-0 w-8">
                    <div className="w-full h-[2px] bg-gradient-to-r from-[#d97706] to-[#d97706]/30 mt-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS (Marquee) ── */}
        <section className="py-8 border-t border-[#e5e0d8] overflow-hidden">
          <h2 className="text-[25px] font-bold text-[#3a1216] mb-5">What they&apos;re saying?</h2>
          <div className="overflow-hidden relative w-full">
            <div className="marquee-track gap-4">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="min-w-[280px] max-w-[300px] border border-[#e5e0d8] rounded-[16px] p-4 shadow-[0_0_8px_rgba(0,0,0,0.06)] mx-2 bg-white">
                  <div className="text-[#d97706] text-[15px] mb-2">★★★★★</div>
                  <blockquote className="m-0 mb-3 text-[14px] text-[#3a1216] leading-relaxed">
                    &ldquo;{t.review}&rdquo;
                  </blockquote>
                  <footer className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] text-white shrink-0 bg-[#9c5c0f]">
                      {t.initial}
                    </span>
                    <div>
                      <p className="font-bold text-[14px] text-[#3a1216] m-0">{t.name}</p>
                      <p className="text-[11px] text-[#3a1216]/50 m-0">{t.city}</p>
                    </div>
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-8 border-t border-[#e5e0d8]">
          <h2 className="text-[28px] font-bold text-[#3a1216] mb-2">Frequently Asked Questions</h2>
          <div>
            {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </section>

        {/* ── WHY VAIDIK TALK ── */}
        <section className="py-8 border-t border-[#e5e0d8]">
          <h2 className="text-[25px] font-bold text-[#3a1216] mb-3">Why Vaidik Talk?</h2>
          <p className="text-[#3a1216] m-0 mb-4 text-[16px] leading-[1.8]">
            Vaidik Talk is a dedicated puja platform connecting professionals with verified Pandits for authentic Vedic rituals. Every puja is performed with a real Sankalp taken in your name and intention — so you can receive divine blessings from anywhere in India or abroad.
          </p>
          <p className="font-bold text-[#9c5c0f] m-0">🛡 Guided by 40+ Years of Combined Vedic Expertise</p>
        </section>

        {/* ── SUPPORT BOX ── */}
        <section className="py-8 border-t border-[#e5e0d8]">
          <div className="flex flex-wrap gap-4 items-center justify-between border border-[#e5e0d8] rounded-[16px] p-5 bg-[#faf6ee]">
            <div>
              <h2 className="text-[20px] font-bold text-[#3a1216] m-0">Need help booking this Puja?</h2>
              <p className="text-[#3a1216] text-[15px] mt-1 mb-0">Our team is here to help you with any questions about your booking.</p>
            </div>
            <div className="text-center">
              <a href="https://wa.me/919818999037?text=Hi%2C+I+want+to+book+Ganesh+Ji+Laddoo+Arpan" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25d366] hover:bg-[#1da851] text-white py-[14px] px-[32px] rounded-[12px] font-bold text-[15px] no-underline transition-colors">
                Chat on WhatsApp
              </a>
              <p className="text-[12px] text-[#3a1216]/50 mt-2 mb-0">24/7 support available</p>
            </div>
          </div>
        </section>

        {/* Sticky Mobile Bar */}
        <MobileStickyBar price={price} slug="ganesh-ji-ko-laddoo-arpan" timerKey="ganesh_laddoo_timer_start" />
      </div>
    </div>
  );
}

