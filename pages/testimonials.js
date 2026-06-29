import React, { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import Button from '@/components/forms/Button';
import { FaStar } from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import Section from '@/components/common/Section';
import JoinVision from '@/components/investors/joinVision';
import { communityVoices, FEATURED_QUOTES } from '@/data/testimonials';

export function SuccessStoriesSection() {
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const activeQuote = FEATURED_QUOTES[activeQuoteIdx];

  return (
    <Section className="tm-success-section" biggerPadding>
      <div className="container">
        <div className="text-center tm-section-intro">
          <h2 className="display-5 fw-semibold text-primary-700 lh-sm mb-1">
            Success Stories
          </h2>

          <div className="text-dark-700 h4 fw-normal mb-7">
            Hear directly from homeowners and investors
          </div>
        </div>
        <div className="row align-items-center g-4 g-lg-5 g-xl-6">
          <div className="col-lg-6">
            <div className="pe-2">
              <div className="tm-quote-media-card rounded-4 overflow-hidden shadow-sm">
                <Image
                  src={activeQuote.image}
                  alt="Premium property interior render"
                  width={480}
                  height={540}
                  layout="responsive"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="tm-quote-panel">
              <div className="tm-quote-marks">&ldquo;</div>

              <blockquote className="blockquote mb-4">
                <p className="tm-blockquote-text">{activeQuote.quote}</p>
              </blockquote>

              <p className="tm-quote-copy">{activeQuote.text}</p>

              <div className="mt-4">
                <h5 className="fw-bold text-primary-700 mb-1">
                  {activeQuote.author}
                </h5>

                <div className="text-dark-700 mb-4">
                  {activeQuote.buyerType}
                </div>
              </div>

              <div className="tm-slider-controls">
                <button
                  type="button"
                  onClick={() =>
                    setActiveQuoteIdx((prev) =>
                      prev === 0 ? FEATURED_QUOTES.length - 1 : prev - 1,
                    )
                  }
                  className="tm-slider-btn"
                  aria-label="Previous quote"
                >
                  ←
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActiveQuoteIdx((prev) =>
                      prev === FEATURED_QUOTES.length - 1 ? 0 : prev + 1,
                    )
                  }
                  className="tm-slider-btn"
                  aria-label="Next quote"
                >
                  →
                </button>

                <div className="d-flex gap-2 ms-2">
                  {FEATURED_QUOTES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveQuoteIdx(idx)}
                      className={`tm-slider-dot${activeQuoteIdx === idx ? ' active' : ''}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function TestimonialsPage() {
  const handleJoinVisionClick = (event) => {
    event.preventDefault();

    if (typeof document === 'undefined') {
      return;
    }

    const joinVisionSection = document.getElementById('join-our-vision');

    if (joinVisionSection) {
      joinVisionSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <SeoHead
        title="Testimonials | Blissville by Highrachy"
        description="Read what Blissville homeowners and investors are saying about our delivery, quality, and customer experience."
        canonical="https://www.blissville.com.ng/testimonials"
      />
      <Navigation />

      <main className="tm-page">
        <Section className="tm-hero-section bg-gray-50" biggerPadding>
          <Container>
            <Row className="align-items-center g-5 g-xl-6">
              <Col lg={6}>
                <div className="d-flex align-items-center mb-4">
                  <span className="tm-impact-badge">The Blissville Impact</span>
                </div>
                <h1 className="display-5 fw-semibold text-dark-800 lh-sm mb-4">
                  Real Stories.
                  <br />
                  Real Investments.
                  <br />
                  <span className="text-primary-700">Real Peace of Mind.</span>
                </h1>

                <p className="tm-hero-copy lead mb-4">
                  Every Blissville homeowner has a different story. Some wanted
                  security for their family. Others wanted to protect wealth
                  against inflation. Many simply wanted a home they could truly
                  be proud of.
                </p>

                <div className="d-flex flex-wrap align-items-center gap-3">
                  <Button
                    color="primary"
                    className="tm-hero-btn px-4 py-3 d-inline-flex align-items-center gap-2"
                    href="#join-our-vision"
                    onClick={handleJoinVisionClick}
                  >
                    Join Our Vision <FaArrowRight size={12} />
                  </Button>
                </div>
              </Col>

              <Col lg={6}>
                <div className="position-relative tm-hero-visual">
                  <div className="tm-hero-media-card">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/assets/img/testimonials/happy-testimonial.jpg"
                      alt="Blissville happy homeowners"
                      width={560}
                      height={560}
                      className="w-100 h-100 img-cover"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Section>

        <SuccessStoriesSection />

        <Section className="tm-community-section unit-section" biggerPadding>
          <div className="container">
            <div className="row mb-5">
              <div className="col-12">
                <h2 className="fw-extrabold h1 h1-md text-darker">
                  Loved by
                  <span className="text-primary-600"> Nigerians,</span>
                  <br />
                  Trusted by
                  <span className="text-secondary-700"> Smart Investors</span>
                </h2>
                <div className="d-flex align-items-center gap-2">
                  <span className="tm-rating-summary text-md fw-semibold">
                    4.8 Average (20+ Google Reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="row g-4">
              {communityVoices.map(
                ({ stars, text, name, title, initials }, idx) => (
                  <div key={idx} className="col-md-4">
                    <div className="tm-voice-card-premium position-relative">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <div className="tm-google-badge">G</div>
                        <div className="tm-verified-badge" aria-hidden="true">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                      </div>

                      <div className="d-flex gap-1 mb-3">
                        {[...Array(stars)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={15}
                            className="tm-review-star"
                          />
                        ))}
                      </div>

                      <p className="tm-review-text">&ldquo;{text}&rdquo;</p>

                      <div className="tm-review-footer d-flex align-items-center gap-3 mt-4 pt-3 border-top">
                        <div className="tm-review-avatar">{initials}</div>
                        <div>
                          <div className="tm-review-name">{name}</div>
                          <div className="tm-review-title">{title}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </Section>

        <JoinVision />
      </main>

      <Footer />
    </>
  );
}
