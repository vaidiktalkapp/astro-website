import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  let robotsText = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: https://vaidiktalk.com/sitemap.xml`;

  try {
    const res = await fetch(`${apiUrl}/seo-settings`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (data?.data?.robotsTxtContent) {
        robotsText = data.data.robotsTxtContent;
      }
    }
  } catch (error) {
    console.error('Failed to fetch SEO settings for robots.txt:', error);
  }

  return new NextResponse(robotsText, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
