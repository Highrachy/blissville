import { PageHeader } from '@/components/common/Header';
import DeveloperSection from '@/components/investors/developerSection';
import DevelopmentProgress from '@/components/investors/developmentProgress';
import ExitStrategies from '@/components/investors/exitStrategies';
import InvestmentTiers from '@/components/investors/investmentTiers';
import InvestorsHero from '@/components/investors/investorsHero';
import JoinVision from '@/components/investors/joinVision';
import LocationSection from '@/components/investors/locationSelection';
import NeighborhoodSection from '@/components/investors/neighborhood';
import OpportunitySection from '@/components/investors/opportunitySection';
import ProjectSnapshot from '@/components/investors/projectSnapshot';
import RiskAndPath from '@/components/investors/riskAndPath';
import UnitPricing from '@/components/investors/unitPricing';
import Navigation from '@/components/layouts/Navigation';
import SeoHead from '@/components/utils/SeoHead';
import React from 'react';

const NewInvestorsPage = () => {
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
      <OpportunitySection />
      <LocationSection />
      <NeighborhoodSection />
      <UnitPricing />
      <DeveloperSection />
      <InvestmentTiers />
      <ExitStrategies />
      <DevelopmentProgress />
      <RiskAndPath />
      <JoinVision />
    </>
  );
};

export default NewInvestorsPage;
