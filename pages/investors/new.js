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
import React from 'react';

const NewInvestorsPage = () => {
  return (
    <>
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
