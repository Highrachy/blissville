import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import {
  FaFileContract,
  FaShieldHalved,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaPrint,
  FaCircleCheck,
  FaTriangleExclamation,
  FaScaleBalanced,
  FaClock,
  FaLock,
  FaBan,
  FaHandshake,
  FaArrowRight,
  FaGavel,
  FaFileShield,
  FaCompass,
} from 'react-icons/fa6';

const TERMS_SECTIONS = [
  { id: 'sec-1', number: '01', title: 'About These Terms' },
  { id: 'sec-2', number: '02', title: 'Information Only, No Offer, No Reliance' },
  { id: 'sec-3', number: '03', title: 'Official Channels and Payment Warning' },
  { id: 'sec-4', number: '04', title: 'Permitted Use' },
  { id: 'sec-5', number: '05', title: 'Enquiries and Information You Submit' },
  { id: 'sec-6', number: '06', title: 'Accounts and Portals' },
  { id: 'sec-7', number: '07', title: 'Intellectual Property' },
  { id: 'sec-8', number: '08', title: 'Disclaimer and Availability' },
  { id: 'sec-9', number: '09', title: 'Limitation of Liability' },
  { id: 'sec-10', number: '10', title: 'Indemnity' },
  { id: 'sec-11', number: '11', title: 'Third Party Links' },
  { id: 'sec-12', number: '12', title: 'Changes' },
  { id: 'sec-13', number: '13', title: 'Governing Law and Disputes' },
  { id: 'sec-14', number: '14', title: 'General' },
  { id: 'sec-15', number: '15', title: 'Contact Information' },
];

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState('sec-1');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of TERMS_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="legal-page">
      <SeoHead
        title="Terms of Use | Highrachy Investment & Blissville"
        description="Official Terms of Use for Highrachy Investment and Technology Limited (RC 791587) and Blissville, governing use of highrachy.com and blissville.com.ng."
        canonical="https://www.blissville.com.ng/terms-of-use"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
        keywords={[
          'Highrachy terms of use',
          'Blissville terms of use',
          'Highrachy Investment and Technology Limited',
          'Blissville legal notice',
          'Lagos real estate legal terms',
          'RC 791587',
          'Highrachy official payment warning',
        ]}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Terms of Use - Highrachy & Blissville',
              description:
                'Terms of Use for Highrachy Investment and Technology Limited (RC 791587) and Blissville, governing highrachy.com and blissville.com.ng.',
              publisher: {
                '@type': 'Organization',
                name: 'Highrachy Investment and Technology Limited',
                url: 'https://www.highrachy.com',
                logo: 'https://www.blissville.com.ng/assets/img/highrachy-logo-dark.png',
              },
              datePublished: '2026-01-01',
              dateModified: '2026-10-16',
            }),
          }}
        />
      </Head>

      <Navigation />

      {/* Hero Section */}
      <header className="legal-hero">
        <div className="legal-hero__pattern" aria-hidden="true" />
        <div className="container position-relative">
          <p className="legal-hero__eyebrow">Blissville / Legal centre</p>
          <div className="legal-hero__badge">
            <FaFileContract aria-hidden="true" />
            <span>Highrachy Corporate Legal Document · RC 791587</span>
          </div>

          <h1 className="legal-hero__title">Terms of Use</h1>
          <div className="legal-hero__entity">
            Highrachy Investment and Technology Limited (RC 791587)
          </div>
          <p className="legal-hero__brand-note">
            <strong>Blissville</strong> is the residential real estate brand of
            Highrachy Investment and Technology Limited and is not a separate
            legal entity. These Terms govern your access and use of{' '}
            <a
              href="https://www.highrachy.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              highrachy.com
            </a>{' '}
            and{' '}
            <a
              href="https://www.blissville.com.ng"
              target="_blank"
              rel="noopener noreferrer"
            >
              blissville.com.ng
            </a>
            .
          </p>

          <div className="legal-hero__art" aria-hidden="true">
            <span className="legal-hero__art-index">02 / TERMS</span>
            <FaFileContract />
            <span className="legal-hero__art-caption">
              Clear terms.<br />Confident decisions.
            </span>
          </div>

          <div className="legal-hero__meta-strip">
            <div className="legal-hero__meta-item">
              <FaClock aria-hidden="true" />
              <div>Effective date<strong>01/01/2026</strong></div>
            </div>
            <div className="legal-hero__meta-item">
              <FaFileShield aria-hidden="true" />
              <div>Last updated<strong>16/10/2026</strong></div>
            </div>
            <div className="legal-hero__meta-item">
              <FaBuilding aria-hidden="true" />
              <div>Legal entity<strong>RC 791587</strong></div>
            </div>
            <div className="legal-hero__meta-item">
              <FaEnvelope aria-hidden="true" />
              <div>
                Corporate enquiries
                <a href="mailto:info@highrachy.com">
                  <strong>info@highrachy.com</strong>
                </a>
              </div>
            </div>
          </div>

          <div className="legal-hero__toolbar">
            <nav
              className="legal-hero__nav-tabs"
              aria-label="Legal Documents"
            >
              <Link href="/privacy-policy" passHref>
                <a className="legal-hero__tab">
                  <FaShieldHalved aria-hidden="true" />
                  <span>Privacy Policy</span>
                </a>
              </Link>
              <Link href="/terms-of-use" passHref>
                <a className="legal-hero__tab legal-hero__tab--active" aria-current="page">
                  <FaFileContract aria-hidden="true" />
                  <span>Terms of Use</span>
                </a>
              </Link>
            </nav>

            <div className="legal-hero__actions">
              <button
                type="button"
                onClick={handlePrint}
                className="legal-hero__print-btn"
                aria-label="Print or Save Terms of Use as PDF"
              >
                <FaPrint aria-hidden="true" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Executive Summary Highlights */}
      <section className="legal-summary" aria-label="Terms of Use Summary">
        <div className="container">
          <div className="legal-summary__heading">
            <h2>The essentials, at a glance.</h2>
            <p>A quick guide to the terms below.</p>
          </div>
          <div className="legal-summary__grid">
            <div className="legal-summary__card">
              <FaScaleBalanced aria-hidden="true" />
              <h3>Information Only</h3>
              <p>
                Website renderings, prices, and dates are indicative estimates.
                Binding terms arise strictly through signed agreements.
              </p>
            </div>
            <div className="legal-summary__card">
              <FaTriangleExclamation aria-hidden="true" />
              <h3>Payment Verification</h3>
              <p>
                Pay only into verified corporate accounts in the name of Highrachy.
                Never make payments to personal or unconfirmed accounts.
              </p>
            </div>
            <div className="legal-summary__card">
              <FaLock aria-hidden="true" />
              <h3>IP &amp; Permitted Use</h3>
              <p>
                Content is protected. Scraping, harvesting, phishing, unauthorised
                solicitation, and automated extraction are strictly prohibited.
              </p>
            </div>
            <div className="legal-summary__card">
              <FaGavel aria-hidden="true" />
              <h3>Governing Law</h3>
              <p>
                Governed by Nigerian law, with mandatory 30-day good faith dispute
                resolution and exclusive jurisdiction of Lagos State courts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky TOC */}
      <main className="legal-content-section">
        <div className="container">
          {/* Mobile Section Selector */}
          <div className="legal-mobile-nav">
            <label htmlFor="terms-mobile-select">
              Explore this document
            </label>
            <select
              id="terms-mobile-select"
              value={activeSection}
              onChange={(e) => {
                const el = document.getElementById(e.target.value);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(e.target.value);
                }
              }}
            >
              {TERMS_SECTIONS.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.number}. {sec.title}
                </option>
              ))}
            </select>
          </div>

          <div className="legal-layout">
            {/* Desktop Sticky Table of Contents */}
            <aside className="legal-toc" aria-label="Table of contents">
              <div className="legal-toc__header">
                <h3>Contents</h3>
                <span>15 Sections</span>
              </div>
              <ul className="legal-toc__list">
                {TERMS_SECTIONS.map((sec) => (
                  <li key={sec.id} className="legal-toc__item">
                    <a
                      href={`#${sec.id}`}
                      aria-current={activeSection === sec.id ? 'location' : undefined}
                      className={`legal-toc__link ${
                        activeSection === sec.id ? 'legal-toc__link--active' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(sec.id);
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          setActiveSection(sec.id);
                        }
                      }}
                    >
                      <span className="num">{sec.number}</span>
                      <span>{sec.title}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="legal-toc__dpo-box">
                <h4>Official Verification</h4>
                <p>
                  Verify bank details, agents, or property documentation directly:
                </p>
                <a href="mailto:info@highrachy.com">
                  <FaEnvelope aria-hidden="true" /> info@highrachy.com
                </a>
              </div>
            </aside>

            {/* Main Legal Content Article */}
            <article className="legal-article">
              {/* 1. About These Terms */}
              <section id="sec-1" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">01</span>
                  <h2 className="legal-section__title">About These Terms</h2>
                </div>
                <p>
                  These Terms of Use apply to your use of{' '}
                  <a
                    href="https://www.highrachy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.highrachy.com
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://www.blissville.com.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.blissville.com.ng
                  </a>{' '}
                  (the “Websites”), their enquiry forms and any online tool or portal
                  we operate. The Websites are operated by{' '}
                  <strong>Highrachy Investment and Technology Limited (RC 791587)</strong>{' '}
                  (“Highrachy”, “we”, “us” or “our”).
                </p>
                <p>
                  <strong>Blissville</strong> is the residential real estate brand of
                  Highrachy. It is not a separate legal entity. References to Blissville
                  are to that brand, and the contracting party for any sale, reservation
                  or service is Highrachy unless the signed agreement names another
                  entity.
                </p>
                <p>
                  By using a Website, you agree to these Terms. If you do not agree,
                  do not use it. These Terms govern use of the Websites only. They do
                  not replace any reservation form, offer letter, sale agreement,
                  investment agreement or service agreement signed with us, which will
                  govern the relevant transaction.
                </p>
              </section>

              {/* 2. Information Only, No Offer, No Reliance */}
              <section id="sec-2" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">02</span>
                  <h2 className="legal-section__title">
                    Information Only, No Offer, No Reliance
                  </h2>
                </div>
                <p>
                  The Websites give general information about Highrachy, Blissville
                  developments, investment opportunities and technology services.
                  They are not an offer, invitation, solicitation or prospectus, and
                  they are not financial, legal, tax or investment advice.
                </p>
                <p>
                  Renderings, photographs, illustrations, floor plans, masterplans,
                  specifications, dimensions, amenities, prices, payment plans,
                  availability, completion dates, testimonials and any statements
                  about appreciation, rental income or returns are indicative only.
                  They are artists’ impressions or estimates, may change without notice
                  and are not a warranty or promise. Property values can fall as well
                  as rise, and returns are not guaranteed.
                </p>
                <p>
                  Nothing on the Websites creates a reservation, sale or investment.
                  A binding transaction arises only through a written agreement signed
                  by an authorised signatory of Highrachy and receipt of the sums it
                  requires. No statement by a sales representative, agent or employee,
                  whether spoken, written or sent by message, varies these Terms or
                  binds Highrachy unless it is contained in that signed agreement, and
                  you should not rely on it. An enquiry, inspection request or expression
                  of interest does not guarantee availability or give you a right to buy.
                </p>
                <p>
                  You must carry out your own due diligence, including independent
                  verification of title, planning and development approvals, payment
                  terms and contractual obligations, and take independent professional
                  advice before you commit funds.
                </p>
              </section>

              {/* 3. Official Channels and Payment Warning */}
              <section id="sec-3" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">03</span>
                  <h2 className="legal-section__title">
                    Official Channels and Payment Warning
                  </h2>
                </div>

                <div className="legal-callout legal-callout--warning">
                  <FaTriangleExclamation aria-hidden="true" />
                  <div className="legal-callout__content">
                    <h5>Official Bank Account Verification Required</h5>
                    <p>
                      Pay only into the bank account named in your signed Highrachy
                      documents, which will always be in the corporate name of Highrachy.
                      We do not authorise payment into a personal account under any
                      circumstances.
                    </p>
                  </div>
                </div>

                <p>
                  Pay only into the bank account named in your signed Highrachy
                  documents, which will be in the corporate name of Highrachy. We do not
                  authorise payment into a personal account.
                </p>
                <p>
                  Deal only with agents and representatives whose authority Highrachy
                  has confirmed to you in writing. A website listing, social media
                  profile or business card does not establish authority. Before you pay,
                  or act on any change of bank details, verify the instruction by
                  contacting us at the email or telephone number in Section 15. Do not
                  rely on a message, email, call or social media account alone.
                </p>
                <p>
                  We are not responsible for money paid to any person or account that
                  is not named in our signed documents. Report suspected fraud or
                  impersonation to us immediately.
                </p>
              </section>

              {/* 4. Permitted Use */}
              <section id="sec-4" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">04</span>
                  <h2 className="legal-section__title">Permitted Use</h2>
                </div>
                <p>
                  You may use the Websites only for lawful purposes. You must not:
                </p>
                <div className="legal-category-grid">
                  <div className="legal-category-card">
                    <div className="legal-category-card__title">
                      <FaBan aria-hidden="true" />
                      <span>Scraping &amp; Data Harvesting</span>
                    </div>
                    <p className="legal-category-card__desc">
                      scrape, harvest or copy the Websites or the contact details of
                      our staff, clients or partners by automated or manual means, or
                      use data obtained from them for solicitation, spam or harassment;
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <div className="legal-category-card__title">
                      <FaBan aria-hidden="true" />
                      <span>Impersonation</span>
                    </div>
                    <p className="legal-category-card__desc">
                      impersonate Highrachy, Blissville, our staff or agents, or suggest
                      an affiliation or authority that does not exist;
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <div className="legal-category-card__title">
                      <FaBan aria-hidden="true" />
                      <span>Phishing &amp; Unauthorised Promotion</span>
                    </div>
                    <p className="legal-category-card__desc">
                      use the Websites for phishing, fraud or spam, or to advertise or
                      promote competing properties or services;
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <div className="legal-category-card__title">
                      <FaBan aria-hidden="true" />
                      <span>Security &amp; Malware Interference</span>
                    </div>
                    <p className="legal-category-card__desc">
                      introduce malware, exploit vulnerabilities, or interfere with the
                      security, operation or availability of the Websites;
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <div className="legal-category-card__title">
                      <FaBan aria-hidden="true" />
                      <span>False Submissions</span>
                    </div>
                    <p className="legal-category-card__desc">
                      submit false, misleading or unauthorised information through our
                      forms;
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <div className="legal-category-card__title">
                      <FaBan aria-hidden="true" />
                      <span>IP &amp; Statutory Infringement</span>
                    </div>
                    <p className="legal-category-card__desc">
                      infringe intellectual property rights or breach any law.
                    </p>
                  </div>
                </div>

                <p>
                  We may investigate misuse, restrict access, remove submissions and
                  report suspected unlawful conduct to the authorities.
                </p>
              </section>

              {/* 5. Enquiries and Information You Submit */}
              <section id="sec-5" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">05</span>
                  <h2 className="legal-section__title">
                    Enquiries and Information You Submit
                  </h2>
                </div>
                <p>
                  You must give accurate information, keep it current, and have
                  authority to give any information that concerns another person.
                  Submitting an enquiry does not create a reservation, a client
                  relationship or an agency relationship with us.
                </p>
                <div className="legal-callout legal-callout--info">
                  <FaShieldHalved aria-hidden="true" />
                  <div className="legal-callout__content">
                    <h5>Secure Transmission Protocol</h5>
                    <p>
                      Do not send passwords, banking credentials, card security codes,
                      identity documents or other sensitive information through the
                      Websites or ordinary messages unless we have directed you to a
                      secure channel.
                    </p>
                  </div>
                </div>
                <p>
                  Our handling of personal data is described in our{' '}
                  <Link href="/privacy-policy">
                    <a>Privacy Policy</a>
                  </Link>
                  . These Terms are not a request for consent to processing.
                </p>
              </section>

              {/* 6. Accounts and Portals */}
              <section id="sec-6" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">06</span>
                  <h2 className="legal-section__title">Accounts and Portals</h2>
                </div>
                <p>
                  Where we give you access to a customer portal or online tool, you
                  must keep your login details confidential and you are responsible
                  for activity under your account. We may suspend or end access at any
                  time to protect security, prevent misuse or comply with law.
                  Additional terms may apply and will be made available to you.
                </p>
              </section>

              {/* 7. Intellectual Property */}
              <section id="sec-7" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">07</span>
                  <h2 className="legal-section__title">Intellectual Property</h2>
                </div>
                <p>
                  All content on the Websites, including text, photographs, graphics,
                  floor plans, videos, designs, project materials and software, belongs
                  to Highrachy or its licensors. The Highrachy and Blissville names and
                  logos are our brands.
                </p>
                <p>
                  We give you a limited licence to view and print pages for your own
                  personal, non-commercial enquiry about our properties and services.
                  You must not reproduce, distribute, frame, modify, publish or use any
                  content commercially, or remove proprietary notices, without our prior
                  written consent. Materials belonging to third parties remain their
                  property.
                </p>
                <p>
                  We may use content you submit to respond to your enquiry and operate
                  our business, in line with our{' '}
                  <Link href="/privacy-policy">
                    <a>Privacy Policy</a>
                  </Link>
                  .
                </p>
              </section>

              {/* 8. Disclaimer and Availability */}
              <section id="sec-8" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">08</span>
                  <h2 className="legal-section__title">
                    Disclaimer and Availability
                  </h2>
                </div>
                <p>
                  The Websites are provided <strong>“as is”</strong> and{' '}
                  <strong>“as available”</strong>. We do not warrant that their content
                  is accurate, complete or current, or that they will be uninterrupted
                  or free of errors or harmful code. We may change, suspend or withdraw
                  any part of the Websites at any time.
                </p>
              </section>

              {/* 9. Limitation of Liability */}
              <section id="sec-9" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">09</span>
                  <h2 className="legal-section__title">Limitation of Liability</h2>
                </div>
                <p>
                  To the fullest extent permitted by law, Highrachy and its directors,
                  officers, employees and authorised agents are not liable for any loss
                  or damage, whether direct, indirect, incidental, consequential or
                  punitive, including loss of profit or opportunity, arising from your
                  use of or reliance on the Websites or their content, any
                  interruption, any third party site, or any payment made to a person or
                  account not named in our signed documents.
                </p>
                <p>
                  Nothing in these Terms excludes liability for fraud, death or personal
                  injury, or any liability that cannot lawfully be excluded. Rights and
                  obligated terms under a signed agreement with us are governed by that
                  agreement.
                </p>
              </section>

              {/* 10. Indemnity */}
              <section id="sec-10" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">10</span>
                  <h2 className="legal-section__title">Indemnity</h2>
                </div>
                <p>
                  You agree to indemnify Highrachy against any loss, claim or expense,
                  including reasonable legal fees, arising from your breach of these
                  Terms, your unlawful use of the Websites or your infringement of any
                  third party right.
                </p>
              </section>

              {/* 11. Third Party Links */}
              <section id="sec-11" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">11</span>
                  <h2 className="legal-section__title">Third Party Links</h2>
                </div>
                <p>
                  The Websites may link to third party websites, social media
                  platforms and payment or other services. We provide links for
                  convenience, do not control or endorse those services, and are not
                  responsible for their content, availability, security or privacy
                  practices.
                </p>
              </section>

              {/* 12. Changes */}
              <section id="sec-12" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">12</span>
                  <h2 className="legal-section__title">Changes</h2>
                </div>
                <p>
                  We may change these Terms at any time. The updated version takes
                  effect when posted with its revised date, and continued use of a
                  Website means you accept it. Changes do not amend a signed agreement.
                </p>
              </section>

              {/* 13. Governing Law and Disputes */}
              <section id="sec-13" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">13</span>
                  <h2 className="legal-section__title">
                    Governing Law and Disputes
                  </h2>
                </div>
                <p>
                  These Terms are governed by the laws of the Federal Republic of
                  Nigeria.
                </p>
                <div className="legal-callout legal-callout--info">
                  <FaScaleBalanced aria-hidden="true" />
                  <div className="legal-callout__content">
                    <h5>Mandatory Pre-Action Protocol</h5>
                    <p>
                      Before starting court proceedings, the parties will try in good
                      faith to resolve a dispute by written notice and discussion for 30
                      days, except where urgent relief is needed. Subject to that, you
                      submit to the exclusive jurisdiction of the courts of Lagos State,
                      and Highrachy may bring proceedings in any court of competent
                      jurisdiction.
                    </p>
                  </div>
                </div>
              </section>

              {/* 14. General */}
              <section id="sec-14" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">14</span>
                  <h2 className="legal-section__title">General</h2>
                </div>
                <p>
                  If any part of these Terms is unenforceable, the rest continues in
                  effect. Our failure to enforce a right is not a waiver of it. You may
                  not assign your rights under these Terms without our written consent.
                  We may assign or transfer ours in a restructuring, sale or transfer of
                  business or project.
                </p>
                <p>
                  These Terms, with our{' '}
                  <Link href="/privacy-policy">
                    <a>Privacy Policy</a>
                  </Link>
                  , are the whole agreement between us about use of the Websites. They do
                  not set the terms of any property, investment or service transaction,
                  which are governed by the signed agreement.
                </p>
              </section>

              {/* 15. Contact */}
              <section id="sec-15" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">15</span>
                  <h2 className="legal-section__title">Contact</h2>
                </div>
                <p>
                  If you have questions regarding these Terms of Use, please reach out
                  through our registered corporate contact channels:
                </p>

                <div className="legal-contact-card">
                  <h4>Highrachy Investment and Technology Limited</h4>
                  <div className="legal-contact-card__sub">
                    Incorporated under the laws of the Federal Republic of Nigeria · RC
                    791587
                  </div>

                  <div className="legal-contact-card__grid">
                    <div className="legal-contact-card__item">
                      <small>Registered Office</small>
                      <p>
                        Ibukun House, No. 70 Adetokunbo Ademola Street, Victoria Island,
                        Lagos, Nigeria
                      </p>
                    </div>

                    <div className="legal-contact-card__item">
                      <small>Corporate Email</small>
                      <a href="mailto:info@highrachy.com">info@highrachy.com</a>
                    </div>

                    <div className="legal-contact-card__item">
                      <small>Telephone Hotline</small>
                      <a href="tel:+2349055555146">+234 905 555 5146</a>
                    </div>
                  </div>

                  <div className="legal-contact-card__footer">
                    <strong>Enquiry Classification:</strong> Please state clearly
                    whether your enquiry concerns the <strong>Highrachy</strong> or the{' '}
                    <strong>Blissville</strong> Website.
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
