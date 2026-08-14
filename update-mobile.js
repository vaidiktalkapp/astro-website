const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

const startIndex = c.indexOf('<div className="flex-1 overflow-y-auto p-4 space-y-1">');
const endIndex = c.indexOf('</a>\n        </div>', startIndex) + 19;

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find start or end index.", startIndex, endIndex);
  process.exit(1);
}

const oldNav = c.substring(startIndex, endIndex);

const newNav = `<div className="flex-1 overflow-y-auto p-4 space-y-1">
          {topLevelMenus.map(topMenu => {
            const mySubMenus = subMenus.filter(m => m.category === topMenu.category);

            // Direct Links
            if (mySubMenus.length === 0 && topMenu.category !== 'pujas' && topMenu.category !== 'shop') {
              return (
                <div key={topMenu._id}>
                  <Link href={topMenu.url || '/'} onClick={() => setIsMobileMenuOpen(false)} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
                    {topMenu.title}
                  </Link>
                </div>
              );
            }

            // Shop Link
            if (topMenu.category === 'shop') {
              return (
                <a key={topMenu._id} href={topMenu.url || 'https://vaidiktalk.store/'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 mx-3 mt-4 mb-4 p-3 rounded-lg bg-[#ee6c1e] text-white font-bold hover:bg-[#d65f17] shadow-sm transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                  {topMenu.title}
                </a>
              );
            }

            // Pujas Special Case
            if (topMenu.category === 'pujas') {
              return (
                <div key={topMenu._id}>
                  <button onClick={() => toggleAccordion('pujas')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
                    {topMenu.title}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={\`transform transition-transform \${expandedMenu === 'pujas' ? 'rotate-180 text-[#ee6c1e]' : ''}\`}><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  {expandedMenu === 'pujas' && (
                    <div className="pl-6 py-2 space-y-2 border-l-2 border-orange-100 ml-4 max-h-[300px] overflow-y-auto">
                      <Link href="/book-a-puja" onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-bold text-[#8a1c2a] py-1.5 hover:text-[#ee6c1e]">View All Pujas →</Link>
                      {navPujas.map(puja => (
                        <Link key={puja._id} href={\`/book-a-puja/\${puja.slug}\`} onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e] truncate">
                          {puja.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Consult Special Case (Red Button Text)
            if (topMenu.category === 'consult') {
              return (
                <div key={topMenu._id}>
                  <button onClick={() => toggleAccordion('consult')} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 text-[#8a1c2a] font-bold">
                    <span className="flex items-center gap-2">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                      {topMenu.title}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={\`transform transition-transform \${expandedMenu === 'consult' ? 'rotate-180 text-[#ee6c1e]' : ''}\`}><path d="M6 9l6 6 6-6" /></svg>
                  </button>
                  {expandedMenu === 'consult' && (
                    <div className="pl-9 py-2 space-y-2 border-l-2 border-orange-100 ml-5">
                      {mySubMenus.map(menu => (
                        <Link key={menu._id} href={menu.url} onClick={() => setIsMobileMenuOpen(false)} className="block text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">{menu.title}</Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Generic Dropdowns
            const uniqueGroups = Array.from(new Set(mySubMenus.map(m => m.group || 'General')));

            return (
              <div key={topMenu._id}>
                <button onClick={() => toggleAccordion(topMenu.category)} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 font-semibold text-gray-850">
                  {topMenu.title}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={\`transform transition-transform \${expandedMenu === topMenu.category ? 'rotate-180 text-[#ee6c1e]' : ''}\`}><path d="M6 9l6 6 6-6" /></svg>
                </button>
                {expandedMenu === topMenu.category && (
                  <div className="pl-6 py-2 space-y-2 border-l-2 border-orange-100 ml-4">
                    {uniqueGroups.map((grp, idx) => (
                      <div key={grp}>
                        {grp !== 'General' && (
                          <p className={\`text-[10px] font-semibold text-[#ee6c1e] uppercase tracking-wider \${idx > 0 ? 'mt-4' : ''}\`}>{grp}</p>
                        )}
                        {mySubMenus.filter(m => (m.group || 'General') === grp).map(menu => (
                          <Link key={menu._id} href={menu.url} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center text-[15px] font-medium text-[#3a1216] py-1.5 hover:text-[#ee6c1e]">
                            {menu.title} {menu.badge && <span className="ml-2 bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">{menu.badge}</span>}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>`;

c = c.replace(oldNav, newNav);
fs.writeFileSync('src/components/layout/Header.tsx', c);
console.log('Success');
