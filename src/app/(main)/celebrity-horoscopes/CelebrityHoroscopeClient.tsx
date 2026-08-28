'use client';
import { useTranslation } from '@/context/LanguageContext';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Search, Star, Loader2, Users, MapPin, Calendar, Clock, ChevronLeft } from 'lucide-react';
import { celebrityService, CelebrityProfile } from '@/lib/celebrityService';

const CATEGORIES = [
  'All', 'Bollywood', 'Hollywood', 'Sports', 'Cricket', 'Football', 'Hockey',
  'Businessman', 'Politician', 'Musician', 'Singer', 'Literature',
  'Criminal', 'Astrologer', 'Scientist', 'Others'];


export default function CelebrityListPage() {
  const { t } = useTranslation();

  const [celebrities, setCelebrities] = useState<CelebrityProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCelebrities();
  }, []);

  const fetchCelebrities = async () => {
    try {
      setLoading(true);
      const data = await celebrityService.getCelebrities();
      setCelebrities(data);
    } catch (err) {
      console.error('Error fetching celebrities:', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = celebrities.filter((c) => {
    const isCategoryMatch = () => {
      if (activeCategory === 'All') return true;
      if (!c.category) return false;
      if (Array.isArray(c.category)) {
        return c.category.some(cat => String(cat).toLowerCase() === activeCategory.toLowerCase());
      }
      return String(c.category).toLowerCase() === activeCategory.toLowerCase();
    };

    const matchesCategory = isCategoryMatch();
    const matchesSearch = c.name?.toLowerCase().includes(search.toLowerCase()) || false;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#fdf6e3] w-full overflow-x-hidden flex flex-col">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Source+Sans+3:wght@300;400;500;600&display=swap');
        .celeb-list-wrap { font-family: 'Source Sans 3', sans-serif; }
        .celeb-list-wrap .serif { font-family: 'Playfair Display', Georgia, serif; }
      `}</style>

      <div className="relative overflow-hidden bg-gradient-to-r from-[#5c1420] to-[#8a1c2a] pt-4 pb-8 md:pt-5 md:pb-10 px-4 mb-6 shadow-lg border-b-2 border-[#d97706]">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#ffffff_0%,_transparent_60%)]" />

        <div className="max-w-7xl mx-auto relative z-20 mb-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="group flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-all duration-300">
              <div className="flex items-center justify-center p-1.5 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 transform group-hover:-translate-x-1">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span className="tracking-wide capitalize">Home</span>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-[10px] font-black uppercase tracking-widest shadow-sm">
            <Star size={12} className="text-[#d97706]" fill="currentColor" />{t("celebrity_horoscopes.divine_alignments")}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white serif tracking-tight drop-shadow-md">
            {t("celebrity_horoscopes.celebrity")} <span className="text-[#d97706] drop-shadow-sm">{t("celebrity_horoscopes.horoscopes")}</span>
          </h1>
          <p className="text-white/95 max-w-2xl mx-auto text-sm md:text-base font-medium drop-shadow-md">
            {t("celebrity_horoscopes.explore_the_cosmic_blueprints")}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mb-20 relative z-20 celeb-list-wrap">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl shadow-[#d97706]/10 border-2 border-[#f0ddc0] p-3 md:p-4 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5c1420]" size={18} />
              <input
                type="text"
                suppressHydrationWarning
                placeholder="Search celebrity..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#fdf8f0] border-2 border-[#f0ddc0] rounded-xl outline-none focus:border-[#d97706] focus:ring-4 focus:ring-[#d97706]/10 transition-all text-sm font-medium text-[#412a1e] placeholder-[#412a1e]/50"
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
            </div>

            {/* Categories - Wrapped nicely instead of scrolling */}
            <div className="flex flex-wrap gap-1.5 md:gap-2" suppressHydrationWarning>
              {CATEGORIES.map((cat) =>
                <button
                  key={cat}
                  suppressHydrationWarning
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 ${activeCategory === cat ?
                      'bg-gradient-to-r from-[#5c1420] to-[#8a1c2a] text-white border-transparent shadow-sm' :
                      'bg-white text-[#412a1e] border-[#f0ddc0] hover:border-[#d97706] hover:bg-[#faf6ed]'}`
                  }>
                  {cat}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading ?
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-amber-500" size={40} />
            <p className="text-gray-850 font-medium">{t("celebrity_horoscopes.deciphering_star_charts")}</p>
          </div> :
          filtered.length === 0 ?
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#3a1216]">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 serif">{t("celebrity_horoscopes.no_profiles_found")}</h3>
              <p className="text-gray-850">{t("celebrity_horoscopes.try_adjusting_your_filters_or")}</p>
            </div> :

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((celebrity) =>
                <Link
                  key={celebrity._id}
                  href={`/celebrity-horoscopes/${celebrity.slug}`}
                  className="group flex flex-col overflow-hidden bg-white rounded-3xl border-2 border-[#f0ddc0] shadow-sm hover:shadow-xl hover:border-[#d97706] transition-all duration-300 transform hover:-translate-y-1">

                  {/* Image Header */}
                  <div className="w-full h-48 md:h-56 bg-[#faf6ed] relative overflow-hidden border-b-2 border-[#f0ddc0]">
                    {celebrity.image ?
                      <img
                        src={celebrity.image}
                        alt={celebrity.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" /> :
                      <div className="w-full h-full flex items-center justify-center text-[#5c1420]/20 group-hover:text-[#5c1420]/40 transition-colors">
                        <Users size={64} />
                      </div>
                    }
                    {/* Category Pill Over Image */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full border border-white/50 text-[10px] font-black text-[#8a1c2a] uppercase tracking-widest shadow-sm">
                      {celebrity.category}
                    </div>
                  </div>

                  {/* Content Details */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-[#412a1e] group-hover:text-[#d97706] transition-colors mb-2 line-clamp-1">
                      {celebrity.name}
                    </h3>
                    {celebrity.summary &&
                      <p className="text-sm text-[#412a1e]/70 line-clamp-2 mb-4 flex-1">
                        {celebrity.summary}
                      </p>
                    }

                    <div className="pt-4 border-t border-[#f0ddc0]/60 space-y-2 mt-auto">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#412a1e]/80">
                        <Calendar size={14} className="text-[#d97706]" />
                        <span className="truncate">
                          {celebrity.birthDate ? new Date(celebrity.birthDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Unknown Date'}
                          {celebrity.birthTime ? ` • ${celebrity.birthTime}` : ''}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-[#412a1e]/80">
                        <MapPin size={14} className="text-[#d97706]" />
                        <span className="truncate">{celebrity.birthPlace || 'Unknown Location'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
        }
      </div>

      {/* Why Listen Section */}
      <div className="bg-gradient-to-r from-[#5c1420] to-[#8a1c2a] py-16 relative overflow-hidden shadow-inner border-t-2 border-[#d97706]">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_#ffffff_0%,_transparent_70%)]" />

        <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white serif drop-shadow-md">{t("celebrity_horoscopes.the_stars_of_the_famous")}</h2>
          <p className="text-white font-medium leading-relaxed text-base md:text-lg drop-shadow-md">
            {t("celebrity_horoscopes.astrology_isn_t_just_for_predi")}
          </p>
        </div>
      </div>
    </div>);

}