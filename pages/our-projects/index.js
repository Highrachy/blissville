import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { SingleProjectGrid } from '@/components/common/SingleProject';
import axios from 'axios';
import { PROJECT_STATUS } from '@/utils/constants';
import SeoHead from '@/components/utils/SeoHead';

export default function OurProjects({ projects }) {
  return (
    <>
      <Navigation />
      <SeoHead
        title="Our Projects | Current & Upcoming Real Estate Developments by Highrachy in Lagos"
        description="Explore ongoing and upcoming real estate projects by Highrachy — the developer behind Blissville Homes. Discover luxury and affordable estates in Lagos, Lekki, and Sangotedo designed for modern living."
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
        ]}
      />
      <PageHeader
        title="Our Projects"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
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

  // const propertiesRes = await axios.get(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/properties?populate=*`,
  //   {
  //     params: {
  //       'pagination[pageSize]': 3,
  //       sort: 'createdAt:desc',
  //     },
  //   }
  // );

  const projects = projectRes.data.data;
  // const properties = propertiesRes.data.data;

  return {
    props: {
      projects,
    },
    revalidate: 10,
  };
}
