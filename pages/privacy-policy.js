import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import SeoHead from '@/components/utils/SeoHead';
import {
  FaShieldHalved,
  FaFileContract,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaPrint,
  FaCircleCheck,
  FaTriangleExclamation,
  FaScaleBalanced,
  FaUserShield,
  FaGlobe,
  FaLock,
  FaClock,
  FaIdCard,
  FaHouseSignal,
  FaUsers,
  FaArrowRight,
  FaFileShield,
} from 'react-icons/fa6';

const SECTIONS = [
  { id: 'sec-1', number: '01', title: 'Who We Are and Scope' },
  { id: 'sec-2', number: '02', title: 'Data We Collect' },
  { id: 'sec-3', number: '03', title: 'Why We Use Data & Lawful Bases' },
  { id: 'sec-4', number: '04', title: 'AML & Regulatory Reporting' },
  { id: 'sec-5', number: '05', title: 'Joint Purchasers & Nominees' },
  { id: 'sec-6', number: '06', title: 'Marketing, Cookies & Advertising' },
  { id: 'sec-7', number: '07', title: 'Who We Share Data With' },
  { id: 'sec-8', number: '08', title: 'Transfers Outside Nigeria' },
  { id: 'sec-9', number: '09', title: 'Security and Breaches' },
  { id: 'sec-10', number: '10', title: 'Data Retention Schedule' },
  { id: 'sec-11', number: '11', title: 'Your Statutory Rights' },
  { id: 'sec-12', number: '12', title: 'Other Sites, Changes & Contact' },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('sec-1');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of SECTIONS) {
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
        title="Privacy Policy | Highrachy Investment & Blissville"
        description="Official Privacy Policy for Highrachy Investment and Technology Limited (RC 791587) and Blissville, compliant with the Nigeria Data Protection Act 2023 (NDPA)."
        canonical="https://www.blissville.com.ng/privacy-policy"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
        keywords={[
          'Highrachy privacy policy',
          'Blissville privacy policy',
          'Nigeria Data Protection Act 2023',
          'NDPA compliance real estate',
          'NDPC data controller Nigeria',
          'Highrachy Investment and Technology Limited',
          'Blissville data protection',
          'Lagos real estate privacy policy',
        ]}
      />

      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Privacy Policy - Highrachy & Blissville',
              description:
                'Official Privacy Policy for Highrachy Investment and Technology Limited and Blissville under the Nigeria Data Protection Act 2023.',
              publisher: {
                '@type': 'Organization',
                name: 'Highrachy Investment and Technology Limited',
                url: 'https://www.highrachy.com',
                logo: 'https://www.blissville.com.ng/assets/img/highrachy-logo-dark.png',
              },
              datePublished: '2026-10-01',
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
            <FaShieldHalved aria-hidden="true" />
            <span>NDPA 2023 · NDPC Regulated Data Controller</span>
          </div>

          <h1 className="legal-hero__title">Privacy Policy</h1>
          <div className="legal-hero__entity">
            Highrachy Investment and Technology Limited (RC 791587)
          </div>
          <p className="legal-hero__brand-note">
            <strong>Blissville</strong> is our residential real estate brand and
            is not a separate legal entity. This Policy explains how we handle
            personal data under the Nigeria Data Protection Act 2023 (NDPA), the
            General Application and Implementation Directive, and other
            instruments issued by the Nigeria Data Protection Commission (NDPC).
          </p>

          <div className="legal-hero__art" aria-hidden="true">
            <span className="legal-hero__art-index">01 / PRIVACY</span>
            <FaShieldHalved />
            <span className="legal-hero__art-caption">
              Your trust.<br />Our priority.
            </span>
          </div>

          <div className="legal-hero__meta-strip">
            <div className="legal-hero__meta-item">
              <FaClock aria-hidden="true" />
              <div>Effective date<strong>01/10/2026</strong></div>
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
                Data protection
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
                <a className="legal-hero__tab legal-hero__tab--active" aria-current="page">
                  <FaShieldHalved aria-hidden="true" />
                  <span>Privacy Policy</span>
                </a>
              </Link>
              <Link href="/terms-of-use" passHref>
                <a className="legal-hero__tab">
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
                aria-label="Print or Save Privacy Policy as PDF"
              >
                <FaPrint aria-hidden="true" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Executive Summary Highlights */}
      <section className="legal-summary" aria-label="Executive Privacy Summary">
        <div className="container">
          <div className="legal-summary__heading">
            <h2>The essentials, at a glance.</h2>
            <p>A quick guide to the policy below.</p>
          </div>
          <div className="legal-summary__grid">
            <div className="legal-summary__card">
              <FaUserShield aria-hidden="true" />
              <h3>Comprehensive Scope</h3>
              <p>
                Covers website visitors, prospective and existing buyers,
                investors, joint purchasers, nominees, agents, and site visitors.
              </p>
            </div>
            <div className="legal-summary__card">
              <FaScaleBalanced aria-hidden="true" />
              <h3>Lawful Processing</h3>
              <p>
                Every data operation is anchored on contract performance, statutory
                compliance, legitimate interests, or your explicit consent.
              </p>
            </div>
            <div className="legal-summary__card">
              <FaLock aria-hidden="true" />
              <h3>We Never Sell Data</h3>
              <p>
                Your personal and financial records are never sold or rented.
                Disclosures are restricted to vetted transaction partners.
              </p>
            </div>
            <div className="legal-summary__card">
              <FaShieldHalved aria-hidden="true" />
              <h3>NDPC Enforceable Rights</h3>
              <p>
                Exercise your statutory rights of access, correction, erasure,
                and objection directly or via the NDPC regulator.
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
            <label htmlFor="legal-mobile-select">
              Explore this document
            </label>
            <select
              id="legal-mobile-select"
              value={activeSection}
              onChange={(e) => {
                const el = document.getElementById(e.target.value);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  setActiveSection(e.target.value);
                }
              }}
            >
              {SECTIONS.map((sec) => (
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
                <span>12 Sections</span>
              </div>
              <ul className="legal-toc__list">
                {SECTIONS.map((sec) => (
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
                <h4>Data Protection Officer</h4>
                <p>Have an inquiry or wish to exercise your data rights?</p>
                <a href="mailto:info@highrachy.com">
                  <FaEnvelope aria-hidden="true" /> info@highrachy.com
                </a>
              </div>
            </aside>

            {/* Article Content */}
            <article className="legal-article" id="policy-content">
              {/* Section 1 */}
              <section id="sec-1" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">01</span>
                  <h2 className="legal-section__title">
                    Who We Are and Scope
                  </h2>
                </div>
                <p>
                  <strong>Highrachy Investment and Technology Limited</strong>{' '}
                  (RC 791587) (&ldquo;Highrachy&rdquo;, &ldquo;we&rdquo;,
                  &ldquo;us&rdquo; or &ldquo;our&rdquo;) operates{' '}
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
                  </a>
                  . Blissville is our residential real estate brand and is not a
                  separate legal entity. This Policy explains how we handle
                  personal data under the Nigeria Data Protection Act 2023
                  (NDPA), the General Application and Implementation Directive
                  and other instruments issued by the Nigeria Data Protection
                  Commission (NDPC), and other applicable law.
                </p>
                <p>
                  It applies to visitors to our websites, prospective and
                  existing buyers, investors, joint purchasers, nominees,
                  agents, referral partners, contractors, business contacts, and
                  visitors to our offices, project sites and events. Employees
                  and job applicants receive a separate notice.
                </p>
                <p>
                  We are the data controller for our property sales, investor
                  relations, websites and marketing. Where we provide technology
                  services to a client, we generally act as a processor on the
                  client&rsquo;s instructions, and the service agreement and the
                  client&rsquo;s own notice govern that data.
                </p>
                <p>
                  This Policy is a notice. It is not a request for consent. Where
                  the law requires consent, we ask for it separately.
                </p>
              </section>

              {/* Section 2 */}
              <section id="sec-2" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">02</span>
                  <h2 className="legal-section__title">Data We Collect</h2>
                </div>
                <p>
                  We collect and process personal data across the following
                  defined categories depending on your engagement with us:
                </p>

                <div className="legal-category-grid">
                  <div className="legal-category-card">
                    <h3 className="legal-category-card__title">
                      <FaIdCard aria-hidden="true" /> Identity and contact
                    </h3>
                    <p className="legal-category-card__desc">
                      Name, title, date of birth, nationality, telephone, email,
                      residential and correspondence addresses, and identification
                      details such as NIN, BVN, passport, driver&rsquo;s licence
                      and tax identification number where needed.
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <h3 className="legal-category-card__title">
                      <FaHouseSignal aria-hidden="true" /> Property and transaction
                    </h3>
                    <p className="legal-category-card__desc">
                      Enquiries, inspection records, reservations, offers,
                      allocations, payment plans, payments, receipts, survey and
                      title documents, and resale or transfer requests.
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <h3 className="legal-category-card__title">
                      <FaShieldHalved aria-hidden="true" /> Verification and source of funds
                    </h3>
                    <p className="legal-category-card__desc">
                      Identification documents, proof of address, employment and
                      income evidence, and source of funds information.
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <h3 className="legal-category-card__title">
                      <FaUsers aria-hidden="true" /> Other individuals
                    </h3>
                    <p className="legal-category-card__desc">
                      Details of joint purchasers, spouses, nominees, next of
                      kin, guarantors, attorneys and beneficiaries.
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <h3 className="legal-category-card__title">
                      <FaBuilding aria-hidden="true" /> Business details
                    </h3>
                    <p className="legal-category-card__desc">
                      Employer, company details and business contacts of
                      corporate buyers, investors, agents, contractors and
                      partners.
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <h3 className="legal-category-card__title">
                      <FaGlobe aria-hidden="true" /> Digital and communications
                    </h3>
                    <p className="legal-category-card__desc">
                      IP address, device and browser data, cookie identifiers,
                      lead form submissions from social media and advertising
                      platforms, WhatsApp, email and telephone enquiries, and call
                      recordings at sales offices.
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <h3 className="legal-category-card__title">
                      <FaLocationDot aria-hidden="true" /> Site and media
                    </h3>
                    <p className="legal-category-card__desc">
                      Visitor logs, CCTV, photographs, video and drone footage at
                      our offices, project sites, inspections and events.
                    </p>
                  </div>

                  <div className="legal-category-card">
                    <h3 className="legal-category-card__title">
                      <FaFileContract aria-hidden="true" /> Technology services
                    </h3>
                    <p className="legal-category-card__desc">
                      Account details, usage records and technical logs where we
                      act as controller.
                    </p>
                  </div>
                </div>

                <p>
                  We collect data from you directly, from your representatives,
                  from our agents and referral partners, from lenders and service
                  providers, from advertising platforms and from public
                  registries. We do not seek sensitive personal data such as
                  health, religious or biometric data unless the law requires it
                  or it is necessary for a specific transaction. Identity numbers
                  such as NIN and BVN and copies of ID documents are held with
                  restricted access.
                </p>

                <div className="legal-callout legal-callout--warning">
                  <FaTriangleExclamation aria-hidden="true" />
                  <div className="legal-callout__content">
                    <h5>Security &amp; Credential Protection</h5>
                    <p>
                      Please do not send passwords, banking credentials or card
                      security codes (CVV/PIN) to us. Highrachy and Blissville
                      personnel will never ask for your confidential banking or
                      account access credentials.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="sec-3" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">03</span>
                  <h2 className="legal-section__title">
                    Why We Use Data and Our Lawful Bases
                  </h2>
                </div>
                <p>
                  Under the Nigeria Data Protection Act 2023, every processing
                  activity must be justified by an established lawful basis:
                </p>

                <ul>
                  <li>
                    <strong>Contract:</strong> handling enquiries, reservations,
                    offers, sale agreements, payments, allocations, title
                    documentation and after sales service.
                  </li>
                  <li>
                    <strong>Legal obligation:</strong> identity verification,
                    anti-money laundering controls, tax, regulatory reporting
                    and record keeping.
                  </li>
                  <li>
                    <strong>Legitimate interests:</strong> managing sales,
                    investor and agent relationships, fraud prevention, security
                    of our sites and systems, monitoring of business
                    communications and records for quality, security and dispute
                    purposes, analytics, improving our services, establishing or
                    defending legal claims, and the business transfers described
                    in Section 7.
                  </li>
                  <li>
                    <strong>Consent:</strong> electronic marketing where the law
                    requires it, optional cookies, and publishing identifiable
                    images or testimonials.
                  </li>
                </ul>

                <p>
                  Where you do not provide data, we need to enter or perform a
                  contract or to meet a legal duty, we may be unable to proceed
                  with the transaction. You may withdraw consent at any time
                  without affecting earlier processing.
                </p>
              </section>

              {/* Section 4 */}
              <section id="sec-4" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">04</span>
                  <h2 className="legal-section__title">
                    Anti Money Laundering and Regulatory Reporting
                  </h2>
                </div>
                <p>
                  As a real estate developer, we are subject to Nigerian anti
                  money laundering laws. We verify identity and source of funds,
                  keep records, and may report suspicious activity or share
                  information with the Nigerian Financial Intelligence Unit
                  (NFIU), Special Control Unit against Money Laundering (SCUML),
                  the Economic and Financial Crimes Commission (EFCC) and other
                  competent authorities. The law may prohibit us from telling you
                  that a report has been made.
                </p>

                <div className="legal-callout legal-callout--info">
                  <FaScaleBalanced aria-hidden="true" />
                  <div className="legal-callout__content">
                    <h5>Statutory Retention &amp; Confidentiality</h5>
                    <p>
                      Your rights of access, deletion, restriction and objection
                      do not apply to the extent that we are required by law to
                      retain data or keep a matter confidential.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section id="sec-5" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">05</span>
                  <h2 className="legal-section__title">
                    Joint Purchasers, Nominees and Other Individuals
                  </h2>
                </div>
                <p>
                  If you give us personal data about another person, you confirm
                  that you are authorised to do so and that you have told that
                  person about this Policy.
                </p>
                <p>
                  You must keep your contact and identity details current. We are
                  not responsible for consequences arising from inaccurate or
                  outdated information you give us, including missed notices or
                  misdirected communications.
                </p>
                <p>
                  Where property is acquired for a minor, we deal with a parent
                  or legal guardian. Where an interest passes on death or by
                  operation of law, we deal with the successor on proof of
                  authority. We do not otherwise knowingly collect
                  children&rsquo;s data.
                </p>
              </section>

              {/* Section 6 */}
              <section id="sec-6" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">06</span>
                  <h2 className="legal-section__title">
                    Marketing, Cookies and Advertising
                  </h2>
                </div>
                <p>
                  We send property updates, offers, newsletters and event
                  invitations where the law permits, and with your consent where
                  it requires. You can unsubscribe at any time using the link in
                  a message or by contacting us. We keep a minimal record of your
                  choice so we respect it. We will still send service,
                  contractual, security and legally required messages.
                </p>
                <p>
                  Our websites use necessary cookies and, with your consent where
                  required, analytics and advertising technologies, including
                  pixels from [for example Google and Meta]. Advertising platforms
                  may receive limited data about your interactions with us to
                  measure and target advertising. You can manage choices through
                  our cookie banner and your browser settings. Blocking some
                  cookies may affect the websites.
                </p>
              </section>

              {/* Section 7 */}
              <section id="sec-7" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">07</span>
                  <h2 className="legal-section__title">
                    Who We Share Data With
                  </h2>
                </div>
                <p>Where necessary and lawful, we share data with:</p>

                <ul>
                  <li>Our group companies and project partners;</li>
                  <li>
                    Sales agents and referral partners acting for us under written
                    terms. Independent agents who process data on their own
                    account are responsible for that processing, and we are not
                    liable for it;
                  </li>
                  <li>
                    Land registries, LASRERA and other state and federal
                    regulators, tax authorities, the NFIU, SCUML, the EFCC,
                    courts and law enforcement;
                  </li>
                  <li>
                    Banks, payment providers, mortgage lenders, insurers, escrow
                    agents and trustees;
                  </li>
                  <li>
                    Lawyers, surveyors, architects, auditors and other advisers;
                  </li>
                  <li>
                    Estate management companies and residents&rsquo;
                    associations;
                  </li>
                  <li>
                    IT, cloud, CRM, messaging, analytics and advertising
                    providers;
                  </li>
                  <li>
                    Contractors, property managers and facilities managers;
                  </li>
                  <li>
                    Prospective buyers, investors, lenders and advisers, and
                    successors, in connection with a sale, merger, financing or
                    restructuring of Highrachy or any project.
                  </li>
                </ul>

                <div className="legal-callout legal-callout--success">
                  <FaCircleCheck aria-hidden="true" />
                  <div className="legal-callout__content">
                    <h5>Non-Monetization Commitment</h5>
                    <p>
                      <strong>We do not sell personal data.</strong> We take
                      reasonable steps to ensure that providers who process data
                      on our behalf do so under written terms with suitable
                      safeguards.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section id="sec-8" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">08</span>
                  <h2 className="legal-section__title">
                    Transfers Outside Nigeria
                  </h2>
                </div>
                <p>
                  Some data is processed outside Nigeria because we use cloud,
                  communication, analytics and advertising providers abroad and
                  because some buyers, investors and agents are based overseas.
                  We transfer data abroad only as the NDPA permits, for example
                  where the destination is recognised as adequate, appropriate
                  safeguards are in place or another lawful basis applies. Using
                  our services may involve such transfers. Details are available
                  on request.
                </p>
              </section>

              {/* Section 9 */}
              <section id="sec-9" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">09</span>
                  <h2 className="legal-section__title">
                    Security and Breaches
                  </h2>
                </div>
                <p>
                  We use reasonable technical and organisational measures to
                  protect personal data, including access controls,
                  confidentiality obligations, secure storage and oversight of
                  providers. Access to identity documents and financial records
                  is limited to staff who need it.
                </p>
                <p>
                  If a personal data breach occurs, we will respond under the
                  NDPA, including notifying the NDPC within the time required,
                  which is currently 72 hours, and notifying affected
                  individuals where the law requires. No system is completely
                  secure and we cannot guarantee absolute security. If you
                  suspect your data has been compromised in connection with our
                  services, contact us promptly.
                </p>
              </section>

              {/* Section 10 */}
              <section id="sec-10" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">10</span>
                  <h2 className="legal-section__title">
                    Retention Schedule
                  </h2>
                </div>
                <p>
                  We keep personal data only as long as needed for the purposes
                  above, to meet legal duties and to establish or defend claims.
                  Our standard retention periods are:
                </p>

                <div className="legal-retention-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Data Category &amp; Purpose</th>
                        <th>Standard Retention Period</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Enquiries and leads that do not proceed</td>
                        <td>Up to two years after last contact</td>
                      </tr>
                      <tr>
                        <td>
                          Identity verification and anti-money laundering records
                        </td>
                        <td>
                          At least five years after the relationship ends, or
                          longer where required
                        </td>
                      </tr>
                      <tr>
                        <td>Sale, payment, allocation and title records</td>
                        <td>
                          For as long as the interest subsists and for twelve
                          years afterwards
                        </td>
                      </tr>
                      <tr>
                        <td>CCTV and visitor records</td>
                        <td>
                          Up to 90 days unless needed for an incident or claim
                        </td>
                      </tr>
                      <tr>
                        <td>Marketing data</td>
                        <td>
                          Until you unsubscribe or after two years of inactivity
                        </td>
                      </tr>
                      <tr>
                        <td>Website and cookie data</td>
                        <td>No longer than 26 months</td>
                      </tr>
                      <tr>
                        <td>Technology service records</td>
                        <td>
                          For the term of the service and six years afterwards
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  We delete or anonymise data when it is no longer needed, unless
                  a legal hold or lawful reason requires us to keep it.
                </p>
              </section>

              {/* Section 11 */}
              <section id="sec-11" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">11</span>
                  <h2 className="legal-section__title">Your Rights</h2>
                </div>
                <p>
                  Subject to the NDPA and the limits in this Policy, you have
                  enforceable rights over how your personal data is handled:
                </p>

                <div className="legal-rights-grid">
                  <div className="legal-right-card">
                    <h5>
                      <FaCircleCheck aria-hidden="true" /> Right of Access
                    </h5>
                    <p>
                      Request a copy of the personal data we hold about you and
                      verify lawful processing.
                    </p>
                  </div>
                  <div className="legal-right-card">
                    <h5>
                      <FaCircleCheck aria-hidden="true" /> Right to Rectification
                    </h5>
                    <p>
                      Require inaccurate, incomplete, or outdated personal
                      details to be promptly updated.
                    </p>
                  </div>
                  <div className="legal-right-card">
                    <h5>
                      <FaCircleCheck aria-hidden="true" /> Right to Erasure
                    </h5>
                    <p>
                      Request deletion where data is no longer necessary or
                      retention is no longer legally mandated.
                    </p>
                  </div>
                  <div className="legal-right-card">
                    <h5>
                      <FaCircleCheck aria-hidden="true" /> Right to Restriction
                    </h5>
                    <p>
                      Ask us to suspend processing while the accuracy of data or
                      the lawfulness of processing is contested.
                    </p>
                  </div>
                  <div className="legal-right-card">
                    <h5>
                      <FaCircleCheck aria-hidden="true" /> Data Portability
                    </h5>
                    <p>
                      Receive your data in a structured, commonly used format or
                      request transfer to another controller.
                    </p>
                  </div>
                  <div className="legal-right-card">
                    <h5>
                      <FaCircleCheck aria-hidden="true" /> Right to Object
                    </h5>
                    <p>
                      Stop data use for direct marketing at any time or object
                      based on our legitimate interests.
                    </p>
                  </div>
                </div>

                <p>
                  You may withdraw consent at any time. Where the law gives you
                  the right not to be subject to decisions based solely on
                  automated processing, we will honour it.
                </p>
                <p>
                  To make a request, contact us using the details in Section 12
                  and put <strong>&ldquo;Data Protection Request&rdquo;</strong> in
                  the subject line. We may ask for information to verify your
                  identity. We will respond within 30 days and may extend that
                  period for complex or numerous requests, with notice to you.
                </p>
                <p>
                  We may refuse or limit a request that is manifestly unfounded or
                  excessive, that would affect the rights of others, that is
                  covered by legal privilege or needed for a legal claim, or
                  where Section 4 or another legal requirement applies. Where we
                  refuse, we will explain why unless the law prevents us.
                </p>
                <p>
                  You may complain to the{' '}
                  <strong>Nigeria Data Protection Commission</strong> at{' '}
                  <a
                    href="https://ndpc.gov.ng/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://ndpc.gov.ng/
                  </a>
                  .
                </p>
              </section>

              {/* Section 12 */}
              <section id="sec-12" className="legal-section">
                <div className="legal-section__header">
                  <span className="legal-section__num">12</span>
                  <h2 className="legal-section__title">
                    Other Sites, Changes and Contact
                  </h2>
                </div>
                <p>
                  Our websites may link to third party sites and social media
                  platforms. They process data under their own policies, which
                  this Policy does not cover.
                </p>
                <p>
                  We may update this Policy from time to time. The current
                  version, with its revised date, will be published on the
                  relevant website. Where the law requires, we will give further
                  notice or seek consent before material changes take effect.
                </p>

                {/* Contact Card */}
                <div className="legal-contact-card">
                  <h4>Highrachy Investment and Technology Limited</h4>
                  <p className="legal-contact-card__sub">
                    Designated Data Controller for Highrachy and Blissville
                  </p>

                  <div className="legal-contact-card__grid">
                    <div className="legal-contact-card__item">
                      <small>Corporate Address</small>
                      <p>
                        Ibukun House, No. 70 Adetokunbo Ademola Street,
                        Victoria Island, Lagos, Nigeria
                      </p>
                    </div>

                    <div className="legal-contact-card__item">
                      <small>Official Email</small>
                      <a href="mailto:info@highrachy.com">
                        info@highrachy.com
                      </a>
                    </div>

                    <div className="legal-contact-card__item">
                      <small>Direct Telephone</small>
                      <a href="tel:+2349055555146">+234 905 555 5146</a>
                    </div>
                  </div>

                  <div className="legal-contact-card__footer">
                    <p className="mb-0">
                      <strong>Please note:</strong> Please say whether your
                      request concerns the Highrachy website, the Blissville
                      website or another service.
                    </p>
                    <p className="mt-2 mb-0 text-muted small">
                      Last Updated: [16/10/2026]
                    </p>
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
