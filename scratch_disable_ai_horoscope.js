const fs = require('fs');
const path = 'd:/server-vaidik/vaidik-server-main/src/ai-astrologers/services/ai-astrology-engine.service.ts';
let content = fs.readFileSync(path, 'utf8');

// Disable Cron Job
content = content.replace(
  /async handleHoroscopeWarmup\(\) \{[\s\S]*?this\.logger\.log\('✅ Daily horoscope cache warmup completed successfully\.'\);[\s\S]*?\} catch \(error: any\) \{[\s\S]*?\}[\s\S]*?\}/,
  `async handleHoroscopeWarmup() {\n        this.logger.log('🌅 Horoscope AI Warmup is disabled as per user request. Only manual horoscopes will be used.');\n    }`
);

// Replace getDailyHoroscopeAllSigns
const startFn = content.indexOf('public async getDailyHoroscopeAllSigns');
// Find the end of getDailyHoroscopeAllSigns, which is right before `private cleanupPersonalChineseCache()`
const endFn = content.indexOf('private cleanupPersonalChineseCache()');

if (startFn !== -1 && endFn !== -1) {
  const newFn = `public async getDailyHoroscopeAllSigns(period: string = 'today', language: string = 'English'): Promise<any> {
        const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
        const todayDate = now.toLocaleDateString('en-CA');
        
        let cacheKeyDate = todayDate;
        
        if (period.toLowerCase() === 'tomorrow') {
            const tmrw = new Date(now);
            tmrw.setDate(tmrw.getDate() + 1);
            cacheKeyDate = tmrw.toLocaleDateString('en-CA');
        } else if (period.toLowerCase() === 'week' || period.toLowerCase() === 'weekly') {
            const currentDay = new Date(now);
            const day = currentDay.getDay();
            const diff = currentDay.getDate() - day + (day === 0 ? -6 : 1);
            const startOfWeek = new Date(currentDay.setDate(diff));
            const firstDayOfYear = new Date(startOfWeek.getFullYear(), 0, 1);
            const pastDaysOfYear = (startOfWeek.getTime() - firstDayOfYear.getTime()) / 86400000;
            const weekNumber = Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
            cacheKeyDate = \`\${startOfWeek.getFullYear()}-W\${weekNumber}\`;
        } else if (period.toLowerCase() === 'month' || period.toLowerCase() === 'monthly') {
            cacheKeyDate = \`\${now.getFullYear()}-\${(now.getMonth() + 1).toString().padStart(2, '0')}\`;
        } else if (period.toLowerCase() === 'year' || period.toLowerCase() === 'yearly') {
            cacheKeyDate = \`\${now.getFullYear()}\`;
        }

        const defaultData = [
            'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
            'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
        ].map(sign => ({
            id: sign,
            reading: "Astrological reading is currently being updated. Please check back later.",
            mood: "🔮 Neutral",
            luckyNumber: 7,
            color: "bg-slate-400",
            stats: {
                love: { label: "Average", value: 50 },
                career: { label: "Average", value: 50 },
                health: { label: "Average", value: 50 },
                money: { label: "Average", value: 50 }
            }
        }));

        return this.mergeManualOverrides(defaultData, period, language, cacheKeyDate);
    }

    `;

  content = content.substring(0, startFn) + newFn + content.substring(endFn);
  fs.writeFileSync(path, content);
  console.log('Successfully disabled AI generation and kept manual overrides only!');
} else {
  console.log('Failed to find function boundaries.');
}
