import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import SingleProject from '@/components/common/SingleProject';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';

export default function OurProjects({ properties }) {

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

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`);
  const { data } = await res.json();

  return {
    props: {
      properties: data,
    },
    revalidate: 10,
  };
}
