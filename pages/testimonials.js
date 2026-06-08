import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import { FaStar, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';

// ─── Data ───────────────────────────────────────────────────────────────────

const STATS = [
  { value: '500+', label: 'RESIDENTS' },
  { value: '20%', label: 'ROI TARGET' },
  { value: '24/7', label: 'SMART SECURITY' },
];

const FEATURED_QUOTES = [
  {
    quote: "The smart integration isn't just a gadget; it's a lifestyle shift. Our home finally works for us.",
    text: "We moved into Blissville Terraces six months ago and the difference in quality of life is immeasurable. The security, the smart systems, and the community of like-minded professionals make every day feel like a retreat.",
    author: "Dr. Jonathan Mason",
    title: "Entrepreneur & Blissville Resident",
    avatar: "/assets/img/testimonials/2.jpeg",
    image: "/assets/img/home/dream-home.jpg"
  },
  {
    quote: "High-yield investment with zero-stress management. Blissville is my top performing asset.",
    text: "As a diaspora investor based in London, trust and execution were my primary concerns. Highrachy didn't just deliver on time; the capital appreciation at my Sangotedo unit has already exceeded 25% within 18 months.",
    author: "Chief Emeka Nnamdi",
    title: "Executive Director & Diaspora Investor",
    avatar: "/assets/img/team/nnamdi.jpg",
    image: "/assets/img/bg/invest-now.jpeg"
  }
];

const communityVoices = [
  {
    stars: 5,
    text: "The attention to architectural detail in my 4-Bedroom Blissville Terrace is unmatched. The high ceilings and luxury finishing make coming home everyday feel like a premium Lekki retreat.",
    name: 'Grace Adeyemi',
    title: 'Homeowner, Terraces',
    initials: 'GA',
    color: '#1f4e9f', // deep brand blue
  },
  {
    stars: 5,
    text: "As an investor based in the UK, sending money back home for projects is usually scary. Highrachy changed that. The capital appreciation at my Blissville Sangotedo unit has already exceeded 25%!",
    name: 'Steve Thompson',
    title: 'Real Estate Investor',
    initials: 'ST',
    color: '#d97706', // amber
  },
  {
    stars: 5,
    text: "Finally, a home builder in Lagos that understands smart integration! The automated access control and 24/7 solar hybrid power supply at Blissville is a absolute game-changer for my family.",
    name: 'Hallmark Aliyu',
    title: 'Resident, Blissville Apartments',
    initials: 'HA',
    color: '#009e45', // brand green
  },
];

const galleryImages = [
  { src: '/assets/img/testimonials/1.jpeg', alt: 'Wave pattern ceiling', className: 'tm-gallery-wavy' },
  { src: '/assets/img/bg/invest-now.jpeg', alt: 'City skyline at dusk', className: 'tm-gallery-sunset' },
  { src: '/assets/img/home/clc-gate.jpg', alt: 'Luxury wardrobe', className: 'tm-gallery-wardrobe' },
  { src: '/assets/img/testimonials/3.jpeg', alt: 'Resort pool', className: 'tm-gallery-pool' },
  { src: '/assets/img/testimonials/2.jpeg', alt: 'Armchair next to window', className: 'tm-gallery-armchair' },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function TestimonialsPage() {
  const [activeQuoteIdx, setActiveQuoteIdx] = useState(0);
  const activeQuote = FEATURED_QUOTES[activeQuoteIdx];

  return (
    <>
      <SeoHead
        title="Testimonials | Blissville by Highrachy"
        description="Read what Blissville homeowners and investors are saying about our delivery, quality, and customer experience."
        canonical="https://www.blissville.com.ng/testimonials"
      />
      <Navigation />

      {/* ═══════ HERO ═══════ */}
      <section className="tm-hero py-5 py-lg-7 bg-white">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">

            {/* Left: text */}
            <div className="col-lg-6">
              <div className="d-flex align-items-center mb-3">
                {/* Reused global eyebrow class from investors page */}
                <span className="eyebrow text-uppercase">
                  ● STORIES FROM HAPPY HOMEOWNERS
                </span>
              </div>
              <h1 className="display-4 fw-bold lh-sm mb-4" style={{ color: '#051d43', fontFamily: 'var(--font-secondary, Jost, sans-serif)' }}>
                Stories from<br />
                Happy<br />
                Homeowners
              </h1>
              <p className="text-muted mb-5 fs-5 lh-base" style={{ maxWidth: '480px' }}>
                Over 500 families have found their future in Blissville&apos;s smart-integrated communities. We don&apos;t just build houses; we curate lifestyles.
              </p>

              {/* Stats Block (Borderless horizontal spacing aligned with /investors) */}
              <div className="tm-stat-container mb-4">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="tm-stat-item">
                    <div className="tm-stat-value">{value}</div>
                    <div className="tm-stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: hero image + verified card */}
            <div className="col-lg-6 position-relative">
              <div className="position-relative w-100">
                <div className="tm-img-rounded-mockup">
                  <Image
                    src="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-3.jpg"
                    alt="Blissville luxury townhouse facade"
                    width={620}
                    height={520}
                    layout="responsive"
                    objectFit="cover"
                    priority
                  />
                </div>
                
                {/* FLOATING RESIDENT INFO CARD */}
                <div className="tm-info-card">
                  <div className="tm-hero-avatars-capsule">
                    {/* Add actual resident profile avatars */}
                    <div className="tm-avatar-grey">
                      <Image src="/assets/img/testimonials/1.jpeg" alt="Resident avatar silhouette 1" width={32} height={32} objectFit="cover" />
                    </div>
                    <div className="tm-avatar-grey">
                      <Image src="/assets/img/testimonials/2.jpeg" alt="Resident avatar silhouette 2" width={32} height={32} objectFit="cover" />
                    </div>
                    <div className="tm-avatar-blue-plus">+500</div>
                  </div>
                  <div className="tm-info-text">
                    <span className="tm-info-title">Elena Rodriguez</span>
                    <span className="tm-info-sub">Interior Designer</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════ FEATURED QUOTE SLIDER (DARK MODE COMPLIANT) ═══════ */}
      <section className="tm-quote-section-bg py-6 py-lg-7">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">

            {/* Quote block */}
            <div className="col-lg-6 order-lg-1 order-2">
              <div className="tm-quote-marks">&ldquo;</div>
              <blockquote className="blockquote mb-4 animate-fade-in">
                <p className="tm-blockquote-text">
                  {activeQuote.quote}
                </p>
              </blockquote>
              <p className="text-muted mb-4 lh-base" style={{ fontSize: '0.95rem' }}>
                {activeQuote.text}
              </p>
              
              <div className="d-flex align-items-center gap-3 mt-4">
                <Image
                  src={activeQuote.avatar}
                  alt={activeQuote.author}
                  width={52}
                  height={52}
                  className="tm-author-avatar-square"
                />
                <div className="d-flex flex-column">
                  <span className="tm-author-name">{activeQuote.author}</span>
                  <span className="tm-author-title">{activeQuote.title}</span>
                </div>
              </div>

              {/* Quotes Slider Navigation Controls */}
              <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveQuoteIdx((prev) => (prev === 0 ? FEATURED_QUOTES.length - 1 : prev - 1))}
                  className="tm-slider-btn"
                  aria-label="Previous quote"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => setActiveQuoteIdx((prev) => (prev === FEATURED_QUOTES.length - 1 ? 0 : prev + 1))}
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
                      className={`tm-slider-dot ${activeQuoteIdx === idx ? 'active' : ''}`}
                      style={{ border: 'none', padding: 0 }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="col-lg-5 order-lg-2 order-1 offset-lg-1">
              <div className="tm-img-rounded-mockup" style={{ minHeight: '440px' }}>
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
        </div>
      </section>

      {/* ═══════ COMMUNITY VOICES ═══════ */}
      <section className="py-6 py-lg-7 bg-white">
        <div className="container">

          {/* Localized Headings to align with Nigerians and Blissville */}
          <div className="row align-items-end mb-5">
            <div className="col-md-7">
              <div className="d-flex align-items-center mb-3">
                {/* Reused global eyebrow class from investors page */}
                <span className="eyebrow text-uppercase">
                  ● GOOGLE REVIEWS &amp; NIGERIAN TESTIMONIALS
                </span>
              </div>
              <h2 className="fw-bold" style={{ color: '#051d43', fontFamily: 'var(--font-secondary, Jost, sans-serif)', fontSize: '2.25rem' }}>
                Loved by Nigerians, Trusted by Investors
              </h2>
            </div>
            <div className="col-md-5 text-md-end mt-3 mt-md-0">
              <p className="text-muted mb-0 fs-6" style={{ maxWidth: '420px', marginLeft: 'auto' }}>
                With a 4.9★ rating on Google Reviews, our homeowners and diaspora investors trust us to deliver exceptional, smart-integrated spaces in Lagos.
              </p>
            </div>
          </div>

          <div className="row g-4">
            {communityVoices.map(({ stars, text, name, title, initials, color }, idx) => (
              <div key={idx} className="col-md-4">
                <div className="tm-voice-card-premium">
                  <div>
                    {/* Creative rating stars and Google Review tag */}
                    <div className="d-flex align-items-center justify-content-between mb-3">
                      <div className="d-flex gap-1">
                        {[...Array(stars)].map((_, i) => (
                          <FaStar key={i} size={14} className="tm-star-green" />
                        ))}
                      </div>
                      <span className="text-muted fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '0.06em' }}>
                        GOOGLE REVIEW
                      </span>
                    </div>
                    <p className="tm-card-text">&ldquo;{text}&rdquo;</p>
                  </div>
                  
                  {/* Google Profile-style initials and Name beside it */}
                  <div className="tm-card-footer-simple">
                    <div className="d-flex align-items-center gap-3">
                      <div 
                        className="d-flex align-items-center justify-content-center text-white fw-bold rounded-circle tm-google-avatar-shadow"
                        style={{ 
                          width: '42px', 
                          height: '42px', 
                          backgroundColor: color, 
                          fontSize: '0.85rem',
                          letterSpacing: '0.05em',
                          flexShrink: 0
                        }}
                      >
                        {initials}
                      </div>
                      <div>
                        <div className="tm-card-author-name">{name}</div>
                        <div className="tm-card-author-title">{title}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ═══════ VISUAL SPACES GALLERY ═══════ */}
      <section className="tm-gallery-section-bg py-6 py-lg-7">
        <div className="container">
          <div className="tm-gallery-grid-custom">
            {galleryImages.map(({ src, alt, className }) => (
              <div key={src} className={`tm-gallery-item-custom ${className}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CTA SECTION ═══════ */}
      <section className="py-6 py-lg-7 bg-white">
        <div className="container">
          <div className="row g-4 align-items-stretch">

            {/* Left CTA */}
            <div className="col-lg-6 d-flex flex-column justify-content-between py-2">
              <div>
                <h2 className="fw-bold mb-3" style={{ color: '#051d43', fontFamily: 'var(--font-secondary, Jost, sans-serif)', fontSize: '2.5rem' }}>
                  See more<br />homeowner stories
                </h2>
                <p className="text-muted mb-4 lh-base fs-5" style={{ maxWidth: '480px' }}>
                  Join our growing community and witness the everyday moments that make Blissville special — because extraordinary living starts here.
                </p>
              </div>
              <div>
                <span className="tm-hashtag">#BlissvilleWay</span>
                <div className="d-flex gap-3">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="tm-social-link-custom" aria-label="Instagram">
                    <FaInstagram size={18} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="tm-social-link-custom" aria-label="LinkedIn">
                    <FaLinkedin size={18} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="tm-social-link-custom" aria-label="YouTube">
                    <FaYoutube size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right CTA card */}
            <div className="col-lg-6">
              <div className="tm-cta-card-navy">
                <div className="mb-5">
                  <h3 className="fw-bold text-white mb-3" style={{ fontFamily: 'var(--font-secondary, Jost, sans-serif)', fontSize: '2rem' }}>
                    Start your own<br />story
                  </h3>
                  <p className="text-white-50 mb-4 lh-base" style={{ fontSize: '1.05rem', maxWidth: '420px' }}>
                    Schedule a private tour of the ready-to-move-in apartments. Our experts will guide your every step.
                  </p>
                </div>
                <Link href="/contact-us" passHref>
                  <a className="btn tm-cta-btn-green">
                    <span>Book a Private Tour</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
