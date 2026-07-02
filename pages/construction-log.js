import React, { useState, useEffect, useRef } from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import { Container } from 'react-bootstrap';
import ConstructionLogSection from '@/components/construction-log/ConstructionLogSection';
import ConstructionLogSectionAlt from '@/components/construction-log/ConstructionLogSectionAlt';
import { CONSTRUCTION_LOG_FILTERS } from '@/data/construction-log/filters';
import PROJECT_GALLERIES from '@/data/construction-log';

// =============================================================================
// Filter navigation bar (sliding ink underline)
// =============================================================================
function FilterNav({ active, onChange }) {
  const barRef = useRef(null);
  const activeRef = useRef(null);
  const [inkStyle, setInkStyle] = useState({});

  useEffect(() => {
    const el = activeRef.current;
    const bar = barRef.current;
    if (!el || !bar) return;
    const barRect = bar.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setInkStyle({
      width: elRect.width,
      transform: `translateX(${elRect.left - barRect.left}px)`,
    });
  }, [active]);

  return (
    <div className="cl-filter-bar">
      <Container>
        <nav
          className="cl-filter-bar__nav"
          ref={barRef}
          aria-label="Construction log filters"
        >
          {CONSTRUCTION_LOG_FILTERS.map(({ id, label }) => (
            <button
              key={id}
              id={`cl-filter-${id}`}
              ref={active === id ? activeRef : null}
              type="button"
              className={`cl-filter-bar__btn${active === id ? ' active' : ''}`}
              onClick={() => onChange(id)}
              aria-pressed={active === id}
            >
              {label}
            </button>
          ))}
          <span className="cl-filter-bar__ink" style={inkStyle} aria-hidden />
        </nav>
      </Container>
    </div>
  );
}

// =============================================================================
// Hero section
// =============================================================================
function HeroSection() {
  return (
    <section className="cl-hero" aria-labelledby="cl-hero-heading">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1.jpg"
        alt="Blissville Terraces at dusk"
        className="cl-hero__bg"
        aria-hidden
      />
      <div className="cl-hero__overlay" aria-hidden />

      <Container className="cl-hero__content">
        <span className="cl-hero__eyebrow">
          <span className="cl-hero__eyebrow-dot" aria-hidden />
          The Blissville Terraces Journey
        </span>

        <h1 className="cl-hero__title" id="cl-hero-heading">
          Construction
          <br />
          <span className="cl-hero__title-accent">Log</span>
        </h1>

        <p className="cl-hero__subtitle">
          An editorial chronicle of Blissville Terraces&mdash;where structural
          integrity meets visionary design. Follow the journey from
          groundbreaking to grand unveiling.
        </p>
      </Container>

      <div className="cl-hero__scroll-cue" aria-hidden>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </section>
  );
}

// =============================================================================
// Page
// =============================================================================
export default function ConstructionLogPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const visibleSections = PROJECT_GALLERIES.filter((section) => {
    if (activeFilter === 'all') {
      return true;
    }

    if (Array.isArray(section.filter)) {
      return section.filter.includes(activeFilter);
    }

    return section.filter === activeFilter;
  });

  return (
    <>
      <SeoHead
        title="Construction Log | Blissville Terraces by Highrachy"
        description="Follow the Blissville Terraces journey from groundbreaking to grand unveiling — an editorial chronicle of structural integrity meets visionary design."
        canonical="https://www.blissville.com.ng/construction-log"
      />

      <Navigation />

      <main className="cl-page">
        <HeroSection />

        <FilterNav active={activeFilter} onChange={setActiveFilter} />

        {visibleSections.length > 0 ? (
          visibleSections.map((section) => {
            const sharedProps = {
              id: section.id,
              reversed: !!section.reversed,
              category: section.title,
              date: section.label ?? section.date,
              heading: section.heading,
              subheading: section.subheading,
              description: section.description,
              gallery: section.images,
            };

            if (section.type === 'primary') {
              return (
                <ConstructionLogSection key={section.id} {...sharedProps} />
              );
            }

            return (
              <ConstructionLogSectionAlt
                key={section.id}
                {...sharedProps}
                quote={section.quote}
              />
            );
          })
        ) : (
          <div className="cl-empty">
            <Container>
              <p className="cl-empty__text">
                No updates available for this category yet. Check back soon.
              </p>
            </Container>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
