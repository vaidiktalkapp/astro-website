import re

with open(r"d:\server-vaidik\web-vaidik-main\src\app\(main)\page.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

def find_line(pattern, start=0):
    for i in range(start, len(lines)):
        if pattern in lines[i]:
            return i
    return -1

hero_start = find_line("{/* Hero Section */}")
hero_end = find_line("What <span className=\"text-[#d97706]\">brings you here</span> today?")

horoscope_start = find_line("{/* Today's Horoscope Section */}")
founder_start = find_line("{/* Founder Section */}")

print(f"Hero: {hero_start} to {hero_end}")
print(f"Horoscope: {horoscope_start} to {founder_start}")
