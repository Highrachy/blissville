import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ConstructionLightbox from './ConstructionLightbox';
import { ImgBtn, GalleryLinkContent } from './ConstructionLogShared';

/**
 * ConstructionLogSection  (Variant 1 — text header on top)
 *
 * Derives display images from the unified `gallery` array:
 *   gallery[0]   → large primary image
 *   gallery[1–2] → 2 stacked secondary images
 *   gallery[…]   → all shown in lightbox
 *
 * Layout controlled by `reversed`:
 *   false → large image LEFT  | 2 stacked RIGHT
 *   true  → 2 stacked LEFT   | large image RIGHT
 *
 * Props:
 *  - reversed    {bool}
 *  - category    {string}
 *  - date        {string}
 *  - heading     {string}  '\n' = line break
 *  - subheading  {string}
 *  - description {string}
 *  - gallery     [{ src, alt, caption }]
 *  - id          {string}
 */
const ConstructionLogSection = ({
  reversed = false,
  category,
  date,
  heading,
  subheading,
  description,
  gallery = [],
  id,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);

  const openLightbox = (idx = 0) => {
    setLightboxStart(idx);
    setLightboxOpen(true);
  };

  // Derive display images from gallery positions
  const featuredImages = gallery.filter((img) => img.featured);
  const displayImages = featuredImages.length >= 3 ? featuredImages : gallery;
  const primaryImage = displayImages[0];
  const secondaryImages = displayImages.slice(1, 3);

  const getOriginalIndex = (img) => {
    const idx = gallery.indexOf(img);
    return idx === -1 ? 0 : idx;
  };

  const headingLines = heading?.split('\n') ?? [heading];

  // ── Large image column ────────────────────────────────────────────────────
  const PrimaryCol = () => (
    <div className="cl-section__primary">
      {primaryImage && (
        <ImgBtn
          src={primaryImage.src}
          alt={primaryImage.alt}
          iconSize={22}
          onClick={() => openLightbox(getOriginalIndex(primaryImage))}
        />
      )}
    </div>
  );

  // ── 2-stacked image column ────────────────────────────────────────────────
  const StackedCol = () => (
    <div className="cl-section__secondary">
      {secondaryImages.map((img, idx) => (
        <div key={idx} className="cl-section__secondary-item">
          <ImgBtn
            src={img.src}
            alt={img.alt}
            iconSize={16}
            onClick={() => openLightbox(getOriginalIndex(img))}
          />
        </div>
      ))}
    </div>
  );

  return (
    <>
      <section
        className={`cl-section${reversed ? ' cl-section--reversed' : ''}`}
        id={id}
        aria-labelledby={`${id}-heading`}
      >
        <Container>
          {/* ── Header ─────────────────────────────────────────────────── */}
          <div className="cl-section__header">
            <div className="cl-section__header-meta">
              {category && (
                <span className="cl-section__category">{category}</span>
              )}
              {date && <span className="cl-section__date">{date}</span>}
            </div>

            <div className="cl-section__header-body">
              <div className="cl-section__title-col">
                <h2 className="cl-section__heading" id={`${id}-heading`}>
                  {headingLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < headingLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h2>
                {subheading && (
                  <p className="cl-section__subheading">{subheading}</p>
                )}
              </div>

              <div className="cl-section__desc-col">
                {description && (
                  <p className="cl-section__description">{description}</p>
                )}
              </div>
            </div>
          </div>

          {/* ── Image grid ─────────────────────────────────────────────── */}
          <div className="cl-section__grid">
            {reversed ? (
              <>
                <StackedCol />
                <PrimaryCol />
              </>
            ) : (
              <>
                <PrimaryCol />
                <StackedCol />
              </>
            )}
          </div>

          {/* ── Footer bar: gallery link ────────────────────────────────── */}
          <div className="cl-section__footer">
            <button
              type="button"
              className="cl-section__gallery-link"
              onClick={() => openLightbox(0)}
            >
              <GalleryLinkContent
                count={gallery.length}
                baseClass="cl-section"
                label="View Gallery"
              />
            </button>
          </div>
        </Container>
      </section>

      {lightboxOpen && (
        <ConstructionLightbox
          images={gallery}
          startIndex={lightboxStart}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
};

export default ConstructionLogSection;
