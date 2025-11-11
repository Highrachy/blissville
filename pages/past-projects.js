import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { SingleProjectGrid } from '@/components/common/SingleProject';
import axios from 'axios';
import { PROJECT_STATUS } from '@/utils/constants';
import SeoHead from '@/components/utils/SeoHead';

export default function PastProjects({ projects, properties }) {
  return (
    <>
      <Navigation />
      <SeoHead
        title="Past Projects | Completed Real Estate Developments by Highrachy in Lagos"
        description="Explore completed real estate projects by Highrachy, the developer behind Blissville Homes. Discover our legacy of luxury and affordable housing in Lekki, Sangotedo, and Lagos."
        canonical="https://www.blissville.com.ng/past-projects"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
        keywords={[
          'Completed real estate projects Lagos',
          'Highrachy developments',
          'Past projects Blissville',
          'Luxury homes Lagos',
          'Affordable homes Lekki',
          'Completed estates Sangotedo',
          'Terraced duplexes Lagos',
          'Trusted real estate developer Nigeria',
          'Highrachy housing projects',
          'Lagos real estate portfolio',
        ]}
      />
      <PageHeader
        title="Past Projects"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <section>
        <div className="container">
          <h3 className="mt-3 mt-lg-6">Past Projects</h3>
          <div className="row">
            {projects.length === 0 && (
              <div className="text-center my-7 fs-5">No projects found</div>
            )}
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
        'filters[status][$eq]': PROJECT_STATUS.COMPLETED,
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
