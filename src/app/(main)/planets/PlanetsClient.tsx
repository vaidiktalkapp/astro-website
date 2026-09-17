'use client';
import { useTranslation } from '@/context/LanguageContext';

import React, { useState, useEffect } from 'react';
import {
  Globe,
  MapPin,
  Loader2,
  Activity,
  Compass,
  Star,
  Navigation,
  Info,
  Calendar as CalendarIcon,
  AlertCircle,
  CheckCircle2 } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import dynamic from 'next/dynamic';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import PaidPDFButton from '@/components/shared/PaidPDFButton';
import { downloadPlanetsPDF } from '@/lib/planetsPdfGenerator';

const GeoapifyGeocoderAutocomplete = dynamic(
  () => import('@geoapify/react-geocoder-autocomplete').then((mod) => mod.GeoapifyGeocoderAutocomplete),
  { ssr: false }
);

import { historyApiService } from '@/lib/historyApiService';

interface Transit {
  planet: string;
  from: string;
  to: string;
  date: string;
}

interface PlanetPosition {
  name: string;
  sign: string;
  degree: string;
  house: number;
  is_retrograde: boolean;
}

interface LocationState {
  lat: number;
  lon: number;
  place: string;
}

export default function PlanetsPage() {
    const { t } = useTranslation();

  const [isMounted, setIsMounted] = useState(false);
  const [location, setLocation] = useState<LocationState>({
    lat: 28.6139,
    lon: 77.2090,
    place: 'New Delhi, India'
  });
  const [positions, setPositions] = useState<PlanetPosition[]>([]);
  const [transits, setTransits] = useState<Transit[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://vaidik-server.onrender.com';
  const tzone = 5.5;

  useEffect(() => {
    setIsMounted(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          place: 'Active Location'
        }));
      }, () => {});
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const todayStr = new Date().toLocaleDateString('en-CA');
      const resToday = await fetch(`${API_URL}/astrology/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lat: String(location.lat), 
          lon: String(location.lon), 
          tzone, 
          date: todayStr,
          time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
          name: 'Transit Monitor'
        })
      });
      const dataToday = await resToday.json();

      let currentPositions: PlanetPosition[] = [];
      if (dataToday.success && dataToday.data?.planets) {
        const p = dataToday.data.planets;
        currentPositions = [
          { name: 'Sun', sign: p.Sun?.sign || '...', degree: p.Sun?.longitude_dms || '...', house: p.Sun?.house || 1, is_retrograde: false },
          { name: 'Moon', sign: p.Moon?.sign || '...', degree: p.Moon?.longitude_dms || '...', house: p.Moon?.house || 1, is_retrograde: false },
          { name: 'Mars', sign: p.Mars?.sign || '...', degree: p.Mars?.longitude_dms || '...', house: p.Mars?.house || 1, is_retrograde: p.Mars?.is_retrograde },
          { name: 'Mercury', sign: p.Mercury?.sign || '...', degree: p.Mercury?.longitude_dms || '...', house: p.Mercury?.house || 1, is_retrograde: p.Mercury?.is_retrograde },
          { name: 'Jupiter', sign: p.Jupiter?.sign || '...', degree: p.Jupiter?.longitude_dms || '...', house: p.Jupiter?.house || 1, is_retrograde: p.Jupiter?.is_retrograde },
          { name: 'Venus', sign: p.Venus?.sign || '...', degree: p.Venus?.longitude_dms || '...', house: p.Venus?.house || 1, is_retrograde: p.Venus?.is_retrograde },
          { name: 'Saturn', sign: p.Saturn?.sign || '...', degree: p.Saturn?.longitude_dms || '...', house: p.Saturn?.house || 1, is_retrograde: p.Saturn?.is_retrograde },
          { name: 'Rahu', sign: p.Rahu?.sign || '...', degree: p.Rahu?.longitude_dms || '...', house: p.Rahu?.house || 1, is_retrograde: true },
          { name: 'Ketu', sign: p.Ketu?.sign || '...', degree: p.Ketu?.longitude_dms || '...', house: p.Ketu?.house || 1, is_retrograde: true }
        ];
        setPositions(currentPositions);
      }

      const date = new Date();
      const resCal = await fetch(`${API_URL}/astrology/calendar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          lat: location.lat,
          lon: location.lon,
          tzone
        })
      });
      const dataCal = await resCal.json();
      if (dataCal.success) {
        const allTransits: Transit[] = [];
        dataCal.data.forEach((day: any) => {
          day.transitions.forEach((t: any) => {
            allTransits.push({ ...t, date: day.date });
          });
        });
        setTransits(allTransits.slice(0, 8));
      }

      // Save planetary snapshot to history
      if (historyApiService.isAuthenticated() && currentPositions.length > 0) {
        await historyApiService.saveHistory('planets', {
          place: location.place,
          lat: location.lat,
          lon: location.lon,
          positions: currentPositions.map((p) => ({ name: p.name, sign: p.sign, degree: p.degree })),
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Planets fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isMounted) fetchData();
  }, [isMounted, location.lat, location.lon]);

  if (!isMounted) return <div className="min-h-screen bg-stone-50" />;

  return (
    <div className="min-h-screen bg-[#fdfaf2] text-[#3a1216] pb-24">
      <GeoapifyContext apiKey="47b4a8afc7734a12bd28b482d3dbff76">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Header */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10 border-b border-[#e8dbb8]/60 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b8962e] animate-pulse" />
                <span className="text-[10px] font-bold text-[#b8962e] uppercase tracking-widest">{t("planets.planetary_transit_monitor")}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#3a1216] tracking-tight">{t("planets.planetary_positions")}</h1>
              <div className="flex items-center gap-2 pt-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#b8962e]" />
                <span className="text-xs font-medium text-[#3a1216]/70">{location.place}</span>
              </div>
            </div>

            {/* Location Control */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="flex items-center gap-3 bg-white p-2 border border-[#e8dbb8] rounded-xl w-full lg:w-72 shadow-sm">
                <div className="relative w-full">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-[#b8962e]/50">
                    <Compass className="w-4 h-4" />
                  </div>
                  <GeoapifyGeocoderAutocomplete
                    placeholder="Search location for ingress..."
                    value={location.place}
                    debounceDelay={300}
                    placeSelect={(value: any) => {
                      if (value?.properties) {
                        setLocation({ place: value.properties.formatted, lat: value.properties.lat, lon: value.properties.lon });
                      }
                    }} 
                  />
                </div>
              </div>

              <PaidPDFButton 
                toolKey="planets"
                reportName={`Planetary Transit - ${location.place}`}
                downloadFn={async () => {
                  await downloadPlanetsPDF({
                    location: location.place,
                    date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
                    positions,
                    transits
                  });
                }}
                variant="outline"
                size="sm"
                className="px-6 h-[44px] w-full sm:w-auto border-[#b8962e] text-[#b8962e] hover:bg-[#b8962e]/10 font-bold"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-[#b8962e] animate-spin" />
              <p className="text-xs font-bold text-[#b8962e] uppercase tracking-widest">{t("planets.intercepting_signal")}</p>
            </div>
          ) : (
            <div className="space-y-10">
              
              {/* Planets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {positions.map((planet, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-5 rounded-2xl border border-[#e8dbb8] shadow-sm relative overflow-hidden group hover:border-[#b8962e]/40 hover:shadow-md transition-all">
                    
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#fdf6e3] flex items-center justify-center text-[#b8962e]">
                          <Globe className="w-4 h-4" />
                        </div>
                        <h3 className="text-[15px] font-bold text-[#3a1216] tracking-tight">{planet.name}</h3>
                      </div>
                      {planet.is_retrograde && (
                        <div title="Retrograde" className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                          <Activity className="w-3 h-3 text-red-400" />
                        </div>
                      )}
                    </div>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("planets.sign")}</span>
                        <span className="text-[13px] font-bold text-[#3a1216]">{planet.sign}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("planets.degree")}</span>
                        <span className="text-[13px] font-bold text-[#3a1216]">{planet.degree}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t("planets.house")}</span>
                        <span className="text-[13px] font-bold text-[#3a1216]">{planet.house}H</span>
                      </div>
                    </div>
                    <div className="mt-5 pt-4 border-t border-[#f5ead5]">
                      <div className="h-1 w-full bg-[#fdf6e3] rounded-full overflow-hidden">
                        <div className="h-full bg-[#d97706] w-[45%]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Transit Intelligence */}
              <div className="bg-[#fdfbf6] rounded-3xl border border-[#e8dbb8] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <Navigation className="w-5 h-5 text-[#b8962e]" />
                  <h3 className="text-[13px] font-black text-[#3a1216] uppercase tracking-widest">{t("planets.transit_intelligence")}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#10b981] shrink-0" />
                      <p className="text-[13px] leading-relaxed text-[#3a1216]/80 font-medium">
                        <span className="text-[#3a1216] font-bold block mb-1.5 uppercase tracking-wider text-[11px]">{t("planets.benefic_alignment")}</span>
                        {t("planets.jupiter_in_taurus_is_creating")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#f97316] shrink-0" />
                      <p className="text-[13px] leading-relaxed text-[#3a1216]/80 font-medium">
                        <span className="text-[#3a1216] font-bold block mb-1.5 uppercase tracking-wider text-[11px]">{t("planets.retrograde_warning")}</span>
                        {t("planets.mercury_in_aquarius_retrograde")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transit Log */}
              <div className="bg-[#fdf6e3] rounded-3xl border border-[#e8dbb8] shadow-sm overflow-hidden">
                <div className="p-6 bg-[#f5ead5] border-b border-[#e8dbb8] flex items-center justify-between">
                  <h3 className="text-[13px] font-black text-[#3a1216] uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#d97706]" />{t("planets.transit_log")}
                  </h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                      {transits.map((transit, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="bg-white rounded-2xl border border-[#e8dbb8] p-5 text-center shadow-sm">
                          
                          <div className="w-10 h-10 mx-auto rounded-xl bg-[#fdf6e3] border border-[#f5ead5] flex items-center justify-center text-[#d97706] mb-4">
                            <Star className="w-4 h-4" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex flex-col gap-1">
                              <span className="text-[11px] font-black text-[#b8962e] uppercase tracking-widest">{transit.planet} {t("planets.ingress")}</span>
                              <span className="text-[10px] font-bold text-[#b8962e]/60">{transit.date}</span>
                            </div>
                            
                            <div className="py-2">
                              <div className="text-[13px] font-bold text-[#3a1216]">{transit.from}</div>
                              <div className="text-[10px] text-gray-400">↓</div>
                              <div className="text-[13px] font-bold text-[#3a1216]">{transit.to}</div>
                            </div>
                            
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                              {t("planets.major_shift_in_collective_ener")}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="pt-10">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#3a1216] mb-2">Frequently Asked Questions</h2>
                  <p className="text-sm text-[#3a1216]/70">Understanding Planetary Transits and Their Impact on Your Life.</p>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                  {[
                    { q: "What is a Planetary Transit?", a: "A planetary transit occurs when a planet moves through the zodiac and enters a new sign. These transits activate different areas of your birth chart and influence collective energy." },
                    { q: "How often do these transits happen?", a: "It depends on the planet. The Moon changes signs every 2.5 days, while slow-moving planets like Jupiter and Saturn take years to complete a transit. Fast movers like Mercury and Venus change signs every few weeks." },
                    { q: "What does it mean when a planet is 'Retrograde'?", a: "A retrograde planet appears to move backward in the sky from our vantage point on Earth. Astrologically, it's a time for reflection, reassessment, and redoing things related to that planet's domain." }
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-[#e8dbb8] p-6 shadow-sm">
                      <h4 className="text-[14px] font-bold text-[#3a1216] mb-2 flex gap-2">
                        <span className="text-[#d97706]">Q.</span> {faq.q}
                      </h4>
                      <p className="text-[13px] text-[#3a1216]/80 leading-relaxed pl-6">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>
      </GeoapifyContext>

      <style dangerouslySetInnerHTML={{ __html: `
        .geoapify-autocomplete-input {
          color: #3a1216 !important;
          font-weight: 500 !important;
          width: 100% !important;
          padding: 0.625rem 1rem 0.625rem 2.5rem !important;
          border-radius: 0.5rem !important;
          border: 1px solid #e8dbb8 !important;
          outline: none !important;
          transition: all 0.2s ease !important;
          font-size: 13px !important;
          background: transparent !important;
        }
        .geoapify-autocomplete-input:focus {
          border-color: #b8962e !important;
          box-shadow: 0 0 0 3px rgba(184, 150, 46, 0.1) !important;
        }
        .geoapify-autocomplete-items {
          background-color: #ffffff !important;
          color: #3a1216 !important;
          border: 1px solid #e8dbb8 !important;
          border-top: none !important;
          border-radius: 0 0 0.5rem 0.5rem !important;
          overflow: hidden !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
          z-index: 100 !important;
        }
        .geoapify-autocomplete-item {
          padding: 10px 16px !important;
          font-size: 13px !important;
        }
      ` }} />
    </div>
  );

}