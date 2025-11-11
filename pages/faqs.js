import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import OurInvestors from '@/components/common/OurInvestors';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import FAQsAccordion from '@/components/common/FAQsAccordion';
import faqs from '@/data/faqs';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import SeoHead from '@/components/utils/SeoHead';

export default function FAQs() {
  return (
    <>
      <SeoHead
        title="FAQs | Questions About Blissville Homes"
        description="Find answers to the most common questions about Blissville Terraces, our payment plans, property ownership process, smart home features, and Highrachy’s real estate developments in Lagos and across Nigeria."
        canonical="https://www.blissville.com.ng/faqs"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
        keywords={[
          'Blissville FAQs',
          'Blissville Terraces questions',
          'Highrachy real estate FAQs',
          'Home ownership in Lagos',
          'Property payment plans Lagos',
          'Smart homes in Sangotedo',
          'Luxury homes Lagos FAQ',
          'Buying property in Nigeria',
          'Real estate developers Lagos',
          'Affordable homes Blissville',
        ]}
      />
      <Navigation />
      <PageHeader
        title="Frequently asked Questions"
        bgImage="/assets/img/bg/about-us.jpeg"
      />
      <AllFAQs />
      <ScheduleVisit />
      <Footer />
    </>
  );
}

export const AllFAQs = () => {
  return (
    <section className="container py-6">
      <div className="row">
        {faqs.map(({ name, faqs: allFaqs }, index) => (
          <div className="mt-5 col-12 faqs-section" key={index}>
            <h4>{name}</h4>
            <FAQsAccordion faqs={allFaqs} />
          </div>
        ))}
      </div>
    </section>
  );
};
