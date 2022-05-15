import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import OurInvestors from '@/components/common/OurInvestors';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import faqs from '@/data/faqs';

export default function FAQs() {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Frequently asked Questions"
        bgImage="/assets/img/bg/about-us.jpeg"
      />
      <AllFAQs />
      <OurInvestors />
      <Footer />
    </>
  );
}

const AllFAQs = () => {
  return (
    <section className="container-fluid py-6">
      <div className="row">
        {faqs.map(({ name, faqs: allFaqs }, index) => (
          <div className="mt-5 col-12 faqs-section" key={index}>
            <h5>{name}</h5>
            <FAQsAccordion faqs={allFaqs} />
          </div>
        ))}
      </div>
    </section>
  );
};
