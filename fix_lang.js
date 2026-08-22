const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/app/(main)/report/**/checkout/page.tsx', { cwd: 'd:/server-vaidik/web-vaidik-main', absolute: true });

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const target = `<input required type="text" value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]" placeholder="Enter language (e.g., English, Hindi)" />`;
  const replacement = `<select required value={language} onChange={(e) => setLanguage(e.target.value)} className="w-full border border-[#ebdcc7] rounded-md py-2.5 px-3 bg-[#fdfaf6] outline-none focus:border-[#c57636] text-[14px]">
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

  if (content.includes(target) || content.includes(target2)) {
    content = content.replace(target, replacement);
    content = content.replace(target2, replacement2);
    fs.writeFileSync(file, content);
    console.log("Updated:", file);
  }
});
