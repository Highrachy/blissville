import React, { useState } from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import faqs from '@/data/faqs';
import Link from 'next/link';
import Image from 'next/image';
import { FaPlus, FaMinus, FaSearch } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';

/* ── Flat list of all categories for the tab bar ── */
const ALL_CATEGORY = 'All Topics';

// Helper to extract text from JSX for searching
const getTextFromJSX = (node) => {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(getTextFromJSX).join(' ');
  if (node.props && node.props.children) return getTextFromJSX(node.props.children);
  return '';
};

export default function FAQs() {
  const [activeCategory, setActiveCategory] = useState(faqs[0].name);
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const categories = [ALL_CATEGORY, ...faqs.map((f) => f.name)];

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearch(val);
    setOpenIndex(null);
    if (val.trim()) {
      setActiveCategory(ALL_CATEGORY);
    }
  };

  // Helper to highlight text
  const highlightText = (text, query) => {
    if (!query.trim() || typeof text !== 'string') return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={i} className="faq-highlight">
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Recursive highlighter for JSX
  const highlightJSX = (node, query) => {
    if (!query.trim()) return node;
    if (typeof node === 'string') return highlightText(node, query);
    if (Array.isArray(node)) return node.map((child, i) => <React.Fragment key={i}>{highlightJSX(child, query)}</React.Fragment>);
    if (React.isValidElement(node)) {
      return React.cloneElement(node, {
        children: highlightJSX(node.props.children, query)
      });
    }
    return node;
  };

  // Collect faqs to show based on active category + search
  const sourceFaqs =
    activeCategory === ALL_CATEGORY
      ? faqs.flatMap((g) => g.faqs)
      : faqs.find((g) => g.name === activeCategory)?.faqs || [];

  const filteredFaqs = search.trim()
    ? sourceFaqs.filter((f) => {
        const qText = typeof f.question === 'string' ? f.question : '';
        const aText = getTextFromJSX(f.answer);
        const query = search.toLowerCase();
        return qText.toLowerCase().includes(query) || aText.toLowerCase().includes(query);
      })
    : sourceFaqs;

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <>
      <SeoHead
        title="FAQs | Questions About Blissville Homes"
        description="Find answers to the most common questions about Blissville Terraces, our payment plans, property ownership process, smart home features, and Highrachy's real estate developments in Lagos and across Nigeria."
        canonical="https://www.blissville.com.ng/faqs"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
        keywords={[
          'Blissville FAQs',
          'Blissville Terraces questions',
          'Highrachy real estate FAQs',
          'Home ownership in Lagos',
          'Property payment plans Lagos',
          'Smart homes in Sangotedo',
          'Luxury homes Lagos FAQ',
          'Buying property in Nigeria',
          'Real estate developers Lagos',
          'Affordable homes Blissville',
        ]}
      />
      <Navigation />

      {/* Hero */}
      <div className="faq-hero">
        <div className="faq-hero__overlay" />
        <Image
          src="/assets/img/bg/about-us.jpeg"
          alt="Blissville FAQ"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="faq-hero__content container">
          <h1 className="faq-hero__title">Frequently Asked Questions</h1>
          <p className="faq-hero__sub">
            Clear answers to help you buy, plan, and own your home with confidence.
          </p>
          {/* Search bar */}
          <div className="faq-search-bar">
            <FaSearch className="faq-search-bar__icon" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={search}
              onChange={handleSearch}
              className="faq-search-bar__input"
            />
          </div>
        </div>
      </div>

      <main className="faq-main">
        {/* Category tabs */}
        <div className="faq-tabs-wrapper">
          <div className="container">
            <div className="faq-tabs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`faq-tab ${activeCategory === cat ? 'faq-tab--active' : ''}`}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null); setSearch(''); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container faq-body">
          <div className="faq-body__inner">
            {/* Section heading */}
            {!search && (
              <h2 className="faq-section-title">{activeCategory}</h2>
            )}
            {search && (
              <p className="faq-search-label">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
              </p>
            )}

            {/* Accordion */}
            <div className="faq-accordion">
              {filteredFaqs.length === 0 ? (
                <p className="faq-empty">No matching questions found.</p>
              ) : (
                filteredFaqs.map((faq, i) => (
                  <div key={i} className={`faq-item ${openIndex === i ? 'faq-item--open' : ''}`}>
                    <button
                      className="faq-item__question"
                      onClick={() => toggle(i)}
                      aria-expanded={openIndex === i}
                    >
                      <span>{highlightText(faq.question, search)}</span>
                      <span className="faq-item__icon">
                        {openIndex === i ? <FaMinus size={14} /> : <FaPlus size={14} />}
                      </span>
                    </button>
                    <div className="faq-item__answer">
                      <div className="faq-item__answer-inner">
                        {highlightJSX(faq.answer, search)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Still have questions CTA */}
            <div className="faq-still-help">
              <div className="faq-still-help__icon">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="faq-still-help__title">Still have questions?</h3>
              <p className="faq-still-help__text">Our team is here to guide you every step of the way.</p>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                <Link href="/contact-us" passHref>
                  <a className="btn btn-primary px-5 py-3 rounded-1 fw-semibold d-inline-flex align-items-center gap-2">
                    Contact Us <FaArrowRight size={14} />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
