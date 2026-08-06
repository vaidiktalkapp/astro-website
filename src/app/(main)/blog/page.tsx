import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import BlogSearchClient from './BlogSearchClient';

export const metadata: Metadata = {
  title: 'Vedic Knowledge Center - Astrology Blogs & Insights | VaidikTalk',
  description: 'Expand your spiritual awareness with profound articles on Astrology, Vastu, Mantras, and ancient Vedic wisdom. Read the latest blogs at VaidikTalk.',
  alternates: {
    canonical: 'https://www.vaidiktalk.com/blog',
  },
  openGraph: {
    title: 'Vedic Knowledge Center - Astrology Blogs & Insights | VaidikTalk',
    description: 'Expand your spiritual awareness with profound articles on Astrology, Vastu, Mantras, and ancient Vedic wisdom.',
    url: 'https://www.vaidiktalk.com/blog',
    type: 'website',
  }
};

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  
  // Await search params in Next.js 15+ 
  const params = await searchParams;
  const category = typeof params.category === 'string' ? params.category : 'all';
  const page = typeof params.page === 'string' ? parseInt(params.page) : 1;
  const search = typeof params.search === 'string' ? params.search : '';

  // Fetch initial data
  let blogsUrl = `${apiUrl}/blogs?status=published&limit=12&page=${page}`;
  if (category !== 'all') blogsUrl += `&category=${category}`;
  if (search) blogsUrl += `&search=${search}`;

  const [blogsRes, catsRes] = await Promise.all([
    fetch(blogsUrl, { next: { revalidate: 60 } }).catch(() => null),
    fetch(`${apiUrl}/blogs/categories?activeOnly=true`, { next: { revalidate: 0 } }).catch(() => null)
  ]);

  const blogsData = blogsRes && blogsRes.ok ? await blogsRes.json() : { data: [], pagination: null };
  const catsData = catsRes && catsRes.ok ? await catsRes.json() : [];

  const blogs = blogsData?.data || [];
  const pagination = blogsData?.pagination || { total: 0, pages: 1, page: 1, limit: 12 };
  const categories = Array.isArray(catsData) ? catsData : (catsData?.data || []);

  return (
    <div className="bg-[#fdf8f0] min-h-screen">
      {/* Knowledge Center Hero */}
      <div className="pt-4 md:pt-6 pb-2 md:pb-4 px-6 relative">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold mb-2 md:mb-3 text-[#5c1420]">
            Vedic <span className="text-[#d97706]">Knowledge</span> Center
          </h1>
          <p className="text-[#3a1216] text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Expand your spiritual awareness with profound articles on Astrology, Vastu, Mantras, and ancient Vedic wisdom.
          </p>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-8 py-6 flex flex-col lg:flex-row gap-8 lg:gap-8">
        
        {/* Left Sidebar - Categories */}
        <div className="w-full lg:w-[250px] shrink-0">
          <div className="sticky top-24 bg-white border border-[#f0ddc0]/80 rounded-2xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hidden lg:block">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#f0ddc0]/60">
              <div className="w-10 h-10 bg-[#fdf8f0] rounded-xl flex items-center justify-center text-[#d97706]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>
              </div>
              <div>
                <h2 className="font-serif font-bold text-[#5c1420] text-[18px] leading-tight">Categories</h2>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Link 
                href="/blog"
                className={`text-left px-4 py-2.5 rounded-lg transition-all text-[14px] block ${category === 'all' ? 'bg-[#5c1420] text-white font-bold shadow-md' : 'text-[#412a1e] hover:bg-[#fdf8f0] hover:text-[#d97706]'}`}
              >
                All Articles
              </Link>
              {categories.map((cat: any) => (
                <Link 
                  key={cat._id}
                  href={`/blog?category=${cat.slug || cat._id}`}
                  className={`text-left px-4 py-2.5 rounded-lg transition-all text-[14px] block ${category === (cat.slug || cat._id) ? 'bg-[#5c1420] text-white font-bold shadow-md' : 'text-[#412a1e] hover:bg-[#fdf8f0] hover:text-[#d97706]'}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Categories Dropdown Client Component */}
          <div className="lg:hidden mb-6 relative">
             <BlogSearchClient type="category" categories={categories} initialCategory={category} />
          </div>
        </div>

        {/* Vertical Divider Line */}
        <div className="hidden lg:block w-px bg-[#d97706]/80 self-stretch my-2"></div>

        {/* Right Main Content */}
        <div className="flex-1 min-w-0">
          {/* Search Bar */}
          <div className="w-full mb-8 relative">
            <BlogSearchClient type="search" initialSearch={search} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.length > 0 ? (
              blogs.map((blog: any) => (
                <Link href={`/blog/${blog.slug}`} key={blog._id} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="relative w-full aspect-[21/9] overflow-hidden">
                    <img 
                      src={blog.bannerImage || 'https://images.unsplash.com/photo-1598090216740-eb040d8c3f82?q=72&w=480&h=360&fit=crop'} 
                      alt={blog.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-1 rounded flex items-center gap-1.5 shadow-sm">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                      {blog.views || 0}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-medium text-[17px] text-[#2d1b13] leading-snug mb-5 group-hover:text-[#d97706] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    
                    <div className="mt-auto flex items-center text-[14px] text-gray-850 hover:text-[#d97706] transition-colors">
                      <span>Read More &rarr;</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fbe7d3] text-[#d97706] mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                </div>
                <h3 className="text-xl font-bold text-[#5c1420] mb-2">No Articles Found</h3>
                <p className="text-gray-850">We couldn't find any articles matching your search or filter.</p>
                <Link 
                  href="/blog"
                  className="inline-block mt-6 px-6 py-2 border-2 border-[#d97706] text-[#d97706] rounded-full font-bold hover:bg-[#d97706] hover:text-white transition-colors"
                >
                  Clear Filters
                </Link>
              </div>
            )}
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              {Array.from({ length: pagination.pages }).map((_, i) => {
                const pageNum = i + 1;
                const isCurrent = pageNum === page;
                let pageUrl = `/blog?page=${pageNum}`;
                if (category !== 'all') pageUrl += `&category=${category}`;
                if (search) pageUrl += `&search=${search}`;
                
                return (
                  <Link
                    key={pageNum}
                    href={pageUrl}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-colors ${
                      isCurrent 
                        ? 'bg-[#d97706] text-white shadow-md' 
                        : 'bg-white text-[#5c1420] border border-[#f0ddc0] hover:bg-[#fdf8f0]'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
