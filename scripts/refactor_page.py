import os

file_path = r'd:\server-vaidik\web-vaidik-main\src\app\(main)\page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

def get_lines(start, end):
    return "".join(lines[start-1:end])

# Extracted blocks
zodiacs_block = get_lines(10, 84)
hero_jsx = get_lines(297, 405) # Exclude the {/* Hero Section */} comment at 296
horoscope_jsx = get_lines(999, 1197) # Exclude the {/* Today's Horoscope Section */} comment at 998

# Generate HeroBanner.tsx
hero_component = """'use client';

import React, { useState, useEffect } from 'react';

const HeroBanner = () => {
  const [heroBanners, setHeroBanners] = useState<any[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const fetchHeroBanner = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await fetch(`${apiUrl}/banners/active`);
        if (response.ok) {
          const banners = await response.json();
          const heroes = banners.filter((b: any) => b.position === 'hero').sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
          if (heroes.length > 0) setHeroBanners(heroes);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };
    fetchHeroBanner();
  }, []);

  useEffect(() => {
    if (heroBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [heroBanners]);

  return (
""" + hero_jsx + """  );
};

export default HeroBanner;
"""

# Generate DailyHoroscope.tsx
horoscope_component = """'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import astrologyService from '@/lib/astrologyService';

""" + zodiacs_block + """

const DailyHoroscope = () => {
  const [timeframe, setTimeframe] = useState('Today');
  const [activeZodiac, setActiveZodiac] = useState('aries');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dailyHoroscopes, setDailyHoroscopes] = useState<any[]>([]);

  useEffect(() => {
    const fetchDailyHoroscopes = async () => {
      try {
        const response = await astrologyService.getDailyHoroscopeAllSigns(timeframe, 'English');
        if (response?.success && Array.isArray(response.data)) {
          setDailyHoroscopes(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch daily horoscopes:', error);
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
""" + horoscope_jsx + """  );
};

export default DailyHoroscope;
"""

os.makedirs(r'd:\server-vaidik\web-vaidik-main\src\components\home', exist_ok=True)
with open(r'd:\server-vaidik\web-vaidik-main\src\components\home\HeroBanner.tsx', 'w', encoding='utf-8') as f:
    f.write(hero_component)
with open(r'd:\server-vaidik\web-vaidik-main\src\components\home\DailyHoroscope.tsx', 'w', encoding='utf-8') as f:
    f.write(horoscope_component)

# Modify page.tsx
lines_to_remove = set()
lines_to_remove.update(range(10, 85)) # ZODIACS
lines_to_remove.update(range(93, 97)) # states
lines_to_remove.update(range(104, 106)) # states
lines_to_remove.update(range(119, 150)) # autoplay effect
lines_to_remove.update(range(184, 194)) # fetchDailyHoroscopes
lines_to_remove.update(range(249, 262)) # fetchHeroBanner
lines_to_remove.update([266, 270]) # function calls
lines_to_remove.update(range(273, 281)) # banner effect
lines_to_remove.update([286]) # activeBanner var
lines_to_remove.update(range(296, 406)) # Hero JSX
lines_to_remove.update(range(998, 1198)) # Horoscope JSX

new_lines = []
for i, line in enumerate(lines):
    line_num = i + 1
    
    # Add imports at line 9
    if line_num == 10:
        new_lines.append("import HeroBanner from '@/components/home/HeroBanner';\n")
        new_lines.append("import DailyHoroscope from '@/components/home/DailyHoroscope';\n")
    
    if line_num in lines_to_remove:
        continue
        
    if line_num == 271 and "}, [timeframe]);" in line:
        new_lines.append("  }, []);\n")
        continue
        
    if line_num == 406:
        new_lines.append("      <HeroBanner />\n")
        
    if line_num == 1198:
        new_lines.append("      <DailyHoroscope />\n")
        
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Refactoring completed successfully. Created src/components/home/HeroBanner.tsx and src/components/home/DailyHoroscope.tsx")
