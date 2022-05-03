import React from 'react';
import Section from '@/components/common/Section';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import OurInvestors from '@/components/common/OurInvestors';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Benefits from '@/components/common/Benefits';
import Features from '@/components/common/Features';
import Team from '@/components/common/Team';
import StrategicRelationships from '@/components/layouts/StrategicRelationships';
import { OurProjects } from 'pages';

export default function Home() {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Portfolio"
        subHeader="WE DON'T JUST SELL HOMES, WE GUARANTEE YOUR FUTURE"
        bgImage="/assets/img/bg/about-us.jpeg"
      />
      <div className="my-6">
        <OurProjects />
      </div>
      <OurInvestors />
      <Footer />
    </>
  );
}
