/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import SeoHead from '@/components/utils/SeoHead';
import { PageHeader } from '@/components/common/Header';
import Button from '@/components/forms/Button';

export default function SangotedoInflectionBlog() {
  return (
    <>
      <SeoHead
        title="The Sangotedo Inflection Point | Blissville"
        description="From Acceleration to Explosive Equity. Discover why Sangotedo is Lagos’ fastest-growing real estate corridor."
        canonical="https://www.blissville.com.ng/blog/the-sangotedo-inflection-point"
        ogImage="/assets/img/blog/sangotedo-inflection.jpg"
      />

      <Navigation />

      <PageHeader
        title="The Sangotedo Inflection Point"
        bgImage="/assets/img/blog/sangotedo-inflection.jpg"
      />

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
   WRAPPER
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
   COVER IMAGE
------------------------------------------------------- */
const BlogCoverImage = () => (
  <div className="mb-5">
    <Image
      src="/assets/img/blog/sangotedo-inflection.jpg"
      alt="Sangotedo Investment Opportunity"
      width={1200}
      height={800}
      className="rounded-3 img-cover shadow-sm"
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);

/* -----------------------------------------------------
   EXACT CONTENT
------------------------------------------------------- */
const BlogContent = () => (
  <article>
    <h2 className="fw-bold text-primary mb-4">
      The Sangotedo Inflection Point
    </h2>

    <h4 className="fw-bold font-primary mb-4">
      From Acceleration to Explosive Equity
    </h4>

    <p>
      As we move into the second quarter of 2026, the narrative of the Lagos
      property market has shifted from &quot;potential&quot; to a high-velocity
      Inflection Point. While mature districts like Ajah have reached a pricing
      ceiling, transitioning into slower &quot;yield plays,&quot; Sangotedo has
      emerged as the definitive corridor for capital gains.
    </p>

    <p>
      Current market data reveals that property values in this axis are now
      appreciating at an average of 50% annually, allowing savvy investors to
      effectively double their equity every 24 months.
    </p>

    <h3 className="fw-bold mt-5 mb-3">
      The Economic Engine: Stability &amp; Scarcity
    </h3>

    <p>
      The macroeconomic environment has provided a powerful tailwind for
      residential assets. With inflation moderating and the Naira stabilizing
      against a $51.04 billion foreign reserve buffer, the volatility in
      construction costs has eased.
    </p>

    <p>
      For Blissville Terraces, this stability is met with a &quot;Waterfront
      Premium.&quot; Research from Atlas Realtors (2026) indicates that
      lakefront properties now command a 50% to 70% price premium over inland
      alternatives. As Sangotedo reaches full development by the end of this
      year, these remaining lake-facing units are becoming the rarest and most
      valuable assets in the region.
    </p>

    <h3 className="fw-bold mt-5 mb-3">
      Infrastructure: The &quot;Silent Wealth Creators&quot;
    </h3>

    <p>
      The transition from Q1 to Q2 has seen the maturity of critical
      infrastructure catalysts:
    </p>

    <ul>
      <li>
        <strong>Lekki-Epe: The Concrete Shift:</strong> The Lekki-Epe Expressway
        is currently undergoing a structural fortification that has permanently
        re-rated property values in the axis. Moving away from traditional
        asphalt, the government has implemented Continuously Reinforced Concrete
        Pavement (CRCP). This &quot;repackaging&quot; of the corridor ensures
        many years of durability, eliminating the pothole and maintenance cycles
        that plague other Lagos roads.
      </li>

      <li>
        <strong>The Omu Creek Connection:</strong> The bridge and surrounding
        road projects are now linking Sangotedo to the Lagos-Calabar Coastal
        Road. This turns a quiet residential pocket into a high-connectivity
        hub, slashing commute times to Victoria Island and the Free Trade Zone.
      </li>

      <li>
        <strong>The &quot;Blue Economy&quot; Advantage:</strong> With water
        transportation now the &quot;Gold Standard&quot; of 2026 Lagos
        logistics, the Estate Jetty at Caribbean Lake City offers residents a
        high-speed bypass to the commercial heart of the city, gradually
        deleting the traditional &quot;distance barrier.&quot;
      </li>
    </ul>

    <h3 className="fw-bold mt-5 mb-3">
      A Secondary CBD &amp; Demographic Magnet
    </h3>

    <p>
      Sangotedo is no longer a suburb; it is a self-sustaining Secondary Central
      Business District (CBD). Anchored by the Lagos Business School and the
      Novare Mall hub, the area is attracting a concentrated influx of
      &quot;High-Performing Middle Class&quot; residents; tech founders, oil and
      gas executives, and creative leaders.
    </p>

    <h3 className="fw-bold mt-5 mb-3">
      The Bottom Line: The Window is Closing
    </h3>

    <p>
      The opportunity to secure a unit at current off-plan valuation is rapidly
      disappearing as infrastructure milestones are met. With only a limited
      number of lakefront units remaining in this phase, delay means missing out
      on the most significant equity jump of the decade.
    </p>

    <p>
      With the proposed July 15th completion date for the Ajah road expansion
      fast approaching, the &quot;infrastructure jump&quot; in pricing is
      imminent.
    </p>

    <p className="fw-bold mt-4">
      Secure your 4-bedroom terrace today to anchor your wealth in a
      high-traffic economic engine
    </p>

    <div className="mt-4">
      <Button
        wide
        href="https://www.blissville.com.ng/blissville-terraces#payment-plan"
      >
        VIEW AVAILABLE UNITS &amp; PAYMENT PLANS
      </Button>
    </div>
  </article>
);
