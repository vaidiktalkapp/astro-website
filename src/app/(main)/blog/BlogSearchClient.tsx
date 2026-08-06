'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BlogSearchClient({ 
  type, 
  initialSearch = '', 
  categories = [], 
  initialCategory = 'all' 
}: { 
  type: 'search' | 'category', 
  initialSearch?: string,
  categories?: any[],
  initialCategory?: string
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(initialSearch);
  const isFirstRender = useRef(true);

  // Sync internal state if URL changes externally
  useEffect(() => {
    if (type === 'search') {
      setSearch(initialSearch);
    }
  }, [initialSearch, type]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (type === 'search') {
      const timer = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (search) {
          params.set('search', search);
        } else {
          params.delete('search');
        }
        params.delete('page'); // reset pagination on search
        router.push(`/blog?${params.toString()}`);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [search, type, router, searchParams]);

  if (type === 'category') {
    return (
      <>
        <select
          value={initialCategory}
          onChange={(e) => {
            const val = e.target.value;
            const params = new URLSearchParams(searchParams.toString());
            if (val && val !== 'all') {
              params.set('category', val);
            } else {
              params.delete('category');
            }
            params.delete('page');
            router.push(`/blog?${params.toString()}`);
          }}
          className="w-full appearance-none px-6 py-3.5 rounded-xl bg-white border border-[#f0ddc0] text-[#5c1420] font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]/50 cursor-pointer"
        >
          <option value="all">All Articles</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat.slug || cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <svg className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-[#d97706] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
      </>
    );
  }

  return (
    <>
      <input 
        type="text" 
        placeholder="Let's find what you're looking for..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white border-b-2 border-transparent hover:border-[#f0ddc0] focus:border-[#d97706] shadow-sm text-[#3a1216] focus:outline-none transition-all placeholder-gray-400"
      />
      <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#3a1216]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
    </>
  );
}
