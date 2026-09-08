'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import walletService from '@/lib/walletService';

interface Astrologer {
  _id: string;
  name: string;
  profilePicture: string;
  availability: {
    isOnline: boolean;
  };
}

interface BannerData {
  isActive: boolean;
  title: string;
  subtitle: string;
  callText: string;
  chatText: string;
  showCall: boolean;
  showChat: boolean;
  promoImage?: string;
  redirectRoute?: string;
  astrologers: Astrologer[];
}

export default function PromoBannerModal() {
  const [data, setData] = useState<BannerData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch active banner from server — shows on every page load
    const fetchBanner = async () => {
      try {
        const response = await walletService.getPromoBanner();
        if (response.success && response.data?.isActive) {
          setData(response.data);

          // Delay display slightly for smooth entrance animation
          const timer = setTimeout(() => {
            setIsVisible(true);
          }, 1500);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('Failed to load promotional banner:', error);
      }
    };

    fetchBanner();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAction = (targetUrl: string) => {
    setIsVisible(false);
    router.push(targetUrl);
  };

  if (!isVisible || !data) return null;

  const hasImage = !!data.promoImage;
  const hasText = !!(data.title && data.title.trim() !== '');
  const hasSubtitle = !!(data.subtitle && data.subtitle.trim() !== '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      {/* Modal Box */}
      <div className={`relative w-full ${hasImage && !hasText ? 'max-w-sm' : 'max-w-md'} bg-white rounded-3xl shadow-2xl mx-4 overflow-hidden border border-gray-100 transition-all duration-300 transform scale-100 animate-slideUp`}>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm transition-all focus:outline-none shadow-lg border border-white/10"
          aria-label="Close Promo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Top Header Section - Premium Image */}
        <div className="w-full h-36 sm:h-44 relative bg-gray-900 overflow-hidden">
          <img
            src="/images/promo-header.jpg"
            alt="Astro Solution Premium"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        {/* Body Section */}
        <div className={`text-center bg-white relative ${hasImage && !hasText ? 'p-0' : 'p-4 sm:p-6'}`}>

          {/* Dynamic Image Banner Render */}
          {hasImage ? (
            <div
              className={`overflow-hidden ${hasText ? 'my-4 rounded-2xl border border-gray-150 shadow-sm' : 'w-full h-auto'}`}
            >
              <img
                src={data.promoImage}
                alt="Promotion"
                className="w-full h-auto object-contain max-h-[460px] mx-auto block"
              />
            </div>
          ) : null}

          {/* Wrapper for text content */}
          <div className="pt-2 pb-2 text-center bg-white">
            
            {/* Title */}
            <h3 className="text-[1.05rem] sm:text-xl md:text-2xl font-black tracking-normal sm:tracking-wide text-[#5c1420] mb-2 leading-snug uppercase">
              Welcome to Astro Solution!
            </h3>

            {/* Subtitle */}
            <p className="text-gray-600 text-sm font-medium px-2 md:px-6 mb-5 leading-relaxed mx-auto">
              Connect instantly on WhatsApp for personalized guidance, horoscopes, and puja bookings.
            </p>

              {/* Optional Redirect Badge under Subtitle */}
              {data.redirectRoute && !hasImage && (
                <div className="mb-4">
                  <button
                    onClick={() => data.redirectRoute && handleAction(data.redirectRoute)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-black rounded-full border border-amber-200 transition-all cursor-pointer"
                  >
                    Explore Special Offer <span className="text-amber-600 font-extrabold">&rarr;</span>
                  </button>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-center px-4 w-full">
                <a
                  href="https://wa.me/919810467823?text=Hello%2C%20I%20need%20astrology%20guidance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-4/5 md:w-3/4 bg-gradient-to-r from-[#25D366] to-[#1ebe5d] hover:from-[#1ebe5d] hover:to-[#12a149] text-white font-black py-3 px-6 rounded-full shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_12px_24px_rgba(37,211,102,0.4)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-center flex items-center justify-center gap-3 text-[17px] tracking-wide"
                >
                  <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.122 1.532 5.857L.057 23.882l6.224-1.633A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.007-1.374l-.36-.213-3.695.969.987-3.607-.234-.371A9.818 9.818 0 1 1 12 21.818z"/>
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
