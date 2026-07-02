import React, { useState } from 'react';
import { FiZoomIn, FiArrowRight, FiImage } from 'react-icons/fi';

// ── Lightbox state hook ───────────────────────────────────────────────────────
export const useLightbox = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);
  const openLightbox = (idx = 0) => {
    setLightboxStart(idx);
    setLightboxOpen(true);
  };
  const closeLightbox = () => setLightboxOpen(false);
  return { lightboxOpen, lightboxStart, openLightbox, closeLightbox };
};

// ── Category + date meta block ────────────────────────────────────────────────
export const SectionMeta = ({
  category,
  date,
  wrapperClassName,
  baseClass,
}) => (
  <div className={wrapperClassName}>
    {category && <span className={`${baseClass}__category`}>{category}</span>}
    {date && <span className={`${baseClass}__date`}>{date}</span>}
  </div>
);

// ── Section h2 heading with \\n line-break support ────────────────────────────
export const SectionHeading = ({ heading, id, baseClass }) => {
  const lines = heading?.split('\n') ?? [heading];
  return (
    <h2 className={`${baseClass}__heading`} id={`${id}-heading`}>
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {i < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </h2>
  );
};

// ── Clickable image tile ──────────────────────────────────────────────────────
export const ImgBtn = ({
  src,
  alt,
  iconSize = 20,
  onClick,
  baseClass = 'cl-section',
}) => (
  <button
    type="button"
    className={`${baseClass}__img-btn`}
    onClick={onClick}
    aria-label={`View ${alt} in gallery`}
  >
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={alt} className={`${baseClass}__img`} />
    <span className={`${baseClass}__img-hover`} aria-hidden>
      <FiZoomIn size={iconSize} />
    </span>
  </button>
);

// ── Gallery link content ──────────────────────────────────────────────────────
export const GalleryLinkContent = ({
  count,
  baseClass = 'cl-section',
  label = 'View Gallery',
}) => (
  <>
    <span className={`${baseClass}__gallery-link-inner`}>
      <FiImage className={`${baseClass}__gallery-link-icon`} size={16} />
      <span className={`${baseClass}__gallery-link-label`}>{label}</span>
    </span>
    <span className={`${baseClass}__gallery-link-count`}>{count} photos</span>
    <FiArrowRight
      size={13}
      className={
        baseClass === 'cl-alt-section'
          ? 'cl-alt-section__gallery-link-arrow'
          : ''
      }
    />
  </>
);
