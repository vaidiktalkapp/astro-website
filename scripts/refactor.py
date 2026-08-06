import re
import sys

file_path = r'd:\server-vaidik\web-vaidik-main\src\app\(main)\page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Extract Hero Section JSX
hero_jsx_match = re.search(r'(<div className="relative w-full min-h-\[550px\].*?</div>\s*</div>)', content, re.DOTALL)
if not hero_jsx_match:
    print("Could not find Hero JSX")
    sys.exit(1)
hero_jsx = hero_jsx_match.group(1)

# 2. Extract Horoscope Section JSX
horoscope_jsx_match = re.search(r'(<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">.*?</div>\s*</div>\s*</div>)', content, re.DOTALL)
if not horoscope_jsx_match:
    print("Could not find Horoscope JSX")
    sys.exit(1)
horoscope_jsx_raw = horoscope_jsx_match.group(1)
horoscope_jsx = f'<div className="mx-6 md:mx-10 mt-16 mb-10">\n        {horoscope_jsx_raw}'

# 3. Create Components
hero_component = f"""
const HeroSection = () => {{
  const [heroBanners, setHeroBanners] = useState<any[]>([]);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {{
    const fetchHeroBanner = async () => {{
      try {{
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
        const response = await fetch(`${{apiUrl}}/banners/active`);
        if (response.ok) {{
          const banners = await response.json();
          const heroes = banners.filter((b: any) => b.position === 'hero').sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
          if (heroes.length > 0) setHeroBanners(heroes);
        }}
      }} catch (error) {{
        console.error('Failed to fetch banners:', error);
      }}
    }};
    fetchHeroBanner();
  }}, []);

  useEffect(() => {{
    if (heroBanners.length <= 1) return;
    const interval = setInterval(() => {{
      setCurrentBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }}, 4000);
    return () => clearInterval(interval);
  }}, [heroBanners]);

  const activeBanner = heroBanners[currentBannerIndex];

  return (
    {hero_jsx}
  );
}};
"""

horoscope_component = f"""
const HoroscopeSection = () => {{
  const [timeframe, setTimeframe] = useState('Today');
  const [activeZodiac, setActiveZodiac] = useState('aries');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [dailyHoroscopes, setDailyHoroscopes] = useState<any[]>([]);

  useEffect(() => {{
    const fetchDailyHoroscopes = async () => {{
      try {{
        const response = await astrologyService.getDailyHoroscopeAllSigns(timeframe, 'English');
        if (response?.success && Array.isArray(response.data)) {{
          setDailyHoroscopes(response.data);
        }}
      }} catch (error) {{
        console.error('Failed to fetch daily horoscopes:', error);
      }}
    }};
    fetchDailyHoroscopes();
  }}, [timeframe]);

  useEffect(() => {{
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {{
      setActiveZodiac((prev) => {{
        const currentIndex = ZODIACS.findIndex((z) => z.id === prev);
        const nextIndex = (currentIndex + 1) % ZODIACS.length;
        return ZODIACS[nextIndex].id;
      }});
    }}, 3000);
    return () => clearInterval(interval);
  }}, [isAutoPlaying]);

  useEffect(() => {{
    const container = document.getElementById('zodiac-slider-container');
    const activeEl = document.getElementById(`zodiac-card-${{activeZodiac}}`);
    if (container && activeEl) {{
      const containerWidth = container.clientWidth;
      const elementOffset = activeEl.offsetLeft;
      const elementWidth = activeEl.clientWidth;
      container.scrollTo({{
        left: elementOffset - (containerWidth / 2) + (elementWidth / 2),
        behavior: 'smooth'
      }});
    }}
  }}, [activeZodiac]);

  return (
    {horoscope_jsx}
  );
}};
"""

# 4. Modify HomePage
# Remove states
content = re.sub(r'  const \[timeframe, setTimeframe\].*?\n', '', content)
content = re.sub(r'  const \[activeZodiac, setActiveZodiac\].*?\n', '', content)
content = re.sub(r'  const \[isAutoPlaying, setIsAutoPlaying\].*?\n', '', content)
content = re.sub(r'  const \[dailyHoroscopes, setDailyHoroscopes\].*?\n', '', content)
content = re.sub(r'  const \[heroBanners, setHeroBanners\].*?\n', '', content)
content = re.sub(r'  const \[currentBannerIndex, setCurrentBannerIndex\].*?\n', '', content)

# Remove useEffects for auto-play and scroll
content = re.sub(r'  // Auto-play zodiac selection\n  useEffect\(\(\) => \{.*?\n  \}, \[activeZodiac\]\);\n', '', content, flags=re.DOTALL)
content = re.sub(r'  // Banner rotation interval\n  useEffect\(\(\) => \{.*?\n  \}, \[heroBanners\]\);\n', '', content, flags=re.DOTALL)

# Remove fetch functions from main useEffect
content = re.sub(r'    const fetchDailyHoroscopes = async \(\) => \{.*?\n    \};\n', '', content, flags=re.DOTALL)
content = re.sub(r'    const fetchHeroBanner = async \(\) => \{.*?\n    \};\n', '', content, flags=re.DOTALL)
content = re.sub(r'    fetchDailyHoroscopes\(\);\n', '', content)
content = re.sub(r'    fetchHeroBanner\(\);\n', '', content)

# Change main useEffect dependency
content = content.replace('  }, [timeframe]);', '  }, []);')

# Remove activeBanner
content = re.sub(r'  const activeBanner = heroBanners\[currentBannerIndex\];\n', '', content)

# Replace JSX
# Replace Hero
content = content.replace(hero_jsx, '<HeroSection />')

# Replace Horoscope
# Note: Horoscope section starts with {/* Today's Horoscope Section */} and ends before {/* Founder Section */}
horoscope_full_section_match = re.search(r'(<div className="mx-6 md:mx-10 mt-16 mb-10">\s*<div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">.*?</div>\s*</div>\s*</div>\s*</div>)', content, re.DOTALL)
if horoscope_full_section_match:
    content = content.replace(horoscope_full_section_match.group(1), '<HoroscopeSection />')
else:
    print("Could not find full Horoscope section to replace")
    
# Insert new components before HomePage
content = content.replace('export default function HomePage() {', hero_component + '\n' + horoscope_component + '\nexport default function HomePage() {')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Refactoring complete.")
