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
import SeoHead from '@/components/utils/SeoHead';

export default function OurProjects({ properties, projects }) {
  return (
    <>
      <SeoHead
        title="Our Properties | Blissville Terraces & Luxury Homes in Lagos | Highrachy Real Estate"
        description="Explore Blissville by Highrachy — luxury and affordable homes in Lagos, Lekki, and Sangotedo. Discover Blissville Terraces, waterfront duplexes, and the best real estate investment opportunities in Nigeria."
        canonical="https://www.blissville.com.ng/our-properties"
        ogImage="https://blissville-staging.s3.us-east-1.amazonaws.com/bvt/type-1-front.jpg"
        keywords={[
          // 🌍 Location keywords
          'Blissville Lagos',
          'Blissville Sangotedo',
          'Blissville Terraces Sangotedo',
          'Blissville by Highrachy',
          'Highrachy Blissville Lagos',
          'Luxury homes in Lagos',
          'Affordable homes in Sangotedo',
          'Best terraces in Lagos',
          'Waterfront homes in Lekki',
          'Homes near Novare Mall Sangotedo',

          // 🏘️ Property-related keywords
          'Blissville Terraces for sale',
          'Terraced duplex Sangotedo',
          '3-bedroom terrace Lagos',
          'Smart homes in Sangotedo',
          'Family-friendly estates Lagos',
          'Luxury duplex for sale Lekki',
          'Modern real estate Sangotedo',
          'Best real estate investment Lagos',
          'Buy property in Sangotedo',
          'New housing developments Lagos',

          // 💰 Investment keywords
          'Highrachy real estate investment',
          'Trusted property developer Lagos',
          'Invest in Blissville homes',
          'Affordable real estate in Nigeria',
          'Best housing deals in Lagos',
          'Highrachy investment opportunities',
          'Buy affordable terrace duplex Lagos',

          // 🔍 Brand and general SEO coverage
          'Blissville by Highrachy Lagos',
          'Highrachy Investment and Technology Ltd.',
          'Blissville luxury homes',
          'Highrachy Blissville Terraces',
          'Homes for sale in Lagos Nigeria',
          'Blissville property listings',
          'Highrachy real estate projects',
          'Sangotedo luxury estates',
          'Affordable duplexes in Lagos',
          'Highrachy housing development Sangotedo',
        ]}
      />

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
