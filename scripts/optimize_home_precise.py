import os

file_path = r'd:\server-vaidik\web-vaidik-main\src\app\(main)\page.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Ensure we have the right file by checking length
if len(lines) < 1500:
    print("File too short! Expected ~1600 lines.")
    exit(1)

def extract_lines(start, end):
    # start and end are 1-indexed line numbers, inclusive
    return "".join(lines[start-1:end])

# Extract Hero JSX
hero_jsx = extract_lines(296, 406)
# Extract Horoscope JSX
horoscope_jsx = extract_lines(998, 1197)

# Build HeroSection Component
hero_component = """
const HeroSection = () => {
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
""" + hero_jsx + """
  );
};
"""

# Build HoroscopeSection Component
horoscope_component = """
const HoroscopeSection = () => {
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
""" + horoscope_jsx + """
  );
};
"""

# Now build the new file content by filtering out the removed lines
new_lines = []

lines_to_remove = set()
# State lines
lines_to_remove.update(range(93, 97))
lines_to_remove.update(range(104, 106))
# Effects
lines_to_remove.update(range(119, 150))
lines_to_remove.update(range(184, 194))
lines_to_remove.update(range(249, 262))
lines_to_remove.update([266, 270])
lines_to_remove.update(range(273, 281))
lines_to_remove.update([286])

# The JSX blocks
lines_to_remove.update(range(296, 407))
lines_to_remove.update(range(998, 1198))

for i, line in enumerate(lines):
    line_num = i + 1
    
    if line_num in lines_to_remove:
        continue
        
    # Replace dependency array
    if line_num == 271 and "}, [timeframe]);" in line:
        new_lines.append("  }, []);\n")
        continue
        
    # Insert HeroSection JSX replacement
    if line_num == 407:
        new_lines.append("      <HeroSection />\n")
        
    # Insert HoroscopeSection JSX replacement
    if line_num == 1198:
        new_lines.append("      <HoroscopeSection />\n")
        
    # Insert the new components right before HomePage
    if line_num == 86 and "export default function HomePage() {" in line:
        new_lines.append(hero_component + "\n" + horoscope_component + "\n")
        
    new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Refactoring complete using precise line numbers.")
