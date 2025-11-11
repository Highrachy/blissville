import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { SingleProjectGrid } from '@/components/common/SingleProject';
import axios from 'axios';
import { PROJECT_STATUS } from '@/utils/constants';
import SeoHead from '@/components/utils/SeoHead';
import Section from '@/components/common/Section';
import { Fade } from 'react-reveal';

export default function OurProjects({ projects }) {
  return (
    <>
      <Navigation />
      <SeoHead
        title="Our Projects | Current & Upcoming Real Estate Developments by Highrachy in Lagos"
        description="Explore ongoing and upcoming real estate projects by Highrachy, the trusted developer behind Blissville Homes. Discover luxury and affordable estates across Lekki, Sangotedo, and Lagos designed for modern living and smart investment."
        canonical="https://www.blissville.com.ng/our-projects"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-2-front.jpg"
        keywords={[
          'Real estate projects Lagos',
          'Ongoing developments Lekki',
          'Upcoming housing projects Sangotedo',
          'Highrachy Blissville homes',
          'Luxury homes Lagos',
          'Affordable real estate Nigeria',
          'Smart homes Sangotedo',
          'Terraced duplexes Lagos',
          'Investment properties Lekki',
          'New estates by Highrachy',
          'Modern homes in Lagos',
          'Blissville property projects',
          'Real estate developments Sangotedo',
        ]}
      />

      <PageHeader
        title="Our Projects"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />

      <Section>
        <div className="container text-center">
          <Fade top>
            <h2 className="fw-bold mb-3 mt-3 text-primary">
              Creating Spaces That Inspire Modern Living
            </h2>

            <p className="lead mx-auto mb-3" style={{ maxWidth: '720px' }}>
              <strong>Highrachy</strong> develops communities where design meets
              purpose. Through <strong>Blissville</strong>, we have transformed
              neighborhoods across <strong>Lagos</strong> into elegant,
              functional, and sustainable living environments tailored for
              today&rsquo;s homeowners and investors.
            </p>

            <p className="lead mx-auto mb-3" style={{ maxWidth: '720px' }}>
              From <strong>terraces in Sangotedo</strong> to{' '}
              <strong>luxury residences in Lekki</strong>, every project
              reflects our commitment to quality craftsmanship, smart planning,
              and long-term value that appreciates over time.
            </p>

            <p className="lead mx-auto" style={{ maxWidth: '720px' }}>
              Each development is designed to deliver comfort, beauty, and
              confidence, a true reflection of{' '}
              <strong>Highrachy&rsquo;s vision</strong> to redefine real estate
              excellence in <strong>Lagos</strong>.
            </p>
          </Fade>
        </div>
      </Section>

      <section className="mb-7">
        <div className="container">
          <h3 className="mt-3 mt-lg-6">All Projects</h3>
          <div className="row">
            {projects.map((project, key) => (
              <SingleProjectGrid key={key} {...project} />
            ))}
          </div>
        </div>
      </section>

      <ScheduleVisit />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const projectRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=*`,
    {
      params: {
        sort: 'createdAt:desc',
        'filters[status][$ne]': PROJECT_STATUS.NOT_AVAILABLE,
      },
    }
  );

  const projects = projectRes.data.data;

  return {
    props: {
      projects,
    },
    revalidate: 10,
  };
}
