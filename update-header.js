const fs = require('fs');
let c = fs.readFileSync('src/components/layout/Header.tsx', 'utf8');

const startIndex = c.indexOf('<Link href="/" className="hover:text-[#ee6c1e] transition-colors py-4">Home</Link>');
const endIndex = c.indexOf('</nav>');

if (startIndex === -1 || endIndex === -1) {
  console.log("Could not find start or end index.");
  process.exit(1);
}

const oldNav = c.substring(startIndex, endIndex);

const newNav = `{topLevelMenus.map(topMenu => {
  const mySubMenus = subMenus.filter(m => m.category === topMenu.category);
  
  // 1. Direct Links (No Submenus & Not Special)
  if (mySubMenus.length === 0 && topMenu.category !== 'pujas' && topMenu.category !== 'shop') {
    return (
      <Link key={topMenu._id} href={topMenu.url || '/'} className={topMenu.category === 'consult' ? 'bg-[#8a1c2a] text-white px-3 py-[7px] rounded-md hover:bg-[#721522] transition-colors font-semibold' : 'hover:text-[#ee6c1e] transition-colors py-4'}>
        {topMenu.title}
      </Link>
    );
  }

  // 2. Special Case: Pujas Dropdown
  if (topMenu.category === 'pujas') {
    return (
      <div key={topMenu._id} className="relative group cursor-pointer">
        <Link href={topMenu.url || '/book-a-puja'} className="hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4">
          {topMenu.title}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        </Link>
        <div className="absolute top-full left-0 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-lg min-w-[480px] p-3 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50">
          <div className="grid grid-cols-2 gap-x-2">
            <div className="flex flex-col">
              <Link href="/book-a-puja" className="block px-4 py-2 text-sm text-[#8a1c2a] font-bold hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">View All Pujas →</Link>
              {navPujas.slice(0, Math.ceil(navPujas.length / 2)).map(puja => (
                <Link key={puja._id} href={\`/book-a-puja/\${puja.slug}\`} className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md truncate" title={puja.title}>
                  {puja.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col mt-9">
              {navPujas.slice(Math.ceil(navPujas.length / 2)).map(puja => (
                <Link key={puja._id} href={\`/book-a-puja/\${puja.slug}\`} className="block px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md truncate" title={puja.title}>
                  {puja.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Special Case: Shop
  if (topMenu.category === 'shop') {
    return (
      <a key={topMenu._id} href={topMenu.url || 'https://vaidiktalk.store/'} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-[#ee6c1e] text-white px-3.5 py-2 rounded-md font-bold hover:bg-[#d65f17] transition-colors shadow-sm ml-1">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
        {topMenu.title}
      </a>
    );
  }

  // 4. Standard Dropdowns (Generic or Kundli etc.)
  const uniqueGroups = Array.from(new Set(mySubMenus.map(m => m.group || 'General')));
  const isMultiColumn = uniqueGroups.length > 1;

  return (
    <div key={topMenu._id} className={\`relative group cursor-pointer \${topMenu.category === 'consult' ? 'flex items-center py-4' : ''}\`}>
      <Link href={topMenu.url || '#'} className={topMenu.category === 'consult' ? "bg-[#8a1c2a] text-white px-3 2xl:px-4 py-[7px] 2xl:py-[8px] rounded-md hover:bg-[#721522] transition-colors font-semibold flex items-center gap-1.5" : "hover:text-[#ee6c1e] transition-colors flex items-center gap-1 py-4"}>
        {topMenu.title}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </Link>
      
      <div className={\`absolute \${topMenu.category === 'consult' ? 'top-[calc(100%-8px)] right-0 min-w-[220px]' : topMenu.category === 'knowledge' ? 'top-full right-0 min-w-[240px]' : isMultiColumn ? 'top-full left-0 min-w-[480px]' : 'top-full left-0 min-w-[240px]'} bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-lg \${topMenu.category === 'consult' || topMenu.category === 'knowledge' ? 'py-2' : 'p-3'} border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50\`}>
        <div className={isMultiColumn ? "grid grid-cols-2 gap-x-2" : "flex flex-col"}>
          {uniqueGroups.map((grp, idx) => (
            <div key={grp} className={\`flex flex-col \${isMultiColumn && idx === 0 ? 'border-r border-gray-100 pr-2' : isMultiColumn ? 'pl-2' : ''}\`}>
              {grp !== 'General' && (
                <div className="px-4 py-1.5 text-[11px] font-bold text-[#ee6c1e] uppercase tracking-wider mb-1 mt-1">{grp}</div>
              )}
              {mySubMenus.filter(m => (m.group || 'General') === grp).map(menu => (
                <Link key={menu._id} href={menu.url} className="flex items-center justify-between px-4 py-2 text-sm text-[#3a1216] hover:bg-orange-50 hover:text-[#ee6c1e] rounded-md">
                  {menu.title}
                  {menu.badge && <span className="bg-[#ee6c1e] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ml-2">{menu.badge}</span>}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
})}
`;

c = c.replace(oldNav, newNav);
fs.writeFileSync('src/components/layout/Header.tsx', c);
console.log('Success');
