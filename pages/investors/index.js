import React, { useEffect, useRef } from 'react';
import Footer from '@/components/common/Footer';
import DeveloperSection from '@/components/investors/developerSection';
import DevelopmentProgress from '@/components/investors/developmentProgress';
import ExitStrategies from '@/components/investors/exitStrategies';
import InvestmentTiers from '@/components/investors/investmentTiers';
import InvestorsHero from '@/components/investors/investorsHero';
import JoinVision from '@/components/investors/joinVision';
import LocationSection from '@/components/investors/locationSelection';
import NeighborhoodSection from '@/components/investors/neighborhood';
import OpportunitySection from '@/components/investors/opportunitySection';
import PathToPartnership from '@/components/investors/pathToPartnership';
import ProjectSnapshot from '@/components/investors/projectSnapshot';
import RiskAndMitigation from '@/components/investors/riskAndMitigation';
import UnitPricing from '@/components/investors/unitPricing';
import Navigation from '@/components/layouts/Navigation';
import SeoHead from '@/components/utils/SeoHead';

/* =========================
   CLARITY EVENTS CONSTANTS
========================= */
const CLARITY_EVENTS = {
  INVESTORS_PAGE_VIEW: 'investors_page_view',
  INVESTORS_VIEW_OPPORTUNITY: 'investors_view_opportunity',
  INVESTORS_VIEW_PRICING: 'investors_view_pricing',
  INVESTORS_VIEW_TIERS: 'investors_view_tiers',
  INVESTORS_VIEW_RISK: 'investors_view_risk',
  INVESTORS_VIEW_CTA: 'investors_view_cta',
};

const CURRENT_DEVELOPMENT_PERCENTAGE = 25;

const DEVELOPMENT_PROGRESS_DATA = {
  percentage: CURRENT_DEVELOPMENT_PERCENTAGE,
  lastUpdated: 'June 5, 2026',
  currentStatusLabel: 'Construction (In Progress)',
  images: [
    {
      src: '/assets/img/investors/progress/bored-pile-drilling-building-3.jpg',
      description:
        'Bored pile drilling and installation works ongoing for Building 3 foundation.',
    },
    {
      src: '/assets/img/investors/progress/pile-cap-concreting-for-building-2.jpg',
      description: 'Pile Cap Concreting for Building 2 ',
    },
    {
      src: '/assets/img/investors/progress/concreting-of-pilecap-on-building-2.jpg',
      description: 'Concreting of Pilecap on Building 2',
    },
  ],
  phases: [
    {
      label: 'PHASE 01',
      title: 'Site Clearing',
      short: 'Completed',
      full: 'Site clearing completed including debris removal, leveling, and preparation for structural work.',
      active: true,
    },
    {
      label: 'PHASE 02',
      title: 'Construction',
      short: `In Progress · ${CURRENT_DEVELOPMENT_PERCENTAGE}%`,
      full: `Foundation complete. Structural framing and block work currently progressing at ${CURRENT_DEVELOPMENT_PERCENTAGE}%.`,
      active: true,
    },
    {
      label: 'PHASE 03',
      title: 'Snagging',
      short: 'Est. Q3 2027',
      full: 'Final inspection phase ensuring all finishes, fittings, and systems meet required standards.',
    },
    {
      label: 'PHASE 04',
      title: 'Handover',
      short: 'Est. Q3 2027',
      full: 'Completed units delivered to investors with full documentation and title processing.',
    },
  ],
};

const Investors = () => {
  /* =========================
     REFS FOR SECTIONS
  ========================= */
  const opportunityRef = useRef(null);
  const pricingRef = useRef(null);
  const tiersRef = useRef(null);
  const riskRef = useRef(null);
  const ctaRef = useRef(null);

  /* =========================
     TRACK EVENT HELPER
  ========================= */
  const trackEvent = (eventName) => {
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', eventName);
    }
  };

  /* =========================
     PAGE VIEW
  ========================= */
  useEffect(() => {
    trackEvent(CLARITY_EVENTS.INVESTORS_PAGE_VIEW);
  }, []);

  /* =========================
     INTERSECTION OBSERVER
  ========================= */
  useEffect(() => {
    const elements = [
      { ref: opportunityRef, event: CLARITY_EVENTS.INVESTORS_VIEW_OPPORTUNITY },
      { ref: pricingRef, event: CLARITY_EVENTS.INVESTORS_VIEW_PRICING },
      { ref: tiersRef, event: CLARITY_EVENTS.INVESTORS_VIEW_TIERS },
      { ref: riskRef, event: CLARITY_EVENTS.INVESTORS_VIEW_RISK },
      { ref: ctaRef, event: CLARITY_EVENTS.INVESTORS_VIEW_CTA },
    ];

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = elements.find(
              (el) => el.ref.current === entry.target,
            );
            if (match) {
              trackEvent(match.event);
              obs.unobserve(entry.target); // fire once only
            }
          }
        });
      },
      {
        threshold: 0.4, // triggers when 40% visible
      },
    );

    elements.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SeoHead
        title="Blissville Terraces Investment | Real Estate Opportunity in Lagos, Nigeria"
        description="Explore Blissville Terraces — a structured real estate investment opportunity in Sangotedo, Lagos. Entry from ₦19.1M with projected returns, secured title (C of O), and premium waterfront development."
        canonical="https://www.blissville.com.ng/investors"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
        keywords={[
          'Real estate investment Lagos',
          'Property investment Nigeria',
          'Blissville Terraces investment',
          'Highrachy investment opportunity',
          'Lagos property ROI',
          'Sangotedo real estate investment',
          'Lekki property investment',
          'Real estate ROI Nigeria',
          'Invest in Lagos property',
          'Waterfront real estate Nigeria',
        ]}
      />

      <Navigation />

      <InvestorsHero />

      <ProjectSnapshot />

      <div ref={opportunityRef}>
        <OpportunitySection />
      </div>

      <LocationSection />

      <NeighborhoodSection />

      <div ref={pricingRef}>
        <UnitPricing />
      </div>

      <DeveloperSection />

      <div ref={tiersRef}>
        <InvestmentTiers />
      </div>

      <ExitStrategies />

      <DevelopmentProgress {...DEVELOPMENT_PROGRESS_DATA} />

      <div ref={riskRef}>
        <RiskAndMitigation />
      </div>

      <PathToPartnership />

      <div ref={ctaRef}>
        <JoinVision />
      </div>

      <Footer />
    </>
  );
};

export default Investors;
