import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  initialIndex?: number;
  onClose: () => void;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.4 6.4 12 12l5.6-5.6 1.4 1.4L13.4 13.4l5.6 5.6-1.4 1.4L12 14.8l-5.6 5.6-1.4-1.4 5.6-5.6-5.6-5.6z" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.6 6.6 9.2 12l5.4 5.4-1.4 1.4-6.8-6.8 6.8-6.8z" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9.4 6.6 14.8 12l-5.4 5.4 1.4 1.4 6.8-6.8-6.8-6.8z" />
    </svg>
  );
}

export function ImageGallery({
  images,
  alt,
  initialIndex = 0,
  onClose,
}: ImageGalleryProps) {
  const [index, setIndex] = useState(initialIndex);

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length);
  }, [images.length]);

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') goPrev();
      if (event.key === 'ArrowRight') goNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, goPrev, goNext]);

  if (images.length === 0) return null;

  return createPortal(
    <div
      className="image-gallery"
      role="dialog"
      aria-modal="true"
      aria-label={`Galería: ${alt}`}
    >
      <button
        type="button"
        className="image-gallery-backdrop"
        aria-label="Cerrar galería"
        onClick={onClose}
      />

      <div className="image-gallery-shell">
        <button
          type="button"
          className="image-gallery-close"
          aria-label="Cerrar galería"
          onClick={onClose}
        >
          <CloseIcon />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              className="image-gallery-nav image-gallery-prev"
              aria-label="Imagen anterior"
              onClick={goPrev}
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              className="image-gallery-nav image-gallery-next"
              aria-label="Imagen siguiente"
              onClick={goNext}
            >
              <ChevronRightIcon />
            </button>
          </>
        )}

        <div className="image-gallery-stage">
          <img
            key={images[index]}
            src={images[index]}
            alt={`${alt} ${index + 1} de ${images.length}`}
            className="image-gallery-photo"
          />
        </div>

        <div className="image-gallery-footer">
          <span className="image-gallery-counter">
            {index + 1} / {images.length}
          </span>

          {images.length > 1 && (
            <div className="image-gallery-thumbs" role="tablist" aria-label="Miniaturas">
              {images.map((src, thumbIndex) => (
                <button
                  key={`${thumbIndex}-${src}`}
                  type="button"
                  role="tab"
                  className={`image-gallery-thumb${thumbIndex === index ? ' is-active' : ''}`}
                  aria-label={`Ver imagen ${thumbIndex + 1}`}
                  aria-selected={thumbIndex === index}
                  onClick={() => setIndex(thumbIndex)}
                >
                  <img src={src} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
