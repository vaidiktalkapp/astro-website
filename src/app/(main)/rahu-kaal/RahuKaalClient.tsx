'use client';
import { useTranslation } from '@/context/LanguageContext';
import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Loader2,
  Calendar as CalendarIcon,
  Sunrise,
  Sunset,
  Moon,
  Sparkles,
  Search,
  Clock,
  Info
} from 'lucide-react';
import dynamic from 'next/dynamic';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';

const GeoapifyGeocoderAutocomplete = dynamic(
  () => import('@geoapify/react-geocoder-autocomplete').then((mod) => mod.GeoapifyGeocoderAutocomplete),
  { ssr: false }
);

interface LocationState {
  lat: number;
  lon: number;
  place: string;
}

export default function RahuKaalClient() {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [location, setLocation] = useState<LocationState>({
    lat: 28.6139,
    lon: 77.2090,
    place: 'New Delhi, Delhi, India'
  });
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toLocaleDateString('en-CA'));
  const [loading, setLoading] = useState(true);
  const [astrologyData, setAstrologyData] = useState<any>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://vaidik-server.onrender.com';
  const tzone = 5.5;

  useEffect(() => {
    setIsMounted(true);
    const savedLocation = localStorage.getItem('rahuKaalLocation');
    if (savedLocation) {
      try {
        setLocation(JSON.parse(savedLocation));
      } catch (e) { }
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation((prev) => ({
          ...prev,
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          place: t("rahu_kaal.active_location") || 'Current Location'
        }));
      }, () => { });
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const resToday = await fetch(`${API_URL}/astrology/today`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lat: location.lat, lon: location.lon, tzone, date: selectedDate })
      });
      const dataToday = await resToday.json();
      if (dataToday.success) {
        setAstrologyData(dataToday.data);
      }
    } catch (error) {
      console.error('Rahu Kaal fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isMounted) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, location.lat, location.lon, selectedDate]);

  const handleSearch = () => fetchData();

  if (!isMounted) return <div className="min-h-screen" style={{ backgroundColor: '#fdf6e3' }} />;

  const formatAMPM = (timeStr: string | undefined): string | null => {
    if (!timeStr || timeStr === 'None') return null;
    if (timeStr.includes('-')) {
      const [start, end] = timeStr.split('-').map(s => s.trim());
      return `${formatAMPM(start)} - ${formatAMPM(end)}`;
    }
    const [hStr, mStr, sStr] = timeStr.split(':');
    let h = parseInt(hStr, 10);
    const m = mStr || '00';
    const s = sStr ? `:${sStr}` : '';
    const ampm = (h % 24) >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    const hFormatted = h < 10 ? `0${h}` : h;
    return `${hFormatted}:${m}${s} ${ampm}`;
  };

  const calculateTimings = () => {
    if (!astrologyData || !astrologyData.sun_rise || !astrologyData.sun_set) return [];

    const parseTime = (timeStr: string) => {
      const [h, m, s] = timeStr.split(':').map(Number);
      const d = new Date(`1970-01-01T00:00:00Z`);
      d.setUTCHours(h, m, s || 0, 0);
      return d.getTime();
    };

    const formatMsToAMPM = (ms: number) => {
      const d = new Date(ms);
      let h = d.getUTCHours();
      const m = d.getUTCMinutes().toString().padStart(2, '0');
      const s = d.getUTCSeconds().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;
      const hStr = h.toString().padStart(2, '0');
      return `${hStr}:${m}:${s} ${ampm}`;
    };

    const sunriseMs = parseTime(astrologyData.sun_rise);
    let sunsetMs = parseTime(astrologyData.sun_set);
    if (sunsetMs < sunriseMs) sunsetMs += 24 * 60 * 60 * 1000;

    const daylightMs = sunsetMs - sunriseMs;
    const partMs = daylightMs / 8;

    const dateObj = new Date(selectedDate);
    const dayOfWeek = dateObj.getDay();

    const rahuParts = [8, 2, 7, 5, 6, 4, 3];
    const yamaParts = [5, 4, 3, 2, 1, 7, 6];
    const gulikaParts = [7, 6, 5, 4, 3, 2, 1];
    const kantakaParts = [4, 5, 6, 7, 1, 2, 3];
    const kaalvelaParts = [4, 3, 2, 1, 7, 6, 5]; // North Indian Ardhayaam
    const yamaghantaParts = yamaParts; // Yamaghanta is same as Yamaganda
    const kulikaParts = gulikaParts; // Kulika is same as Gulika

    const getWindow = (part: number) => {
      const start = sunriseMs + (part - 1) * partMs;
      const end = start + partMs;
      return `${formatMsToAMPM(start)} - ${formatMsToAMPM(end)}`;
    };

    const rahuTiming = astrologyData.muhurats?.rahu_kaal && astrologyData.muhurats.rahu_kaal !== 'None'
      ? formatAMPM(astrologyData.muhurats.rahu_kaal)
      : getWindow(rahuParts[dayOfWeek]);

    return [
      { name: 'Rahu Kaal', time: rahuTiming, icon: <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div> },
      { name: 'Yamaganda', time: getWindow(yamaParts[dayOfWeek]), icon: <div className="w-2.5 h-2.5 rounded-full bg-orange-500"></div> },
      { name: 'Gulika Kaal', time: getWindow(gulikaParts[dayOfWeek]), icon: <div className="w-2.5 h-2.5 rounded-full bg-[#eab308]"></div> },
      { name: 'Kantaka / Mrityu', time: getWindow(kantakaParts[dayOfWeek]), icon: <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div> },
      { name: 'Kaalvela / Ardhayaam', time: getWindow(kaalvelaParts[dayOfWeek]), icon: <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div> },
      { name: 'Yamaghanta', time: getWindow(yamaghantaParts[dayOfWeek]), icon: <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div> },
      { name: 'Kulika Kaal', time: getWindow(kulikaParts[dayOfWeek]), icon: <div className="w-2.5 h-2.5 rounded-full bg-slate-500"></div> }];
  };

  const inauspiciousTimings = calculateTimings();

  const calculateAbhijit = () => {
    if (!astrologyData || !astrologyData.sun_rise || !astrologyData.sun_set) return null;

    // Always use mathematical calculation (8th Muhurat of the day) to match standard Panchang (Astrosage)
    const parseTime = (timeStr: string) => {
      const [h, m, s] = timeStr.split(':').map(Number);
      const d = new Date(`1970-01-01T00:00:00Z`);
      d.setUTCHours(h, m, s || 0, 0);
      return d.getTime();
    };
    const formatMsToAMPM = (ms: number) => {
      const d = new Date(ms);
      let h = d.getUTCHours();
      const m = d.getUTCMinutes().toString().padStart(2, '0');
      const s = d.getUTCSeconds().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;
      const hStr = h.toString().padStart(2, '0');
      return `${hStr}:${m}:${s} ${ampm}`;
    };

    const sunriseMs = parseTime(astrologyData.sun_rise);
    let sunsetMs = parseTime(astrologyData.sun_set);
    if (sunsetMs < sunriseMs) sunsetMs += 24 * 60 * 60 * 1000;

    const daylightMs = sunsetMs - sunriseMs;
    const muhuratDuration = daylightMs / 15;
    const start = sunriseMs + (7 * muhuratDuration);
    const end = start + muhuratDuration;

    return `${formatMsToAMPM(start)} - ${formatMsToAMPM(end)}`;
  };

  const abhijitMuhurat = calculateAbhijit();
  const isWednesday = new Date(selectedDate).getDay() === 3;

  return (
    <div className="min-h-screen pb-16 rk-wrap relative" style={{ backgroundColor: '#fdf6e3' }}>
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#f3e6c8] to-transparent opacity-60 pointer-events-none"></div>
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#ebdca8] blur-[120px] rounded-full opacity-40 pointer-events-none"></div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');
          .rk-wrap * { font-family: 'Outfit', sans-serif; }
          .rk-wrap h1, .rk-wrap h2, .rk-wrap .serif { font-family: 'Playfair Display', Georgia, serif; }

          .rk-geo > div, .rk-geo .geoapify-container { width: 100% !important; }
          .rk-geo .geoapify-autocomplete-input {
              color: #3a1216 !important;
              font-weight: 500 !important;
              background: transparent !important;
              border: none !important;
              padding: 10px 10px 10px 40px !important;
              font-size: 14px !important;
              font-family: 'Outfit', sans-serif !important;
              width: 100% !important;
              box-sizing: border-box !important;
          }
          .rk-geo .geoapify-autocomplete-input:focus { outline: none !important; }
          .rk-geo .geoapify-autocomplete-items {
              background-color: rgba(255, 255, 255, 0.95) !important;
              backdrop-filter: blur(10px);
              color: #3a1216 !important;
              border: 1px solid rgba(235, 220, 168, 0.8) !important;
              border-radius: 12px !important;
              z-index: 9999 !important;
              box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
              padding: 4px;
          }
          .rk-geo .geoapify-autocomplete-item { 
              padding: 10px 16px !important; 
              cursor: pointer !important; 
              border-radius: 8px;
              transition: all 0.2s ease;
          }
          .rk-geo .geoapify-autocomplete-item:hover { 
              background-color: #f5eedc !important; 
              color: #b8962e !important;
          }
          
          /* Glassmorphism Cards */
          .premium-card {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.8);
            box-shadow: 0 8px 32px rgba(184, 150, 46, 0.05);
          }
          
          .floating-row {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          .floating-row:hover {
            transform: translateX(4px);
            background: rgba(255, 255, 255, 0.9);
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          }
        `
      }} />

      <GeoapifyContext apiKey="47b4a8afc7734a12bd28b482d3dbff76">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 relative z-10">

          {/* Premium Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ebdca8]/30 border border-[#ebdca8] text-[#b8962e] text-xs font-semibold mb-2 backdrop-blur-sm">
              <Clock className="w-3.5 h-3.5" /> Cosmic Timings
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#3a1216] mb-1 serif tracking-tight">
              Rahu Kaal Today
            </h1>
          </div>

          {/* Premium Search Bar Container */}
          <div className="premium-card rounded-2xl p-2 flex flex-col md:flex-row items-center gap-2 mb-6 w-full relative z-50">
            <div className="flex-1 w-full relative rk-geo flex items-center bg-white/60 hover:bg-white/80 transition-colors rounded-xl border border-white/50 px-3 shadow-inner">
              <MapPin className="absolute left-4 w-4 h-4 text-[#b8962e] z-10" />
              <GeoapifyGeocoderAutocomplete
                placeholder="Search precise location..."
                value={location.place}
                debounceDelay={300}
                placeSelect={(value: any) => {
                  if (value?.properties) {
                    const newLoc = { place: value.properties.formatted, lat: value.properties.lat, lon: value.properties.lon };
                    setLocation(newLoc);
                    localStorage.setItem('rahuKaalLocation', JSON.stringify(newLoc));
                  }
                }}
              />
            </div>

            <div className="w-full md:w-auto md:min-w-[200px] relative flex items-center bg-white/60 hover:bg-white/80 transition-colors rounded-xl border border-white/50 px-4 py-2.5 shadow-inner">
              <CalendarIcon className="w-4 h-4 text-[#b8962e] mr-2" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent border-none outline-none text-[14px] font-semibold text-[#3a1216] w-full cursor-pointer"
              />
            </div>

            <button
              onClick={handleSearch}
              className="w-full md:w-auto bg-gradient-to-r from-[#b8962e] to-[#9c7a1a] hover:from-[#9c7a1a] hover:to-[#7a6010] text-white px-6 py-2.5 rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(184,150,46,0.3)] hover:shadow-[0_6px_20px_rgba(184,150,46,0.4)] hover:-translate-y-0.5"
            >
              Calculate
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[14px] font-semibold text-[#5a3a29] mb-5 px-2 gap-3">
            <div className="flex items-center gap-1.5 bg-white/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/50">
              <MapPin className="w-4 h-4 text-[#b8962e]" />
              <span>{location.place}</span>
            </div>
            <div className="bg-white/40 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/50">
              {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="relative">
                <div className="w-14 h-14 border-4 border-[#ebdca8] border-t-[#b8962e] rounded-full animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <Sparkles className="w-4 h-4 text-[#b8962e] animate-pulse" />
                </div>
              </div>
              <p className="mt-4 text-[#9c7a1a] font-bold text-base tracking-wide uppercase">Aligning Stars...</p>
            </div>
          ) : (
            <div className="space-y-5">

              {/* Main Rahu Kaal Card - Premium Rich Design */}
              <div className="relative overflow-hidden rounded-2xl p-5 md:p-6 shadow-[0_15px_40px_rgba(153,27,27,0.12)] w-full border border-red-900/10"
                style={{ background: 'linear-gradient(135deg, #4a0d16 0%, #7a1224 100%)' }}>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.3)] flex-shrink-0 flex items-center justify-center border-2 border-red-300/30">
                      <div className="w-4 h-4 bg-white/30 rounded-full blur-[2px] absolute top-2 right-2"></div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h2 className="text-lg font-bold text-red-100 tracking-wide uppercase">Rahu Kaal Window</h2>
                        <span className="px-2 py-0.5 rounded-md bg-red-950/50 border border-red-500/30 text-red-200 text-[9px] font-bold tracking-widest uppercase">Inauspicious</span>
                      </div>
                      <p className="text-xs text-red-200/90 font-medium flex items-center gap-1.5">
                        <Info className="w-3.5 h-3.5" /> Avoid starting new ventures during this period.
                      </p>
                    </div>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md px-6 py-3 rounded-lg border border-red-900/30 shadow-inner min-w-[220px] text-center">
                    <p className="text-xl md:text-2xl font-bold text-white font-mono tracking-tight">
                      {inauspiciousTimings[0]?.time}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sun/Moon Cards - Premium Glassmorphism */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                <div className="premium-card rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden group">
                  <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-orange-400/10 rounded-full blur-xl group-hover:bg-orange-400/20 transition-all pointer-events-none"></div>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-100 to-orange-200 flex-shrink-0 flex items-center justify-center border border-orange-300/50">
                    <Sunrise className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-0.5">Sunrise</p>
                    <p className="text-base md:text-lg font-bold text-[#3a1216]">{formatAMPM(astrologyData?.sun_rise)?.replace(/:\d{2} /, ' ')}</p>
                  </div>
                </div>
                <div className="premium-card rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden group">
                  <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-rose-400/10 rounded-full blur-xl group-hover:bg-rose-400/20 transition-all pointer-events-none"></div>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-100 to-rose-200 flex-shrink-0 flex items-center justify-center border border-rose-300/50">
                    <Sunset className="w-5 h-5 text-rose-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-0.5">Sunset</p>
                    <p className="text-base md:text-lg font-bold text-[#3a1216]">{formatAMPM(astrologyData?.sun_set)?.replace(/:\d{2} /, ' ')}</p>
                  </div>
                </div>
                <div className="premium-card !bg-slate-900 rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden group border-slate-700">
                  <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-blue-400/10 rounded-full blur-xl group-hover:bg-blue-400/20 transition-all pointer-events-none"></div>
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex-shrink-0 flex items-center justify-center border border-slate-600">
                    <Moon className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Moonrise</p>
                    <p className="text-base md:text-lg font-bold text-white">{formatAMPM(astrologyData?.moon_rise)?.replace(/:\d{2} /, ' ')}</p>
                  </div>
                </div>
                <div className="premium-card !bg-slate-800 rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden group border-slate-600">
                  <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-purple-400/10 rounded-full blur-xl group-hover:bg-purple-400/20 transition-all pointer-events-none"></div>
                  <div className="w-10 h-10 rounded-lg bg-slate-700 flex-shrink-0 flex items-center justify-center border border-slate-500">
                    <Moon className="w-5 h-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white uppercase tracking-widest mb-0.5">Moonset</p>
                    <p className="text-base md:text-lg font-bold text-white">{formatAMPM(astrologyData?.moon_set)?.replace(/:\d{2} /, ' ')}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">

                {/* Panchang Details Table */}
                <div className="premium-card rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  <div className="px-6 py-4 border-b border-[#ebdca8]/50 bg-white/40">
                    <h3 className="text-base font-bold text-[#3a1216] flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-[#b8962e]" /> Daily Panchang
                    </h3>
                  </div>
                  <div className="flex-1 p-1.5">
                    <div className="floating-row flex justify-between items-center px-5 py-3.5 rounded-xl">
                      <div className="text-[15px] font-semibold text-[#6b4c3a]">Tithi</div>
                      <div className="text-[15px] font-bold text-[#3a1216]">{astrologyData?.tithi}</div>
                    </div>
                    <div className="floating-row flex justify-between items-center px-5 py-3.5 rounded-xl">
                      <div className="text-[15px] font-semibold text-[#6b4c3a]">Nakshatra</div>
                      <div className="text-[15px] font-bold text-[#3a1216] text-right">{astrologyData?.nakshatra} <span className="text-[13px] font-medium opacity-70 block sm:inline">{astrologyData?.nakshatra_end ? `upto ${formatAMPM(astrologyData.nakshatra_end)?.replace(/:\d{2} /, ' ')}` : ''}</span></div>
                    </div>
                    <div className="floating-row flex justify-between items-center px-5 py-3.5 rounded-xl">
                      <div className="text-[15px] font-semibold text-[#6b4c3a]">Yoga</div>
                      <div className="text-[15px] font-bold text-[#3a1216]">{astrologyData?.yoga}</div>
                    </div>
                    <div className="floating-row flex justify-between items-center px-5 py-3.5 rounded-xl">
                      <div className="text-[15px] font-semibold text-[#6b4c3a]">Karana</div>
                      <div className="text-[15px] font-bold text-[#3a1216]">{astrologyData?.karana}</div>
                    </div>
                    <div className="floating-row flex justify-between items-center px-5 py-3.5 rounded-xl">
                      <div className="text-[15px] font-semibold text-[#6b4c3a]">Paksha</div>
                      <div className="text-[15px] font-bold text-[#3a1216]">{astrologyData?.paksha}</div>
                    </div>
                    <div className="floating-row flex justify-between items-center px-5 py-3.5 rounded-xl">
                      <div className="text-[15px] font-semibold text-[#6b4c3a]">Weekday</div>
                      <div className="text-[15px] font-bold text-[#3a1216]">{astrologyData?.vara}</div>
                    </div>
                  </div>
                </div>

                {/* Inauspicious Timings Table */}
                <div className="bg-[#fdf9f1] border border-[#ebdca8]/50 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  <div className="px-6 py-4 border-b border-[#ebdca8]/50">
                    <h3 className="text-[15px] font-bold text-[#8c2121] flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 opacity-90"></div>
                      Ashubha Muhurat <span className="text-red-400/80 font-normal text-[13px] ml-1">(Inauspicious)</span>
                    </h3>
                  </div>
                  <div className="flex-1 p-2">
                    {inauspiciousTimings.map((timing, idx) => (
                      <div key={idx} className="flex justify-between items-center px-5 py-4 rounded-xl hover:bg-[#fffcf7] transition-colors">
                        <div className="text-[15px] font-semibold text-[#6b4c3a] flex items-center gap-3">
                          {timing.icon}
                          {timing.name}
                        </div>
                        <div className="text-[15px] font-bold text-[#3a1216] tracking-tight">{timing.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Abhijeet Muhurat Card - Premium Emerald */}
              <div className="relative overflow-hidden rounded-2xl p-5 md:p-6 shadow-lg w-full border border-teal-700/20"
                style={{ background: 'linear-gradient(135deg, #064e3b 0%, #0f766e 100%)' }}>
                <div className="absolute top-[-40px] right-[-40px] w-32 h-32 bg-teal-400/20 rounded-full blur-[30px] pointer-events-none"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] border border-teal-200/40 transform rotate-3">
                      <Sparkles className="w-6 h-6 text-white" fill="currentColor" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 mb-0.5">
                        <h3 className="text-lg font-bold text-teal-50">Abhijeet Muhurat</h3>
                        <span className="px-2 py-0.5 rounded-md bg-teal-800/60 border border-teal-400/30 text-teal-200 text-[9px] font-bold uppercase tracking-widest">Auspicious</span>
                      </div>
                      <p className="text-xs text-teal-200/80 font-medium">The most powerful time for new beginnings.</p>
                    </div>
                  </div>
                  <div className="bg-black/20 backdrop-blur-md px-6 py-3 rounded-lg border border-white/10 shadow-inner min-w-[220px] text-center">
                    <p className="text-xl md:text-2xl font-bold font-mono tracking-tight text-white">
                      {abhijitMuhurat}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* SEO Content Section */}
          <div className="mt-16 w-full bg-white/50 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-[#ebdca8]/50 shadow-[0_8px_30px_rgba(184,150,46,0.06)]">
            <div className="space-y-12 text-[#5a3a29] leading-relaxed text-[16px] md:text-[17px]">

              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3a1216] mb-5 serif tracking-tight">What is Rahu Kaal Today?</h2>
                <p className="mb-4">Rahu Kaal, also known as Rahu Kalam, is a specific period of time that occurs every day and is considered inauspicious according to Vedic astrology. This period is associated with Rahu, one of the shadow planets in Hindu astrology.</p>
                <p>As per traditional beliefs, starting an important or auspicious activity during Rahu Kaal may lead to delays, obstacles, or unfavorable outcomes. However, activities that were already started before Rahu Kaal can continue as usual and are not considered affected by this period.</p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3a1216] mb-5 serif tracking-tight">How to Calculate Rahu Kaal?</h2>
                <p className="mb-4">Rahu Kaal changes every day depending on the local sunrise and sunset time. You can calculate it easily by following these steps:</p>
                <ul className="list-disc pl-5 mb-6 space-y-3">
                  <li>Check the exact sunrise and sunset time for your city.</li>
                  <li>Calculate the total duration between sunrise and sunset.</li>
                  <li>Divide this daytime duration into 8 equal parts.</li>
                  <li>Select the specific part assigned to that particular weekday.</li>
                </ul>
                <p className="font-bold text-[#3a1216] mb-4 text-[17px] md:text-[18px]">The Rahu Kaal portion for each day is:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-5">
                  {['Monday: 2nd part', 'Tuesday: 7th part', 'Wednesday: 5th part', 'Thursday: 6th part', 'Friday: 4th part', 'Saturday: 3rd part', 'Sunday: 8th part'].map(day => (
                    <div key={day} className="bg-white/60 px-4 py-3 rounded-xl border border-[#ebdca8]/80 text-[15px] font-semibold text-center text-[#73503c] shadow-sm">
                      {day}
                    </div>
                  ))}
                </div>
                <p className="mt-4">Since sunrise and sunset timings vary from one location to another, Rahu Kaal will also differ depending on your city and the date.</p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3a1216] mb-5 serif tracking-tight">What Should You Avoid During Rahu Kaal?</h2>
                <p className="mb-6">According to traditional Hindu beliefs, Rahu Kaal is generally avoided for beginning important, auspicious, or completely new activities. Some commonly avoided activities include:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {[
                    'Starting a new business, project, or major work',
                    'Beginning a marriage or other auspicious ceremony',
                    'Starting a long-distance journey',
                    'Signing an important agreement or contract',
                    'Buying property, vehicles, jewellery, or other expensive items',
                    'Making major investments or lending money',
                    'Attending an important interview or initiating a major meeting',
                    'Starting certain medical or surgical procedures'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#b8962e] mt-2.5 flex-shrink-0"></div>
                      <span className="font-medium text-[#4a3224]">{item}</span>
                    </li>
                  ))}
                </ul>
                <p>Rahu Kaal is generally considered a time for caution rather than a period during which normal activities must completely stop. Work or activities that began before Rahu Kaal can generally be continued.</p>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#3a1216] mb-4 serif tracking-tight">Is Rahu Kaal a 90-Minute Period?</h2>
                  <p className="mb-4">Rahu Kaal is commonly described as approximately 90 minutes long. However, its exact duration is not fixed because it depends on the length of daylight between sunrise and sunset.</p>
                  <p>For this reason, Rahu Kaal may be slightly shorter or longer than 90 minutes depending on the location and season.</p>
                </section>

                <section>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#3a1216] mb-4 serif tracking-tight">Is Pooja Allowed During Rahu Kaal?</h2>
                  <p className="mb-4">Although Rahu Kaal is traditionally considered unfavorable for starting worldly or auspicious activities, prayer, meditation, and spiritual practices are generally considered suitable during this period.</p>
                  <p>Many people believe that performing pooja or chanting during Rahu Kaal can be beneficial and therefore do not avoid spiritual activities at this time.</p>
                </section>
              </div>

              <section>
                <h2 className="text-3xl md:text-4xl font-bold text-[#3a1216] mb-8 serif tracking-tight border-b border-[#ebdca8]/50 pb-5">Frequently Asked Questions</h2>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#3a1216] mb-2.5">1. What is Rahu Kaal Today?</h3>
                    <p>Rahu Kaal Today refers to the period of the current day that is traditionally considered unfavorable for starting new or important activities. It occurs once every day and is calculated using the local sunrise and sunset timings.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3a1216] mb-2.5">2. What should be avoided during Rahu Kaal?</h3>
                    <p>People who follow Vedic astrology generally avoid beginning a new journey, business activity, important financial transaction, marriage-related ceremony, major purchase, or other significant event during Rahu Kaal.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3a1216] mb-2.5">3. What happens if you start something during Rahu Kaal?</h3>
                    <p>According to traditional beliefs, beginning a new activity during Rahu Kaal may bring delays, difficulties, or unexpected obstacles. This belief is based on Vedic astrology and is followed as a matter of tradition rather than scientific fact.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3a1216] mb-2.5">4. Can I continue work during Rahu Kaal?</h3>
                    <p>Yes. Activities that were already started before Rahu Kaal do not generally need to be stopped. The traditional caution mainly applies to starting something new during this period.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3a1216] mb-2.5">5. Is it good to perform pooja during Rahu Kaal?</h3>
                    <p>Yes. Rahu Kaal is not generally considered a restriction on prayer or spiritual activities. Pooja, meditation, chanting, and other devotional practices can be performed during this time.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3a1216] mb-2.5">6. How can I check Rahu Kaal?</h3>
                    <p>To calculate Rahu Kaal, first find your city's sunrise and sunset times. Divide the total daylight period into eight equal sections and identify the section assigned to the particular weekday. Because the timings of sunrise and sunset vary by location and date, it is important to use the correct timings for your city.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#3a1216] mb-2.5">7. How long does Rahu Kaal last?</h3>
                    <p>Rahu Kaal usually lasts around 90 minutes, but its actual duration can vary depending on the difference between sunrise and sunset. Therefore, it should not be assumed to have exactly the same start and end time every day.</p>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-[#fcf8f0] to-[#f5ead5] p-8 md:p-10 rounded-3xl border border-[#ebdca8]/80 shadow-sm relative overflow-hidden mt-6">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#ebdca8]/30 rounded-full blur-[40px] pointer-events-none"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#3a1216] mb-5 serif tracking-tight relative z-10">Rahu Kaal – In Short</h2>
                <div className="relative z-10 space-y-5">
                  <p>Rahu Kaal is a daily time period that is considered unfavorable for beginning new and important activities in Vedic astrology. It is associated with Rahu and is traditionally believed to cause delays or obstacles when a new activity is initiated during this period.</p>
                  <p>However, Rahu Kaal is not considered a danger period where everyday activities must stop. Existing work can continue, while activities such as starting a new venture, signing an important contract, beginning a journey, making a major purchase, or organizing an auspicious ceremony are traditionally scheduled outside Rahu Kaal whenever possible.</p>
                  <p>The exact Rahu Kaal timing depends on the date, sunrise, sunset, and location, so the timing can be different for different cities.</p>
                </div>
              </section>

            </div>
          </div>

        </div>
      </GeoapifyContext>
    </div>
  );
}