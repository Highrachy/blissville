import React, { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * ConstructionLightbox
 *
 * Props:
 *  - images   {array}   – [{ src, alt, caption }]
 *  - startIndex {number} – which image to open on
 *  - onClose  {fn}
 */
export default function ConstructionLightbox({ images = [], startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  // portal mount guard (SSR safe)
  useEffect(() => { setMounted(true); }, []);

  // reset loaded state on slide change
  useEffect(() => { setLoaded(false); }, [index]);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  // keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  // lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!mounted || !images.length) return null;

  const current = images[index];

  return createPortal(
    <div
      className="cl-lb"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      onClick={onClose}
    >
      {/* ── backdrop ── */}
      <div className="cl-lb__backdrop" aria-hidden />

      {/* ── panel (stop propagation so clicking inside doesn't close) ── */}
      <div className="cl-lb__panel" onClick={(e) => e.stopPropagation()}>

        {/* top bar */}
        <div className="cl-lb__topbar">
          <span className="cl-lb__counter">
            {index + 1} / {images.length}
          </span>
          <button
            type="button"
            className="cl-lb__close"
            onClick={onClose}
            aria-label="Close gallery"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* main image area */}
        <div className="cl-lb__stage">
          {/* prev arrow */}
          {images.length > 1 && (
            <button
              type="button"
              className="cl-lb__arrow cl-lb__arrow--prev"
              onClick={prev}
              aria-label="Previous image"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
          )}

          <div className={`cl-lb__img-wrap${loaded ? ' is-loaded' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="cl-lb__img"
              onLoad={() => setLoaded(true)}
              draggable={false}
            />
            {!loaded && <div className="cl-lb__spinner" aria-hidden />}
          </div>

          {/* next arrow */}
          {images.length > 1 && (
            <button
              type="button"
              className="cl-lb__arrow cl-lb__arrow--next"
              onClick={next}
              aria-label="Next image"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          )}
        </div>

        {/* caption */}
        {current.caption && (
          <div className="cl-lb__caption">{current.caption}</div>
        )}

        {/* thumbnail strip */}
        {images.length > 1 && (
          <div className="cl-lb__thumbs" role="tablist" aria-label="Gallery thumbnails">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={img.alt}
                className={`cl-lb__thumb${i === index ? ' is-active' : ''}`}
                onClick={() => setIndex(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" aria-hidden />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
