import os

NEW_CODE = """'use client';
import { useTranslation } from '@/context/LanguageContext';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Compass,
  Globe,
  Copy,
  CheckCircle2,
  Search,
  Loader2,
  Info,
  RotateCw,
  Calendar,
  Clock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

const GeoapifyGeocoderAutocomplete = dynamic(
  () => import('@geoapify/react-geocoder-autocomplete').then((mod) => mod.GeoapifyGeocoderAutocomplete),
  { ssr: false }
);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export default function AtlasPage() {
  const { t } = useTranslation();

  const [date, setDate] = useState('1970-07-15');
  const [time, setTime] = useState('12:00');
  const [place, setPlace] = useState<{name: string, lat: number, lon: number, tzone: number, tzoneStr: string} | null>(null);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCalculate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!place) {
      toast.error('Please search and select a City of Birth');
      return;
    }
    if (!date || !time) {
      toast.error('Please select both Date and Time');
      return;
    }

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
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(null), 2000);
  };

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
              font-weight: 500;
              background: #fff !important;
              border: 1px solid #e8d9bd !important;
              border-radius: 10px !important;
              padding: 13px 16px !important;
              font-size: 15px !important;
              width: 100% !important;
              height: 100% !important;
          }
          .atlas-geo .geoapify-autocomplete-input:focus {
              border-color: #a9781f !important;
              box-shadow: 0 0 0 3px rgba(169,120,31,0.12) !important;
              outline: none !important;
          }
          .atlas-geo .geoapify-autocomplete-items {
              background-color: #ffffff !important;
              border: 1px solid #e8d9bd !important;
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
              className="space-y-10">

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#e8d9bd] pb-6">
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
              <div className="bg-white rounded-2xl p-6 border border-[#e8d9bd] shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    
                    <div className="md:col-span-3">
                        <label className="block text-[11px] font-bold text-[#6E2F37] uppercase tracking-widest mb-2">Date of Birth</label>
                        <div className="relative">
                            <Calendar className="w-4 h-4 text-[#a9781f] absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="date" 
                                value={date} 
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-[#fdf8f0] border border-[#e8d9bd] rounded-xl pl-10 pr-3 py-3.5 text-[#3a1216] font-medium outline-none focus:border-[#a9781f] transition-colors"
                            />
                        </div>
                    </div>
                    
                    <div className="md:col-span-3">
                        <label className="block text-[11px] font-bold text-[#6E2F37] uppercase tracking-widest mb-2">Time of Birth</label>
                        <div className="relative">
                            <Clock className="w-4 h-4 text-[#a9781f] absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="time" 
                                value={time} 
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-[#fdf8f0] border border-[#e8d9bd] rounded-xl pl-10 pr-3 py-3.5 text-[#3a1216] font-medium outline-none focus:border-[#a9781f] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <label className="block text-[11px] font-bold text-[#6E2F37] uppercase tracking-widest mb-2">City of Birth</label>
                        <div className="atlas-geo h-[50px] relative z-[100]">
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
                                            tzoneStr: p.timezone?.offset_STD || '+00:00'
                                        });
                                    } else {
                                        setPlace(null);
                                    }
                                }} 
                            />
                        </div>
                    </div>

                    <div className="md:col-span-2 flex items-end">
                        <button
                            onClick={() => handleCalculate()}
                            disabled={loading}
                            className="w-full py-3.5 bg-[#5c1420] text-[#fdf8f0] rounded-xl font-bold text-[14px] hover:bg-[#3a1216] transition-colors disabled:opacity-50 flex items-center justify-center h-[50px]">
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
                      className="max-w-2xl mx-auto">

                      {/* Editorial Data Card */}
                      <div className="bg-[#f0f8ff] rounded-2xl p-8 shadow-sm relative overflow-hidden border border-[#d6eaf8]">
                         
                         {/* Centered Data Layout */}
                         <div className="flex flex-col items-center text-center space-y-4 relative z-10">
                            
                            <div className="space-y-1">
                                <p className="text-[15px] text-[#2c3e50] font-medium">
                                    Date: <span className="font-bold">{new Date(result.inputDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}, at {new Date(\`1970-01-01T\${result.inputTime}\`).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</span>
                                </p>
                                <p className="text-[15px] text-[#2c3e50] font-medium">
                                    Place: <span className="font-bold">{result.placeData.name}</span>
                                </p>
                            </div>

                            <div className="w-12 h-px bg-[#bdc3c7]/60 my-2"></div>

                            <div className="space-y-1">
                                <p className="text-[15px] text-[#2c3e50]">
                                    Latitude: <span className="font-medium">{Math.floor(result.placeData.lat)}°{Math.floor((result.placeData.lat % 1)*60)} {result.placeData.lat >= 0 ? 'North' : 'South'}</span>
                                </p>
                                <p className="text-[15px] text-[#2c3e50]">
                                    Longitude: <span className="font-medium">{Math.floor(result.placeData.lon)}°{Math.floor((result.placeData.lon % 1)*60)} {result.placeData.lon >= 0 ? 'East' : 'West'}</span>
                                </p>
                                <p className="text-[15px] text-[#2c3e50]">
                                    Time Difference: <span className="font-medium">{result.placeData.tzoneStr.replace('+', '').replace(':', '')}</span>
                                </p>
                                <p className="text-[15px] text-[#2c3e50]">
                                    Universal Time: <span className="font-medium">{getUTTime(result.inputTime, result.placeData.tzone)}</span>
                                </p>
                                <p className="text-[15px] text-[#2c3e50]">
                                    Equation of Time (EOT): <span className="font-medium">-</span> {/* Vedic System usually doesn't calculate this directly */}
                                </p>
                            </div>

                            <div className="w-12 h-px bg-[#bdc3c7]/60 my-2"></div>

                            <div className="space-y-1">
                                {getPlanet('Sun') && (
                                    <p className="text-[15px] text-[#2c3e50]">
                                        Sun in: <span className="font-medium">{Math.floor(getPlanet('Sun').degree)}°{getPlanet('Sun').longitude_dms.split('-')[1]}' {getPlanet('Sun').sign}</span>
                                    </p>
                                )}
                                {getPlanet('Moon') && (
                                    <p className="text-[15px] text-[#2c3e50]">
                                        Moon in: <span className="font-medium">{Math.floor(getPlanet('Moon').degree)}°{getPlanet('Moon').longitude_dms.split('-')[1]}' {getPlanet('Moon').sign}</span>
                                    </p>
                                )}
                                {getPlanet('Ascendant') && (
                                    <p className="text-[15px] text-[#2c3e50]">
                                        AS in: <span className="font-medium">{Math.floor(getPlanet('Ascendant').degree)}°{getPlanet('Ascendant').longitude_dms.split('-')[1]}' {getPlanet('Ascendant').sign}</span>
                                    </p>
                                )}
                                {getPlanet('Jupiter') && (
                                    <p className="text-[15px] text-[#2c3e50]">
                                        MC in: <span className="font-medium">-</span> {/* Approximate */}
                                    </p>
                                )}
                            </div>

                         </div>
                      </div>

                    </motion.div>
                  ) : error ? (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="max-w-md mx-auto bg-[#fdf1ee] border border-[#8a1c2a]/15 rounded-2xl p-8 space-y-3 text-center">
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

              {/* Footnote */}
              <div className="text-center text-[10px] text-[#8a1c2a] font-bold uppercase tracking-[0.5em] pt-4 opacity-60 border-t border-[#e8d9bd]">
                <span className="inline-block pt-6">{t("atlas.precision_mapping_system")}</span>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </GeoapifyContext>
  );
}
"""

with open('src/app/(main)/atlas/AtlasClient.tsx', 'w', encoding='utf-8') as f:
    f.write(NEW_CODE)
print("File rewritten successfully")
