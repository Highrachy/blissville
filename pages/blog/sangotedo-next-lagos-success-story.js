/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import SeoHead from '@/components/utils/SeoHead';
import { PageHeader } from '@/components/common/Header';
import Button from '@/components/forms/Button';

export default function SangotedoSuccessStory() {
  return (
    <>
      <SeoHead
        title="From Bar Beach to Eko Atlantic: Why Sangotedo is the Next Lagos Success Story | Blissville"
        description="Discover why Sangotedo is following the same growth path as Lekki and Eko Atlantic, and why smart investors are moving early."
        canonical="https://www.blissville.com.ng/blog/sangotedo-next-lagos-success-story"
        ogImage="/assets/img/blog/sangotedo-success.jpg"
      />

      <Navigation />

      <PageHeader
        title="Why Sangotedo is the Next Lagos Success Story"
        bgImage="/assets/img/blog/sangotedo-success.jpg"
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
      src="/assets/img/blog/sangotedo-success.jpg"
      alt="Sangotedo Real Estate Growth"
      width={1200}
      height={800}
      className="rounded-3 img-cover shadow-sm"
      style={{ width: '100%', height: 'auto' }}
    />
  </div>
);

const BlogContent = () => (
  <article>
    <h2 className="fw-bold text-primary mb-4">
      From Bar Beach to Eko Atlantic: Why Sangotedo is the Next Lagos Success
      Story
    </h2>

    <p>
      In Lagos, we don&rsquo;t just tell time by years; we tell it by
      landscapes.
    </p>

    <p>
      If you are familiar with the real estate and urban development landscape
      in Lagos, you remember the crashing waves of the old Bar Beach. Today,
      that nostalgia has been paved over to create Eko Atlantic City, a
      multi-billion dollar residential and business district. You remember the
      weekend escapes to Oniru Beach; now, those sandy shores have been replaced
      by the massive machinery of the Lagos-Calabar Coastal Road.
    </p>

    <p>
      This is the Lagos cycle: Transformation is fast, and it waits for no one.
      At Blissville, we have seen this pattern before, and right now, all signs
      are pointing to one destination: <strong>Sangotedo</strong>.
    </p>

    <h3 className="fw-bold mt-6 mb-3">
      The Nostalgia Trigger: Why Landscapes Shift
    </h3>

    <p>
      Gentrification is the reason the bushes of Maroko became the luxury towers
      of Lekki Phase 1. It is why the quiet residential streets of Yaba are now
      the high-tech Silicon Valley of Lagos.
    </p>

    <p>
      When we look at Sangotedo, we are not just looking at a suburb; we are
      looking at the next phase of this evolution. Here is why the Bar Beach to
      Eko Atlantic effect is happening in Sangotedo right now.
    </p>

    <h4 className="text-dark mt-6">
      1. The Coastal Road Effect: From Hidden Gem to Main Street
    </h4>

    <p>
      Just as the development of the Coastal Road turned Oniru Beach and its
      neighbors into high-value corridors, the infrastructure hitting Sangotedo
      is changing the game.
    </p>

    <p>
      <strong className="text-primary">The Trigger:</strong> Think of how the
      Lekki-Ikoyi Link Bridge instantly doubled property values in Lekki.
    </p>

    <p>
      <strong className="text-primary">The Sangotedo Reality:</strong> With the
      expansion of the Lekki-Epe Expressway and the proximity to the new Coastal
      Road, Sangotedo is losing its distance. It&rsquo;s no longer far,
      it&rsquo;s central.
    </p>

    <h4 className="text-dark mt-6">2. The Shoprite Anchor</h4>

    <p>
      Remember when Palms Mall in Lekki was the only place to be? It signaled
      that Lekki had arrived. Today, Novare Mall (Shoprite) in Sangotedo serves
      as that same psychological and economic anchor.
    </p>

    <p>
      Investopedia notes that large-scale commercial retail is a trigger for
      residential gentrification. Where people shop, they eventually want to
      live.
    </p>

    <h4 className="text-dark mt-6">3. The Shift from Leisure to Legacy</h4>

    <p>
      Lagosians are moving from buying leisure land to building legacy homes.
    </p>

    <p>
      <strong className="text-primary">The Trigger:</strong> Much like how the
      old Kuramo Waters transitioned from a local hangout to a high-value real
      estate zone, Sangotedo is transitioning from a weekend getaway spot to a
      primary residence hub for the Lagos elite and middle class.
    </p>

    <p>
      <strong className="text-primary">Why Invest?</strong> Buying in Sangotedo
      now is like buying in Agungi or Chevron ten years ago. You aren&apos;t
      just buying land; you are buying the future version of a prime island
      location.
    </p>

    <h4 className="text-dark mt-6">4. The Industrial Gold Rush</h4>

    <p>
      In her article on{' '}
      <em>
        &ldquo;Gentrification in Lagos, Nigeria: A Tale of Two Cities of
        Lagos&rdquo;
      </em>
      , Gloria Edukere notes that gentrification often follows the money. With
      the Dangote Refinery and the Lekki Deep Sea Port just down the road,
      Sangotedo is the first civilized residential stop for the thousands of
      executives and expatriates working there.
    </p>

    <strong>Why Homeowners Are Moving to Sangotedo</strong>

    <p>
      For many, the move is about quality of life. Unlike the cramped
      developments in older parts of the Island, Sangotedo offers sprawling
      gated estates. New estates are being built with 21st-century security tech
      that old neighborhoods simply can&apos;t retrofit.
    </p>

    <h4 className="text-dark mt-6">
      5. Caribbean Lake City: The New Waterfront Premium
    </h4>

    <p>
      Remember when waterfront property in Lekki Phase 1 was considered too far?
      Today, those homes are priceless. Caribbean Lake City is the Sangotedo
      version of that success story.
    </p>

    <p>
      <strong>The Blue Economy:</strong> With an Estate Jetty and a live lake
      connecting to the Lagos Lagoon, Blissville Terraces (BVT) residents
      aren&rsquo;t just buying a house; they are buying a lifestyle that
      bypasses traffic via water transportation.
    </p>

    <h3 className="fw-bold mt-6 mb-3">
      The Bottom Line: Don&rsquo;t Be the &ldquo;Had I Known&rdquo; Investor
    </h3>

    <p>
      We all have that uncle who says, I could have bought ten plots in Lekki
      for N50,000 in the 90s. Don&rsquo;t let Sangotedo be your Had I Known. Bar
      Beach is now a mega city. Oniru Beach is now an interstate highway. And
      the bushes of Sangotedo are fast becoming the most profitable addresses in
      Nigeria.
    </p>

    <p>
      At Blissville, we specialize in identifying the areas of development that
      appreciate the fastest. Whether you want to build a family home or secure
      a high-yield rental and investment property, the time to move is now.
    </p>

    <p className="fw-bold mt-6">Ready to own a piece of Urban Lagos?</p>

    <div className="mt-3">
      <Button className="px-5 py-3" href="/our-projects">
        CLICK HERE TO VIEW OUR PORTFOLIO
      </Button>
    </div>

    <p className="mt-3">
      or send us a DM to book a site inspection this weekend!
    </p>
  </article>
);
