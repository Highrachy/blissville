import React from 'react';
import Navigation from '@/components/layouts/Navigation';
import Footer from '@/components/common/Footer';
import { PageHeader } from '@/components/common/Header';
import ScheduleVisit from '@/components/common/ScheduleVisit';
import ProjectsSlideshow from '@/components/layouts/ProjectsSlideshow';
import { FeaturedProperties } from '@/components/layouts/FeaturedProperties';
import axios from 'axios';
import Section from '@/components/common/Section';
import { PROJECT_STATUS, PROPERTY_STATUS } from '@/utils/constants';

export default function OurProjects({ properties, projects }) {
  return (
    <>
      <Navigation />
      <PageHeader
        title="Our Properties"
        subHeader="Powered By Highrachy"
        bgImage="/assets/img/bg/investors.jpeg"
      />
      <FeaturedProperties properties={properties} />
      <Section noPaddingBottom>
        <ProjectsSlideshow projects={projects} />
      </Section>
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
        'pagination[pageSize]': 3,
        sort: 'createdAt:desc',
        'filters[status][$ne]': PROJECT_STATUS.NOT_AVAILABLE,
      },
    }
  );

  const propertiesRes = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/properties?populate=*`,
    {
      params: {
        sort: 'createdAt:desc',
        'filters[status][$eq]': PROPERTY_STATUS.ACTIVE,
      },
    }
  );

  const projects = projectRes.data.data;
  const properties = propertiesRes.data.data;

  return {
    props: {
      projects,
      properties,
    },
    revalidate: 10,
  };
}
