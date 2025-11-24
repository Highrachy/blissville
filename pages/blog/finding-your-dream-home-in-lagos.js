/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import SeoHead from '@/components/utils/SeoHead';
import { PageHeader } from '@/components/common/Header';

export default function FindingDreamHome() {
  return (
    <>
      <SeoHead
        title="Finding Your Dream Home in Lagos | Simple Real Estate Guide"
        description="A simple guide to help you find your dream home in Lagos. Learn budgeting, location selection, verification, and safe property practices."
        canonical="https://www.blissville.com.ng/blog/finding-your-dream-home-in-lagos"
        ogImage="/assets/img/blog/lagos-view.jpg"
      />

      <Navigation />

      {/* HERO USING PAGE NAVIGATION */}
      <PageHeader
        title="Finding Your Dream Home in Lagos"
        bgImage="/assets/img/blog/lagos-view.jpg"
      />

      {/* ARTICLE CONTENT */}
      <ArticleWrapper>
        <BlogCoverImage />
        <BlogContent />
      </ArticleWrapper>

      <ScheduleVisit />
      <Footer />
    </>
  );
}

/* -----------------------------------------------------
   MEDIUM-STYLE WRAPPER
------------------------------------------------------- */
const ArticleWrapper = ({ children }) => (
  <div
    className="container"
    style={{
      maxWidth: '800px',
      paddingTop: '3rem',
      paddingBottom: '3rem',
      lineHeight: '1.85',
      fontSize: '1.15rem',
    }}
  >
    {children}
  </div>
);

/* -----------------------------------------------------
   BEAUTIFUL LARGE COVER IMAGE
------------------------------------------------------- */
const BlogCoverImage = () => (
  <div className="mb-5">
    <Image
      src="/assets/img/blog/lagos-view.jpg"
      alt="Lagos Real Estate"
      width={1920}
      height={1080}
      className="rounded-3 shadow-sm"
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);

/* -----------------------------------------------------
   YOUR EXACT CONTENT (UNEDITED)
------------------------------------------------------- */
const BlogContent = () => (
  <article>
    <h2 className="fw-bold mb-4">
      Finding Your Dream Home in Lagos: A Simple Guide
    </h2>

    <p>
      Finding your perfect home in Lagos, Nigeria, is an exciting deal! It takes
      good planning, a clear budget, and careful checking of all the necessary
      paperwork.
    </p>

    <p>
      Whether you plan to build a new space or acquire a finished residence,
      here are the essential steps for navigating the Lagos property market:
    </p>

    <h3 className="fw-bold mt-5 mb-3">Financial Clarity and Budget Setting</h3>

    <ol>
      <li>
        Before you look at any property, you must set a comfortable budget. This
        budget covers the whole journey, not just the initial home cost.
      </li>
      <li>
        Know the total amount you are comfortable spending, whether from
        savings, a mortgage, or payment plans.
      </li>
      <li>
        Always include the other necessary costs like legal fees, agent support
        fees, government taxes, and the cost of furnishing or finishing your
        home.
      </li>
    </ol>

    <p className="fw-bold mt-4">Explore supportive payment options:</p>

    <ol>
      <li>Traditional Home Funding (mortgage) is available through banks.</li>
      <li>
        The National Housing Fund (NHF) offers lower rates for eligible
        contributors.
      </li>
      <li>
        Developer Support like flexible installment plans or ‘Rent-to-Own’
        schemes can spread the cost over time.
      </li>
    </ol>

    <h3 className="fw-bold mt-5 mb-3">Location and Property Choice</h3>

    <ol>
      <li>
        Where you choose to live is the biggest driver of value in Lagos. Pick a
        place that fits your lifestyle and offers good potential for future
        growth.
      </li>
      <li>
        Consider your daily travel and how close you are to major roads like the
        Coastal Highway, Lekki-Epe Expressway, or planned rail links.
      </li>
      <li>
        Focus on areas with rapid infrastructure growth (like the Sangotedo
        Lekki-Epe corridor); these areas often see great appreciation in value.
      </li>
    </ol>

    <p className="fw-bold mt-4">Choose your pathway with trusted partners:</p>

    <ol>
      <li>
        Work with reputable real estate agencies or developers with a strong
        history.
      </li>
      <li>
        Hire a trustworthy company to find land that has been properly verified.
        Avoid risky, unverified deals.
      </li>
    </ol>

    <h3 className="fw-bold mt-5 mb-3">Peace of Mind: Checking is Key</h3>

    <p>
      This is the most critical step to protect your future property. Never skip
      the legal verification stage.
    </p>

    <ol>
      <li>
        The property must have a clear, valid ownership document, like a
        Certificate of Occupancy (C of O) or a Deed of Assignment.
      </li>
      <li>
        Hire a qualified real estate lawyer to check the property’s history at
        the Lagos State Bureau of Lands, Court Registry, etc. They confirm the
        true owner and check for any government claims.
      </li>
      <li>
        Inspect the property physically at different times. Check the structure,
        water supply, and neighborhood activity.
      </li>
      <li>
        Your lawyer must review every document and agreement before you make any
        major payment.
      </li>
    </ol>

    <p className="mt-4">
      By following these simple steps with professional guidance, you greatly
      reduce the risk and move closer to owning the home you have always wanted
      in Lagos.
    </p>

    <p className="mt-3">
      At Blissville, we aim to make this journey easy and transparent. We
      provide the expertise and verified opportunities you need to step into
      your new home confidently.
    </p>
  </article>
);
