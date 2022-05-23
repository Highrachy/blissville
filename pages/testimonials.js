import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import OurInvestors from '@/components/common/OurInvestors';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Testimonials from '@/components/common/Testimonials';
import Section from '@/components/common/Section';

export default function Home() {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Testimonials"
        subHeader="what our clients are saying"
        bgImage="/assets/img/bg/about-us.jpeg"
      />
      <AllTestimonials topThree />
      <OurInvestors />
      <Footer />
    </>
  );
}

const AllTestimonials = () => {
  return (
    <Section>
      <div className="container">
        <div className="row pt-5">
          <Testimonials />
        </div>
      </div>
    </Section>
  );
};
