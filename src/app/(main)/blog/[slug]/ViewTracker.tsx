'use client';

import { useEffect } from 'react';

export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
    fetch(`${apiUrl}/blogs/post/${slug}/view`, { method: 'PATCH' }).catch(console.error);
  }, [slug]);

  return null;
}
