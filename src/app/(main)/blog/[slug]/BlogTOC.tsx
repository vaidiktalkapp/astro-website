'use client';

import React from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogTOC({ toc }: { toc: TocItem[] }) {
  if (!toc || toc.length === 0) return null;

  return (
    <div className="bg-white border border-[#f0ddc0] rounded-xl p-5 md:p-6 mb-10 shadow-sm w-full md:max-w-2xl">
      <div className="flex items-center gap-2 mb-4 text-[#5c1420] border-b border-[#f0ddc0] pb-3">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        <h3 className="font-bold font-serif text-lg m-0">Table of Contents</h3>
      </div>
      <ul className="space-y-3">
        {toc.map((item) => (
          <li key={item.id} className={`${item.level === 3 ? 'ml-6' : 'ml-2'}`}>
            <a
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-[15.5px] font-medium text-[#3a1216] hover:text-[#5c1420] hover:underline transition-all block relative pl-4"
            >
              <span className="text-[#f0ddc0] absolute left-0 top-0 text-lg leading-snug">•</span>
              <span className="leading-snug">{item.text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
