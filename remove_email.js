const fs = require('fs');
const files = [
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/name-mobile-number-numerology/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/numerology/fortune-numerology/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/personalized-lal-kitab/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/kundali-matching/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/detailed/gemstone/checkout/page.tsx',
  'd:/server-vaidik/web-vaidik-main/src/app/(main)/report/kundali/hastlikhit-kundali/checkout/page.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const emailBlock1 = `              {/* Email */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Email ID</label>
                <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" placeholder="Enter email id" />
              </div>`;
              
  const emailBlock2 = `              {/* Email */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Email ID</label>
                <input type="email" value={boyData.email} onChange={(e) => setBoyData({ ...boyData, email: e.target.value })} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" placeholder="Enter email id" />
              </div>`;

  const emailBlock3 = `              {/* Email */}
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-[14px] font-bold text-[#5c1a1f] mb-1">Email ID</label>
                <input type="email" value={girlData.email} onChange={(e) => setGirlData({ ...girlData, email: e.target.value })} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" placeholder="Enter email id" />
              </div>`;

  let changed = false;
  if (content.includes(emailBlock1)) {
    content = content.replace(emailBlock1, '');
    changed = true;
  }
  if (content.includes(emailBlock2)) {
    content = content.replace(emailBlock2, '');
    changed = true;
  }
  if (content.includes(emailBlock3)) {
    content = content.replace(emailBlock3, '');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log("Removed Email from:", file);
  }
});
