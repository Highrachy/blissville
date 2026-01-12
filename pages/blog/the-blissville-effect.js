/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import ScheduleVisit, {
  ScheduleVisitationButton,
} from '@/components/common/ScheduleVisit';
import SeoHead from '@/components/utils/SeoHead';
import { PageHeader } from '@/components/common/Header';

export default function TheBlissvilleEffect() {
  return (
    <>
      <SeoHead
        title="The Blissville Effect: How Premium Home Design Adds Years to Your Life | Blissville"
        description="Discover how premium home design can enhance your health, longevity, and long-term investment value through intentional living and community."
        canonical="https://www.blissville.com.ng/blog/the-blissville-effect"
        ogImage="/assets/img/blog/the-blissville-effect.jpg"
      />

      <Navigation />

      <PageHeader
        title="The Blissville Effect"
        bgImage="/assets/img/blog/the-blissville-effect.jpg"
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
   COVER IMAGE
------------------------------------------------------- */
const BlogCoverImage = () => (
  <div className="mb-5">
    <Image
      src="/assets/img/blog/the-blissville-effect.jpg"
      alt="The Blissville Effect: How Premium Home Design Adds Years to Your Life"
      width={1920}
      height={1080}
      className="rounded-3 shadow-sm"
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);

const BlogContent = () => (
  <article>
    <h2 className="fw-bold mb-4">
      The Blissville Effect: How Your Premium Home Design Can (Literally) Add
      Years to Your Life and Value to Your Portfolio
    </h2>

    <p>
      We often think of high-end real estate in terms of size and fittings. But
      for the modern, successful professional, the ultimate premium is measured
      by health, time, and tranquility. What if your home could actively protect
      and enhance those most valuable assets?
    </p>

    <p>
      This question is the foundation of the Blissville philosophy, a premier
      residential brand owned and powered by{' '}
      <a href="https://www.highrachy.com/" target="_blank" rel="noreferrer">
        Highrachy &amp; Investment Technology Limited
      </a>
      . Our core values&mdash;Quality, Wellness, Innovation, and
      Sustainability&mdash;are not just aspirational words; they are the
      architectural blueprints for a better life and a smarter investment.
    </p>

    <p>
      The scientific reality is that our environment profoundly impacts our
      mental and physical state. At Blissville Terraces, this concept is central
      to the design. Our commitment to Sustainability ensures residents are
      surrounded by generous green pockets, serene walking trails, and our
      unique scenic lake feature. This is intentional Biophilic Design&mdash;the
      simple act of viewing nature can lower your heart rate and reduce stress
      hormones. We provide a necessary natural buffer where your daily commute
      ends and your stress-reducing retreat begins, ensuring your Wellness is
      continuously maintained.
    </p>

    <p>
      Furthermore, we believe Innovation should serve long-term efficiency and
      quality of life. This means looking beyond the superficial and creating
      future-proof homes. Our dedication to Quality utilizes premium materials
      and smart systems, guided by the proven expertise of Highrachy. We focus
      intensely on architectural features like natural light and
      cross-ventilation, significantly reducing the reliance on artificial
      lighting and air conditioning. This design ingenuity provides a continuous
      stream of fresh air and sunlight, while simultaneously delivering lower
      utility bills and reducing maintenance costs&mdash;a truly clever
      financial and ecological decision.
    </p>

    <p>
      Finally, the most powerful element of Blissville Terraces is the community
      itself. A home&rsquo;s value is inseparable from its environment. At
      Blissville, the greatest asset you acquire isn&rsquo;t the building
      itself&mdash;it is the calibre of the community around it. Blissville is a
      thoughtfully curated environment designed to attract a network of
      high-performing professionals, wealth builders, and visionaries. This
      alignment is not accidental; it is by design, ensuring you live among
      neighbours who share your standards, drive, and success mindset. Your
      location is not just an address&mdash;it is an investment in social
      capital, providing the ideal platform where personal, professional, and
      financial growth can take place collaboratively.
    </p>

    <p>
      The strategic investment of tomorrow is the one that protects both your
      portfolio and your health. Blissville Terraces is the powerful convergence
      of these two priorities. Backed by the trusted vision of Highrachy, you
      are securing more than premium real estate; you are securing the quality
      of your life and the enduring legacy of your family.
    </p>

    <div style={{ margin: '2.5rem 0', textAlign: 'center' }}>
      <strong
        style={{ fontSize: '1.2rem', display: 'block', marginBottom: '1rem' }}
      >
        Ready to experience the premium lifestyle that protects both your health
        and your wealth?
      </strong>
      <ScheduleVisitationButton
        text="Schedule Your Blissville Tour Now"
        color="primary"
      />
    </div>
  </article>
);
