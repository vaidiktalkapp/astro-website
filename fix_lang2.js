const fs = require('fs');
const files = [
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/vaidik-smart-kundali-10-years/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/kundali-matching/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/detailed/gemstone/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/checkout/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const target1 = `<input required type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" placeholder="Enter language (e.g., English, Hindi)" />`;
  const replacement1 = `<select required value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]">
                  <option value="" disabled hidden>Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>`;
                
  const target2 = `<input required type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#d68636] text-[14px]" placeholder="Enter language (e.g., English, Hindi)" />`;
  const replacement2 = `<select required value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#d68636] text-[14px]">
                  <option value="" disabled hidden>Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                </select>`;

  let changed = false;
  if (content.includes(target1)) {
    content = content.replace(target1, replacement1);
    changed = true;
  }
  if (content.includes(target2)) {
    content = content.replace(target2, replacement2);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log("Updated:", file);
  }
});
