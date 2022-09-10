import React from 'react';
import Image from 'next/image';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import classNames from 'classnames';
import Button from '@/components/forms/Button';
import InvestorSlider from '@/components/common/InvestorSlider';
import Section from '@/components/common/Section';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { benefits } from '@/data/benefits';
import SingleProject from '@/components/common/SingleProject';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';

export default function OurProjects() {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Properties"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <FeaturedProperties />

      <div className="container">
        <h3 className="mt-3 mt-lg-6">Our Projects</h3>
        <div className="row">
          <SingleProject />
        </div>
      </div>
      <ScheduleVisit />
      <Footer />
    </>
  );
}

export const InvestToday = () => (
  <Section>
    <div className="container">
      <div className="row">
        <div className="col-md-7 col-lg-7">
          <h3 className="mt-3 mt-lg-6">Invest Today</h3>

          <p className="">
            Our investors comprise of a selected group of elite personalities
            that includes professionals in various works of life; Lawyers,
            manufacturers, agriculturalists, bankers, businessmen, and the list
            goes on.
          </p>

          <p className="mb-5">
            The unique thing about our investors is that they are very erudite &
            exposed individuals that can tell the difference between mediocre
            and true quality, words and actions.
          </p>

          <Button color="primary">Learn More</Button>
        </div>
        <div className="col-md-5 col-lg-5">
          <InvestorSlider />
        </div>
      </div>
    </div>
  </Section>
);

const SingleInvestmentCard = ({ icon, title, text }) => (
  <div className="col d-flex align-items-stretch">
    <div className="benefits-card">
      <div className="bg-icon">{icon}</div>
      <h6 className="text-uppercase mt-4 mb-2 font-secondary text-color">
        {title}
      </h6>
      <p className="text-xl fw-bold">{text}</p>
    </div>
  </div>
);
