import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ConstructionLightbox from './ConstructionLightbox';
import { ImgBtn, GalleryLinkContent } from './ConstructionLogShared';

/**
 * ConstructionLogSectionAlt  (Variant 2 — side-by-side)
 *
 * Derives display images from the unified `gallery` array:
 *   gallery[0–3] → 2×2 grid tiles
 *   gallery[…]   → all shown in lightbox
 *
 * Layout controlled by `reversed`:
 *   false → 2×2 grid LEFT  | text panel RIGHT
 *   true  → text panel LEFT | 2×2 grid RIGHT
 *
 * Props:
 *  - reversed    {bool}
 *  - category    {string}
 *  - date        {string}
 *  - heading     {string}  '\n' = line break
 *  - subheading  {string}
 *  - description {string}
 *  - quote       {string}
 *  - gallery     [{ src, alt, caption }]
 *  - id          {string}
 */
const ConstructionLogSectionAlt = ({
  reversed = false,
  category,
  date,
  heading,
  subheading,
  description,
  quote,
  gallery = [],
  id,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxStart, setLightboxStart] = useState(0);

  const openLightbox = (idx = 0) => {
    setLightboxStart(idx);
    setLightboxOpen(true);
  };

  // Derive 2×2 grid from first 4 gallery images or featureds
  const featuredImages = gallery.filter((img) => img.featured);
  const displayImages = featuredImages.length >= 4 ? featuredImages : gallery;
  const gridImages = displayImages.slice(0, 4);

  const getOriginalIndex = (img) => {
    const idx = gallery.indexOf(img);
    return idx === -1 ? 0 : idx;
  };

  const headingLines = heading?.split('\n') ?? [heading];

  // ── 2×2 image grid column ────────────────────────────────────────────────
  const GridCol = () => (
    <div className="cl-alt-section__images">
      <div className="cl-alt-section__grid">
        {gridImages.map((img, idx) => (
          <div key={idx} className="cl-alt-section__grid-item">
            <ImgBtn
              src={img.src}
              alt={img.alt}
              iconSize={16}
              onClick={() => openLightbox(getOriginalIndex(img))}
              baseClass="cl-alt-section"
            />
          </div>
        ))}
      </div>

      {/* Gallery link */}
      <div className="cl-alt-section__footer">
        <button
          type="button"
          className="cl-alt-section__gallery-link"
          onClick={() => openLightbox(0)}
        >
          <GalleryLinkContent
            count={gallery.length}
            baseClass="cl-alt-section"
            label="View Full Gallery"
          />
        </button>
      </div>
    </div>
  );

  // ── Text panel column ────────────────────────────────────────────────────
  const TextCol = () => (
    <div className="cl-alt-section__text">
      <div className="cl-alt-section__text-meta">
        {category && (
          <span className="cl-alt-section__category">{category}</span>
        )}
        {date && <span className="cl-alt-section__date">{date}</span>}
      </div>

      <h2 className="cl-alt-section__heading" id={`${id}-heading`}>
        {headingLines.map((line, i) => (
          <React.Fragment key={i}>
            {line}
            {i < headingLines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </h2>

      {subheading && <p className="cl-alt-section__subheading">{subheading}</p>}

      {description && (
        <p className="cl-alt-section__description">{description}</p>
      )}

      {quote && (
        <>
          <hr className="cl-alt-section__divider" />
          <blockquote className="cl-alt-section__quote">
            &ldquo;{quote}&rdquo;
          </blockquote>
        </>
      )}
    </div>
  );

  return (
    <>
      <section
        className={`cl-alt-section${reversed ? ' cl-alt-section--reversed' : ''}`}
        id={id}
        aria-labelledby={`${id}-heading`}
      >
        <Container>
          <div className="cl-alt-section__inner">
            {reversed ? (
              <>
                <TextCol />
                <GridCol />
              </>
            ) : (
              <>
                <GridCol />
                <TextCol />
              </>
            )}
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

export default ConstructionLogSectionAlt;
