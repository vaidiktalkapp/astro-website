'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { getImageUrl } from '@/lib/imageUtils';

interface PujaPackage {
  Icon: () => React.ReactElement;
  name: string;
  sub: string;
  perks: string[];
  price: number;
  orig: number;
}

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
    <div 
      className="relative w-full aspect-[4/3] overflow-hidden rounded-[16px] shadow-[0_4px_20px_rgba(0,0,0,0.10)] group bg-[#3a1216]"
      style={{
        backgroundImage: 'url(/vaidiktalklogo.webp)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '150px'
      }}
    >
      <div className="flex h-full w-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
        {images.map((src, i) => <img key={i} src={src} className="min-w-full h-full object-cover shrink-0" alt={`Slide ${i + 1}`} onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0'; }} onLoad={(e) => { (e.target as HTMLImageElement).style.opacity = '1'; }} />)}
      </div>
      {images.length > 1 && <>
        <button onClick={() => setIdx(i => i === 0 ? images.length - 1 : i - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all shadow-md opacity-0 group-hover:opacity-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <button onClick={() => setIdx(i => (i + 1) % images.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white text-gray-800 rounded-full flex items-center justify-center transition-all shadow-md opacity-0 group-hover:opacity-100">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, i) => <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${idx === i ? 'bg-[#ea580c] w-5' : 'w-1.5 bg-white/80 hover:bg-white'}`} />)}
        </div>
      </>}
    </div>
  );
};

const CountdownTimer = ({ timerKey }: { timerKey: string }) => {
  const cycle = 6 * 3600;
  const [secs, setSecs] = useState(cycle); // Match server and client initial render

  useEffect(() => {
    const getSecondsLeft = () => {
      const now = Date.now();
      const stored = localStorage.getItem(timerKey);
      const start = stored ? parseInt(stored) : now;
      if (!stored) localStorage.setItem(timerKey, String(now));
      const elapsed = Math.floor((now - start) / 1000);
      return cycle - (elapsed % cycle);
    };

    setSecs(getSecondsLeft());
    const t = setInterval(() => setSecs(getSecondsLeft()), 1000);
    return () => clearInterval(t);
  }, [timerKey, cycle]);

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

const MobileStickyBar = ({ price, slug, timerKey }: { price: number, slug: string, timerKey: string }) => {
  const cycle = 6 * 3600;
  const [secs, setSecs] = useState(cycle); // Match server and client initial render

  useEffect(() => {
    const getSecondsLeft = () => {
      const now = Date.now();
      const stored = localStorage.getItem(timerKey);
      const start = stored ? parseInt(stored) : now;
      if (!stored) localStorage.setItem(timerKey, String(now));
      const elapsed = Math.floor((now - start) / 1000);
      return cycle - (elapsed % cycle);
    };

    setSecs(getSecondsLeft());
    const t = setInterval(() => setSecs(getSecondsLeft()), 1000);
    return () => clearInterval(t);
  }, [timerKey, cycle]);

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
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
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

/* ─── Main Page ──────────────────────────────────────────── */
export default function DynamicPujaClient({ initialPuja, slug }: { initialPuja: any, slug: string }) {
  const [puja, setPuja] = useState<any>(initialPuja);
  const [selectedPkg, setSelectedPkg] = useState(0);

  if (!puja) notFound();

  const primaryImage = puja?.image ? (puja.image.startsWith('/pooja') ? puja.image : getImageUrl(puja.image, puja.title)) : '/pooja/Rudraabhishek.webp';
  const defaultImages = [primaryImage];
  const galleryImages = puja?.gallery?.length > 0 
    ? puja.gallery.map((img: string) => img.startsWith('/pooja') ? img : getImageUrl(img, puja.title)) 
    : defaultImages;
  
  const price = puja?.discountedPrice || puja?.price || 1599;
  const origPrice = Math.round(price * 1.28);

  const defaultTestimonials = [
    { name: 'Priya Sharma', city: 'New Delhi', review: 'The puja was absolutely divine. The pandit was deeply knowledgeable and performed every ritual with precision. I joined via live video and felt immense spiritual energy. The prasad arrived beautifully packed within 4 days. Highly recommend Vaidik Talk.', initial: 'P' },
    { name: 'Rajesh Gupta', city: 'Mumbai', review: 'Skeptical at first, but this completely changed my view of online pujas. The sankalp was taken in my name and gotra. I received HD photos the same evening. The whole process was seamless and the results were visible within a week. Truly professional.', initial: 'R' },
    { name: 'Anita Verma', city: 'Bengaluru', review: "Booked this puja for my mother's health. The muhurat was perfectly auspicious, the pandit spent over 2 hours performing every ritual with dedication. The difference was palpable. Will always trust Vaidik Talk for my spiritual needs.", initial: 'A' },
  ];
  const testimonials = puja?.testimonials?.length > 0 ? puja.testimonials : defaultTestimonials;

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

  const customPackages = puja?.packages?.length > 0 ? puja.packages.map((p: any, i: number) => ({
    Icon: i === 0 ? SingleIcon : i === 1 ? CoupleIcon : i === 2 ? FamilyIcon : SingleIcon,
    name: p.name,
    sub: p.sub,
    perks: p.perks,
    price: p.price,
    orig: p.orig,
  })) : null;

  const packages = customPackages || [
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
      sub: "For 1 + Spouse / Partner",
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

  const defaultFaqs = [
    { q: `Who should book the ${puja?.title || 'Puja'}?`, a: `Anyone seeking divine blessings, peace, and spiritual upliftment should book this puja. It is beneficial for removing obstacles and inviting positive energies.` },
    { q: "How soon can I expect results?", a: "Many devotees report feeling a shift in positive energy and mental clarity shortly after the puja. Tangible results depend on individual karmic factors but are often noticed within a few weeks." },
    { q: "Is the puja performed using my name and gotra?", a: "Yes. A personal Sankalp is taken in your name, gotra, and specific intention before the ritual begins, making the puja spiritually personalized to your goal." },
    { q: "Will I receive Prasad after the Puja?", a: "Yes, blessed prasad along with energized items (if applicable to the package) will be securely packed and couriered to your registered address." },
  ];
  const faqs = puja?.faqs?.length > 0 ? puja.faqs : defaultFaqs;

  const defaultBenefits = [
    "Clears obstacles that may be hindering progress",
    "Offers protection from negative energies and influences",
    "Enhances clarity and insight for confident decision-making",
    "Supports physical and mental well-being",
    "Fosters peace and harmony in personal and spiritual life"
  ];
  const benefits = puja?.benefits?.length > 0 ? puja.benefits : defaultBenefits;

  return (
    <div className="w-full bg-white text-[#3a1216]" style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}>
      <style>{`
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-track { display: flex; width: max-content; animation: marqueeScroll 30s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="max-w-[1140px] mx-auto px-5 pb-16">
        <p className="text-[18px] text-[#3a1216]/55 my-4 pt-4">
          <Link href="/book-a-puja" className="text-[#3a1216] hover:text-[#9c5c0f] transition-colors">Home</Link>
          {' '}&gt;{' '}{puja?.title || 'Premium Vedic Ritual'}
        </p>

        {/* ── HERO ── */}
        <div className="flex flex-col md:flex-row gap-8 py-2 pb-6">
          <div className="w-full md:w-[45%] lg:w-[526px] shrink-0">
            <ImageCarousel images={galleryImages} />
          </div>
          <div className="flex-1 min-w-[280px]">
            <h1 className="text-[30px] md:text-[34px] font-bold text-[#3a1216] m-0 mb-2 leading-tight">
              {puja?.title || 'Premium Vedic Ritual'}
            </h1>
            <p className="text-[#9c5c0f] font-semibold m-0 mb-4 text-[17px]">
              {puja?.shortDesc || puja?.description?.replace(/<[^>]+>/g, '').slice(0, 150) || 'Invite divine blessings, clear life obstacles, and manifest success and peace into your life through authentic Vedic rituals.'}
            </p>
            <div className="space-y-[8px] mb-4">
              <p className="flex items-center gap-2 text-[#3a1216] text-[14px] m-0 font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" /></svg>
                Book Online — from anywhere in the world
              </p>
              <p className="flex items-center gap-2 text-[#3a1216] text-[14px] m-0 font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                Vedic ritual on Auspicious Muhurat
              </p>
              <p className="flex items-center gap-2 text-[#3a1216] text-[14px] m-0 font-medium">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                Sankalp with your Name, Gotra &amp; Intention
              </p>
            </div>

            <CountdownTimer timerKey={`timer_${slug}`} />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between my-3 gap-1 sm:gap-0 text-[15px] text-[#3a1216] font-medium">
              <span suppressHydrationWarning>{Math.floor(Math.random() * 5 + 5)}K+ devotees booked this puja</span>
              <span suppressHydrationWarning className="text-[#9c5c0f] font-bold text-[14px]">★ 4.9 ({Math.floor(Math.random() * 2 + 3)}.{Math.floor(Math.random() * 9)}K Reviews)</span>
            </div>
            <div className="flex items-end justify-between mt-5 pt-4 border-t border-[#e5e0d8]">
              <div>
                <div className="text-[#3a1216]/55 text-[13px] mb-[2px]">Starting at from</div>
                <div className="text-[28px] font-bold text-[#3a1216]">₹{price}</div>
              </div>
              <Link href={`/book-a-puja/${slug}/checkout`} className="bg-[#d97706] hover:bg-[#b56003] text-white py-[13px] px-[30px] rounded-[10px] font-bold text-[16px] no-underline inline-block transition-colors mb-0">
                Book Puja
              </Link>
            </div>
          </div>
        </div>

        {/* ── BENEFITS ── */}
        <section className="py-12 border-t border-[#e5e0d8] mt-6">
          <h2 className="text-[28px] font-bold text-center text-[#222] mb-8">Benefits of Puja</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {benefits.map((b: string, i: number) => (
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
          <h2 className="text-[25px] font-bold text-[#3a1216] mb-4 text-center md:text-left">About this Puja</h2>
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <img src={primaryImage} alt={puja?.title} className="w-full max-w-[380px] md:max-w-[420px] mx-auto md:mx-0 rounded-[16px] h-auto object-contain shadow-sm border border-[#e5e0d8] shrink-0" />
            <div className="flex-1 w-full md:w-auto min-w-[250px] space-y-4">
              {puja?.extraContent ? (
                <div className="text-[#3a1216] text-[16px] leading-[1.8] space-y-4 whitespace-pre-line break-words text-justify md:text-left">
                  {puja.extraContent}
                </div>
              ) : (
                <>
                  <p className="m-0 text-[#3a1216] text-[16px] leading-[1.8]">
                    The {puja?.title || 'Puja'} is a powerful Vedic ritual performed to invite divine blessings into your life. It is performed with a personalized Sankalp to remove planetary blocks and manifest peace and prosperity.
                  </p>
                  <p className="m-0 text-[#3a1216] text-[16px] leading-[1.8]">
                    This puja is highly recommended for anyone seeking spiritual growth, facing life challenges, or seeking divine intervention. The ritual is performed on auspicious Muhurat days by experienced Pandits, ensuring maximum spiritual benefit.
                  </p>
                  <p className="m-0 text-[#3a1216] text-[16px] leading-[1.8]">
                    Join via a live video link from anywhere in the world and witness the powerful Vedic mantras transforming your journey into one of success, peace, and abundance.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* ── PACKAGES ── */}
        <section className="py-8 border-t border-[#e5e0d8]">
          <h2 className="text-[25px] font-bold text-[#3a1216] mb-4">Choose Your Puja Package</h2>
          <div className="flex gap-4 flex-wrap">
            {packages.map((pkg: PujaPackage, i: number) => {
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
                    href={`/book-a-puja/${slug}/checkout?package=${pkg.name.toLowerCase()}&price=${pkg.price}`}
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
                <div className="flex flex-row md:flex-col items-start md:items-center flex-1 gap-4 md:gap-0 mb-6 md:mb-0 relative">
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
              {[...testimonials, ...testimonials].map((t: any, i: number) => (
                <div key={i} className="min-w-[280px] max-w-[300px] border border-[#e5e0d8] rounded-[16px] p-4 shadow-[0_0_8px_rgba(0,0,0,0.06)] mx-2 bg-white">
                  <div className="text-[#d97706] text-[15px] mb-2">★★★★★</div>
                  <blockquote className="m-0 mb-3 text-[14px] text-[#3a1216] leading-relaxed">
                    &ldquo;{t.review || t.comment}&rdquo;
                  </blockquote>
                  <footer className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] text-white shrink-0 bg-[#9c5c0f]">
                      {t.initial || t.name?.charAt(0) || 'U'}
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
            {faqs.map((faq: any, i: number) => <FAQItem key={i} q={faq.q || faq.question} a={faq.a || faq.answer} />)}
          </div>
        </section>

        {/* ── WHY VAIDIK TALK ── */}
        <section className="py-8 border-t border-[#e5e0d8]">
          <h2 className="text-[25px] font-bold text-[#3a1216] mb-3">Why Vaidik Talk?</h2>
          <p className="text-[#3a1216] m-0 mb-4 text-[16px] leading-[1.8]">
            {puja?.whyChooseUs && puja.whyChooseUs.length > 0 
              ? (Array.isArray(puja.whyChooseUs) 
                  ? puja.whyChooseUs.join(' ') 
                  : (typeof puja.whyChooseUs === 'string' ? puja.whyChooseUs.replace(/\n/g, ' ') : puja.whyChooseUs))
              : "Vaidik Talk is a dedicated puja platform connecting professionals with verified Pandits for authentic Vedic rituals. Every puja is performed with a real Sankalp taken in your name and intention — so you can receive divine blessings from anywhere in India or abroad."}
          </p>
          <p className="font-bold text-[#9c5c0f] m-0">🛡 Guided by 40+ Years of Combined Vedic Expertise</p>
        </section>

        {/* ── EXTRA CONTENT (RICH TEXT) ── */}
        {puja?.description && puja.description.trim() && (
          <section className="py-8 border-t border-[#e5e0d8]">
            <div 
              className="rich-content prose prose-lg prose-slate w-full max-w-none text-[#3a1216] text-[16px] leading-[1.8] break-words
                prose-p:text-justify
                prose-headings:font-bold prose-headings:text-[#3a1216] prose-headings:text-left
                prose-h2:text-[25px] prose-h2:mb-4
                prose-h3:text-[22px] prose-h3:text-[#d97706] prose-h3:mb-3 prose-h3:leading-snug
                prose-a:!text-[#d97706] prose-a:underline hover:prose-a:text-[#b56003]
                prose-img:rounded-xl prose-img:shadow-sm
                prose-strong:text-[#3a1216] prose-strong:font-bold
                prose-ul:list-disc prose-ol:list-decimal prose-li:my-1"
              dangerouslySetInnerHTML={{ __html: puja.description.replace(/&nbsp;/g, ' ') }} 
            />
          </section>
        )}

        {/* ── SUPPORT BOX ── */}

        <section className="py-8 border-t border-[#e5e0d8]">
          <div className="flex flex-wrap gap-4 items-center justify-between border border-[#e5e0d8] rounded-[16px] p-5 bg-[#faf6ee]">
            <div>
              <h2 className="text-[20px] font-bold text-[#3a1216] m-0">Need help booking this Puja?</h2>
              <p className="text-[#3a1216] text-[15px] mt-1 mb-0">Our team is here to help you with any questions about your booking.</p>
            </div>
            <div className="text-center">
              <a href={`https://wa.me/919031823276?text=Hi%2C+I+want+to+book+${encodeURIComponent(puja?.title || 'a Puja')}`} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#25d366] hover:bg-[#1da851] text-white py-[14px] px-[32px] rounded-[12px] font-bold text-[15px] no-underline transition-colors">
                Chat on WhatsApp
              </a>
              <p className="text-[12px] text-[#3a1216]/50 mt-2 mb-0">24/7 support available</p>
            </div>
          </div>
        </section>

        {/* Sticky Mobile Bar */}
        <MobileStickyBar price={price} slug={slug} timerKey={`timer_${slug}`} />
      </div>
    </div>
  );
}
