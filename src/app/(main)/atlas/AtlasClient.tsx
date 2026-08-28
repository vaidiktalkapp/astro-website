'use client';
import { useTranslation } from '@/context/LanguageContext';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Globe,
  Loader2,
  Info,
  Clock,
  ChevronDown
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

const GeoapifyGeocoderAutocomplete = dynamic(
  () => import('@geoapify/react-geocoder-autocomplete').then((mod) => mod.GeoapifyGeocoderAutocomplete),
  { ssr: false }
);

const AtlasMap = dynamic(
  () => import('../../../components/AtlasMap'),
  {
    ssr: false,
    loading: () => <div className="absolute inset-0 flex items-center justify-center"><Loader2 className="w-6 h-6 text-[#a9781f] animate-spin" /></div>
  }
);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export default function AtlasPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [date, setDate] = useState(searchParams.get('date') || '1970-07-15');
  const [time, setTime] = useState(searchParams.get('time') || '12:00');
  const [place, setPlace] = useState<{name: string, lat: number, lon: number, tzone: number, tzoneStr: string, tzoneName?: string} | null>(() => {
      const lat = searchParams.get('lat');
      const lon = searchParams.get('lon');
      const name = searchParams.get('place');
      const tzone = searchParams.get('tzone');
      const tzoneStr = searchParams.get('tzoneStr');
      const tzoneName = searchParams.get('tzoneName');
      if (lat && lon && name && tzone !== null) {
          return { name, lat: parseFloat(lat), lon: parseFloat(lon), tzone: parseFloat(tzone), tzoneStr: tzoneStr || '', tzoneName: tzoneName || '' };
      }
      return null;
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [initialCalcDone, setInitialCalcDone] = useState(false);

  const handleCalculate = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!place) {
      toast.error('Please search and select a City of Birth');
      return;
    }
    if (!date || !time) {
      toast.error('Please select both Date and Time');
      return;
    }

    // Update URL Params to persist data
    const params = new URLSearchParams(searchParams.toString());
    params.set('date', date);
    params.set('time', time);
    params.set('lat', place.lat.toString());
    params.set('lon', place.lon.toString());
    params.set('tzone', place.tzone.toString());
    params.set('tzoneStr', place.tzoneStr);
    if (place.tzoneName) params.set('tzoneName', place.tzoneName);
    params.set('place', place.name);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE}/astrology/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'Atlas',
            date,
            time,
            lat: place.lat.toString(),
            lon: place.lon.toString(),
            tzone: place.tzone,
            place: place.name
        })
      });
      const data = await response.json();

      if (data.success) {
        setResult({
            inputDate: date,
            inputTime: time,
            placeData: place,
            planets: data.data.kundli.planets
        });
      } else {
        setError(data.message || 'Calculation failed');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [date, time, place, pathname, router, searchParams]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-calculate on initial mount if URL params existed
  useEffect(() => {
    if (mounted && place && !initialCalcDone) {
        handleCalculate();
        setInitialCalcDone(true);
    }
  }, [mounted, place, initialCalcDone, handleCalculate]);

  const getUTTime = (localTime: string, offsetHours: number) => {
      try {
          const [h, m] = localTime.split(':').map(Number);
          let dateObj = new Date(1970, 0, 1, h, m);
          dateObj.setMinutes(dateObj.getMinutes() - (offsetHours * 60));
          return dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      } catch (e) {
          return localTime;
      }
  };

  const getPlanet = (name: string) => {
      if (!result || !result.planets) return null;
      return result.planets[name];
  };

  if (!mounted) return <div className="min-h-screen" style={{ backgroundColor: '#fdf8f0' }} />;

  return (
    <GeoapifyContext apiKey="47b4a8afc7734a12bd28b482d3dbff76">
      <div className="min-h-screen py-12 px-4 sm:px-6 relative bg-[#fdf8f0]" suppressHydrationWarning>

        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500&display=swap');
          .atlas-serif { font-family: 'Fraunces', serif; }
          .atlas-mono { font-family: 'JetBrains Mono', monospace; }

          .atlas-grain {
            position: absolute; inset: 0; z-index: 0; pointer-events: none;
            background-image: radial-gradient(rgba(92,20,32,0.06) 1px, transparent 1px);
            background-size: 22px 22px;
            mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, #000 40%, transparent 85%);
          }

          .atlas-geo, .atlas-geo > div, .atlas-geo .geoapify-container { width: 100% !important; height: 100% !important; }
          .atlas-geo .geoapify-autocomplete-input {
              color: #3a1216 !important;
              font-weight: 500 !important;
              font-family: inherit !important;
              background: #fdf8f0 !important;
              border: 1px solid #e8d9bd !important;
              border-radius: 12px !important;
              padding: 0 16px !important;
              font-size: 15px !important;
              width: 100% !important;
              height: 48px !important;
              line-height: 48px !important;
              box-sizing: border-box !important;
          }
          .atlas-geo .geoapify-autocomplete-input:focus {
              box-shadow: inset 0 2px 4px rgba(0,0,0,0.02), 0 0 0 2px rgba(169,120,31,0.2) !important;
              outline: none !important;
          }
          .atlas-geo .geoapify-autocomplete-items {
              background-color: #ffffff !important;
              border: none !important;
              border-radius: 12px !important;
              z-index: 1000 !important;
              box-shadow: 0 16px 32px rgba(58,18,22,0.08) !important;
              margin-top: 6px !important;
              overflow: hidden !important;
              position: absolute !important;
              width: 100% !important;
          }
          .atlas-geo .geoapify-autocomplete-item { padding: 11px 16px !important; color: #3a1216 !important; }
          .atlas-geo .geoapify-autocomplete-item:hover { background-color: #fdf8f0 !important; }

          @keyframes atlas-needle-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .atlas-needle { animation: atlas-needle-spin 1.6s linear infinite; }
        ` }} />

        <div className="atlas-grain" />

        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatePresence mode="wait">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#e8d9bd]/60 pb-6">
                <div>
                  <p className="text-[11px] font-bold text-[#a9781f] tracking-[0.3em] uppercase mb-2">
                    {t("atlas.celestial_repository") || "Astrological Atlas"}
                  </p>
                  <h1 className="atlas-serif text-4xl md:text-5xl font-semibold text-[#3a1216] leading-none">
                    {t("atlas.atlas") || "Atlas"}<span className="italic text-[#a9781f]">Data</span>
                  </h1>
                </div>
                <p className="text-[#6E2F37] text-[14px] leading-relaxed max-w-xs sm:text-right">
                  Precision coordinate & planetary calculation for Astrological charts.
                </p>
              </div>

              {/* Input Form */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-[#e8d9bd] shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    
                    <div className="md:col-span-3">
                        <label className="block text-[10px] font-bold text-[#6E2F37] uppercase tracking-widest mb-1.5 ml-1">Date of Birth</label>
                        <div className="relative">
                            <input 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-[#fdf8f0] border border-[#e8d9bd] rounded-xl px-4 h-[48px] text-[#3a1216] font-medium outline-none focus:border-[#a9781f] transition-colors"
                            />
                        </div>
                    </div>
                    
                    <div className="md:col-span-3">
                        <label className="block text-[10px] font-bold text-[#6E2F37] uppercase tracking-widest mb-1.5 ml-1">Time</label>
                        <div className="relative">
                            <input 
                                type="time" 
                                value={time} 
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-[#fdf8f0] border border-[#e8d9bd] rounded-xl px-4 h-[48px] text-[#3a1216] font-medium outline-none focus:border-[#a9781f] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <label className="block text-[10px] font-bold text-[#6E2F37] uppercase tracking-widest mb-1.5 ml-1">City of Birth</label>
                        <div className="atlas-geo h-[48px] relative z-[100]">
                            <GeoapifyGeocoderAutocomplete
                                placeholder="Search city e.g. Paris"
                                limit={5}
                                placeSelect={(value: any) => {
                                    if (value && value.properties) {
                                        const p = value.properties;
                                        setPlace({
                                            name: p.formatted,
                                            lat: p.lat,
                                            lon: p.lon,
                                            tzone: p.timezone?.offset_STD_seconds ? p.timezone.offset_STD_seconds / 3600 : 0,
                                            tzoneStr: p.timezone?.offset_STD || '+00:00',
                                            tzoneName: p.timezone?.abbreviation_STD || p.timezone?.name?.split('/').pop() || ''
                                        });
                                    } else {
                                        setPlace(null);
                                    }
                                }} 
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            onClick={handleCalculate}
                            disabled={loading}
                            className="w-full h-[48px] bg-[#5c1420] text-[#fdf8f0] rounded-xl font-bold text-[14px] hover:bg-[#3a1216] transition-colors disabled:opacity-50 flex items-center justify-center">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Calculate"}
                        </button>
                    </div>

                </div>
              </div>

              {/* Results Area */}
              <div className="min-h-[320px]">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-20 gap-4">
                      <Compass className="atlas-needle w-9 h-9 text-[#a9781f]" />
                      <p className="atlas-mono text-[12px] tracking-[0.15em] uppercase text-[#6E2F37]">
                        Calculating alignments...
                      </p>
                    </motion.div>
                  ) : result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full space-y-4">

                      {/* Flawless Premium Typographic Presentation */}
                      <div className="pt-2 pb-6 w-full max-w-4xl mx-auto flex flex-col items-center">
                         
                         {/* Header: Date & Place */}
                         <div className="text-center space-y-2 mb-6">
                            <h2 className="atlas-serif text-3xl md:text-4xl text-[#3a1216] font-semibold">
                                {result.placeData.name}
                            </h2>
                            <p className="text-[#a9781f] font-medium tracking-[0.1em] uppercase text-sm">
                                {new Date(result.inputDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {new Date(`1970-01-01T${result.inputTime}`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                            </p>
                         </div>

                         {/* Minimalist Data Grid, completely transparent */}
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full border-y border-[#e8d9bd]/60 py-6 mb-6">
                             <div className="flex flex-col items-center text-center space-y-2">
                                 <Compass className="w-5 h-5 text-[#a9781f]/70 mb-1" />
                                 <p className="text-[10px] text-[#6E2F37] font-bold uppercase tracking-widest">Latitude</p>
                                 <p className="text-[#3a1216] text-xl font-semibold">{Math.floor(result.placeData.lat)}°{Math.floor((result.placeData.lat % 1)*60)} {result.placeData.lat >= 0 ? 'N' : 'S'}</p>
                             </div>
                             <div className="flex flex-col items-center text-center space-y-2">
                                 <Globe className="w-5 h-5 text-[#a9781f]/70 mb-1" />
                                 <p className="text-[10px] text-[#6E2F37] font-bold uppercase tracking-widest">Longitude</p>
                                 <p className="text-[#3a1216] text-xl font-semibold">{Math.floor(result.placeData.lon)}°{Math.floor((result.placeData.lon % 1)*60)} {result.placeData.lon >= 0 ? 'E' : 'W'}</p>
                             </div>
                             <div className="flex flex-col items-center text-center space-y-2">
                                 <Clock className="w-5 h-5 text-[#a9781f]/70 mb-1" />
                                 <p className="text-[10px] text-[#6E2F37] font-bold uppercase tracking-widest">Time Zone</p>
                                 <p className="text-[#3a1216] text-xl font-semibold">
                                     {result.placeData.tzone > 0 ? '+' : ''}{result.placeData.tzone}
                                 </p>
                             </div>
                             <div className="flex flex-col items-center text-center space-y-2">
                                 <Globe className="w-5 h-5 text-[#a9781f]/70 mb-1" />
                                 <p className="text-[10px] text-[#6E2F37] font-bold uppercase tracking-widest">Universal Time</p>
                                 <p className="text-[#3a1216] text-xl font-semibold">{getUTTime(result.inputTime, result.placeData.tzone)}</p>
                             </div>
                         </div>

                         {/* Planetary Readout */}
                         <div className="flex flex-wrap justify-center gap-10 md:gap-20 w-full">
                             {getPlanet('Sun') && (
                                 <div className="text-center relative">
                                     <p className="text-[11px] text-[#a9781f] font-bold uppercase tracking-widest mb-2">Sun</p>
                                     <p className="text-[#3a1216] text-lg font-medium">{Math.floor(getPlanet('Sun').degree)}°{getPlanet('Sun').longitude_dms.split('-')[1]}' {getPlanet('Sun').sign}</p>
                                 </div>
                             )}
                             {getPlanet('Moon') && (
                                 <div className="text-center relative">
                                     <div className="hidden md:block absolute -left-10 top-1/2 w-px h-8 bg-[#e8d9bd]/60 -translate-y-1/2"></div>
                                     <p className="text-[11px] text-[#a9781f] font-bold uppercase tracking-widest mb-2">Moon</p>
                                     <p className="text-[#3a1216] text-lg font-medium">{Math.floor(getPlanet('Moon').degree)}°{getPlanet('Moon').longitude_dms.split('-')[1]}' {getPlanet('Moon').sign}</p>
                                 </div>
                             )}
                             {getPlanet('Ascendant') && (
                                 <div className="text-center relative">
                                     <div className="hidden md:block absolute -left-10 top-1/2 w-px h-8 bg-[#e8d9bd]/60 -translate-y-1/2"></div>
                                     <p className="text-[11px] text-[#a9781f] font-bold uppercase tracking-widest mb-2">Lagna</p>
                                     <p className="text-[#3a1216] text-lg font-medium">{Math.floor(getPlanet('Ascendant').degree)}°{getPlanet('Ascendant').longitude_dms.split('-')[1]}' {getPlanet('Ascendant').sign}</p>
                                 </div>
                             )}
                         </div>

                      </div>

                      {/* Flawless Map panel (No Borders, shadow instead) */}
                      <div className="bg-white/50 rounded-[2rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-[360px] md:h-[460px]">
                        <div className="w-full h-full rounded-3xl overflow-hidden atlas-map-wrapper relative z-0">
                          <AtlasMap 
                            center={[result.placeData.lat, result.placeData.lon]} 
                            onLocationSelect={() => {}} 
                          />
                        </div>
                      </div>

                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="max-w-md mx-auto text-center space-y-3 pt-10">
                      <Info className="w-6 h-6 text-[#8a1c2a] mx-auto" />
                      <h3 className="atlas-serif text-lg font-semibold text-[#3a1216]">{error}</h3>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center py-20 gap-4 text-center">
                      <div className="w-14 h-14 rounded-full border border-[#a9781f]/30 flex items-center justify-center">
                        <Globe className="w-6 h-6 text-[#a9781f]/60" />
                      </div>
                      <p className="atlas-serif text-[#3a1216] font-semibold text-lg max-w-xs">
                        Enter Birth details to calculate Celestial chart.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SEO & FAQ Section */}
              <div className="pt-24 pb-12 border-t border-[#e8d9bd]/60 mt-16">
                <div className="max-w-4xl mx-auto space-y-16">
                    
                    {/* SEO Write-up */}
                    <div className="text-center space-y-5">
                        <h2 className="atlas-serif text-3xl md:text-4xl text-[#3a1216] font-semibold">
                            Astrological Atlas & Coordinate Calculator
                        </h2>
                        <p className="text-[#6E2F37] text-base md:text-lg leading-relaxed text-justify md:text-center mx-auto max-w-3xl">
                            Our high-precision Astrological Atlas finds the exact location and time settings of any city in the world. This is the first and most important step for creating an accurate birth chart (Kundli). By using the most trusted Indian astrology rules, we ensure that your planetary positions—like the Sun, Moon, and your Rising Sign—are calculated perfectly.
                        </p>
                    </div>

                    {/* FAQs */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="h-[1px] w-12 bg-[#a9781f]/40"></div>
                            <h3 className="text-[11px] font-bold text-[#a9781f] uppercase tracking-[0.2em] text-center">Frequently Asked Questions</h3>
                            <div className="h-[1px] w-12 bg-[#a9781f]/40"></div>
                        </div>
                        
                        <div className="space-y-4 w-full">
                            
                            <details className="group bg-white/40 rounded-2xl border border-[#e8d9bd]/40 shadow-sm [&_summary::-webkit-details-marker]:hidden overflow-hidden transition-all duration-300">
                                <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-white/60 transition-colors outline-none focus-visible:bg-white/60">
                                    <h4 className="text-base font-bold text-[#3a1216] pr-4">Why is my birth chart different here than on Western astrology apps?</h4>
                                    <span className="transition-transform duration-300 group-open:-rotate-180 text-[#a9781f]">
                                        <ChevronDown className="w-5 h-5" />
                                    </span>
                                </summary>
                                <div className="p-6 pt-0 text-[#6E2F37] text-base leading-relaxed text-justify border-t border-transparent group-open:border-[#e8d9bd]/20 transition-all">
                                    Our platform uses traditional Indian (Vedic) astrology, which looks at the actual, real-time position of the stars in the sky today. Western astrology uses a fixed calendar system that hasn't changed in thousands of years. Because of this, there is a natural 24-degree difference between the two systems. Both are correct in their own way, but Vedic astrology gives a more accurate picture of the real sky.
                                </div>
                            </details>

                            <details className="group bg-white/40 rounded-2xl border border-[#e8d9bd]/40 shadow-sm [&_summary::-webkit-details-marker]:hidden overflow-hidden transition-all duration-300">
                                <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-white/60 transition-colors outline-none focus-visible:bg-white/60">
                                    <h4 className="text-base font-bold text-[#3a1216] pr-4">What is Universal Time (UT) and why is it important?</h4>
                                    <span className="transition-transform duration-300 group-open:-rotate-180 text-[#a9781f]">
                                        <ChevronDown className="w-5 h-5" />
                                    </span>
                                </summary>
                                <div className="p-6 pt-0 text-[#6E2F37] text-base leading-relaxed text-justify border-t border-transparent group-open:border-[#e8d9bd]/20 transition-all">
                                    Universal Time (UT) is simply the global standard time. Since people are born all over the world in different time zones, astrologers use one standard time to calculate planetary positions accurately. Our Atlas tool automatically finds the exact time difference for your birth city so you don't have to worry about the math!
                                </div>
                            </details>

                            <details className="group bg-white/40 rounded-2xl border border-[#e8d9bd]/40 shadow-sm [&_summary::-webkit-details-marker]:hidden overflow-hidden transition-all duration-300">
                                <summary className="flex items-center justify-between cursor-pointer p-6 hover:bg-white/60 transition-colors outline-none focus-visible:bg-white/60">
                                    <h4 className="text-base font-bold text-[#3a1216] pr-4">Do I really need my exact time of birth?</h4>
                                    <span className="transition-transform duration-300 group-open:-rotate-180 text-[#a9781f]">
                                        <ChevronDown className="w-5 h-5" />
                                    </span>
                                </summary>
                                <div className="p-6 pt-0 text-[#6E2F37] text-base leading-relaxed text-justify border-t border-transparent group-open:border-[#e8d9bd]/20 transition-all">
                                    Yes, knowing your exact birth time is very important! Your rising sign (Lagna) changes every 2 hours, and other deeper astrological charts can change in just a few minutes. Even a small difference of 10-15 minutes can sometimes completely change the predictions in your Kundli.
                                </div>
                            </details>

                        </div>
                    </div>

                </div>
              </div>

              {/* Footnote */}
              <div className="text-center text-[10px] text-[#8a1c2a] font-bold uppercase tracking-[0.5em] pt-4 opacity-60 border-t border-[#e8d9bd]/60">
                <span className="inline-block pt-6">{t("atlas.precision_mapping_system") || "Precision Mapping System"}</span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </GeoapifyContext>
  );
}
