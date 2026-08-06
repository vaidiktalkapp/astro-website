import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import BlogTOC from './BlogTOC';
import ViewTracker from './ViewTracker';
import BlogShare from './BlogShare';

export const revalidate = 3600;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchBlog(slug: string) {
  try {
    const res = await fetch(`${API_URL}/blogs/post/${slug}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    return null;
  }
}

async function fetchRecentBlogs(currentSlug: string) {
  try {
    const res = await fetch(`${API_URL}/blogs?status=published`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || [])
      .slice(0, 3);
  } catch (error) {
    return [];
  }
}

async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/blogs/categories?activeOnly=true`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL}/blogs?status=published`);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).map((b: any) => ({ slug: b.slug }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlog(slug);
  if (!blog) return {};

  return {
    title: blog.seoTitle || blog.title,
    description: blog.seoDescription,
    keywords: blog.seoKeywords,
    alternates: { canonical: `https://vaidiktalk.com/blog/${blog.slug}` },
    openGraph: {
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription,
      images: blog.bannerImage ? [blog.bannerImage] : [],
      type: 'article',
      publishedTime: blog.publishedAt,
      modifiedTime: blog.updatedAt,
      url: `https://vaidiktalk.com/blog/${blog.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seoTitle || blog.title,
      description: blog.seoDescription,
      images: blog.bannerImage ? [blog.bannerImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await fetchBlog(slug);

  if (!blog) {
    notFound();
  }

  const recentBlogs = await fetchRecentBlogs(slug);
  const categories = await fetchCategories();

  // Sanitize content and generate TOC server-side
  let processedContent = blog.content || '';
  
  // Replace non-breaking spaces with normal spaces
  processedContent = processedContent.replace(/&nbsp;/g, ' ').replace(/\u00A0/g, ' ');
  
  // Strip inline styles and widths
  processedContent = processedContent.replace(/\sstyle="[^"]*"/gi, '');
  processedContent = processedContent.replace(/\swidth="[^"]*"/gi, '');

  // Extract headings using regex
  const toc: { id: string, text: string, level: number }[] = [];
  let headingIndex = 0;
  
  processedContent = processedContent.replace(/<(h[23])([^>]*)>(.*?)<\/\1>/gi, (match: string, tag: string, attrs: string, innerText: string) => {
    const cleanText = innerText.replace(/<[^>]+>/g, '').trim();
    if (!cleanText || cleanText.toLowerCase().includes('table of content')) {
      return match;
    }
    
    const id = `heading-${headingIndex++}-${cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
    toc.push({
      id,
      text: cleanText,
      level: tag.toLowerCase() === 'h2' ? 2 : 3
    });
    
    let newAttrs = attrs;
    if (!newAttrs.includes('id=')) {
      newAttrs += ` id="${id}"`;
    }
    if (newAttrs.includes('class=')) {
      newAttrs = newAttrs.replace(/class="([^"]*)"/i, `class="$1 scroll-mt-24"`);
    } else {
      newAttrs += ` class="scroll-mt-24"`;
    }
    
    return `<${tag}${newAttrs}>${innerText}</${tag}>`;
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.seoDescription,
    image: blog.bannerImage ? [blog.bannerImage] : [],
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: { 
      '@type': 'Person', 
      name: blog.authorName || 'VaidikTalk Editorial', 
      url: 'https://vaidiktalk.com/about-us',
      description: blog.authorCredentials || undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: 'VaidikTalk',
      logo: { '@type': 'ImageObject', url: 'https://vaidiktalk.com/vaidiktalklogo.webp' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://vaidiktalk.com/blog/${blog.slug}` },
  };

  const organizationLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'VaidikTalk',
    url: 'https://vaidiktalk.com',
    logo: 'https://vaidiktalk.com/vaidiktalklogo.webp',
    sameAs: [
      'https://www.facebook.com/vaidiktalk',
      'https://www.instagram.com/vaidiktalk',
      'https://www.youtube.com/vaidiktalk'
    ]
  };

  const webSiteLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'VaidikTalk',
    url: 'https://vaidiktalk.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://vaidiktalk.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vaidiktalk.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://vaidiktalk.com/blog' },
      { '@type': 'ListItem', position: 3, name: blog.title, item: `https://vaidiktalk.com/blog/${blog.slug}` },
    ],
  };

  const faqs: any[] = [];
  const faqRegex = /<h[234][^>]*>(.*?)<\/h[234]>([\s\S]*?)(?=<h[234]|$)/gi;
  for (const match of processedContent.matchAll(faqRegex)) {
    const questionText = match[1].replace(/<[^>]+>/g, '').trim();
    const answerContent = match[2].replace(/<[^>]+>/g, '').trim();
    
    // Detect if this section is an FAQ (starts with Q, or question words, or ends with ?)
    if (/^(Q\d*\.?|What|How|Can|Is|Why|Do|Does|When)/i.test(questionText) || questionText.endsWith('?')) {
      if (answerContent.length > 5 && !questionText.toLowerCase().includes('faq')) {
        faqs.push({
          "@type": "Question",
          "name": questionText,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answerContent
          }
        });
      }
    }
  }

  const faqLd = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <ViewTracker slug={blog.slug} />
      
      <div className="bg-[#fdf8f0] min-h-screen pb-20 relative">
        <div className="absolute inset-0 pointer-events-none opacity-50 bg-[url('/pattern.png')] bg-repeat" />

        <div className="max-w-[1300px] mx-auto px-4 md:px-6 pt-4 md:pt-6 relative z-10 flex flex-col lg:flex-row">
          {/* Main Content Column */}
          <div className="flex-1 min-w-0 lg:pr-6 xl:pr-8">
          <h1 className="text-xl md:text-3xl lg:text-[31px] font-sans font-semibold text-[#5c1420] mb-3 leading-tight tracking-tight">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 md:gap-5 text-[#8c571c] text-[11px] md:text-[12px] font-medium mb-5 pb-3 border-b border-[#f0ddc0]/60">
            {/* Author byline */}
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center shrink-0">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[#5c1420] font-semibold">{blog.authorName || 'VaidikTalk Editorial'}</span>
                {blog.authorCredentials && (
                  <span className="text-[10px] text-gray-500 font-normal mt-0.5">{blog.authorCredentials}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMMM dd, yyyy') : 'Recently'}
            </div>
            {blog.category && (
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                {blog.category.name}
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              {blog.views || 0} Views
            </div>
          </div>

          {blog.bannerImage && (
            <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden mb-5 shadow-sm border border-[#f0ddc0]/60">
              <img 
                src={blog.bannerImage} 
                alt={blog.bannerAlt || blog.title} 
                className="w-full h-full object-cover object-center"
              />
            </div>
          )}

          <BlogShare title={blog.title} />

          <BlogTOC toc={toc} />

          <article 
            className="rich-content prose prose-lg prose-slate w-full max-w-none text-[#3a1216] text-[16px] md:text-[18px] leading-[1.6] break-words text-justify
              prose-headings:font-serif prose-headings:text-[#5c1420] prose-headings:font-bold prose-headings:text-left
              [&_a]:!text-[#ee6c1e] [&_a]:underline [&_a]:decoration-[#ee6c1e]/50 hover:[&_a]:decoration-[#ee6c1e] hover:[&_a]:!text-[#c2410c] [&_a]:font-bold [&_a]:transition-colors [&_a]:break-words
              prose-img:rounded-xl prose-img:shadow-sm
              prose-strong:text-[#3a1216] prose-strong:font-bold
              prose-blockquote:border-l-[#d97706] prose-blockquote:bg-[#fdf8f0] prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:font-serif prose-blockquote:italic"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          </div>

          {/* Right Sidebar Column */}
          <div className="w-full lg:w-[300px] xl:w-[340px] shrink-0 mt-8 lg:mt-0 lg:pl-6 xl:pl-8 lg:border-l lg:border-[#d97706]/30">
            <div className="space-y-6 md:space-y-8 h-full pb-10">
              
              {/* Consultation CTA Banner */}
              <div className="bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-2xl p-5 text-center shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/pattern.png')] bg-repeat pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <h3 className="font-serif font-bold text-white text-[18px] mb-1.5 leading-tight">Need Personal Guidance?</h3>
                  <p className="text-white/90 text-[12px] mb-4 leading-relaxed">Connect with India's best Vedic Astrologers for accurate predictions and solutions.</p>
                  <Link href="/astrologers-chat" className="block w-full bg-white text-[#d97706] hover:bg-gray-50 font-bold py-2.5 rounded-xl transition-all shadow-md text-[13px]">
                    Chat with Astrologer
                  </Link>
                </div>
              </div>

              {/* Recent Stories Widget */}
              {recentBlogs.length > 0 && (
                <div className="bg-white border border-[#f0ddc0]/80 rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <h3 className="font-serif font-bold text-[#5c1420] text-[18px] mb-4 pb-3 border-b border-[#f0ddc0]/60 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    Recent Stories
                  </h3>
                  <div className="flex flex-col gap-4">
                    {recentBlogs.map((recent: any) => (
                      <Link href={`/blog/${recent.slug}`} key={recent._id} className="group flex gap-3 items-center">
                        <div className="w-[85px] h-[65px] rounded-lg overflow-hidden shrink-0 border border-[#f0ddc0]/50 relative">
                          <img 
                            src={recent.bannerImage || 'https://images.unsplash.com/photo-1598090216740-eb040d8c3f82?q=72&w=480&h=360&fit=crop'} 
                            alt={recent.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center min-w-0">
                          <h4 className="font-bold text-[13.5px] text-[#3a1216] leading-[1.3] group-hover:text-[#d97706] transition-colors line-clamp-2">
                            {recent.title}
                          </h4>
                          {recent.publishedAt && (
                            <span className="text-[11px] text-gray-500 mt-1 block">
                              {format(new Date(recent.publishedAt), 'MMM dd, yyyy')}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Categories */}
              {categories.length > 0 && (
                <div className="bg-white border border-[#f0ddc0]/80 rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] sticky top-24">
                  <h3 className="font-serif font-bold text-[#5c1420] text-[18px] mb-4 pb-3 border-b border-[#f0ddc0]/60 flex items-center gap-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                    Categories
                  </h3>
                  <div className="flex flex-col gap-3">
                    {categories.map((cat: any) => (
                      <Link 
                        key={cat._id} 
                        href={`/blog?category=${cat.slug || cat._id}`}
                        className="group flex items-center justify-between text-[#412a1e] hover:text-[#d97706] transition-colors py-1.5"
                      >
                        <span className="text-[14px] font-medium">{cat.name}</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-[#d97706]"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
