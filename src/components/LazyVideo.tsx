'use client';
import { useEffect, useRef, useState } from 'react';

interface LazyVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
}

/**
 * LazyVideo — only loads the video src when it enters the viewport.
 * Uses IntersectionObserver with rootMargin so video starts loading
 * slightly before the user scrolls to it.
 */
export default function LazyVideo({
  src,
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  poster,
  preload = 'none',
}: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActiveSrc(src);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Start loading 200px before viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  // When src becomes available, ensure video plays if autoPlay
  useEffect(() => {
    if (activeSrc && autoPlay && ref.current) {
      ref.current.play().catch(() => {/* user gesture required — ignore */});
    }
  }, [activeSrc, autoPlay]);

  return (
    <video
      ref={ref}
      src={activeSrc}
      className={className}
      autoPlay={!!activeSrc && autoPlay}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
      poster={poster}
      preload={activeSrc ? 'auto' : preload}
    />
  );
}
