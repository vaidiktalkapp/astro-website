import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  let blogs = [];
  
  try {
    const res = await fetch(`${apiUrl}/blogs?status=published`);
    if (res.ok) {
      const data = await res.json();
      blogs = data.data || [];
    }
  } catch (error) {
    console.error('Failed to fetch blogs for sitemap:', error);
  }

  const blogUrls = blogs.map((b: any) => ({
    url: `https://vaidiktalk.com/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt || b.publishedAt || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    { url: 'https://vaidiktalk.com', lastModified: new Date(), priority: 1, changeFrequency: 'daily' },
    { url: 'https://vaidiktalk.com/blog', lastModified: new Date(), priority: 0.8, changeFrequency: 'daily' },
    ...blogUrls,
  ];
}
