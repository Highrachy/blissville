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
import SingleProject from '@/components/common/SingleProjectNew';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';

export default function OurProjects({ projects }) {
  console.log('projects: ', projects);
  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Projects"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <Section>
        <div className="container">
          <h3 className="mt-3 mt-lg-6">Our Projects</h3>
          <div className="row">
            {projects.map((project, key) => (
              <SingleProject key={key} {...project} />
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <FeaturedProperties />
      </Section>
      <ScheduleVisit />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
  const { data } = await res.json();

  return {
    props: {
      projects: data,
    },
    revalidate: 10,
  };
}
