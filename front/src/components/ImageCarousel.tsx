import { useEffect, useMemo, useRef, useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  intervalMs?: number;
  className?: string;
}

const shuffle = <T,>(items: T[]): T[] => {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
};

const preloadImages = (sources: string[]) => {
  sources.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

export function ImageCarousel({
  images,
  alt,
  intervalMs = 4500,
  className = '',
}: ImageCarouselProps) {
  const slidesKey = useMemo(() => images.filter(Boolean).join('|'), [images]);
  const slides = useMemo(() => shuffle(images.filter(Boolean)), [slidesKey]);

  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [motionReady, setMotionReady] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    setIndex(0);
    setPrevIndex(null);
    setPaused(false);
    isFirstRender.current = true;
    setMotionReady(false);

    preloadImages(slides);

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => setMotionReady(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [slidesKey, slides]);

  useEffect(() => {
    if (prevIndex === null) return;

    const timer = window.setTimeout(() => {
      setPrevIndex(null);
    }, 900);

    return () => window.clearTimeout(timer);
  }, [prevIndex]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setIndex((current) => {
        setPrevIndex(current);
        isFirstRender.current = false;
        return (current + 1) % slides.length;
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [paused, slides.length, intervalMs, slidesKey]);

  if (slides.length === 0) {
    return <div className={`image-carousel empty ${className}`} aria-hidden />;
  }

  return (
    <div
      className={`image-carousel ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((src, slideIndex) => {
        const isActive = slideIndex === index;
        const isLeaving = slideIndex === prevIndex;
        const isFirst = isActive && isFirstRender.current;

        const classNames = [
          isActive ? 'is-active' : '',
          isLeaving ? 'is-leaving' : '',
          isFirst ? 'is-first' : '',
          isFirst && motionReady ? 'is-ready' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <img
            key={`${slideIndex}-${src}`}
            src={src}
            alt={`${alt} ${slideIndex + 1}`}
            className={classNames}
            decoding="async"
          />
        );
      })}
    </div>
  );
}
