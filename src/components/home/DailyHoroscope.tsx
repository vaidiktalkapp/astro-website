'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import astrologyService from '@/lib/astrologyService';


const ZODIACS = [
  {
    id: 'aries', icon: '♈', image: '/zodiacs/aries.webp', name: 'Aries', hindi: 'Mesh', date: 'Mar 21 - Apr 19',
    reading: 'With the Moon activating your 2nd house of wealth, expect sudden financial clarity. However, Mars casting its drishti on your ascendant might make you prone to impulsive reactions. Channel this fiery energy into physical activities and avoid initiating major workplace changes before noon.',
    mood: '🔥 Energetic', luckyNumber: 7, color: 'bg-red-500',
    stats: { love: { label: 'Good', value: 70 }, career: { label: 'Excellent', value: 90 }, health: { label: 'Strong', value: 85 }, money: { label: 'Average', value: 60 } }
  },
  {
    id: 'taurus', icon: '♉', image: '/zodiacs/taurus.webp', name: 'Taurus', hindi: 'Vrishabh', date: 'Apr 20 - May 20',
    reading: 'Venus in a favorable position brings harmony to your domestic sphere today. If you have been dealing with property matters, current alignments suggest a breakthrough. Stay grounded and avoid lending money, as Jupiter\'s retrograde could delay returns.',
    mood: '😌 Calm', luckyNumber: 6, color: 'bg-green-500',
    stats: { love: { label: 'Strong', value: 85 }, career: { label: 'Good', value: 75 }, health: { label: 'Excellent', value: 90 }, money: { label: 'High', value: 95 } }
  },
  {
    id: 'gemini', icon: '♊', image: '/zodiacs/gemini.webp', name: 'Gemini', hindi: 'Mithun', date: 'May 21 - Jun 20',
    reading: 'Your ruling planet Mercury is forming a powerful yoga, heightening your analytical skills. Expect productive discussions in business meetings. While your mind is racing with ideas, Saturn\'s influence urges you to organize your thoughts rather than acting on all of them at once.',
    mood: '🗣️ Chatty', luckyNumber: 5, color: 'bg-yellow-400',
    stats: { love: { label: 'Average', value: 65 }, career: { label: 'Strong', value: 80 }, health: { label: 'Good', value: 70 }, money: { label: 'Good', value: 75 } }
  },
  {
    id: 'cancer', icon: '♋', image: '/zodiacs/cancer.webp', name: 'Cancer', hindi: 'Kark', date: 'Jun 21 - Jul 22',
    reading: 'Emotional fluctuations are likely as the Moon navigates through a sensitive nakshatra. You might feel a strong pull towards spiritual or solitary activities. Focus on nurturing your inner peace—this is an excellent day for meditation or seeking guidance from an elder.',
    mood: '🥺 Sensitive', luckyNumber: 2, color: 'bg-slate-400',
    stats: { love: { label: 'Excellent', value: 95 }, career: { label: 'Average', value: 60 }, health: { label: 'Good', value: 75 }, money: { label: 'Strong', value: 80 } }
  },
  {
    id: 'leo', icon: '♌', image: '/zodiacs/leo.webp', name: 'Leo', hindi: 'Singh', date: 'Jul 23 - Aug 22',
    reading: 'The Sun\'s radiant energy empowers your 10th house of career, putting you squarely in the spotlight. Superiors are likely to notice your leadership efforts today. Just be mindful of Rahu\'s illusionary effects; verify all documents twice before signing any new agreements.',
    mood: '✨ Radiant', luckyNumber: 1, color: 'bg-orange-500',
    stats: { love: { label: 'Strong', value: 80 }, career: { label: 'Excellent', value: 95 }, health: { label: 'Strong', value: 85 }, money: { label: 'Good', value: 70 } }
  },
  {
    id: 'virgo', icon: '♍', image: '/zodiacs/virgo.webp', name: 'Virgo', hindi: 'Kanya', date: 'Aug 23 - Sep 22',
    reading: 'A meticulous approach will serve you well today as Mercury aligns with your natal placements. Unresolved health issues or diet concerns need your attention. Instead of over-analyzing a partner\'s words, use this analytical energy to clear out pending administrative tasks.',
    mood: '😇 Blessed', luckyNumber: 9, color: 'bg-purple-500',
    stats: { love: { label: 'Strong', value: 85 }, career: { label: 'Average', value: 65 }, health: { label: 'Excellent', value: 90 }, money: { label: 'Strong', value: 80 } }
  },
  {
    id: 'libra', icon: '♎', image: '/zodiacs/libra.webp', name: 'Libra', hindi: 'Tula', date: 'Sep 23 - Oct 22',
    reading: 'Relationships take center stage. With Venus enhancing your 7th house matters, resolving old conflicts with a spouse or business partner becomes much easier. However, an aspect from Mars warns against letting minor ego clashes disrupt the newly established harmony.',
    mood: '⚖️ Balanced', luckyNumber: 6, color: 'bg-pink-400',
    stats: { love: { label: 'Excellent', value: 90 }, career: { label: 'Good', value: 75 }, health: { label: 'Strong', value: 80 }, money: { label: 'Average', value: 65 } }
  },
  {
    id: 'scorpio', icon: '♏', image: '/zodiacs/scorpio.webp', name: 'Scorpio', hindi: 'Vrishchik', date: 'Oct 23 - Nov 21',
    reading: 'Deep, transformative energies are at play. Ketu\'s influence might make you detach from superficial conversations, driving you to seek profound truths. Trust your intuition in financial investments today, but keep your plans closely guarded until they fully materialize.',
    mood: '🦅 Intense', luckyNumber: 8, color: 'bg-red-800',
    stats: { love: { label: 'Good', value: 75 }, career: { label: 'Strong', value: 85 }, health: { label: 'Average', value: 65 }, money: { label: 'Excellent', value: 90 } }
  },
  {
    id: 'sagittarius', icon: '♐', image: '/zodiacs/sagittarius.webp', name: 'Sagittarius', hindi: 'Dhanu', date: 'Nov 22 - Dec 21',
    reading: 'Jupiter\'s expansive gaze blesses your endeavors with optimism and luck. It is a highly favorable day for higher learning, legal matters, or long-distance travel planning. Do not let temporary delays caused by Saturn dampen your naturally enthusiastic spirit.',
    mood: '🏹 Adventurous', luckyNumber: 3, color: 'bg-indigo-600',
    stats: { love: { label: 'Average', value: 65 }, career: { label: 'Good', value: 70 }, health: { label: 'Excellent', value: 90 }, money: { label: 'Average', value: 60 } }
  },
  {
    id: 'capricorn', icon: '♑', image: '/zodiacs/capricorn.webp', name: 'Capricorn', hindi: 'Makar', date: 'Dec 22 - Jan 19',
    reading: 'Professional duties demand your absolute focus. Saturn, your ruling planet, rewards disciplined, methodical work today. Avoid taking shortcuts, as the karmic return is immediate right now. Spending a quiet evening at home will help recharge your serious demeanor.',
    mood: '🏔️ Focused', luckyNumber: 4, color: 'bg-stone-600',
    stats: { love: { label: 'Good', value: 70 }, career: { label: 'Excellent', value: 95 }, health: { label: 'Average', value: 60 }, money: { label: 'Strong', value: 85 } }
  },
  {
    id: 'aquarius', icon: '♒', image: '/zodiacs/aquarius.webp', name: 'Aquarius', hindi: 'Kumbh', date: 'Jan 20 - Feb 18',
    reading: 'Unconventional ideas flow naturally to you today. The planetary transits favor networking, group activities, or launching digital initiatives. While your vision for the future is clear, ensure you do not alienate those who prefer traditional methods.',
    mood: '💡 Innovative', luckyNumber: 11, color: 'bg-cyan-500',
    stats: { love: { label: 'Good', value: 75 }, career: { label: 'Strong', value: 85 }, health: { label: 'Good', value: 70 }, money: { label: 'Strong', value: 80 } }
  },
  {
    id: 'pisces', icon: '♓', image: '/zodiacs/pisces.webp', name: 'Pisces', hindi: 'Meen', date: 'Feb 19 - Mar 20',
    reading: 'Your intuitive and empathetic nature is amplified by the current lunar phase. You may find yourself acting as a counselor to a friend in need. Be cautious of absorbing negative energies—a cleansing ritual or spending time near water will restore your auric balance.',
    mood: '🌊 Dreamy', luckyNumber: 7, color: 'bg-teal-400',
    stats: { love: { label: 'Excellent', value: 90 }, career: { label: 'Average', value: 65 }, health: { label: 'Good', value: 75 }, money: { label: 'Good', value: 70 } }
  }
];


const DailyHoroscope = ({ initialDailyHoroscopes = [] }: { initialDailyHoroscopes?: any[] }) => {
  const [timeframe, setTimeframe] = useState('Today');
  const [activeZodiac, setActiveZodiac] = useState('aries');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dailyHoroscopes, setDailyHoroscopes] = useState<any[]>(initialDailyHoroscopes);
  const [isLoading, setIsLoading] = useState(initialDailyHoroscopes.length === 0);

  useEffect(() => {
    const fetchDailyHoroscopes = async () => {
      if (timeframe === 'Today' && initialDailyHoroscopes.length > 0 && dailyHoroscopes === initialDailyHoroscopes) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        let apiPeriod = timeframe.toLowerCase();
        if (timeframe === 'Week') apiPeriod = 'weekly';
        if (timeframe === 'Month') apiPeriod = 'monthly';
        const response = await astrologyService.getDailyHoroscopeAllSigns(apiPeriod, 'English');
        if (response?.success && Array.isArray(response.data)) {
          setDailyHoroscopes(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch daily horoscopes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDailyHoroscopes();
  }, [timeframe]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveZodiac((prev) => {
        const currentIndex = ZODIACS.findIndex((z) => z.id === prev);
        const nextIndex = (currentIndex + 1) % ZODIACS.length;
        return ZODIACS[nextIndex].id;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  useEffect(() => {
    const container = document.getElementById('zodiac-slider-container');
    const activeEl = document.getElementById(`zodiac-card-${activeZodiac}`);

    if (container && activeEl) {
      const containerWidth = container.clientWidth;
      const elementOffset = activeEl.offsetLeft;
      const elementWidth = activeEl.clientWidth;

      container.scrollTo({
        left: elementOffset - (containerWidth / 2) + (elementWidth / 2),
        behavior: 'smooth'
      });
    }
  }, [activeZodiac]);

  return (
      <div className="mx-6 md:mx-10 mt-16 mb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="text-left">
            <h2 className="font-sans font-bold tracking-tight text-[32px] md:text-[44px] leading-[1.2] text-[#5c1420] mb-2">
              Your daily <span className="text-[#d97706]">horoscope</span> reading
            </h2>
            <p className="text-[#412a1e] text-[17px]">Pick your raashi to see today's pillars at a glance.</p>
          </div>

          <div className="flex bg-[#fdf0e0] rounded-full p-1 border border-[#f0ddc0]">
            {['Today', 'Tomorrow', 'Week', 'Month'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-5 py-2.5 text-[13px] font-semibold rounded-full transition-colors ${timeframe === t ? 'bg-[#ee6c1e] text-white shadow-sm' : 'text-[#412a1e] hover:text-[#5c1420]'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Zodiac Icons Scroll/Grid */}
        <div id="zodiac-slider-container" className="flex overflow-x-auto no-scrollbar justify-start gap-3 mb-8 pb-4 pt-1 px-1 scroll-smooth">
          {ZODIACS.map((zodiac) => (
            <div
              id={`zodiac-card-${zodiac.id}`}
              key={zodiac.id}
              onClick={() => {
                setActiveZodiac(zodiac.id);
                setIsAutoPlaying(false);
              }}
              className={`flex-shrink-0 w-[105px] h-[110px] rounded-[20px] border-[1.5px] flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all duration-300 ${activeZodiac === zodiac.id ? 'border-[#ee6c1e] bg-[#fdf0e0] shadow-[0_4px_16px_rgba(238,108,30,0.2)] -translate-y-1' : 'border-[#f0ddc0] bg-white hover:border-[#ee6c1e]/50 hover:shadow-md'}`}
            >
              <div className="text-[32px] text-[#ee6c1e] leading-none mb-1">
                {zodiac.image ? (
                  <img src={zodiac.image} alt={zodiac.name} className="w-11 h-11 rounded-full object-cover shadow-sm" />
                ) : (
                  zodiac.icon
                )}
              </div>
              <div className="text-[13px] font-bold text-[#3a1216]">{zodiac.name}</div>
              <div className="text-[11px] text-[#412a1e] -mt-1">{zodiac.hindi}</div>
            </div>
          ))}
        </div>

        {/* Selected Zodiac Details */}
        {(() => {
          const baseZodiac = ZODIACS.find(z => z.id === activeZodiac) || ZODIACS[6];
          const dynamicData = dailyHoroscopes.find(d => d.id === activeZodiac);
          const active = dynamicData ? { ...baseZodiac, ...dynamicData } : baseZodiac;

          let detailUrl = `/daily-horoscope/${active.id}`;
          if (timeframe === 'Tomorrow') {
            detailUrl = `/horoscope/tomorrow/${active.id}`;
          } else if (timeframe === 'Week') {
            detailUrl = `/horoscope/weekly/${active.id}`;
          } else if (timeframe === 'Month') {
            detailUrl = `/horoscope/monthly/${active.id}`;
          }

          return (
            <div className="border border-[#f0ddc0] rounded-[24px] p-6 md:p-8 bg-white text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-shadow relative overflow-hidden min-h-[350px]">
              <style>{`
                @keyframes fadeInUp {
                  from { opacity: 0.6; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>

              {/* Loading Overlay */}
              {isLoading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center transition-all duration-300">
                  <div className="w-10 h-10 border-4 border-[#f0ddc0] border-t-[#ee6c1e] rounded-full animate-spin mb-3"></div>
                  <div className="text-[#5c1420] font-bold text-sm tracking-wide animate-pulse">Reading planetary alignments...</div>
                </div>
              )}

              <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 transition-opacity duration-300 ${isLoading ? 'opacity-30' : 'opacity-100'}`}>

                {/* Left Side: Content */}
                <div
                  key={`content-${activeZodiac}`}
                  className="flex-1 flex flex-col justify-between"
                  style={{ animation: 'fadeInUp 0.5s ease-out forwards' }}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-[64px] h-[64px] rounded-full bg-[#fdf0e0] shrink-0 flex items-center justify-center text-[32px] text-[#ee6c1e] border border-[#f0ddc0] overflow-hidden">
                          {active.image ? (
                            <img src={active.image} alt={active.name} loading="lazy" className="w-full h-full object-cover" />
                          ) : (
                            active.icon
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[22px] text-[#3a1216]">{active.name}</h3>
                            <span className="text-[15px] text-[#412a1e] mt-1">{active.hindi}</span>
                          </div>
                          <div className="text-[13px] text-[#412a1e] mt-0.5">{active.date}</div>
                        </div>
                      </div>
                      <div className="hidden md:block bg-[#fdf0e0] text-[#3a1216] text-[12px] font-semibold px-4 py-2 rounded-full border border-[#f0ddc0]">
                        {(() => {
                          const today = new Date();
                          let dateText = '';
                          if (timeframe === 'Today') {
                            dateText = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                          } else if (timeframe === 'Tomorrow') {
                            const tmrw = new Date(today);
                            tmrw.setDate(tmrw.getDate() + 1);
                            dateText = tmrw.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                          } else if (timeframe === 'Week') {
                            const start = new Date(today);
                            const end = new Date(today);
                            end.setDate(end.getDate() + 6);
                            dateText = `${start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`;
                          } else if (timeframe === 'Month') {
                            dateText = today.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
                          }
                          return `${timeframe} - ${dateText}`;
                        })()}
                      </div>
                    </div>

                    <p className="text-[15px] text-[#412a1e] leading-[1.7] mb-6 max-w-2xl min-h-[76px] break-words overflow-hidden">
                      {isLoading && dailyHoroscopes.length === 0 ? (
                        <span className="flex flex-col gap-2">
                          <span className="w-full h-4 bg-[#f0ddc0]/50 rounded animate-pulse"></span>
                          <span className="w-5/6 h-4 bg-[#f0ddc0]/50 rounded animate-pulse"></span>
                          <span className="w-4/6 h-4 bg-[#f0ddc0]/50 rounded animate-pulse"></span>
                        </span>
                      ) : (
                        (() => {
                          if (active.previewText) return active.previewText;
                          
                          if (!active.reading) return '';
                          let preview = active.reading.replace(/<\/(p|div|h[1-6])>/gi, '. ');
                          preview = preview.replace(/<br\s*\/?>/gi, '. ');
                          preview = preview.replace(/<[^>]*>?/gm, '');
                          preview = preview.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
                          preview = preview.replace(/[\*#_]/g, '');
                          preview = preview.replace(/\s+/g, ' ').trim();
                          
                          // Quick cleanup if it starts with short headings
                          if (preview.toLowerCase().includes('horoscope') && preview.indexOf('.') < 30) {
                            preview = preview.substring(preview.indexOf('.') + 1).trim();
                          }
                          
                          if (preview.length > 200) {
                            return preview.substring(0, 197) + '...';
                          }
                          return preview || active.reading.split('\n\n')[0];
                        })()
                      )}
                    </p>

                    <div className="flex flex-row items-center justify-between md:justify-start gap-2 md:gap-6 mb-8 text-[11.5px] sm:text-[12px] md:text-[13px] whitespace-nowrap">
                      <div className="flex items-center gap-1 md:gap-1.5">
                        <span className="text-[#412a1e]">{timeframe === 'Today' || timeframe === 'Tomorrow' ? 'Mood:' : 'Theme:'}</span>
                        <span className="font-semibold text-[#3a1216]">{active.mood}</span>
                      </div>
                      
                      {(timeframe === 'Today' || timeframe === 'Tomorrow') && (
                        <>
                          <div className="flex items-center gap-1 md:gap-1.5">
                            <span className="text-[#412a1e]">Lucky #:</span>
                            <span className="font-semibold text-[#ee6c1e]">{active.luckyNumber}</span>
                          </div>
                          <div className="flex items-center gap-1 md:gap-2">
                            <span className="text-[#412a1e]">Color:</span>
                            {(() => {
                               let c = active.color || '';
                               const isBgClass = c.startsWith('bg-');
                               return (
                                 <div 
                                   className={`w-3.5 h-3.5 md:w-5 md:h-5 rounded-[3px] md:rounded-[4px] border border-gray-200 shadow-sm ${isBgClass ? c : ''}`} 
                                   style={!isBgClass && c ? { backgroundColor: c.toLowerCase() } : {}}
                                 ></div>
                               );
                            })()}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="hidden lg:flex flex-wrap gap-3">
                    <Link href={detailUrl} className="bg-[#ee6c1e] text-white text-[14px] font-bold px-6 py-3.5 rounded-xl hover:bg-[#d95c14] transition-colors flex items-center gap-2">
                      Get my detailed horoscope
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </Link>
                    <Link href="/astrologers-chat" className="border border-[#f0ddc0] text-[#412a1e] text-[14px] font-bold px-6 py-3.5 rounded-xl hover:bg-[#f5e6d3] transition-colors">
                      Talk to a specialist
                    </Link>
                  </div>
                </div>

                {/* Right Side: Progress Bars */}
                <div className="lg:w-[360px] shrink-0 border border-[#f0ddc0] bg-[#fdfaf5] rounded-[20px] p-7 flex flex-col justify-center gap-6">
                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-wider text-[#5c1420]">
                      <span>Love</span>
                      <span>{active.stats.love.label}</span>
                    </div>
                    <div className="w-full bg-[#f0ddc0]/60 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#e33d3d] h-full rounded-full transition-all duration-500" style={{ width: `${active.stats.love.value}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-wider text-[#5c1420]">
                      <span>Career</span>
                      <span>{active.stats.career.label}</span>
                    </div>
                    <div className="w-full bg-[#f0ddc0]/60 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#f59e0b] h-full rounded-full transition-all duration-500" style={{ width: `${active.stats.career.value}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-wider text-[#5c1420]">
                      <span>Health</span>
                      <span>{active.stats.health.label}</span>
                    </div>
                    <div className="w-full bg-[#f0ddc0]/60 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#22c55e] h-full rounded-full transition-all duration-500" style={{ width: `${active.stats.health.value}%` }}></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex justify-between items-center text-[12px] font-bold uppercase tracking-wider text-[#5c1420]">
                      <span>Money</span>
                      <span>{active.stats.money.label}</span>
                    </div>
                    <div className="w-full bg-[#f0ddc0]/60 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#ee6c1e] h-full rounded-full transition-all duration-500" style={{ width: `${active.stats.money.value}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile CTAs (Bottom) */}
              <div className="flex lg:hidden flex-col gap-3 mt-6">
                <Link href={detailUrl} className="bg-[#ee6c1e] text-white text-[14px] font-bold py-4 rounded-full hover:bg-[#d95c14] transition-colors flex items-center justify-center gap-2 w-full shadow-sm">
                  Get my detailed horoscope
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </Link>
                <Link href="/astrologers-chat" className="border border-[#f0ddc0] text-[#412a1e] text-[14px] font-bold py-4 rounded-full hover:bg-[#f5e6d3] transition-colors w-full text-center">
                  Talk to a specialist
                </Link>
              </div>
            </div>
          );
        })()}
      </div>
  );
};

export default DailyHoroscope;
