import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import { SingleProjectGrid } from '@/components/common/SingleProject';
import axios from 'axios';

export default function OurProjects({ projects }) {
  return (
    <>
      <Navigation />
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
      properties,
    },
    revalidate: 10,
  };
}
