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
        title="Investors"
        subHeader="INVEST TODAY AND WATCH YOUR MONEY GROW..."
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <InvestToday />
      <OurInvestors />
      <Footer />
    </>
  );
}

const InvestToday = () => {
  return (
    <section className="pt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="mt-3 mt-lg-6">Invest Today</h3>

            <p>
              Our investors comprise of a selected group of elite personalities
              that includes professionals in various walks of life;
            </p>

            <p className="mb-4">lists</p>

            <p className="mb-4">
              The unique thing about our investors is that they are very erudite
              and exposed individuals that can tell the difference between
              mediocre and true quality, words and actions.
            </p>
            <p className="mb-4 fw-bold lead">
              Our promise to our investors is to continually grow your wealth
              with strategically analyzed real estate projects that yields juicy
              returns.
            </p>
          </div>
          <div className="col-md-5 offset-md-1 col-lg-4">
            <div className="ps-3">
              <Image
                src="/assets/img/investors/your-income.jpg"
                alt="Hero Image"
                width={410}
                height={397}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
