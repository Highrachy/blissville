import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import OurInvestors from '@/components/common/OurInvestors';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import Testimonials from '@/components/common/Testimonials';
import Section from '@/components/common/Section';
import SeoHead from '@/components/utils/SeoHead';

export default function Home() {
  return (
    <>
      <SeoHead
        title="Testimonials | Blissville by Highrachy"
        description="Read what Blissville homeowners and investors are saying about our delivery, quality, and customer experience."
        canonical="https://www.blissville.com.ng/testimonials"
      />
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
