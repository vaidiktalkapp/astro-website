
const fs = require("fs");
const path = require("path");

const files = [
  "rudrabhishek/page.tsx",
  "dhan-laxmi-puja/page.tsx",
  "job-attract-confirm-puja/page.tsx",
  "ganesh-ji-ko-laddoo-arpan/page.tsx",
  "love-marriage-healing/page.tsx",
  "commitment-spell/page.tsx"
];

const basePath = "d:/server-vaidik/web-vaidik-main/src/app/(main)/book-a-puja/";

const newDesign = (title, arrayStr) => `        {/* -- BENEFITS -- */}
        <section className="py-12 border-t border-[#e5e0d8] mt-6">
          <h2 className="text-[28px] font-bold text-center text-[#222] mb-8">${title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {${arrayStr}.map((b, i) => (
              <div key={i} className="bg-[#f4f7fc] rounded-[12px] py-4 px-5 flex items-center gap-3">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#ea580c" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                  <path d="M12 2.5C12.5 4.5 14.5 6 16.5 6C16.5 6 16.5 6.5 19 6C18.5 8 18 9.5 20 11C20 11 20 11 21.5 12C20 13 18 14.5 19 16.5C16.5 16 16.5 16 16.5 16C14.5 16.5 12.5 18 12 20C11.5 18 9.5 16.5 7.5 16.5C7.5 16.5 7.5 16 5 16.5C5.5 14.5 6 13 4 11.5C4 11.5 4 11.5 2.5 10.5C4 9.5 6 8 5 6C7.5 6.5 7.5 6.5 7.5 6.5C9.5 6 11.5 4.5 12 2.5Z" />
                  <circle cx="12" cy="11.5" r="3" fill="#fff" />
                </svg>
                <span className="text-[#333] text-[14px] font-medium">{b}</span>
              </div>
            ))}
          </div>
        </section>`;

files.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, "utf-8");
    
    // Simplest approach: Find the index of "{/* -- BENEFITS -- */}" and "{/* -- ABOUT THIS PUJA -- */}"
    const startIdx = content.indexOf("{/* -- BENEFITS -- */}");
    const endIdx = content.indexOf("{/* -- ABOUT THIS PUJA -- */}");
    
    if (startIdx !== -1 && endIdx !== -1) {
      const sectionContent = content.substring(startIdx, endIdx);
      
      // Extract title
      const titleMatch = sectionContent.match(/<h2[^>]*>([^<]+)<\/h2>/);
      const title = titleMatch ? titleMatch[1] : "Benefits of Puja";
      
      // Extract array
      const arrayMatch = sectionContent.match(/(\[.*?\])\.map/s);
      const arrayStr = arrayMatch ? arrayMatch[1] : "[]";
      
      const replacement = newDesign(title, arrayStr) + "\n\n        ";
      content = content.substring(0, startIdx) + replacement + content.substring(endIdx);
      
      fs.writeFileSync(fullPath, content, "utf-8");
      console.log(`Updated ${file}`);
    } else {
      console.log(`Benefits section not found in ${file}`);
    }
  }
});

